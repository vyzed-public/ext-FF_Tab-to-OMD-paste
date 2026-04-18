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
 * Format C - Em-Dash Attribution:
 *
 *   With selection:
 *     selected text
 *     — [Title](url)
 *
 *   Without selection (? placeholder prompts user to add context):
 *     ?
 *     — [Title](url)
 */
function buildMarkdown(title, url, selection) {
    var clean = title.trim();
    if (!clean) clean = 'Untitled';
    var link = '— [' + escBrackets(clean) + '](' + url + ')';
    var text = selection ? selection : '?';
    return text + '\n' + link;
}
