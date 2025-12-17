# Asset Reference Verification

**Task 8: Verify Asset References in All HTML Files**
Date: 2025-12-17

## Summary

Critical conflict identified: Gemini HTML references a CSS file that does not exist.

## Asset References by File

### claude.html
- CSS: `assets/css/main.css` (line 12)
- JS: `assets/js/main.js` (line 116)

### gemini.html
- CSS: `assets/css/styles.css` (line 11) **MISSING FILE**
- JS: `assets/js/main.js` (line 87)

### gpt.html
- CSS: `assets/css/main.css` (line 12)
- JS: `assets/js/main.js` (line 116)

## Filesystem Asset Inventory

**Files that actually exist:**
- `/home/adf5092/doingthings/.worktrees/comparison-switcher/assets/css/main.css`
- `/home/adf5092/doingthings/.worktrees/comparison-switcher/assets/css/switcher.css`
- `/home/adf5092/doingthings/.worktrees/comparison-switcher/assets/js/main.js`
- `/home/adf5092/doingthings/.worktrees/comparison-switcher/assets/js/switcher.js`

**Files referenced but missing:**
- `assets/css/styles.css` (referenced by gemini.html only)

## Conflicts Detected

1. **CSS File Naming Conflict**:
   - Claude and GPT both reference `main.css` (which exists)
   - Gemini references `styles.css` (which does NOT exist)
   - This means gemini.html will fail to load any styling

2. **JavaScript Consistency**:
   - All three HTML files correctly reference `assets/js/main.js` (which exists)
   - No conflicts in JS references

## Recommendations

**Critical Fix Required:**
Gemini's reference to `styles.css` must be corrected to `main.css` to match:
1. What actually exists in the filesystem
2. What Claude and GPT are using
3. The established asset structure

**Next Steps:**
1. Update gemini.html line 11 from `styles.css` to `main.css`
2. Verify all three HTML files can load their assets correctly
3. Test that switcher can transition between all three versions

## Additional Notes

- The switcher.css and switcher.js files are present for the comparison switcher functionality
- All three HTML files share the same JavaScript file (main.js), which is good for consistency
- Once the CSS reference is fixed, all three versions will share the same base stylesheet (main.css)
