/* popup.js
 *
 * Controller for the popup UI.
 *
 * Wires together:
 *   - Tab data retrieval   (browser.tabs API — replaces bookmarklet's document.title / location.href)
 *   - Selection capture     (content script injection — replaces bookmarklet's getSelection)
 *   - Markdown generation   (markdown.js — escBrackets, buildMarkdown)
 *   - Clipboard write       (clipboard.js — copyToClipboard)
 *
 * Preserves the bookmarklet's handleCopy flow:
 *   1. Read form fields
 *   2. Build markdown via buildMarkdown()
 *   3. Copy via copyToClipboard()
 *   4. Flash green + close on success
 */

document.addEventListener('DOMContentLoaded', function () {

    /* --- Populate form fields from the active tab --- */

    browser.tabs.query({ active: true, currentWindow: true }).then(function (tabs) {
        var tab = tabs[0];
        if (!tab) return;

        document.getElementById('titleInput').value = tab.title || '';
        document.getElementById('urlInput').value   = tab.url   || '';

        /* Inject content script to grab selected text */
        browser.tabs.executeScript(tab.id, {
            file: '/content-script.js'
        }).then(function (results) {
            var selection = (results && results[0]) ? results[0] : '';
            if (typeof selection === 'string') {
                selection = selection.trim().substring(0, 2000);
            } else {
                selection = '';
            }
            document.getElementById('selectionInput').value = selection;
            if (selection) {
                document.getElementById('selectionGroup').style.display = 'block';
            }
        }).catch(function (err) {
            /* Selection capture may fail on privileged pages (about:*, addons.mozilla.org).
               That's fine — proceed without selection. */
            console.warn('Could not capture selection:', err.message);
        });
    });

    /* --- Copy handler (mirrors bookmarklet's handleCopy) --- */

    function handleCopy() {
        var title = document.getElementById('titleInput').value.trim();
        var url   = document.getElementById('urlInput').value;
        var sel   = document.getElementById('selectionInput').value;

        if (!title) {
            alert('Please enter a title.');
            return;
        }

        var md = buildMarkdown(title, url, sel);

        copyToClipboard(md, function () {
            document.getElementById('mainContainer').className = 'container success-flash';
            setTimeout(function () { window.close(); }, 400);
        }, function () {
            alert('Auto-copy failed.');
        });
    }

    /* --- Button handlers (mirrors bookmarklet's event listeners) --- */

    document.getElementById('btnCopy').addEventListener('click', handleCopy);
    document.getElementById('btnCancel').addEventListener('click', function () { window.close(); });
});
