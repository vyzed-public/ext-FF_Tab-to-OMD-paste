# ext-FF_Tab-to-OMD-paste
Browser extension (for Firefox) to edit & bookmark Tabs into pasteable (Obsidian-style) Markdown

We previously used AI (Claude Opus 4.6) to ["vibe-code" a bookmarklet](https://github.com/vyzed-public/ext-FF_Tab-to-OMD-paste/blob/main/archive/chats/archive_bookmarklet-for-markdown-clipping.md) to select (& edit) tab titles and generate bookmarks in Obsidian-style markdown (OMD), storing the OMD content in the system clipboard buffer, ready for pasting into an OMD (or any markdown) document. This bookmarklet was not released as a project.

Now we'll turn that bookmarklet into a custom personal browser extension (for Firefox), with the help, once again, of Claude Opus 4.6.


## Basic Functionality:

If a user is on a tab, and they click the extension button;

...it will perform the basic functionaloty of the original bookmarklet, and:
1. Generate a clickable link in markdown, with the title of the active tab, subject to length limitations (discussed below).
2. If any text on the tab page has been selected by the user, we should generate an initial markdown section, using the selected text, followed by a new line with the clickable link in markdown, with the title of the active tab, subject to length limitations (discussed below).
3. We want to avoid subtle bugs that can arise from implicit URL encodin, which can generate a surprising amount of extraneous characters that end up exceeding safe string limits.  This behavior hs already been encoded into the bookmarklet. 
4. We want to place the generated text into the system buffer, ready to be pasted into any markdown editor.

---

## Background

The first attempts at _"vibe-coding"_ the bookmarklet were... _interesting_:

> Let's try it because the original version is **[some of the ugliest fucking JavaScript](https://github.com/vyzed-public/ext-FF_Tab-to-OMD-paste/blob/main/original.bookmarklets/DONT_DO_THIS_bookmarklet_monster.js)** I've ever seen in my life.

* [Archive: Bookmarklet for Markdown Clipping](https://github.com/vyzed-public/ext-FF_Tab-to-OMD-paste/blob/main/archive/chats/archive_bookmarklet-for-markdown-clipping.md)

But -- we're through all that now (_[we got better](https://media.tenor.com/43jAja9HUwIAAAAM/monty-python.gif)_), and the code ended up properly factored.

#### TL;DR? There's a README "semi-spec" for the original bookmarklet here: 
* [README-clipboard-variant.md](https://github.com/vyzed-public/ext-FF_Tab-to-OMD-paste/blob/main/original.bookmarklets/README-clipboard-variant.md)

---

## How Tos

Useful SOPs can be pulled straight off the (now) [Closed Issues List](https://github.com/vyzed-public/ext-FF_Tab-to-OMD-paste/issues?q=is%3Aissue%20state%3Aclosed%20sort%3Acreated-asc)

---
## Installation:

### For Development/Debugging:

Use Firefox Internal URI:  `about:debugging#/runtime/this-firefox` to `[Load Temporary Add-On...]`
