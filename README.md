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

Vibe coding with Claude Opus 4.6 is... great, but he also sometimes needs (CS-guided) discipline, _e.g._:

> Let's try [a refactoring] because the original version is **[some of the ugliest fucking JavaScript](https://github.com/vyzed-public/ext-FF_Tab-to-OMD-paste/blob/main/original.bookmarklets/DONT_DO_THIS_bookmarklet_monster.js)** I've ever seen in my life.

* [Archive: Bookmarklet for Markdown Clipping](https://github.com/vyzed-public/ext-FF_Tab-to-OMD-paste/blob/main/archive/chats/archive_bookmarklet-for-markdown-clipping.md)

I shudder to think of what might be getting released by folks without CS backgrounds.

But -- we're through all that now (_[we got better](https://media.tenor.com/43jAja9HUwIAAAAM/monty-python.gif)_), and the code ended up properly factored.

#### TL;DR? There's a README "semi-spec" for the original bookmarklet here: 
* [README-clipboard-variant.md](https://github.com/vyzed-public/ext-FF_Tab-to-OMD-paste/blob/main/original.bookmarklets/README-clipboard-variant.md)

---

## How Tos

Useful SOPs can be pulled straight off the (now) [Closed Issues List](https://github.com/vyzed-public/ext-FF_Tab-to-OMD-paste/issues?q=is%3Aissue%20state%3Aclosed%20sort%3Acreated-asc)

---

## Installation:

### Post (personal) Release via AMO

Our extension was automatically screened and approved. 

It is now available at https://addons.mozilla.org/developers/addon/3005268/versions.

Since this was a personal submission, login may be required.  

If so, then use your own development version and submit your own personal extension.

Helpful Guidance: [guidance.AMO-submissions.errors-and-arcana.md](https://github.com/vyzed-public/ext-FF_BMM-to-OMD-paste/blob/main/docs/guidance.AMO-submissions.errors-and-arcana.md)

### For Development/Debugging:

Use Firefox Internal URI: `about:debugging#/runtime/this-firefox` to `[Load Temporary Add-On...]`

---

### Local Coding Env Notes (YMWV):

This is purely for my convenience, as I have projects scattered across wide sands of dev dirs by the 4 winds over 30+ years.

_"I... had some code... in `/tmp`"_ — Baroness Blixen
```
cd ~/my/files/local/lfs.00-Scratch/builds/from.repos/on.github/vyzed-public/ext-FF_Tab-to-OMD-paste
```

---

#### More handy (& commonly used) git tidbits (_"gitbits"?_) for the _"git-syntax/arcana-challenged"_:
Synch da local stuffz:
* `git pull && git status`
* `git pull --rebase  # WTF do I always forget this one?`

A commonly repeating feature-branch round-trip:
1. `git pull`
2. `git checkout -b fb-implement_issue-0XYZ # Tie the branch to a documented GSD issue`
3. `git add . # ...or W-dafuk I workded on.`
4. `git commit -m "Implement issue #0XYZ: My anazing (and TESTED, right?) feature."
5. `git checkout main`
6. `git merge fb-implement_issue-0XYZ`
7. `git branch -d fb-implement_issue-0008 # Unless you REALLY want to keep it?`
8. `git status`
9. `git push origin  # Unless you've been sloppy, and you need a...`
10. `git pull --rebase`
11. `git push origin  # ...because NOW you're all clean & tidy`
12. `git pull && git status # I'm a GOOD boy!`

Some frequent tag-flavored (as opposed to branch/merge) ops:
* Mocha/Latte:
  * `git tag -a v0.1.0-pre-ui-rework -m "Before popup UI rework: field reorder, label changes, Clip button"`
  * `git push origin --tags`
* Espresso:
  * `git tag round-trip-features-complete && git push origin --tags`
* Cappuccino:
  * `git tag v0.3.0-flat-parse`
  * `git push origin v0.3.0-flat-parser`
