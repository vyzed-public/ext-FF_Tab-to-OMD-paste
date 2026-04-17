# #3: Discuss/Develop: Specs for the Extension

**State:** OPEN
**Author:** vyzed
**Created:** 2026-04-17T01:13:09Z

---

### Me:
What would it take to turn this into an extension with a button on the toolbar for Firefox?

### Claude:

Not much, actually. The hard parts are already done — the form UI and the markdown/clipboard logic. The main changes are about *how* you get the tab's data:

**What a Firefox extension needs:**

- `manifest.json` — declares the toolbar button, permissions, and files
- `popup.html` + `popup.js` — basically what we already have, but the form opens as the toolbar button's popup instead of an `about:blank` window
- One small `browser.tabs` call to get the active tab's title and URL
- A tiny content script (injected on demand) to grab `window.getSelection()` since the popup can't see the page's DOM directly

**What gets simpler:**

- No popup blocker issues — it's a native browser panel
- Clipboard API works reliably (extensions get `clipboardWrite` permission)
- No `document.write` — it's just a normal HTML file

**What's new:**

- You'd need to load it as a temporary extension for development (`about:debugging`) or package and sign it through AMO for permanent install

Want me to build it?
