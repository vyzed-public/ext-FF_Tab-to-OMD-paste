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
Like this:
- Survey: Anthropic's MCP Mastery and Claude Code courses
  — [Anthropic has opened up its entire educational curriculum for free](https://www.reddit.com/r/ClaudeAI/comments/1rh92yp/anthropic_has_opened_up_its_entire_educational/)


#### After a bit of front-line usage in Obsidian, I've realized I'd like _THIS_ instead:
```
- Survey: Anthropic's MCP Mastery and Claude Code courses
  - Tag: [Anthropic has opened up its entire educational curriculum for free](https://www.reddit.com/r/ClaudeAI/comments/1rh92yp/anthropic_has_opened_up_its_entire_educational/)
```
To yield _THIS_:

- Survey: Anthropic's MCP Mastery and Claude Code courses
  - Tag: [Anthropic has opened up its entire educational curriculum for free](https://www.reddit.com/r/ClaudeAI/comments/1rh92yp/anthropic_has_opened_up_its_entire_educational/)

