# ext-FF_Tab-to-OMD-paste
Browser extension (for Firefox) to edit & bookmark Tabs into pasteable (Obsidian-style) Markdown

We previously used AI (Claude Opus 4.6) to "vibe-code" a bookmarklet to select (& edit) tab titles and generate bookmarks in Obsidian-style markdown (OMD), storing the OMD content in the system clipboard buffer, ready for pasting into an OMD (or any markdown) document.

Now we'll turn that bookmarklet into a custom personal browser extension (for Firefox).


## Background

We archived our "vibe coding" design & build/debug session here: 
* [Archive: In-Repo Issue Tracking via GitHub Actions](https://github.com/vyzed-public/optimize_GitHub_with-archived_issues-comments/blob/main/archive/chats/archive_issues-and-comments_in-repo.md)

TL;DR? There's a README "semi-spec" for the original bookmarklet here: 
* [README-clipboard-variant.md]([https://github.com/vyzed-public/optimize_GitHub_with-archived_issues-comments/blob/main/archive/chats/summary.issue-tracking_IN-repo_via-dir_docs_issues.md)](https://github.com/vyzed-public/ext-FF_Tab-to-OMD-paste/blob/main/original.bookmarklets/README-clipboard-variant.md)


## Installation:

### For Development/Debugging:

Use Firefox Internal URI:  `about:debugging#/runtime/this-firefox` to `[Load Temporary Add-On...]`
