# Clip to Markdown — Clipboard Bookmarklet

## What It Does

A Firefox bookmarklet that captures the current tab's title and URL (and optionally selected text), formats it as Markdown, and copies it to the system clipboard.

**Completely standalone.** No servers, no external files, no dependencies. One bookmark — that's it.

## Installation

1. In Firefox, right-click the **Bookmarks Toolbar** → **Add Bookmark...**
2. Set **Name** to something like `📋 Clip MD`
3. In the **URL** field, paste the entire contents of `bookmarklet_clipboard_firefox.js`
4. Click **Save**

## Usage

### Link only (no selection)

1. Navigate to any page
2. Click the bookmarklet
3. Review/edit the title in the popup
4. Click **Copy to Clipboard**
5. Paste

**Result:**
```markdown
[Page Title](https://example.com/some/page)
```

### With text selection — plain selection + link

1. Select some text on the page
2. Click the bookmarklet
3. Review/edit the title and selection
4. Click **Copy to Clipboard**
5. Paste

**Result:**
```markdown
The selected text appears here as plain text.

[Page Title](https://example.com/some/page)
```

---

## Output Format Options

The current implementation uses **Format B** (plain selection + link). Two alternatives can be swapped in by editing the `buildMarkdown()` function inside the bookmarklet source.

### Format A — Blockquote + Link

```markdown
> Selected text as a blockquote.

[Page Title](https://example.com)
```

Academic, reference-style. Visually separates the excerpt from the attribution. Change `buildMarkdown()` to blockquote each line with `"> "` prefix.

### Format B — Plain Selection + Link (current)

```markdown
Selected text without blockquote formatting.

[Page Title](https://example.com)
```

Clean, minimal. The selection appears as-is above the link.

### Format C — Em-Dash Attribution

```markdown
Selected text without blockquote formatting.
— [Page Title](https://example.com)
```

Literary, citation-style. Change `buildMarkdown()` to return `selection + '\n— ' + link`.

---

## How It Works

The bookmarklet captures `document.title`, `location.href`, and `getSelection()`, opens an `about:blank` popup, and writes only HTML + CSS into it via `document.write()`. All JavaScript logic (form population, markdown generation, clipboard copy) then runs as real code operating on the popup's DOM — no `<script>` tags inside the HTML string, no escaped-strings-inside-strings. No URL parameters, no server calls, no external files.

## Known Limitations

| Limitation | Notes |
|------------|-------|
| Selection capped at 2000 chars | Prevents oversized data transfer to the popup |
| Popup may be blocked | Firefox shows an alert with instructions if so |
| `window.close()` behavior | Works because the popup was opened by the bookmarklet |
| Bookmarklet size (~5 KB) | Well within Firefox's ~65 KB limit |

---

Last Updated: 2026-03-21
