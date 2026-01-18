#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const wikiDir = path.join(__dirname, '..', 'ml-wiki', 'src', 'pages', 'wiki');

// Get all .mdx.backup files
const backupFiles = fs.readdirSync(wikiDir)
  .filter(file => file.endsWith('.mdx.backup'))
  .map(file => file.replace('.mdx.backup', ''));

console.log(`Found ${backupFiles.length} MDX backup files to convert`);

backupFiles.forEach(slug => {
  const backupPath = path.join(wikiDir, `${slug}.mdx.backup`);
  const tsxPath = path.join(wikiDir, `${slug}.tsx`);

  // Skip if TSX already exists
  if (fs.existsSync(tsxPath)) {
    console.log(`⏭️  Skipping ${slug} - TSX already exists`);
    return;
  }

  console.log(`🔄 Converting ${slug}...`);

  // Read the backup MDX file
  const content = fs.readFileSync(backupPath, 'utf8');

  // Extract metadata using regex
  const metaMatch = content.match(/export const meta = \{([\s\S]*?)\};/);
  if (!metaMatch) {
    console.error(`❌ Could not extract metadata from ${slug}`);
    return;
  }

  const metaContent = metaMatch[0];

  // Extract the content after the metadata
  const contentAfterMeta = content.substring(content.indexOf(metaMatch[0]) + metaMatch[0].length).trim();

  // Remove the <WikiLayout> wrapper if it exists
  let mainContent = contentAfterMeta;
  if (mainContent.includes('<WikiLayout')) {
    const layoutStart = mainContent.indexOf('<WikiLayout');
    const layoutEnd = mainContent.indexOf('>', layoutStart) + 1;
    const closingTag = mainContent.lastIndexOf('</WikiLayout>');

    if (closingTag !== -1) {
      mainContent = mainContent.substring(layoutEnd, closingTag).trim();
    }
  }

  // Convert the content to TSX format
  const tsxContent = convertToTSX(slug, metaContent, mainContent);

  // Write the TSX file
  fs.writeFileSync(tsxPath, tsxContent, 'utf8');
  console.log(`✅ Created ${slug}.tsx`);
});

console.log('\n✨ Conversion complete!');

function convertToTSX(slug, metaContent, mdxContent) {
  // Parse the title from meta for the component name
  const titleMatch = metaContent.match(/title:\s*["']([^"']+)["']/);
  const title = titleMatch ? titleMatch[1] : slug;
  const componentName = title.replace(/[^a-zA-Z0-9]/g, '');

  // Convert MDX content to JSX
  const jsxContent = convertMDXToJSX(mdxContent);

  return `import { useEffect } from 'react';
import WikiLayout from "../../components/WikiLayout";

export default function ${componentName}() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, []);

  const meta = ${metaContent.replace('export const meta = ', '').replace(/;\s*$/, '')};

  return (
    <WikiLayout {...meta}>
${jsxContent}
    </WikiLayout>
  );
}
`;
}

function convertMDXToJSX(mdxContent) {
  // Split into sections
  const lines = mdxContent.split('\n');
  const jsxLines = [];
  let inCodeBlock = false;
  let inList = false;

  jsxLines.push('      <div className="space-y-6">');

  let currentSection = [];
  let isFirstSection = true;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Track code blocks
    if (trimmedLine.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
    }

    // Detect section breaks (h2 headings)
    if (trimmedLine.startsWith('## ') && !inCodeBlock) {
      // Flush current section
      if (currentSection.length > 0) {
        if (!isFirstSection) {
          jsxLines.push('');
        }
        jsxLines.push('        <section>');
        jsxLines.push(...processSection(currentSection));
        jsxLines.push('        </section>');
        isFirstSection = false;
        currentSection = [];
      }
    }

    currentSection.push(line);
  }

  // Flush final section
  if (currentSection.length > 0) {
    if (!isFirstSection) {
      jsxLines.push('');
    }
    jsxLines.push('        <section>');
    jsxLines.push(...processSection(currentSection));
    jsxLines.push('        </section>');
  }

  jsxLines.push('      </div>');

  return jsxLines.join('\n');
}

function processSection(lines) {
  const result = [];
  let inCodeBlock = false;
  let codeBlockContent = [];
  let inList = false;
  let listItems = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Skip empty lines at the start
    if (!trimmedLine && result.length === 0) continue;

    // Handle code blocks
    if (trimmedLine.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockContent = [];
        continue;
      } else {
        // Close code block
        inCodeBlock = false;
        result.push('          <pre className="bg-slate-100 rounded-lg p-4 overflow-x-auto"><code>');
        result.push(codeBlockContent.map(l => '            ' + escapeHTML(l)).join('\n'));
        result.push('          </code></pre>');
        codeBlockContent = [];
        continue;
      }
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // Handle headings
    if (trimmedLine.startsWith('## ')) {
      const headingText = trimmedLine.substring(3);
      result.push(`          <h2 className="text-2xl font-bold text-slate-900 mb-4">${escapeHTML(headingText)}</h2>`);
      continue;
    }

    if (trimmedLine.startsWith('### ')) {
      const headingText = trimmedLine.substring(4);
      result.push(`          <h3 className="text-xl font-semibold text-slate-900 mb-3">${escapeHTML(headingText)}</h3>`);
      continue;
    }

    if (trimmedLine.startsWith('#### ')) {
      const headingText = trimmedLine.substring(5);
      result.push(`          <h4 className="text-lg font-semibold text-slate-900 mb-2">${escapeHTML(headingText)}</h4>`);
      continue;
    }

    // Handle lists
    if (trimmedLine.startsWith('- ') || trimmedLine.match(/^\d+\.\s/)) {
      if (!inList) {
        inList = true;
        listItems = [];
      }
      const itemText = trimmedLine.replace(/^-\s+/, '').replace(/^\d+\.\s+/, '');
      listItems.push(itemText);
      continue;
    } else if (inList && trimmedLine === '') {
      // End of list
      result.push('          <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700">');
      listItems.forEach(item => {
        result.push(`            <li>${escapeHTML(item)}</li>`);
      });
      result.push('          </ul>');
      inList = false;
      listItems = [];
      continue;
    } else if (inList && trimmedLine) {
      // Not a list item anymore
      result.push('          <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700">');
      listItems.forEach(item => {
        result.push(`            <li>${escapeHTML(item)}</li>`);
      });
      result.push('          </ul>');
      inList = false;
      listItems = [];
      // Fall through to process the current line
    }

    // Handle paragraphs
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      // Check for bold/italic
      let processedLine = trimmedLine;

      // Convert **bold** to <strong>
      processedLine = processedLine.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

      // Convert *italic* to <em>
      processedLine = processedLine.replace(/\*(.+?)\*/g, '<em>$1</em>');

      // Convert inline code
      processedLine = processedLine.replace(/`(.+?)`/g, '<code className="bg-slate-100 px-1 rounded">$1</code>');

      result.push(`          <p className="text-slate-700 mb-4">${processedLine}</p>`);
    }
  }

  // Close any open list
  if (inList) {
    result.push('          <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700">');
    listItems.forEach(item => {
      result.push(`            <li>${escapeHTML(item)}</li>`);
    });
    result.push('          </ul>');
  }

  return result;
}

function escapeHTML(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
