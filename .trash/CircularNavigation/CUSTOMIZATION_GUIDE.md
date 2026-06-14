# Circular Navigation - Customization Guide

## Overview
The CSS has been refactored to be fully customizable and flexible. You can now easily change colors, sizes, positioning, and even swap buttons for image cards without breaking the layout.

## Quick Start: Customizing Variables

All customization is done through CSS custom properties (variables) at the top of `component2.css`. Simply modify these values:

### Color Customization
```css
:root {
  --cn-primary-color: #52be7f;      /* Background color */
  --cn-secondary-color: #429a67;     /* Menu item color */
  --cn-hover-color: #449e6a;         /* Menu item hover color */
  --cn-trigger-bg: #fff;             /* Button/card background */
  --cn-trigger-color: #52be7f;       /* Button/card text color */
}
```

### Size Customization
```css
:root {
  --cn-trigger-size: 4.5em;          /* Size of button/card */
  --cn-trigger-border-radius: 50%;   /* 50% = circle, 8px = rounded card */
  --cn-menu-diameter: 27em;          /* Size of circular menu */
}
```

### Animation Timing
```css
:root {
  --cn-transition-duration: 0.3s;    /* Speed of animations */
  --cn-transition-delay: 0.3s;       /* Delay before menu opens */
}
```

## Use Cases

### 1. Change Button to Rectangular Card

**In CSS (component2.css):**
```css
:root {
  --cn-trigger-size: 8em;            /* Make it rectangular: width */
  --cn-trigger-border-radius: 12px;  /* Rounded corners instead of circle */
}

.cn-button,
.cn-button-right {
  width: 8em;                        /* Width */
  height: 6em;                       /* Height (different from width) */
  padding: 1em;                      /* Add padding for content */
}
```

**In HTML (index2.html):**
```html
<button class="cn-button" id="cn-button">
  <div>
    <img src="your-image.jpg" alt="Menu" style="width:100%; height:4em; object-fit:cover; border-radius:8px;">
    <div style="margin-top:0.5em; font-size:0.7em;">Menu</div>
  </div>
</button>
```

### 2. Use Image as Trigger

**Option A: Button with Background Image**
```css
.cn-button {
  background-image: url('path/to/image.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
}
```

**Option B: Image Inside Button**
```html
<button class="cn-button" id="cn-button">
  <img src="path/to/image.jpg" alt="Menu Icon">
</button>
```
The CSS already supports this with `object-fit: cover`.

### 3. Adjust Menu Item Count and Spacing

**For 3 items in left menu:**
```css
:root {
  --cn-angle-1: -60deg;
  --cn-angle-2: 0deg;
  --cn-angle-3: 60deg;
  /* Remove angle-4 and angle-5 usage if only 3 items */
}
```

**For 7 items (wider spread):**
```css
:root {
  --cn-angle-1: -90deg;
  --cn-angle-2: -60deg;
  --cn-angle-3: -30deg;
  --cn-angle-4: 0deg;
  --cn-angle-5: 30deg;
  --cn-angle-6: 60deg;
  --cn-angle-7: 90deg;
}
```

Then add CSS for the new items:
```css
.csstransforms .opened-nav li:nth-child(6) {
  transform: rotate(var(--cn-angle-6)) skew(60deg);
  -webkit-transform: rotate(var(--cn-angle-6)) skew(60deg);
  -moz-transform: rotate(var(--cn-angle-6)) skew(60deg);
  -ms-transform: rotate(var(--cn-angle-6)) skew(60deg);
}

.csstransforms .opened-nav li:nth-child(7) {
  transform: rotate(var(--cn-angle-7)) skew(60deg);
  -webkit-transform: rotate(var(--cn-angle-7)) skew(60deg);
  -moz-transform: rotate(var(--cn-angle-7)) skew(60deg);
  -ms-transform: rotate(var(--cn-angle-7)) skew(60deg);
}
```

### 4. Change Colors for Dark Theme

```css
:root {
  --cn-primary-color: #1a1a1a;       /* Dark background */
  --cn-secondary-color: #333333;     /* Dark menu items */
  --cn-hover-color: #444444;         /* Slightly lighter on hover */
  --cn-trigger-bg: #2a2a2a;          /* Dark trigger */
  --cn-trigger-color: #ffffff;       /* White text */
}

body {
  background: var(--cn-primary-color);
  color: #ffffff;
}
```

### 5. Responsive Sizing for Mobile

```css
@media only screen and (max-width: 768px) {
  :root {
    --cn-trigger-size: 3.5em;        /* Smaller trigger */
    --cn-menu-diameter: 20em;        /* Smaller menu */
    --cn-trigger-font-size: 1.2em;   /* Smaller text */
  }
}
```

## Key Improvements Made

1. **CSS Variables**: All hardcoded values replaced with customizable variables
2. **Flexbox Container**: Component uses flexbox for automatic alignment
3. **Fixed Positioning**: Menus now use `position: fixed` for better viewport control
4. **Dynamic Sizing**: Uses `calc()` for responsive sizing based on trigger size
5. **Image Support**: Built-in support for images with `object-fit: cover`
6. **Standard Properties**: Added missing standard CSS properties for compatibility
7. **Fixed Bugs**: Corrected typos and spacing issues in right menu

## Architecture

### Container Structure
```
.component (flexbox container)
  ├── .cn-button (left trigger)
  ├── .cn-wrapper (left menu - fixed position)
  ├── .cn-button-right (right trigger)
  └── .cn-wrapper-right (right menu - fixed position)
```

### Benefits of New Architecture
- **Flexible triggers**: Works with buttons, divs, cards, images
- **No breaking on resize**: Fixed positioning prevents layout shifts
- **Easy customization**: Change one variable, update everywhere
- **Maintainable**: Clear separation of concerns with CSS variables
- **Extensible**: Easy to add new menu items or menus

## Tips

1. **Keep aspect ratio**: If changing trigger size, adjust both width and height proportionally
2. **Test angles**: Menu item angles may need adjustment based on item count
3. **Mind the gap**: Adjust `gap` in `.component` if triggers are too close/far
4. **Z-index**: Triggers are z-index 11, menus are z-index 10
5. **Transitions**: All animations use the same timing variables for consistency

## Troubleshooting

**Menu appears in wrong position:**
- Check `--cn-trigger-right-margin-left` for spacing between menus
- Adjust margins in `.cn-wrapper` and `.cn-wrapper-right`

**Trigger too small/large:**
- Modify `--cn-trigger-size`
- Update menu diameter proportionally (`--cn-menu-diameter`)

**Menu items overlap:**
- Increase angle spread in `--cn-angle-*` variables
- Reduce number of menu items

**Animations too fast/slow:**
- Adjust `--cn-transition-duration` and `--cn-transition-delay`
