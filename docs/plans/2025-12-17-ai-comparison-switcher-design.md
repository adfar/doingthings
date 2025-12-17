# AI Website Comparison Switcher - Design Document

**Date:** 2025-12-17
**Goal:** Enable instant comparison of three AI-generated websites (Claude, Gemini, ChatGPT) with zero page load delays

## Overview

Create a comparison hub on the main branch that allows instant switching between three different AI-generated versions of the same website using iframes and a navbar interface.

## Architecture

### Branch Structure
- **main branch** - The comparison hub (switcher interface)
- **claude branch** - Claude's complete website
- **gemini branch** - Gemini's complete website
- **gpt branch** - GPT's complete website

### Main Branch File Structure
```
/index.html          # Switcher interface
/assets/
  /css/
    /switcher.css    # Minimal styles for the switcher UI
  /js/
    /switcher.js     # Handles switching logic
/claude.html         # Full copy of Claude's site
/gemini.html         # Full copy of Gemini's site
/gpt.html            # Full copy of GPT's site
/assets-claude/      # Claude's assets
/assets-gemini/      # Gemini's assets
/assets-gpt/         # GPT's assets
```

## User Interface

### Components

1. **Fixed Navigation Bar**
   - Position: Top of viewport
   - Height: ~50-60px
   - Contains three buttons: "Claude" | "Gemini" | "ChatGPT"
   - Active button is highlighted
   - Minimal styling to avoid interfering with iframe content

2. **Three Full-Height Iframes**
   - Each iframe loads one AI's complete website
   - Positioned below navbar, taking full remaining viewport height
   - Claude's version visible by default
   - Other two hidden with `display: none`
   - All three preload on initial page load

### User Experience Flow

1. User visits site → Claude's version displays immediately
2. User clicks "Gemini" → Instant switch (CSS toggle only)
3. User clicks "ChatGPT" → Instant switch
4. Active button always indicates current view

## Technical Implementation

### HTML Structure (index.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Website Comparison</title>
  <link rel="stylesheet" href="assets/css/switcher.css">
</head>
<body>
  <nav class="switcher-nav">
    <button data-target="claude" class="active">Claude</button>
    <button data-target="gemini">Gemini</button>
    <button data-target="gpt">ChatGPT</button>
  </nav>

  <iframe id="claude" src="claude.html" class="ai-frame active"></iframe>
  <iframe id="gemini" src="gemini.html" class="ai-frame"></iframe>
  <iframe id="gpt" src="gpt.html" class="ai-frame"></iframe>

  <script src="assets/js/switcher.js"></script>
</body>
</html>
```

### CSS Requirements (switcher.css)
- Reset body margins/padding
- Fixed navbar at top, 100% width
- Flexbox layout for buttons
- Iframes: absolute positioning, full width/height minus navbar height
- `border: none` on iframes for seamless appearance
- `.ai-frame` default state: `display: none`
- `.ai-frame.active` state: `display: block`
- Button styling with visual differentiation for `.active` state

### JavaScript Logic (switcher.js)
- Attach click event listeners to all buttons
- On button click:
  1. Remove `.active` class from all buttons
  2. Remove `.active` class from all iframes
  3. Add `.active` class to clicked button
  4. Add `.active` class to matching iframe (using data-target attribute)
- Estimated ~15 lines of code

## Setup Workflow

### Step 1: Prepare claude branch
- Copy current main branch content to claude branch
- This replaces the stub with Claude's original work

### Step 2: Set up main branch
- Create new switcher interface files
- Copy each AI's index.html to main as respective HTML files
- Reorganize assets into separate folders

### Step 3: Asset Management
- Create separate asset folders: `/assets-claude/`, `/assets-gemini/`, `/assets-gpt/`
- Update asset references in each HTML file to point to correct folder
- Maintain clean separation to avoid conflicts

### Step 4: Testing
- Open index.html in browser
- Verify all three iframes load correctly
- Test switching between versions (should be instant)
- Verify each site renders properly in iframe
- Test on different viewport sizes

## Technical Decisions

### Why Iframes?
- **Complete isolation**: Each AI's CSS and JavaScript won't conflict
- **Independent functionality**: Each site operates as if standalone
- **Instant switching**: Preloaded iframes = zero delay
- **Easy maintenance**: Each AI's work stays completely separate

### Why Separate Asset Folders?
- Prevents file conflicts between AI versions
- Clear ownership of each file
- Easy to update individual AI versions
- Maintains integrity of each AI's original work

## Success Criteria

- All three websites load and display correctly
- Switching between versions is instantaneous (< 50ms perceived delay)
- Each website functions independently without conflicts
- Active state clearly indicates which version is being viewed
- Works across modern browsers (Chrome, Firefox, Safari, Edge)
