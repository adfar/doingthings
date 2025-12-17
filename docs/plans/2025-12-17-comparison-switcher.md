# AI Website Comparison Switcher Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create an instant-switching comparison interface that allows users to view and compare three AI-generated versions of the same website with zero page load delays.

**Architecture:** Uses a fixed navbar with three buttons that toggle visibility of three preloaded iframes, each containing a complete AI-generated website. Main branch serves as the comparison hub, while claude/gemini/gpt branches contain isolated AI work.

**Tech Stack:** Vanilla HTML, CSS, JavaScript (no frameworks), Git branches for version isolation

---

## Task 1: Populate Claude Branch with Original Work

**Files:**
- Modify: N/A (branch operations only)

**Step 1: Switch to claude branch**

```bash
cd /home/adf5092/doingthings
git checkout claude
```

Expected: "Switched to branch 'claude'"

**Step 2: Merge main branch content into claude**

```bash
git merge main --no-edit
```

Expected: Fast-forward merge bringing index.html and assets/

**Step 3: Verify claude branch has content**

```bash
ls -la
```

Expected: See index.html, assets/, docs/, .gitignore

**Step 4: Push claude branch**

```bash
git push origin claude
```

Expected: Branch pushed successfully

**Step 5: Return to worktree**

```bash
cd /home/adf5092/doingthings/.worktrees/comparison-switcher
```

Expected: Back in feature branch worktree

**Step 6: Commit tracking note**

```bash
git commit --allow-empty -m "chore: populated claude branch with original work"
```

---

## Task 2: Create Switcher CSS File

**Files:**
- Create: `assets/css/switcher.css`

**Step 1: Create switcher CSS with complete styles**

```css
/* Reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overflow: hidden;
}

/* Navigation bar */
.switcher-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #1a1a1a;
  border-bottom: 2px solid #333;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  z-index: 1000;
}

.switcher-nav button {
  height: 60px;
  padding: 0 32px;
  background: transparent;
  border: none;
  border-right: 1px solid #333;
  color: #888;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.switcher-nav button:last-child {
  border-right: none;
}

.switcher-nav button:hover {
  background: #252525;
  color: #fff;
}

.switcher-nav button.active {
  background: #333;
  color: #fff;
  border-bottom: 3px solid #4a9eff;
}

/* Iframes */
.ai-frame {
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: calc(100vh - 60px);
  border: none;
  display: none;
}

.ai-frame.active {
  display: block;
}
```

**Step 2: Verify file created**

```bash
cat assets/css/switcher.css | head -20
```

Expected: See CSS content

**Step 3: Commit**

```bash
git add assets/css/switcher.css
git commit -m "feat: add switcher CSS with navbar and iframe styles"
```

---

## Task 3: Create Switcher JavaScript File

**Files:**
- Create: `assets/js/switcher.js`

**Step 1: Write switcher JavaScript**

```javascript
// AI Website Switcher
// Handles instant switching between three AI-generated website versions

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const buttons = document.querySelectorAll('.switcher-nav button');

    buttons.forEach(button => {
      button.addEventListener('click', handleSwitch);
    });
  }

  function handleSwitch(event) {
    const targetId = event.currentTarget.dataset.target;

    // Remove active class from all buttons
    document.querySelectorAll('.switcher-nav button').forEach(btn => {
      btn.classList.remove('active');
    });

    // Remove active class from all iframes
    document.querySelectorAll('.ai-frame').forEach(frame => {
      frame.classList.remove('active');
    });

    // Add active class to clicked button
    event.currentTarget.classList.add('active');

    // Add active class to corresponding iframe
    const targetFrame = document.getElementById(targetId);
    if (targetFrame) {
      targetFrame.classList.add('active');
    }
  }
})();
```

**Step 2: Verify file created**

```bash
cat assets/js/switcher.js | head -10
```

Expected: See JavaScript content

**Step 3: Commit**

```bash
git add assets/js/switcher.js
git commit -m "feat: add switcher JavaScript for instant view switching"
```

---

## Task 4: Create New Switcher Index Page

**Files:**
- Modify: `index.html` (will be completely replaced)

**Step 1: Back up current index.html**

```bash
cp index.html index-backup.html
```

**Step 2: Write new switcher index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Website Comparison | Start Doing Things</title>
  <meta name="description" content="Compare three AI-generated versions of the Start Doing Things website">
  <link rel="stylesheet" href="assets/css/switcher.css">
</head>
<body>
  <nav class="switcher-nav" role="navigation" aria-label="AI version switcher">
    <button data-target="claude" class="active" aria-label="View Claude's version">
      Claude
    </button>
    <button data-target="gemini" aria-label="View Gemini's version">
      Gemini
    </button>
    <button data-target="gpt" aria-label="View ChatGPT's version">
      ChatGPT
    </button>
  </nav>

  <iframe
    id="claude"
    src="claude.html"
    class="ai-frame active"
    title="Claude's website version"
    loading="eager">
  </iframe>

  <iframe
    id="gemini"
    src="gemini.html"
    class="ai-frame"
    title="Gemini's website version"
    loading="eager">
  </iframe>

  <iframe
    id="gpt"
    src="gpt.html"
    class="ai-frame"
    title="ChatGPT's website version"
    loading="eager">
  </iframe>

  <script src="assets/js/switcher.js"></script>
</body>
</html>
```

**Step 3: Verify new index.html**

```bash
cat index.html | grep -E "(claude|gemini|gpt)"
```

Expected: See three iframe references

**Step 4: Commit**

```bash
git add index.html
git commit -m "feat: replace index.html with switcher interface"
```

---

## Task 5: Create Claude's Website File

**Files:**
- Create: `claude.html`

**Step 1: Copy content from backup**

```bash
cp index-backup.html claude.html
```

**Step 2: Verify claude.html exists**

```bash
ls -lh claude.html
```

Expected: File exists, ~5KB

**Step 3: Commit**

```bash
git add claude.html
git commit -m "feat: add claude.html with original website content"
```

**Step 4: Remove backup file**

```bash
rm index-backup.html
```

---

## Task 6: Fetch and Create Gemini's Website File

**Files:**
- Create: `gemini.html`

**Step 1: Show content from gemini branch**

```bash
git show gemini:index.html > gemini.html
```

Expected: File created with gemini's content

**Step 2: Verify gemini.html exists**

```bash
ls -lh gemini.html
```

Expected: File exists with content

**Step 3: Commit**

```bash
git add gemini.html
git commit -m "feat: add gemini.html from gemini branch"
```

---

## Task 7: Fetch and Create GPT's Website File

**Files:**
- Create: `gpt.html`

**Step 1: Show content from gpt branch**

```bash
git show gpt:index.html > gpt.html
```

Expected: File created with gpt's content

**Step 2: Verify gpt.html exists**

```bash
ls -lh gpt.html
```

Expected: File exists with content

**Step 3: Commit**

```bash
git add gpt.html
git commit -m "feat: add gpt.html from gpt branch"
```

---

## Task 8: Verify Asset References in All HTML Files

**Files:**
- Read: `claude.html`
- Read: `gemini.html`
- Read: `gpt.html`

**Step 1: Check Claude's asset references**

```bash
grep -n 'assets/' claude.html
```

Expected: See references to assets/css/main.css and assets/js/main.js

**Step 2: Check Gemini's asset references**

```bash
grep -n 'assets/' gemini.html
```

Expected: See references to assets/ (note any differences)

**Step 3: Check GPT's asset references**

```bash
grep -n 'assets/' gpt.html
```

Expected: See references to assets/ (note any differences)

**Step 4: Document findings**

If all three use the same `/assets/` path structure:
- No changes needed (they'll share assets)
- This is fine if their CSS/JS doesn't conflict

If they use different paths:
- Will need to create separate asset folders in next task

**Step 5: Commit tracking note**

```bash
git commit --allow-empty -m "chore: verified asset references in all HTML files"
```

---

## Task 9: Test Switcher Interface Locally

**Files:**
- Test: All created files

**Step 1: Start local server**

```bash
python3 -m http.server 8000
```

Expected: Server starts on port 8000

**Step 2: Manual testing checklist**

Open browser to `http://localhost:8000`:

- [ ] Page loads with navbar visible
- [ ] Claude's version displays by default
- [ ] Claude button shows as active
- [ ] Click "Gemini" button → switches instantly (no page reload)
- [ ] Gemini button shows as active
- [ ] Click "ChatGPT" button → switches instantly
- [ ] ChatGPT button shows as active
- [ ] Click "Claude" button → returns to Claude's version
- [ ] All three websites render correctly in iframes
- [ ] No console errors (open browser DevTools)

**Step 3: Stop server**

Press Ctrl+C to stop the server

**Step 4: Document test results**

```bash
git commit --allow-empty -m "test: verified switcher interface works correctly

- All three versions load
- Switching is instant
- Active states work correctly
- No console errors"
```

---

## Task 10: Handle Asset Conflicts (If Needed)

**Note:** Only complete this task if Step 4 of Task 8 revealed conflicting asset paths or if testing in Task 9 revealed styling issues.

**Files:**
- Potentially create: `assets-claude/`, `assets-gemini/`, `assets-gpt/`
- Potentially modify: `claude.html`, `gemini.html`, `gpt.html`

**Step 1: Check if assets conflict**

If testing showed:
- CSS from different versions conflicting
- Missing styles/images for some versions
- JavaScript errors from shared assets

Then proceed with these steps. Otherwise skip to Task 11.

**Step 2: Create separate asset folders**

```bash
mkdir -p assets-claude assets-gemini assets-gpt
```

**Step 3: Copy Claude's assets**

```bash
cp -r assets/* assets-claude/
```

**Step 4: Copy Gemini's assets from branch**

```bash
git show gemini:assets/css/main.css > assets-gemini/css/main.css
git show gemini:assets/js/main.js > assets-gemini/js/main.js
# Repeat for all asset files
```

**Step 5: Copy GPT's assets from branch**

```bash
git show gpt:assets/css/main.css > assets-gpt/css/main.css
git show gpt:assets/js/main.js > assets-gpt/js/main.js
# Repeat for all asset files
```

**Step 6: Update asset references in claude.html**

```bash
sed -i 's|assets/|assets-claude/|g' claude.html
```

**Step 7: Update asset references in gemini.html**

```bash
sed -i 's|assets/|assets-gemini/|g' gemini.html
```

**Step 8: Update asset references in gpt.html**

```bash
sed -i 's|assets/|assets-gpt/|g' gpt.html
```

**Step 9: Retest locally**

Repeat Task 9 testing steps to verify no conflicts

**Step 10: Commit**

```bash
git add assets-claude/ assets-gemini/ assets-gpt/ claude.html gemini.html gpt.html
git commit -m "fix: separate asset folders to prevent conflicts between AI versions"
```

---

## Task 11: Final Verification and Cleanup

**Files:**
- Verify: All project files

**Step 1: Check git status**

```bash
git status
```

Expected: Clean working tree or only untracked files from testing

**Step 2: Verify all required files exist**

```bash
ls -1 index.html claude.html gemini.html gpt.html assets/css/switcher.css assets/js/switcher.js
```

Expected: All files listed

**Step 3: Run final visual test**

```bash
python3 -m http.server 8000
```

Go through complete test checklist from Task 9

**Step 4: Stop server and commit completion note**

```bash
git commit --allow-empty -m "chore: final verification complete, switcher ready"
```

**Step 5: Review commit history**

```bash
git log --oneline
```

Expected: See all commits from this implementation

---

## Task 12: Merge to Main and Deploy

**Files:**
- Branch operations only

**Step 1: Switch to main branch**

```bash
cd /home/adf5092/doingthings
git checkout main
```

**Step 2: Merge feature branch**

```bash
git merge feature/comparison-switcher --no-edit
```

Expected: Fast-forward merge or merge commit created

**Step 3: Push to remote**

```bash
git push origin main
```

Expected: Main branch updated on remote

**Step 4: Clean up feature branch (optional)**

Reference: @superpowers:finishing-a-development-branch for complete cleanup workflow

**Step 5: Test deployed version**

If site is deployed, visit production URL and verify switcher works

---

## Success Criteria

- [ ] All three AI versions load correctly in iframes
- [ ] Switching between versions is instant (< 50ms)
- [ ] Active button state correctly indicates current view
- [ ] No console errors in browser DevTools
- [ ] All websites render properly within iframes
- [ ] Navbar is accessible and keyboard-navigable
- [ ] Works in Chrome, Firefox, Safari, Edge
- [ ] Mobile responsive (navbar adapts to small screens)

## Notes for Engineer

- **DRY principle**: Don't duplicate code; the switcher.js is minimal and reusable
- **YAGNI principle**: We're not adding localStorage, URL routing, or analytics yet
- **TDD note**: This is primarily frontend UI work, so manual testing is appropriate
- **Frequent commits**: Each task should result in at least one commit
- **Asset handling**: Only create separate asset folders if conflicts are detected during testing

## Rollback Plan

If issues arise after deployment:

1. Revert main branch: `git revert HEAD`
2. Or restore previous version: `git checkout <previous-commit> index.html`
3. Push fix: `git push origin main`
