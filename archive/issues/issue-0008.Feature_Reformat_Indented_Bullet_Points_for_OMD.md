# #8: Feature: Reformat Indented Bullet Points for OMD

**State:** OPEN
**Author:** vyzed
**Created:** 2026-05-09T22:19:07Z

---

#### Currently, our output OMD looks like this example:

Render this MD:
```
- Survey: Anthropic's MCP Mastery and Claude Code courses
  — [Anthropic has opened up its entire educational curriculum for free](https://www.reddit.com/r/ClaudeAI/comments/1rh92yp/anthropic_has_opened_up_its_entire_educational/)
```
...which renders an OMD-flavored  "soft" newline, with an em-dash for attribution, like this:
- Survey: Anthropic's MCP Mastery and Claude Code courses
  — [Anthropic has opened up its entire educational curriculum for free](https://www.reddit.com/r/ClaudeAI/comments/1rh92yp/anthropic_has_opened_up_its_entire_educational/)


#### After a bit of front-line usage in Obsidian, I've realized I'd like _THIS_ instead:
```
- Survey: Anthropic's MCP Mastery and Claude Code courses ^N
  - Tab: [Anthropic has opened up its entire educational curriculum for free](https://www.reddit.com/r/ClaudeAI/comments/1rh92yp/anthropic_has_opened_up_its_entire_educational/)
```
Where we INSTEAD use a standard OMD-flavored second level of indented bullet, to yield _THIS_:

- Survey: Anthropic's MCP Mastery and Claude Code courses ^N
  - Tab: [Anthropic has opened up its entire educational curriculum for free](https://www.reddit.com/r/ClaudeAI/comments/1rh92yp/anthropic_has_opened_up_its_entire_educational/)

#### ...which is _immediately_ ready for our OMD "cross-referencing via Block-IDs" workflow.

### Important Notes

1. We should use dashes `-` for our bullets, because OMD makes use of asterisks `*` for bolding, italics, etc.
2. We should comply with OMD standard specs for defining indented bullets!
   - In other words: 
     - If they use 2 spaces, we should use 2 spaces;
     - If they use 4 spaces, we should use 4 spaces.

2. 
