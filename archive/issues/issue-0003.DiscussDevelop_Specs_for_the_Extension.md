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

---

### Me:
Please explain both: 
1. "temporary extension for development (about:debugging)" 
2. "package and sign it through AMO for permanent install"
Keeping in mind that I've never deployed a browser extension.

### Claude:

**1. Temporary extension via `about:debugging`**

This is Firefox's developer mode. You navigate to `about:debugging#/runtime/this-firefox`, click "Load Temporary Add-on...", and select any file from your extension folder (usually `manifest.json`). Firefox loads it immediately — the toolbar button appears, everything works. The catch: it disappears when you close Firefox. Every time you restart the browser, you have to go back to `about:debugging` and load it again. That's fine for development and testing, but annoying for daily use.

**2. Packaging and signing through AMO**

AMO is addons.mozilla.org — Mozilla's official extension marketplace. "Signing" means Mozilla cryptographically stamps your extension so Firefox trusts it. This is required for permanent installation in standard Firefox. The process goes roughly like this:

- You zip up your extension files
- Create a free account on addons.mozilla.org
- Upload the zip
- Choose whether to list it publicly (anyone can find and install it) or keep it unlisted (only people with the direct link can install it — good for personal tools like this)
- Mozilla runs automated checks and signs it (usually takes seconds to minutes for simple extensions)
- You download the signed `.xpi` file
- Double-click it or drag it into Firefox — it installs permanently, survives restarts, updates normally

For a personal tool like this, "unlisted" is what you'd want. You're not publishing to the world, you just need Mozilla to sign it so Firefox will keep it installed. Once signed, you can also share the `.xpi` with anyone else who wants it.

There's a third option worth mentioning: **Firefox Developer Edition** and **Firefox Nightly** allow permanently installing unsigned extensions by setting `xpinstall.signatures.required` to `false` in `about:config`. Standard Firefox doesn't allow this. If you happen to use Developer Edition, this skips the AMO step entirely.
