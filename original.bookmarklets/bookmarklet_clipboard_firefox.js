javascript:(function() {

var s = window.getSelection().toString().trim().substring(0, 2000);
var t = document.title;
var u = window.location.href;

var w = window.open('about:blank', 'MDClip', 'width=600,height=500,resizable=yes,scrollbars=yes');
if (!w) {
    alert('Popup blocked — please allow popups for this site.');
    return;
}

/* Write only HTML + CSS into the popup — no <script> tag needed.
   All JS logic runs after document.close(), operating on the popup's DOM. */
w.document.write(
'<!DOCTYPE html>' +
'<html lang="en">' +
'<head>' +
'<meta charset="UTF-8">' +
'<title>Clip to Markdown</title>' +
'<style>' +
'* { margin: 0; padding: 0; box-sizing: border-box } ' +
'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; background: #f5f5f5; padding: 20px; min-width: 400px } ' +
'.container { background: #fff; border-radius: 8px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,.1); max-width: 560px } ' +
'h1 { font-size: 20px; margin-bottom: 20px; color: #333 } ' +
'.form-group { margin-bottom: 16px } ' +
'label { display: block; font-weight: 500; margin-bottom: 6px; color: #555; font-size: 14px } ' +
'input[type="text"], input[type="url"], textarea { width: 100%; padding: 10px 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; font-family: inherit } ' +
'textarea { resize: vertical; min-height: 60px } ' +
'input:focus, textarea:focus { outline: none; border-color: #5778d8; box-shadow: 0 0 0 3px rgba(87,120,216,.1) } ' +
'.button-group { display: flex; gap: 10px; margin-top: 24px } ' +
'button { flex: 1; padding: 10px 20px; border: none; border-radius: 4px; font-size: 14px; font-weight: 500; cursor: pointer; transition: background .2s } ' +
'.btn-copy { background: #27ae60; color: #fff } ' +
'.btn-copy:hover { background: #219a52 } ' +
'.btn-cancel { background: #e0e0e0; color: #333 } ' +
'.btn-cancel:hover { background: #d0d0d0 } ' +
'.note { font-size: 12px; color: #999; margin-top: 8px } ' +
'.success-flash { animation: flashGreen .6s ease-out } ' +
'@keyframes flashGreen { 0% { background: #d4edda } 100% { background: #fff } } ' +
'</style>' +
'</head>' +
'<body>' +
'<div class="container" id="mainContainer">' +
'<h1>&#x1F4CB; Clip to Markdown</h1>' +
'<div class="form-group">' +
'<label for="titleInput">Title</label>' +
'<input type="text" id="titleInput" autofocus>' +
'</div>' +
'<div class="form-group">' +
'<label for="urlInput">URL</label>' +
'<input type="url" id="urlInput" readonly>' +
'</div>' +
'<div class="form-group" id="selectionGroup" style="display:none">' +
'<label for="selectionInput">Selection</label>' +
'<textarea id="selectionInput"></textarea>' +
'<div class="note">Edit or trim as needed. Appears above the link in the copied markdown.</div>' +
'</div>' +
'<div class="button-group">' +
'<button type="button" class="btn-copy" id="btnCopy">Copy to Clipboard</button>' +
'<button type="button" class="btn-cancel" id="btnCancel">Cancel</button>' +
'</div>' +
'</div>' +
'</body>' +
'</html>'
);

w.document.close();

/* --- All JS logic below, operating on the popup window's DOM --- */

var doc = w.document;

/* Populate form fields */
doc.getElementById('titleInput').value = t;
doc.getElementById('urlInput').value = u;
doc.getElementById('selectionInput').value = s;

if (s) {
    doc.getElementById('selectionGroup').style.display = 'block';
}

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

/* Clipboard API with execCommand fallback for non-secure contexts */
function copyToClipboard(text, onSuccess, onError) {
    if (w.navigator.clipboard && w.navigator.clipboard.writeText) {
        w.navigator.clipboard.writeText(text).then(onSuccess, onError);
        return;
    }
    try {
        var ta = doc.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        doc.body.appendChild(ta);
        ta.select();
        var ok = doc.execCommand('copy');
        doc.body.removeChild(ta);
        if (ok) { onSuccess(); } else { onError(new Error('execCommand failed')); }
    } catch (e) {
        onError(e);
    }
}

function handleCopy() {
    var title = doc.getElementById('titleInput').value.trim();
    var url   = doc.getElementById('urlInput').value;
    var sel   = doc.getElementById('selectionInput').value;

    if (!title) {
        w.alert('Please enter a title.');
        return;
    }

    var md = buildMarkdown(title, url, sel);

    copyToClipboard(md, function() {
        doc.getElementById('mainContainer').className = 'container success-flash';
        w.setTimeout(function() { w.close(); }, 400);
    }, function() {
        w.alert('Auto-copy failed.');
    });
}

doc.getElementById('btnCopy').addEventListener('click', handleCopy);
doc.getElementById('btnCancel').addEventListener('click', function() { w.close(); });

})();
