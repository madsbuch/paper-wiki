#!/usr/bin/env node

/**
 * Batch convert MDX backup files to TSX format
 * This script converts the old MDX format with <WikiLayout> wrapper
 * to the new TSX format with proper React components
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const wikiDir = path.join(__dirname, '..', 'ml-wiki', 'src', 'pages', 'wiki');

// Get all .mdx.backup files
const backupFiles = fs.readdirSync(wikiDir)
  .filter(file => file.endsWith('.mdx.backup'));

console.log(`Found ${backupFiles.length} MDX backup files to convert\n`);

let converted = 0;
let skipped = 0;
let errors = 0;

backupFiles.forEach(filename => {
  const slug = filename.replace('.mdx.backup', '');
  const backupPath = path.join(wikiDir, filename);
  const tsxPath = path.join(wikiDir, `${slug}.tsx`);

  // Skip if TSX already exists
  if (fs.existsSync(tsxPath)) {
    console.log(`⏭️  Skipping ${slug} - TSX already exists`);
    skipped++;
    return;
  }

  try {
    console.log(`🔄 Converting ${slug}...`);

    // Read the backup MDX file
    const content = fs.readFileSync(backupPath, 'utf8');

    // Convert to TSX
    const tsxContent = convertToTSX(content, slug);

    // Write the TSX file
    fs.writeFileSync(tsxPath, tsxContent, 'utf8');
    console.log(`✅ Created ${slug}.tsx\n`);
    converted++;
  } catch (error) {
    console.error(`❌ Error converting ${slug}:`, error.message);
    errors++;
  }
});

console.log('\n' + '='.repeat(50));
console.log(`✨ Conversion complete!`);
console.log(`   Converted: ${converted}`);
console.log(`   Skipped: ${skipped}`);
console.log(`   Errors: ${errors}`);
console.log('='.repeat(50));

function convertToTSX(mdxContent, slug) {
  // Extract the meta export
  const metaMatch = mdxContent.match(/export const meta = \{([\s\S]*?)\};/);
  if (!metaMatch) {
    throw new Error('Could not extract metadata');
  }

  const metaBlock = metaMatch[0];

  // Parse the title from meta to generate component name
  const titleMatch = metaBlock.match(/title:\s*["']([^"']+)["']/);
  const title = titleMatch ? titleMatch[1] : slug;
  const componentName = title
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, '')
    .replace(/^[a-z]/, c => c.toUpperCase());

  // Extract the content inside <WikiLayout>
  const layoutMatch = mdxContent.match(/<WikiLayout[^>]*>([\s\S]*?)<\/WikiLayout>/);
  if (!layoutMatch) {
    throw new Error('Could not extract WikiLayout content');
  }

  let markdownContent = layoutMatch[1].trim();

  // Remove the trailing export default line if it exists
  markdownContent = markdownContent.replace(/\nexport default.*$/, '').trim();

  // Parse relatedConcepts if they exist in the meta
  const relatedConceptsMatch = metaBlock.match(/relatedConcepts:\s*\[([\s\S]*?)\]/);
  let relatedConcepts = [];
  if (relatedConceptsMatch) {
    // Extract the array content
    const arrayContent = relatedConceptsMatch[1];
    relatedConcepts = arrayContent.match(/["']([^"']+)["']/g)?.map(s => s.replace(/["']/g, '')) || [];
  }

  // Build the TSX content
  // Remove 'export' from metaBlock since it's inside a function
  const metaBlockWithoutExport = metaBlock.replace(/^export\s+/, '');

  const tsx = `import { useEffect } from 'react';
import WikiLayout from "../../components/WikiLayout";

export default function ${componentName}() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, []);

  ${metaBlockWithoutExport}

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
${convertMarkdownToJSX(markdownContent)}
      </div>
    </WikiLayout>
  );
}
`;

  return tsx;
}

function convertMarkdownToJSX(markdown) {
  const lines = markdown.split('\n');
  const jsxLines = [];
  let currentSection = null;
  let inCodeBlock = false;
  let codeLines = [];
  let inList = false;
  let listLines = [];

  const flushList = () => {
    if (listLines.length > 0) {
      jsxLines.push('          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">');
      listLines.forEach(item => {
        jsxLines.push(`            <li>${escapeForJSX(item)}</li>`);
      });
      jsxLines.push('          </ul>');
      listLines = [];
    }
  };

  const flushCode = () => {
    if (codeLines.length > 0) {
      jsxLines.push('          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">');
      codeLines.forEach(line => {
        jsxLines.push('            ' + escapeHTML(line));
      });
      jsxLines.push('          </code></pre>');
      codeLines = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Handle code blocks
    if (trimmed.startsWith('```')) {
      if (!inCodeBlock) {
        flushList();
        inCodeBlock = true;
        continue;
      } else {
        inCodeBlock = false;
        flushCode();
        continue;
      }
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    // Handle section breaks (## headings)
    if (trimmed.startsWith('## ') && !trimmed.startsWith('###')) {
      flushList();
      // Close previous section
      if (currentSection !== null) {
        jsxLines.push('        </section>');
        jsxLines.push('');
      }
      // Open new section
      currentSection = true;
      jsxLines.push('        <section>');
      const heading = trimmed.substring(3);
      jsxLines.push(`          <h2 className="text-2xl font-bold text-slate-900 mb-4">${escapeHTML(heading)}</h2>`);
      continue;
    }

    // Handle ### headings
    if (trimmed.startsWith('### ')) {
      flushList();
      const heading = trimmed.substring(4);
      jsxLines.push(`          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">${escapeHTML(heading)}</h3>`);
      continue;
    }

    // Handle #### headings
    if (trimmed.startsWith('#### ')) {
      flushList();
      const heading = trimmed.substring(5);
      jsxLines.push(`          <h4 className="text-lg font-semibold text-slate-900 mb-2">${escapeHTML(heading)}</h4>`);
      continue;
    }

    // Handle horizontal rules
    if (trimmed === '---') {
      flushList();
      jsxLines.push('          <hr className="my-6 border-slate-200" />');
      continue;
    }

    // Handle lists
    if (trimmed.match(/^(\d+\.|-)\s/)) {
      if (!inList) {
        inList = true;
      }
      const itemText = trimmed.replace(/^(\d+\.|-)\s+/, '');
      listLines.push(itemText);
      continue;
    } else if (inList && trimmed === '') {
      flushList();
      inList = false;
      continue;
    } else if (inList && trimmed) {
      // Could be continuation of previous item or end of list
      if (!trimmed.match(/^(\d+\.|-)\s/)) {
        flushList();
        inList = false;
        // Fall through to process as paragraph
      }
    }

    // Handle empty lines
    if (!trimmed) {
      continue;
    }

    // Handle paragraphs
    if (trimmed && !trimmed.startsWith('#')) {
      flushList();
      const processed = processInlineMarkdown(trimmed);
      jsxLines.push(`          <p className="text-slate-700 mb-4">${processed}</p>`);
    }
  }

  // Flush any remaining content
  flushList();
  flushCode();

  // Close last section if open
  if (currentSection !== null) {
    jsxLines.push('        </section>');
  }

  return jsxLines.join('\n');
}

function processInlineMarkdown(text) {
  // Convert **bold** to <strong>
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Convert *italic* to <em>
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Convert `code` to <code>
  text = text.replace(/`(.+?)`/g, '<code className="bg-slate-100 px-1 rounded">$1</code>');

  // Convert [link text](url) to <a>
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" className="text-blue-600 hover:text-blue-800 underline">$1</a>');

  return escapeForJSX(text);
}

function escapeForJSX(text) {
  // Don't escape if it already contains HTML tags
  if (/<\w+/.test(text)) {
    return text;
  }
  return escapeHTML(text);
}

function escapeHTML(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;');
}
