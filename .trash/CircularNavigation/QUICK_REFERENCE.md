# Quick Reference: Making Adjustments Without Breaking

## ✅ SAFE Changes (Won't Break Layout)

### Change Colors
```css
:root {
  --cn-primary-color: #yourcolor;
  --cn-secondary-color: #yourcolor;
  --cn-hover-color: #yourcolor;
}
```

### Change Button to Card
```css
:root {
  --cn-trigger-border-radius: 12px;  /* Instead of 50% */
}

.cn-button, .cn-button-right {
  width: 8em;   /* Make it rectangular */
  height: 6em;  /* Different height */
}
```

### Change Button to Image
**HTML:**
```html
<button class="cn-button" id="cn-button">
  <img src="your-image.jpg" alt="Menu">
</button>
```

**CSS already handles this!** No changes needed.

### Adjust Animation Speed
```css
:root {
  --cn-transition-duration: 0.5s;  /* Slower */
  --cn-transition-delay: 0.1s;     /* Less delay */
}
```

### Add More Menu Items
1. Add `<li>` in HTML
2. Add angle variable:
```css
:root {
  --cn-angle-6: 90deg;
}
```
3. Add CSS rule:
```css
.csstransforms .opened-nav li:nth-child(6) {
  transform: rotate(var(--cn-angle-6)) skew(60deg);
  -webkit-transform: rotate(var(--cn-angle-6)) skew(60deg);
  -moz-transform: rotate(var(--cn-angle-6)) skew(60deg);
  -ms-transform: rotate(var(--cn-angle-6)) skew(60deg);
}
```

## ⚠️ CAREFUL Changes (Test These)

### Resize Entire Menu
```css
:root {
  --cn-trigger-size: 6em;      /* Bigger trigger */
  --cn-menu-diameter: 32em;    /* Bigger menu (proportional) */
}
```
**Rule of thumb:** menu-diameter ≈ trigger-size × 6

### Reposition Menus
```css
:root {
  --cn-trigger-right-margin-left: 10em;  /* More space between menus */
}
```

## 🚫 DON'T Change These (Advanced Only)

- Transform values (`skew`, `rotate` in item positioning)
- Wrapper positioning calculations
- Pointer-events settings
- Z-index hierarchy

## Common Patterns

### Pattern 1: Profile Menu
```css
:root {
  --cn-trigger-size: 5em;
  --cn-trigger-border-radius: 50%;
}
```
```html
<button class="cn-button" id="cn-button">
  <img src="profile.jpg" style="border-radius: 50%;">
</button>
```

### Pattern 2: Category Card
```css
:root {
  --cn-trigger-border-radius: 8px;
}

.cn-button {
  width: 10em;
  height: 8em;
  flex-direction: column;
  gap: 0.5em;
}
```
```html
<button class="cn-button" id="cn-button">
  <div style="font-size: 2em;">📦</div>
  <div style="font-size: 0.6em;">PRODUCTS</div>
</button>
```

### Pattern 3: Icon Button
```css
:root {
  --cn-trigger-size: 4em;
  --cn-trigger-font-size: 2em;
}
```
```html
<button class="cn-button" id="cn-button">☰</button>
```

## Testing Checklist

After making changes, test:
- [ ] Trigger appears correctly
- [ ] Menu opens on hover
- [ ] Menu closes when mouse leaves
- [ ] Items don't overlap
- [ ] Works on mobile/tablet sizes
- [ ] Both left and right menus work
- [ ] No console errors

## File Structure

```
CircularNavigation/
├── index2.html                 (Original demo)
├── index-examples.html         (New examples file)
├── CUSTOMIZATION_GUIDE.md      (Detailed guide)
├── QUICK_REFERENCE.md          (This file)
├── css/
│   ├── component2.css          (Main styles - now with CSS variables)
│   ├── custom-config.css       (Your custom overrides)
│   ├── demo.css
│   └── normalize.css
└── js/
    ├── demo2.js
    ├── polyfills.js
    └── modernizr-2.6.2.min.js
```

## How to Use custom-config.css

1. Copy `custom-config.css` to `my-config.css`
2. Edit values in `my-config.css`
3. Add to HTML after component2.css:
```html
<link rel="stylesheet" href="css/component2.css" />
<link rel="stylesheet" href="css/my-config.css" />
```

This way you keep original intact and can revert easily!
