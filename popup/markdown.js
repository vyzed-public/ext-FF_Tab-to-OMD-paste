/* markdown.js
 *
 * Pure functions for building Obsidian-style Markdown from tab data.
 * Ported directly from the bookmarklet's factored logic.
 */

/* Escape square brackets so they don't break markdown link syntax */
function escBrackets(str) {
    return str.replace(/\[/g, '\\[').replace(/\]/g, '\\]');
}

/*
 * Format A - Blockquote + Link:
 *   > selected text
 *
 *   [Title](url)
 *
 * Format B - Plain + Link (current):
 *   selected text
 *
 *   [Title](url)
 *
 * Format C - Em-Dash Attribution:
 *   selected text
 *   — [Title](url)
 */
function buildMarkdown(title, url, selection) {
    var clean = title.trim();
    if (!clean) clean = 'Untitled';
    var link = '[' + escBrackets(clean) + '](' + url + ')';
    if (!selection) return link;
    return selection + '\n\n' + link;
}
