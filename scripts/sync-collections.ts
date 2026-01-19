#!/usr/bin/env bun
/**
 * Sync Collections Database
 * 
 * Parses MDX/TSX files from ml-wiki and populates collections.db
 * for the frontend to use via sql.js
 * 
 * Usage:
 *   bun run scripts/sync-collections.ts           # Full sync
 *   bun run scripts/sync-collections.ts --watch   # Watch mode
 *   bun run scripts/sync-collections.ts --reset   # Reset and rebuild
 */

import { Database } from "bun:sqlite";
import { readdir, readFile } from "fs/promises";
import { join, basename, extname } from "path";
import { existsSync, mkdirSync } from "fs";

// Paths
const SCRIPT_DIR = import.meta.dir;
const PROJECT_ROOT = join(SCRIPT_DIR, "..");
const ML_WIKI_DIR = join(PROJECT_ROOT, "ml-wiki");
const PAGES_DIR = join(ML_WIKI_DIR, "src", "pages");
const PUBLIC_DIR = join(ML_WIKI_DIR, "public");
const DB_PATH = join(PUBLIC_DIR, "collections.db");
const SCHEMA_PATH = join(SCRIPT_DIR, "collections-schema.sql");

// Content directories
const PAPERS_DIR = join(PAGES_DIR, "papers");
const WIKI_DIR = join(PAGES_DIR, "wiki");
const ESSAYS_DIR = join(PAGES_DIR, "essays");
const PROJECTS_DIR = join(PAGES_DIR, "projects");

// Types
interface PaperMeta {
  title: string;
  authors: string;
  year: string;
  venue: string;
  arxivId: string;
  arxivUrl?: string;
  abstract: string;
  keyContributions?: string[];
  relatedConcepts?: Array<{ name: string; slug: string }>;
  impact?: string;
  tags?: string[];
}

interface WikiMeta {
  title: string;
  description?: string;
  category?: string;
  difficulty?: string;
  citations?: Array<{ paper: string; authors: string; year: string; pages?: string }>;
  relatedConcepts?: string[];
  tags?: string[];
  prerequisites?: string[];
}

interface EssayMeta {
  title: string;
  description?: string;
  readingTime?: string;
  audioPath?: string;
  relatedPapers?: Array<{ title: string; slug: string }>;
  relatedConcepts?: Array<{ name: string; slug: string }>;
  tags?: string[];
}

interface ProjectMeta {
  title: string;
  description?: string;
  category: "Exercise" | "Weekend Project" | "Large Project";
  difficulty?: string;
  estimatedTime?: string;
  novel?: string;
  relatedPapers?: Array<{ title: string; slug: string }>;
  relatedConcepts?: Array<{ name: string; slug: string }>;
  prerequisites?: string[];
  tags?: string[];
}

/**
 * Initialize database with schema
 */
async function initDatabase(reset: boolean = false): Promise<Database> {
  // Ensure public directory exists
  if (!existsSync(PUBLIC_DIR)) {
    mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  // Remove existing database if reset
  if (reset && existsSync(DB_PATH)) {
    Bun.spawnSync(["rm", DB_PATH]);
    console.log("  Removed existing database");
  }

  const db = new Database(DB_PATH);
  
  // Read and execute schema
  const schema = await Bun.file(SCHEMA_PATH).text();
  db.exec(schema);
  
  return db;
}

/**
 * Extract metadata from TSX file content
 */
function extractTsxMeta(content: string): Record<string, unknown> | null {
  // Try to find exported meta object: export const meta = { ... }
  const exportMetaMatch = content.match(/export\s+const\s+meta\s*=\s*({[\s\S]*?});/);
  if (exportMetaMatch) {
    try {
      // Very basic parsing - convert to JSON-ish
      let metaStr = exportMetaMatch[1];
      // Handle template literals and quotes
      metaStr = metaStr.replace(/`([^`]*)`/g, '"$1"');
      // This is a simplified parser - might need enhancement
      return eval(`(${metaStr})`);
    } catch {
      // Fall through to other methods
    }
  }

  // Try to find const meta = { ... } (non-exported, inside component)
  const constMetaMatch = content.match(/const\s+meta\s*=\s*({[\s\S]*?});\s*\n/);
  if (constMetaMatch) {
    try {
      return eval(`(${constMetaMatch[1]})`);
    } catch {
      // Fall through
    }
  }

  // Try to find paperMeta export
  const paperMetaMatch = content.match(/export\s+const\s+paperMeta\s*[=:]\s*({[\s\S]*?})\s*(?:as\s+const)?;/);
  if (paperMetaMatch) {
    try {
      return eval(`(${paperMetaMatch[1]})`);
    } catch {
      // Fall through
    }
  }

  // Try to extract from WikiLayout spread props: <WikiLayout {...meta}>
  // First find if it uses spread, then extract the meta object
  if (content.includes('<WikiLayout {...meta}>') || content.includes('<WikiLayout {...meta} >')) {
    const metaObjMatch = content.match(/const\s+meta\s*=\s*({[\s\S]*?});\s*$/m);
    if (metaObjMatch) {
      try {
        return eval(`(${metaObjMatch[1]})`);
      } catch {
        // Fall through
      }
    }
  }

  // Try to extract from PaperLayout props directly
  const layoutMatch = content.match(/<PaperLayout\s+([\s\S]*?)>/);
  if (layoutMatch) {
    const propsStr = layoutMatch[1];
    const props: Record<string, unknown> = {};
    
    // Extract string props: propName="value" or propName={'value'}
    const stringPropRegex = /(\w+)=["'{]([^"'}]+)["'}]/g;
    let match;
    while ((match = stringPropRegex.exec(propsStr)) !== null) {
      props[match[1]] = match[2];
    }
    
    // Extract array props: propName={[...]}
    const arrayPropRegex = /(\w+)=\{(\[[\s\S]*?\])\}/g;
    while ((match = arrayPropRegex.exec(propsStr)) !== null) {
      try {
        props[match[1]] = eval(match[2]);
      } catch {
        // Skip malformed arrays
      }
    }
    
    if (Object.keys(props).length > 0) {
      return props;
    }
  }

  return null;
}

/**
 * Extract metadata from MDX file content
 */
function extractMdxMeta(content: string): Record<string, unknown> | null {
  // MDX files typically have: export const meta = { ... }
  const metaMatch = content.match(/export\s+const\s+meta\s*=\s*({[\s\S]*?});/);
  if (metaMatch) {
    try {
      return eval(`(${metaMatch[1]})`);
    } catch {
      // Try JSON parse after cleanup
      try {
        let metaStr = metaMatch[1]
          .replace(/(\w+):/g, '"$1":')  // Quote keys
          .replace(/'/g, '"')            // Single to double quotes
          .replace(/,\s*}/g, '}')        // Remove trailing commas
          .replace(/,\s*]/g, ']');
        return JSON.parse(metaStr);
      } catch {
        return null;
      }
    }
  }
  return null;
}

/**
 * Get slug from filename
 */
function getSlug(filename: string): string {
  return basename(filename, extname(filename));
}

/**
 * Sync papers from TSX files
 */
async function syncPapers(db: Database): Promise<Map<string, number>> {
  console.log("\n  Syncing papers...");
  const slugToId = new Map<string, number>();
  
  const insertStmt = db.prepare(`
    INSERT OR REPLACE INTO papers 
    (slug, title, authors, year, venue, arxiv_id, arxiv_url, abstract, key_contributions, impact, tags, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
  `);

  try {
    const files = await readdir(PAPERS_DIR);
    const tsxFiles = files.filter(f => f.endsWith(".tsx") && f !== "index.tsx");
    
    for (const file of tsxFiles) {
      const slug = getSlug(file);
      const content = await readFile(join(PAPERS_DIR, file), "utf-8");
      const meta = extractTsxMeta(content) as PaperMeta | null;
      
      if (meta && meta.title) {
        insertStmt.run(
          slug,
          meta.title,
          typeof meta.authors === "string" ? meta.authors : JSON.stringify(meta.authors),
          parseInt(meta.year) || null,
          meta.venue || null,
          meta.arxivId || null,
          meta.arxivUrl || null,
          meta.abstract || null,
          meta.keyContributions ? JSON.stringify(meta.keyContributions) : null,
          meta.impact || null,
          meta.tags ? JSON.stringify(meta.tags) : null
        );
        
        // Get the ID
        const row = db.query("SELECT id FROM papers WHERE slug = ?").get(slug) as { id: number } | null;
        if (row) {
          slugToId.set(slug, row.id);
        }
        
        console.log(`    + ${slug}: ${meta.title}`);
      } else {
        console.log(`    ? ${slug}: Could not extract metadata`);
      }
    }
    
    console.log(`  Synced ${slugToId.size} papers`);
  } catch (error) {
    console.error("  Error syncing papers:", error);
  }
  
  return slugToId;
}

/**
 * Sync wiki concepts from TSX/MDX files
 */
async function syncWikiConcepts(db: Database): Promise<Map<string, number>> {
  console.log("\n  Syncing wiki concepts...");
  const slugToId = new Map<string, number>();
  
  const insertStmt = db.prepare(`
    INSERT OR REPLACE INTO wiki_concepts 
    (slug, title, description, category, difficulty, tags, citations, prerequisites, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
  `);

  try {
    const files = await readdir(WIKI_DIR);
    const contentFiles = files.filter(f => 
      (f.endsWith(".tsx") || f.endsWith(".mdx")) && f !== "index.tsx"
    );
    
    for (const file of contentFiles) {
      const slug = getSlug(file);
      const content = await readFile(join(WIKI_DIR, file), "utf-8");
      const meta = file.endsWith(".mdx") 
        ? extractMdxMeta(content) as WikiMeta | null
        : extractTsxMeta(content) as WikiMeta | null;
      
      if (meta && meta.title) {
        insertStmt.run(
          slug,
          meta.title,
          meta.description || null,
          meta.category || null,
          meta.difficulty || null,
          meta.tags ? JSON.stringify(meta.tags) : null,
          meta.citations ? JSON.stringify(meta.citations) : null,
          meta.prerequisites ? JSON.stringify(meta.prerequisites) : null
        );
        
        const row = db.query("SELECT id FROM wiki_concepts WHERE slug = ?").get(slug) as { id: number } | null;
        if (row) {
          slugToId.set(slug, row.id);
        }
        
        console.log(`    + ${slug}: ${meta.title}`);
      } else {
        console.log(`    ? ${slug}: Could not extract metadata`);
      }
    }
    
    console.log(`  Synced ${slugToId.size} wiki concepts`);
  } catch (error) {
    console.error("  Error syncing wiki concepts:", error);
  }
  
  return slugToId;
}

/**
 * Sync essays from MDX files
 */
async function syncEssays(db: Database, paperSlugs: Map<string, number>, conceptSlugs: Map<string, number>): Promise<void> {
  console.log("\n  Syncing essays...");
  
  const insertStmt = db.prepare(`
    INSERT OR REPLACE INTO essays 
    (slug, title, description, reading_time, audio_path, tags, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
  `);
  
  const linkPaperStmt = db.prepare(`
    INSERT OR IGNORE INTO essay_papers (essay_id, paper_id) VALUES (?, ?)
  `);
  
  const linkConceptStmt = db.prepare(`
    INSERT OR IGNORE INTO essay_concepts (essay_id, concept_id) VALUES (?, ?)
  `);

  let count = 0;
  
  try {
    const files = await readdir(ESSAYS_DIR);
    const mdxFiles = files.filter(f => f.endsWith(".mdx"));
    
    for (const file of mdxFiles) {
      const slug = getSlug(file);
      const content = await readFile(join(ESSAYS_DIR, file), "utf-8");
      const meta = extractMdxMeta(content) as EssayMeta | null;
      
      if (meta && meta.title) {
        insertStmt.run(
          slug,
          meta.title,
          meta.description || null,
          meta.readingTime || null,
          meta.audioPath || null,
          meta.tags ? JSON.stringify(meta.tags) : null
        );
        
        const row = db.query("SELECT id FROM essays WHERE slug = ?").get(slug) as { id: number } | null;
        if (row) {
          // Link to papers
          if (meta.relatedPapers) {
            for (const paper of meta.relatedPapers) {
              const paperId = paperSlugs.get(paper.slug);
              if (paperId) {
                linkPaperStmt.run(row.id, paperId);
              }
            }
          }
          
          // Link to concepts
          if (meta.relatedConcepts) {
            for (const concept of meta.relatedConcepts) {
              const conceptId = conceptSlugs.get(concept.slug);
              if (conceptId) {
                linkConceptStmt.run(row.id, conceptId);
              }
            }
          }
        }
        
        console.log(`    + ${slug}: ${meta.title}`);
        count++;
      } else {
        console.log(`    ? ${slug}: Could not extract metadata`);
      }
    }
    
    console.log(`  Synced ${count} essays`);
  } catch (error) {
    console.error("  Error syncing essays:", error);
  }
}

/**
 * Sync projects from MDX files
 */
async function syncProjects(db: Database, paperSlugs: Map<string, number>, conceptSlugs: Map<string, number>): Promise<void> {
  console.log("\n  Syncing projects...");
  
  const insertStmt = db.prepare(`
    INSERT OR REPLACE INTO projects 
    (slug, title, description, category, difficulty, estimated_time, novel, prerequisites, tags, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
  `);
  
  const linkPaperStmt = db.prepare(`
    INSERT OR IGNORE INTO project_papers (project_id, paper_id) VALUES (?, ?)
  `);
  
  const linkConceptStmt = db.prepare(`
    INSERT OR IGNORE INTO project_concepts (project_id, concept_id) VALUES (?, ?)
  `);

  let count = 0;
  
  try {
    const files = await readdir(PROJECTS_DIR);
    const mdxFiles = files.filter(f => f.endsWith(".mdx"));
    
    for (const file of mdxFiles) {
      const slug = getSlug(file);
      const content = await readFile(join(PROJECTS_DIR, file), "utf-8");
      const meta = extractMdxMeta(content) as ProjectMeta | null;
      
      if (meta && meta.title) {
        insertStmt.run(
          slug,
          meta.title,
          meta.description || null,
          meta.category || "Weekend Project",
          meta.difficulty || null,
          meta.estimatedTime || null,
          meta.novel || null,
          meta.prerequisites ? JSON.stringify(meta.prerequisites) : null,
          meta.tags ? JSON.stringify(meta.tags) : null
        );
        
        const row = db.query("SELECT id FROM projects WHERE slug = ?").get(slug) as { id: number } | null;
        if (row) {
          // Link to papers
          if (meta.relatedPapers) {
            for (const paper of meta.relatedPapers) {
              const paperId = paperSlugs.get(paper.slug);
              if (paperId) {
                linkPaperStmt.run(row.id, paperId);
              }
            }
          }
          
          // Link to concepts
          if (meta.relatedConcepts) {
            for (const concept of meta.relatedConcepts) {
              const conceptId = conceptSlugs.get(concept.slug);
              if (conceptId) {
                linkConceptStmt.run(row.id, conceptId);
              }
            }
          }
        }
        
        console.log(`    + ${slug}: ${meta.title}`);
        count++;
      } else {
        console.log(`    ? ${slug}: Could not extract metadata`);
      }
    }
    
    console.log(`  Synced ${count} projects`);
  } catch (error) {
    console.error("  Error syncing projects:", error);
  }
}

/**
 * Sync paper-concept relationships from paper files
 */
async function syncPaperConceptRelationships(
  db: Database, 
  paperSlugs: Map<string, number>, 
  conceptSlugs: Map<string, number>
): Promise<void> {
  console.log("\n  Syncing paper-concept relationships...");
  
  const linkStmt = db.prepare(`
    INSERT OR IGNORE INTO paper_concepts (paper_id, concept_id) VALUES (?, ?)
  `);

  let count = 0;
  
  try {
    const files = await readdir(PAPERS_DIR);
    const tsxFiles = files.filter(f => f.endsWith(".tsx") && f !== "index.tsx");
    
    for (const file of tsxFiles) {
      const slug = getSlug(file);
      const paperId = paperSlugs.get(slug);
      if (!paperId) continue;
      
      const content = await readFile(join(PAPERS_DIR, file), "utf-8");
      const meta = extractTsxMeta(content) as PaperMeta | null;
      
      if (meta?.relatedConcepts) {
        for (const concept of meta.relatedConcepts) {
          const conceptId = conceptSlugs.get(concept.slug);
          if (conceptId) {
            linkStmt.run(paperId, conceptId);
            count++;
          }
        }
      }
    }
    
    console.log(`  Created ${count} paper-concept relationships`);
  } catch (error) {
    console.error("  Error syncing relationships:", error);
  }
}

/**
 * Print database stats
 */
function printStats(db: Database): void {
  console.log("\n  Database Statistics:");
  
  const tables = ["papers", "wiki_concepts", "essays", "projects"];
  for (const table of tables) {
    const row = db.query(`SELECT COUNT(*) as count FROM ${table}`).get() as { count: number };
    console.log(`    ${table}: ${row.count} rows`);
  }
  
  const relTables = ["paper_concepts", "essay_papers", "essay_concepts", "project_papers", "project_concepts"];
  for (const table of relTables) {
    try {
      const row = db.query(`SELECT COUNT(*) as count FROM ${table}`).get() as { count: number };
      if (row.count > 0) {
        console.log(`    ${table}: ${row.count} relationships`);
      }
    } catch {
      // Table might not exist
    }
  }
}

/**
 * Main sync function
 */
async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const reset = args.includes("--reset");
  const watch = args.includes("--watch");
  
  console.log("===========================================");
  console.log("  Wiki-Tech Collections Database Sync");
  console.log("===========================================");
  
  if (reset) {
    console.log("\n  Mode: RESET (rebuilding from scratch)");
  }
  
  console.log(`\n  Database: ${DB_PATH}`);
  console.log(`  Schema: ${SCHEMA_PATH}`);
  
  // Initialize database
  console.log("\n  Initializing database...");
  const db = await initDatabase(reset);
  console.log("  Database initialized");
  
  // Sync all content
  const paperSlugs = await syncPapers(db);
  const conceptSlugs = await syncWikiConcepts(db);
  await syncEssays(db, paperSlugs, conceptSlugs);
  await syncProjects(db, paperSlugs, conceptSlugs);
  await syncPaperConceptRelationships(db, paperSlugs, conceptSlugs);
  
  // Print stats
  printStats(db);
  
  // Close database
  db.close();
  
  console.log("\n  Sync complete!");
  console.log("===========================================\n");
  
  if (watch) {
    console.log("  Watch mode not yet implemented");
    // TODO: Implement file watching
  }
}

// Run
main().catch(console.error);
