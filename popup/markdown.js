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
 * Obsidian Nested Bullet Format:
 *
 *   With selection:
 *     - selected text
 *         - Tab: [Title](url)
 *
 *   Without selection (? placeholder prompts user to add context):
 *     - ?
 *         - Tab: [Title](url)
 *
 *   Uses standard OMD nested bullet format with 4-space indent.
 *   The "Tab:" prefix identifies the bookmark source.
 *   Trailing newline creates a blank line buffer for easier sequential pasting.
 */
function buildMarkdown(title, url, selection) {
    var clean = title.trim();
    if (!clean) clean = 'Untitled';
    var link = '    - Tab: [' + escBrackets(clean) + '](' + url + ')';
    var text = selection ? selection : '?';
    return '- ' + text + ' ^N\n' + link + '\n';
}
