# #2: Archive: Initial "vibe-coding" session (to produce initial delivered version)

**State:** CLOSED
**Author:** vyzed
**Created:** 2026-04-17T00:12:45Z
**Closed:** 2026-04-18T05:14:27Z

---

### Here are our '"vibe-coding" sessions: 
* First we created a bookmarklet, [Archive: Bookmarklet for Markdown Clipping](https://github.com/vyzed-public/ext-FF_Tab-to-OMD-paste/blob/main/archive/chats/archive_bookmarklet-for-markdown-clipping.md)...
* Next, we turned the bookmarklet into an extension:

...which we produced with the help of this awesome prompt: 
* [prompt_archive-this-conversation.md](https://github.com/vyzed-public/optimize_GitHub_with-archived_issues-comments/blob/main/archive/chats/prompt_archive-this-conversation.md)

...for Claude -- designed by... (you guessed it) Claude himself:

### Usage Notes

#### Method 1 (old-school) direct file upload:
1. Download the prompt file, and upload it to the Web UI; 
2. Place this prompt at or near the **end** of the conversation you want to archive.
```
Archive this conversation per the uploaded prompt, 
using a BASENAME spec of: `archive_my-super-cool-topic`
```

#### Method 2: The Cool-Kid (or... lazy-ass, errrr. I mean: _efficient_) approach:
NB: You may ruin into BS-ish "rate limiting errors" with this approach.
```
Using the prompt at this URL: 
https://github.com/vyzed-public/optimize_GitHub_with-archived_issues-comments/blob/main/archive/chats/prompt_archive-this-conversation.md

...and a BASENAME spec of: `archive_my-super-cool-topic`;

...please archive this conversation per the spec in the prompt.
```
---

### _"Level-Ups"_
- **Archive before forking.** If you're about to edit an earlier message to
  create a branch, drop this prompt first — once you fork, the current
  branch's images and context may become inaccessible.
- **Archive early, curate later.** Capture everything faithfully now; trim
  what you don't need with a markdown editor afterward.
