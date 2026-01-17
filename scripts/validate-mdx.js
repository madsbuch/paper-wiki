#!/usr/bin/env node

/**
 * MDX Validation Script
 *
 * Validates MDX files for common syntax errors that cause runtime issues:
 * - Unescaped < and > characters (must be &lt; and &gt;)
 * - Unescaped { and } characters (must be \{ and \})
 * - Incorrect layout prop passing (must use {...meta} spread)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

// ANSI color codes
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

class MDXValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
  }

  validateFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const relPath = path.relative(projectRoot, filePath);

    console.log(`\nValidating: ${relPath}`);

    // Track if we're in a code block
    let inCodeBlock = false;
    let inFrontmatter = false;
    let codeBlockType = null;

    lines.forEach((line, index) => {
      const lineNum = index + 1;

      // Track code blocks
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeBlockType = line.trim().slice(3);
        } else {
          inCodeBlock = false;
          codeBlockType = null;
        }
        return;
      }

      // Track frontmatter
      if (line.trim() === '---') {
        inFrontmatter = !inFrontmatter;
        return;
      }

      // Skip validation inside code blocks and frontmatter
      if (inCodeBlock || inFrontmatter) {
        return;
      }

      // Skip lines that are JSX/imports/exports
      if (line.trim().startsWith('import ') ||
          line.trim().startsWith('export ') ||
          line.trim().startsWith('<') ||
          line.trim().match(/^\/\//)) {
        return;
      }

      // Check for unescaped < and > in regular text
      // Allow markdown links and already-escaped entities
      const textContent = line
        .replace(/`[^`]+`/g, '') // Remove inline code
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove markdown links
        .replace(/&lt;|&gt;|&amp;|&quot;|&apos;/g, '') // Remove already-escaped entities
        .replace(/<sup>[^<]*<\/sup>/g, '') // Remove <sup> tags
        .replace(/<sub>[^<]*<\/sub>/g, '') // Remove <sub> tags
        .replace(/<br\s*\/?>/g, ''); // Remove <br> tags

      // Check for < followed by non-tag characters (not HTML/JSX)
      const ltMatches = textContent.match(/[^&]<(?![A-Za-z/!])/g);
      if (ltMatches) {
        this.errors.push({
          file: relPath,
          line: lineNum,
          message: `Unescaped '<' character found. Use &lt; instead.`,
          snippet: line.trim()
        });
      }

      // Check for > not part of HTML entity
      const gtMatches = textContent.match(/[^&-]>(?!>)/g);
      if (gtMatches) {
        this.errors.push({
          file: relPath,
          line: lineNum,
          message: `Unescaped '>' character found. Use &gt; instead.`,
          snippet: line.trim()
        });
      }

      // Check for unescaped { and } in regular text
      // These are often used in math notation and need escaping
      const unescapedBraceOpen = line.match(/[^\\]{(?![^}]*})/);
      const unescapedBraceClose = line.match(/[^\\]}(?!.*{)/);

      // More sophisticated brace checking
      let braceDepth = 0;
      let inInlineCode = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const prevChar = i > 0 ? line[i - 1] : '';

        // Track inline code
        if (char === '`') {
          inInlineCode = !inInlineCode;
          continue;
        }

        if (inInlineCode) continue;

        // Check for unescaped braces
        if (char === '{' && prevChar !== '\\') {
          // This might be JSX - check if it looks like a JSX expression
          const restOfLine = line.slice(i);
          // If it's not clearly JSX (like {meta} or {...meta}), it's likely an error
          if (!restOfLine.match(/^{\.\.\.?\w+}/) && !restOfLine.match(/^{\s*\w+\s*}/)) {
            // Could be math notation or other text that needs escaping
            const context = line.slice(Math.max(0, i - 10), Math.min(line.length, i + 20));
            if (!line.trim().startsWith('import ') && !line.trim().startsWith('export ')) {
              this.warnings.push({
                file: relPath,
                line: lineNum,
                message: `Potentially unescaped '{' character. If this is text (not JSX), use \\{ instead.`,
                snippet: context
              });
            }
          }
        }

        if (char === '}' && prevChar !== '\\') {
          if (braceDepth === 0 && !line.trim().startsWith('import ') && !line.trim().startsWith('export ')) {
            const context = line.slice(Math.max(0, i - 10), Math.min(line.length, i + 20));
            this.warnings.push({
              file: relPath,
              line: lineNum,
              message: `Potentially unescaped '}' character. If this is text (not JSX), use \\} instead.`,
              snippet: context
            });
          }
        }
      }

      // Check for incorrect layout component usage
      if (line.match(/<(Wiki|Essay|Paper|Project)Layout\s+meta={meta}>/)) {
        this.errors.push({
          file: relPath,
          line: lineNum,
          message: `Incorrect layout usage. Use <Layout {...meta}> instead of <Layout meta={meta}>`,
          snippet: line.trim()
        });
      }
    });

    return this.errors.length === 0 && this.warnings.length === 0;
  }

  printResults() {
    console.log('\n' + BOLD + '='.repeat(80) + RESET);

    if (this.errors.length > 0) {
      console.log(`\n${RED}${BOLD}❌ ERRORS (${this.errors.length})${RESET}\n`);
      this.errors.forEach((error, i) => {
        console.log(`${BOLD}${i + 1}. ${error.file}:${error.line}${RESET}`);
        console.log(`   ${RED}${error.message}${RESET}`);
        console.log(`   ${error.snippet}\n`);
      });
    }

    if (this.warnings.length > 0) {
      console.log(`\n${YELLOW}${BOLD}⚠️  WARNINGS (${this.warnings.length})${RESET}\n`);
      this.warnings.forEach((warning, i) => {
        console.log(`${BOLD}${i + 1}. ${warning.file}:${warning.line}${RESET}`);
        console.log(`   ${YELLOW}${warning.message}${RESET}`);
        console.log(`   ${warning.snippet}\n`);
      });
    }

    console.log(BOLD + '='.repeat(80) + RESET);

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log(`\n${GREEN}${BOLD}✓ All MDX files are valid!${RESET}\n`);
      return true;
    } else {
      console.log(`\n${RED}${BOLD}✗ Found ${this.errors.length} error(s) and ${this.warnings.length} warning(s)${RESET}\n`);
      return false;
    }
  }
}

function findMdxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules') {
        findMdxFiles(filePath, fileList);
      }
    } else if (file.endsWith('.mdx')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function main() {
  const args = process.argv.slice(2);
  const validator = new MDXValidator();

  let mdxFiles;

  if (args.length > 0) {
    // Validate specific files
    mdxFiles = args.map(f => path.resolve(f));
  } else {
    // Validate all MDX files in the project
    const pagesDir = path.join(projectRoot, 'ml-wiki', 'src', 'pages');
    mdxFiles = findMdxFiles(pagesDir);
  }

  console.log(`${BOLD}MDX Validator${RESET}`);
  console.log(`Found ${mdxFiles.length} MDX file(s) to validate\n`);

  mdxFiles.forEach(file => {
    validator.validateFile(file);
  });

  const success = validator.printResults();
  process.exit(success ? 0 : 1);
}

main();
