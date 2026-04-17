/* content-script.js
 *
 * Injected into the active tab to capture selected text.
 * Returns the selection (trimmed, capped at 2000 chars) to the caller.
 *
 * This is the extension equivalent of the bookmarklet's:
 *   var s = window.getSelection().toString().trim().substring(0, 2000);
 */

(function () {
    var selection = window.getSelection().toString().trim().substring(0, 2000);
    return selection;
})();
