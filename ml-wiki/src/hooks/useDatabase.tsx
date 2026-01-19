/**
 * Database Hooks for Wiki-Tech Collections
 * 
 * Provides access to SQLite database in the browser via sql.js
 * 
 * Usage:
 *   import { useDatabase, usePapersIndex, useSearch } from '@/hooks/useDatabase';
 *   
 *   // In component:
 *   const { data: papers, loading, error } = usePapersIndex();
 */

import { useState, useEffect, useCallback, createContext, useContext, type ReactNode } from "react";
import initSqlJs, { type Database as SqlJsDatabase } from "sql.js";

// Types for database records
export interface Paper {
  id: number;
  slug: string;
  title: string;
  authors: string;
  year: number | null;
  venue: string | null;
  arxiv_id: string | null;
  arxiv_url: string | null;
  abstract: string | null;
  key_contributions: string | null; // JSON array
  impact: string | null;
  tags: string | null; // JSON array
  related_concepts: string | null; // JSON array from view
}

export interface WikiConcept {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  category: string | null;
  difficulty: string | null;
  tags: string | null; // JSON array
  citations: string | null; // JSON array
  prerequisites: string | null; // JSON array
  related_papers: string | null; // JSON array from view
}

export interface Essay {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  reading_time: string | null;
  audio_path: string | null;
  tags: string | null; // JSON array
  related_papers: string | null; // JSON array from view
  related_concepts: string | null; // JSON array from view
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  category: string;
  difficulty: string | null;
  estimated_time: string | null;
  novel: string | null;
  prerequisites: string | null; // JSON array
  tags: string | null; // JSON array
  related_papers: string | null; // JSON array from view
  related_concepts: string | null; // JSON array from view
}

export interface SearchResult {
  content_type: string;
  slug: string;
  title: string;
  subtitle: string | null;
  category: string | null;
}

// Database state
interface DatabaseState {
  db: SqlJsDatabase | null;
  loading: boolean;
  error: Error | null;
}

// Query result type
interface QueryResult<T> {
  data: T[] | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

// Database context for sharing single instance
const DatabaseContext = createContext<DatabaseState>({
  db: null,
  loading: true,
  error: null,
});

/**
 * Database Provider - wrap your app with this to share database instance
 */
export function DatabaseProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DatabaseState>({
    db: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    async function loadDatabase() {
      try {
        // Initialize sql.js with WASM
        const SQL = await initSqlJs({
          // Use CDN for WASM file
          locateFile: (file: string) => `https://sql.js.org/dist/${file}`,
        });

        // Fetch database file
        const response = await fetch("/collections.db");
        
        if (!response.ok) {
          throw new Error(`Failed to load database: ${response.status} ${response.statusText}`);
        }
        
        const arrayBuffer = await response.arrayBuffer();

        // Create database instance
        const db = new SQL.Database(new Uint8Array(arrayBuffer));

        if (mounted) {
          setState({ db, loading: false, error: null });
        }
      } catch (err) {
        console.error("Failed to load database:", err);
        if (mounted) {
          setState({ 
            db: null, 
            loading: false, 
            error: err instanceof Error ? err : new Error(String(err)) 
          });
        }
      }
    }

    loadDatabase();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <DatabaseContext.Provider value={state}>
      {children}
    </DatabaseContext.Provider>
  );
}

/**
 * Hook to access the database instance
 */
export function useDatabase(): DatabaseState {
  return useContext(DatabaseContext);
}

/**
 * Generic query hook - executes SQL query and returns results
 */
export function useQuery<T = Record<string, unknown>>(
  query: string,
  params: (string | number | null)[] = []
): QueryResult<T> {
  const { db, loading: dbLoading, error: dbError } = useDatabase();
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const executeQuery = useCallback(() => {
    if (!db || dbLoading) return;

    try {
      setLoading(true);
      const stmt = db.prepare(query);
      
      // Bind parameters if any
      if (params.length > 0) {
        stmt.bind(params);
      }
      
      const results: T[] = [];
      
      while (stmt.step()) {
        const row = stmt.getAsObject() as T;
        results.push(row);
      }
      
      stmt.free();
      setData(results);
      setError(null);
    } catch (err) {
      console.error("Query error:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [db, dbLoading, query, JSON.stringify(params)]);

  useEffect(() => {
    executeQuery();
  }, [executeQuery]);

  // Combine loading states
  const isLoading = dbLoading || loading;
  const combinedError = dbError || error;

  return { 
    data, 
    loading: isLoading, 
    error: combinedError,
    refetch: executeQuery 
  };
}

// ============================================================================
// Pre-built Query Hooks
// ============================================================================

/**
 * Get all papers with related concepts
 */
export function usePapersIndex(): QueryResult<Paper> {
  return useQuery<Paper>("SELECT * FROM paper_index");
}

/**
 * Get a single paper by slug
 */
export function usePaper(slug: string): QueryResult<Paper> {
  return useQuery<Paper>(
    "SELECT * FROM paper_index WHERE slug = ?",
    [slug]
  );
}

/**
 * Get all wiki concepts with related papers
 */
export function useWikiIndex(category?: string): QueryResult<WikiConcept> {
  if (category) {
    return useQuery<WikiConcept>(
      "SELECT * FROM wiki_index WHERE category = ? ORDER BY title",
      [category]
    );
  }
  return useQuery<WikiConcept>("SELECT * FROM wiki_index ORDER BY category, title");
}

/**
 * Get a single wiki concept by slug
 */
export function useWikiConcept(slug: string): QueryResult<WikiConcept> {
  return useQuery<WikiConcept>(
    "SELECT * FROM wiki_index WHERE slug = ?",
    [slug]
  );
}

/**
 * Get all essays with related papers and concepts
 */
export function useEssaysIndex(): QueryResult<Essay> {
  return useQuery<Essay>("SELECT * FROM essay_index");
}

/**
 * Get a single essay by slug
 */
export function useEssay(slug: string): QueryResult<Essay> {
  return useQuery<Essay>(
    "SELECT * FROM essay_index WHERE slug = ?",
    [slug]
  );
}

/**
 * Get all projects with related papers and concepts
 */
export function useProjectsIndex(category?: string): QueryResult<Project> {
  if (category) {
    return useQuery<Project>(
      "SELECT * FROM project_index WHERE category = ? ORDER BY title",
      [category]
    );
  }
  return useQuery<Project>("SELECT * FROM project_index");
}

/**
 * Get a single project by slug
 */
export function useProject(slug: string): QueryResult<Project> {
  return useQuery<Project>(
    "SELECT * FROM project_index WHERE slug = ?",
    [slug]
  );
}

/**
 * Get all unique categories for wiki concepts
 */
export function useWikiCategories(): QueryResult<{ category: string }> {
  return useQuery<{ category: string }>(
    "SELECT DISTINCT category FROM wiki_concepts WHERE category IS NOT NULL ORDER BY category"
  );
}

/**
 * Get all unique project categories
 */
export function useProjectCategories(): QueryResult<{ category: string }> {
  return useQuery<{ category: string }>(
    "SELECT DISTINCT category FROM projects WHERE category IS NOT NULL ORDER BY category"
  );
}

// ============================================================================
// Full-Text Search
// ============================================================================

export type ContentType = "paper" | "wiki" | "essay" | "project";

/**
 * Search across all content types using FTS5
 */
export function useSearch(
  searchTerm: string,
  contentTypes: ContentType[] = ["paper", "wiki", "essay", "project"]
): QueryResult<SearchResult> {
  const { db, loading: dbLoading, error: dbError } = useDatabase();
  const [data, setData] = useState<SearchResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!db || dbLoading || !searchTerm.trim()) {
      setData(null);
      return;
    }

    try {
      setLoading(true);
      const results: SearchResult[] = [];
      
      // Escape search term for FTS5
      const escapedTerm = searchTerm.replace(/['"]/g, '""');
      const ftsQuery = `"${escapedTerm}"*`;

      // Search papers
      if (contentTypes.includes("paper")) {
        try {
          const stmt = db.prepare(`
            SELECT 'paper' as content_type, slug, title, authors as subtitle, NULL as category
            FROM papers_fts
            WHERE papers_fts MATCH ?
            LIMIT 20
          `);
          stmt.bind([ftsQuery]);
          while (stmt.step()) {
            results.push(stmt.getAsObject() as unknown as SearchResult);
          }
          stmt.free();
        } catch {
          // FTS table might not exist, fall back to LIKE
          const stmt = db.prepare(`
            SELECT 'paper' as content_type, slug, title, authors as subtitle, NULL as category
            FROM papers
            WHERE title LIKE ? OR abstract LIKE ? OR authors LIKE ?
            LIMIT 20
          `);
          const likePattern = `%${searchTerm}%`;
          stmt.bind([likePattern, likePattern, likePattern]);
          while (stmt.step()) {
            results.push(stmt.getAsObject() as unknown as SearchResult);
          }
          stmt.free();
        }
      }

      // Search wiki concepts
      if (contentTypes.includes("wiki")) {
        try {
          const stmt = db.prepare(`
            SELECT 'wiki' as content_type, slug, title, description as subtitle, category
            FROM wiki_fts
            WHERE wiki_fts MATCH ?
            LIMIT 20
          `);
          stmt.bind([ftsQuery]);
          while (stmt.step()) {
            results.push(stmt.getAsObject() as unknown as SearchResult);
          }
          stmt.free();
        } catch {
          const stmt = db.prepare(`
            SELECT 'wiki' as content_type, slug, title, description as subtitle, category
            FROM wiki_concepts
            WHERE title LIKE ? OR description LIKE ?
            LIMIT 20
          `);
          const likePattern = `%${searchTerm}%`;
          stmt.bind([likePattern, likePattern]);
          while (stmt.step()) {
            results.push(stmt.getAsObject() as unknown as SearchResult);
          }
          stmt.free();
        }
      }

      // Search essays
      if (contentTypes.includes("essay")) {
        try {
          const stmt = db.prepare(`
            SELECT 'essay' as content_type, slug, title, description as subtitle, NULL as category
            FROM essays_fts
            WHERE essays_fts MATCH ?
            LIMIT 20
          `);
          stmt.bind([ftsQuery]);
          while (stmt.step()) {
            results.push(stmt.getAsObject() as unknown as SearchResult);
          }
          stmt.free();
        } catch {
          const stmt = db.prepare(`
            SELECT 'essay' as content_type, slug, title, description as subtitle, NULL as category
            FROM essays
            WHERE title LIKE ? OR description LIKE ?
            LIMIT 20
          `);
          const likePattern = `%${searchTerm}%`;
          stmt.bind([likePattern, likePattern]);
          while (stmt.step()) {
            results.push(stmt.getAsObject() as unknown as SearchResult);
          }
          stmt.free();
        }
      }

      // Search projects
      if (contentTypes.includes("project")) {
        try {
          const stmt = db.prepare(`
            SELECT 'project' as content_type, slug, title, description as subtitle, category
            FROM projects_fts
            WHERE projects_fts MATCH ?
            LIMIT 20
          `);
          stmt.bind([ftsQuery]);
          while (stmt.step()) {
            results.push(stmt.getAsObject() as unknown as SearchResult);
          }
          stmt.free();
        } catch {
          const stmt = db.prepare(`
            SELECT 'project' as content_type, slug, title, description as subtitle, category
            FROM projects
            WHERE title LIKE ? OR description LIKE ?
            LIMIT 20
          `);
          const likePattern = `%${searchTerm}%`;
          stmt.bind([likePattern, likePattern]);
          while (stmt.step()) {
            results.push(stmt.getAsObject() as unknown as SearchResult);
          }
          stmt.free();
        }
      }

      setData(results);
      setError(null);
    } catch (err) {
      console.error("Search error:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [db, dbLoading, searchTerm, contentTypes.join(",")]);

  return {
    data,
    loading: dbLoading || loading,
    error: dbError || error,
    refetch: () => {}, // Search auto-updates on term change
  };
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Parse JSON fields safely
 */
export function parseJsonField<T>(json: string | null): T | null {
  if (!json) return null;
  try {
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

/**
 * Parse related concepts from JSON string
 */
export function parseRelatedConcepts(json: string | null): Array<{ name: string; slug: string }> {
  return parseJsonField<Array<{ name: string; slug: string }>>(json) || [];
}

/**
 * Parse related papers from JSON string
 */
export function parseRelatedPapers(json: string | null): Array<{ title: string; slug: string }> {
  return parseJsonField<Array<{ title: string; slug: string }>>(json) || [];
}

/**
 * Parse tags from JSON string
 */
export function parseTags(json: string | null): string[] {
  return parseJsonField<string[]>(json) || [];
}

/**
 * Parse key contributions from JSON string
 */
export function parseKeyContributions(json: string | null): string[] {
  return parseJsonField<string[]>(json) || [];
}
