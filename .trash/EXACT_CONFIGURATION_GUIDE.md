# 3D Animated Tile - Exact Configuration Guide

## 📋 Overview
This document provides the **exact configurations** to implement a 3D animated tile with:
- Single drop-down animation on page load
- Synchronized shadow animation during drop
- Hover effect with lift animation
- Rotated image/vector display (90°)
- Light gray color scheme
- Fixed 3D depth (no breathing animation)

---

## 🎯 Key Features

### 1. **Drop Animation (On Page Load)**
- ✅ Tile drops straight down from 150px above
- ✅ Shadow shrinks from large/distant to small/close
- ✅ Fade-in effect (opacity: 0 to 1)
- ✅ Animation plays **once** and holds final position
- ✅ Duration: 0.8 seconds
- ✅ Timing: ease-out

### 2. **3D Visual Properties**
- ✅ Isometric perspective (left and bottom faces visible)
- ✅ Fixed 3D depth (no growing/breathing)
- ✅ Light gray color scheme
- ✅ Smooth hover transitions

### 3. **Image Display**
- ✅ Rotated 90 degrees (vertical image becomes horizontal)
- ✅ Fully contained within tile boundaries
- ✅ Maintains aspect ratio

---

## 📐 Exact Configuration Values

### HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3D CSS Animated Tile</title>
    <link rel="stylesheet" href="style.css">
    <!-- Optional: Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
</head>
<body>
    <ul>
        <li>
            <a href="#">
                <img src="your-image.jpg" alt="Description">
            </a>
        </li>
    </ul>
</body>
</html>
```

---

## 🎨 CSS Configuration (Complete & Exact)

### 1. Global Reset & Font

```css
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap");

* {
  font-family: "Roboto", sans-serif;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
```

**Configuration Values:**
- Font: Roboto (Google Fonts)
- Weight: 100-900 (variable)
- Reset: All padding, margin to 0
- Box-sizing: border-box

---

### 2. Body Background

```css
body {
    background: #ccc;
}
```

**Configuration Values:**
- Background color: `#ccc` (light gray)
- **Customizable**: Change to any color you prefer

---

### 3. Container (ul) - Centering

```css
ul {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    margin: 0;
    padding: 0;
}
```

**Configuration Values:**
- Position: Absolute
- Centering method: Transform translate(-50%, -50%)
- Layout: Flexbox (for multiple tiles)
- Spacing: 0 margin, 0 padding

**Purpose:** Centers tiles on the page

---

### 4. List Item (li) - Drop Animation Container

```css
ul li {
    list-style: none;
    margin: 0 5px;
    animation: dropDownStraight 0.8s ease-out forwards;
}

@keyframes dropDownStraight {
    0% {
        transform: translateY(-150px);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}
```

**Configuration Values:**

| Property | Value | Purpose |
|----------|-------|---------|
| `list-style` | `none` | Remove bullet points |
| `margin` | `0 5px` | Horizontal spacing between tiles |
| **Animation name** | `dropDownStraight` | Keyframe reference |
| **Animation duration** | `0.8s` | Time to complete drop |
| **Animation timing** | `ease-out` | Decelerates at end |
| **Animation fill** | `forwards` | Holds final position |
| **Start position** | `translateY(-150px)` | 150px above final position |
| **Start opacity** | `0` | Invisible at start |
| **End position** | `translateY(0)` | Final resting position |
| **End opacity** | `1` | Fully visible |

**Customization Tips:**
- Increase `-150px` for higher drop (e.g., `-250px`)
- Increase `0.8s` for slower drop (e.g., `1.2s`)
- Change `ease-out` to `linear` for constant speed

---

### 5. Main Tile (a) - Front Face

```css
ul li a {
    text-decoration: none;
    display: block;
    width: 350px;
    height: 180px;
    background: #d3d3d3;
    padding-left: 20px;
    text-align: left;
    transform: rotate(-30deg) skew(25deg) translate(0, 0);
    transition: 0.5s;
    box-shadow: 2px 30px 10px rgba(0,0,0,0.5);
    animation: shadowDrop 0.8s ease-out forwards;
}

@keyframes shadowDrop {
    0% {
        box-shadow: -50px 50px 50px rgba(0,0,0,0.5);
    }
    100% {
        box-shadow: 2px 30px 10px rgba(0,0,0,0.5);
    }
}
```

**Configuration Values:**

| Property | Value | Purpose |
|----------|-------|---------|
| **Width** | `350px` | Tile width |
| **Height** | `180px` | Tile height |
| **Background** | `#d3d3d3` | Light gray color |
| **Transform (rotate)** | `-30deg` | Creates 3D perspective angle |
| **Transform (skew)** | `25deg` | Creates 3D depth illusion |
| **Transition** | `0.5s` | Smooth hover effects |
| **Initial shadow** | `2px 30px 10px rgba(0,0,0,0.5)` | Close, small shadow |
| **Start shadow** | `-50px 50px 50px rgba(0,0,0,0.5)` | Distant, large shadow |

**Shadow Animation Breakdown:**
- **X-offset**: -50px → 2px (shadow moves from left to center)
- **Y-offset**: 50px → 30px (shadow moves up closer)
- **Blur**: 50px → 10px (shadow becomes sharper)
- **Duration**: 0.8s (matches drop animation)

**Customization Tips:**
- Adjust `width` and `height` for different tile sizes
- Change `-30deg` and `25deg` for different 3D angles
- Modify `#d3d3d3` for different colors

---

### 6. Image/Vector Display

```css
ul li a img {
    width: auto;
    height: 100%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: rotate(90deg) translateX(-50%);
    transform-origin: center center;
    transition: 0.5s;
}
```

**Configuration Values:**

| Property | Value | Purpose |
|----------|-------|---------|
| **Width** | `auto` | Maintains aspect ratio |
| **Height** | `100%` | Fills tile height |
| **Position** | `absolute` | Overlays tile |
| **Left** | `50%` | Centers horizontally |
| **Transform (rotate)** | `90deg` | Rotates vertical image horizontal |
| **Transform (translateX)** | `-50%` | Centers after rotation |
| **Transform-origin** | `center center` | Rotation pivot point |

**Purpose:** 
- Rotates vertically-oriented images to fit horizontally
- Ensures full image is visible without cropping
- Centers image within tile

**Note:** The exact transform values in your current file may have additional adjustments for precise positioning based on your image dimensions.

---

### 7. Left Face (::before pseudo-element)

```css
ul li a::before {
    content: '';
    position: absolute;
    top: 3px;
    right: 100%;
    height: 100%;
    width: 5px;
    background-color: #b1b1b1;
    transition: 0.5s;
    transform: rotate(0deg) skewY(-45deg);
    transform-origin: right center;
}
```

**Configuration Values:**

| Property | Value | Purpose |
|----------|-------|---------|
| **Content** | `''` (empty) | Creates pseudo-element |
| **Position** | `absolute` | Positions relative to tile |
| **Top** | `3px` | Slight offset from top |
| **Right** | `100%` | Attached to left edge of tile |
| **Height** | `100%` | Matches tile height |
| **Width** | `5px` | Fixed depth (no animation) |
| **Background** | `#b1b1b1` | Medium gray (darker than front) |
| **Transform (skewY)** | `-45deg` | Creates angled left face |
| **Transform-origin** | `right center` | Skew from right edge |

**Purpose:** Creates the visible left side of the 3D tile

---

### 8. Bottom Face (::after pseudo-element)

```css
ul li a::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: -3px;
    height: 6px;
    width: 100%;
    background: #b1b1b1;
    transition: 0.5s;
    transform: rotate(0deg) skewX(-45deg);
}
```

**Configuration Values:**

| Property | Value | Purpose |
|----------|-------|---------|
| **Content** | `''` (empty) | Creates pseudo-element |
| **Position** | `absolute` | Positions relative to tile |
| **Bottom** | `-6px` | Positioned below tile |
| **Left** | `-3px` | Slight left offset |
| **Height** | `6px` | Fixed depth (no animation) |
| **Width** | `100%` | Matches tile width |
| **Background** | `#b1b1b1` | Medium gray (darker than front) |
| **Transform (skewX)** | `-45deg` | Creates angled bottom face |

**Purpose:** Creates the visible bottom side of the 3D tile

---

### 9. Hover Effect - Tile Lift

```css
ul li a:hover {
    transform: rotate(-30deg) skew(25deg) translate(20px, -15px);
}
```

**Configuration Values:**

| Property | Value | Purpose |
|----------|-------|---------|
| **Translate X** | `20px` | Moves right |
| **Translate Y** | `-15px` | Moves up |
| **Rotate & Skew** | Same as default | Maintains 3D angle |

**Purpose:** Creates a "lifting" effect when hovering

**Customization Tips:**
- Increase values for more dramatic lift
- Use negative X for leftward movement
- Use positive Y for downward movement

---

### 10. Hover Effect - Color Change (First Tile)

```css
ul li:hover:nth-child(1) a {
    background: #d3d3d3;
}

ul li:hover:nth-child(1) a::before {
    background: #b8b8b8;
}

ul li:hover:nth-child(1) a::after {
    background: #e0e0e0;
}
```

**Configuration Values:**

| Element | Color | Description |
|---------|-------|-------------|
| **Front face** | `#d3d3d3` | Light gray (same as default) |
| **Left face** | `#b8b8b8` | Darker gray (for depth) |
| **Bottom face** | `#e0e0e0` | Lighter gray (for depth) |

**Purpose:** 
- Maintains light gray color scheme on hover
- Creates subtle depth through shading variations
- Different shades create realistic lighting effect

**Customization for Multiple Tiles:**

For additional tiles, repeat the pattern with different colors:

```css
/* Second Tile - Blue Theme Example */
ul li:hover:nth-child(2) a {
    background: #00aced;
}
ul li:hover:nth-child(2) a::before {
    background: #097aa5;  /* Darker shade */
}
ul li:hover:nth-child(2) a::after {
    background: #53b9e0;  /* Lighter shade */
}
```

**Color Selection Tips:**
1. **Front face**: Main brand/theme color
2. **Left face (::before)**: 15-20% darker than front
3. **Bottom face (::after)**: 10-15% lighter than front

---

## 🔧 Critical Configuration Summary

### Animation Timing (Must Match)

| Element | Animation | Duration | Timing |
|---------|-----------|----------|--------|
| `ul li` | Drop down | `0.8s` | `ease-out` |
| `ul li a` | Shadow | `0.8s` | `ease-out` |

**Important:** Both animations must have the **same duration** for synchronized effect!

---

### 3D Perspective Configuration

| Property | Value | Effect |
|----------|-------|--------|
| Rotation | `-30deg` | Tilts the tile |
| Skew | `25deg` | Creates depth illusion |
| Left skew | `-45deg` | Angles left face |
| Bottom skew | `-45deg` | Angles bottom face |

**Important:** Keep these values consistent across all transform properties!

---

### Color Scheme (Light Gray Theme)

| Element | Color Code | RGB | Description |
|---------|-----------|-----|-------------|
| Body background | `#ccc` | 204,204,204 | Medium gray |
| Tile front | `#d3d3d3` | 211,211,211 | Light gray |
| Left/Bottom faces | `#b1b1b1` | 177,177,177 | Dark gray |
| Hover left face | `#b8b8b8` | 184,184,184 | Medium-dark gray |
| Hover bottom face | `#e0e0e0` | 224,224,224 | Very light gray |

---

### Shadow Configuration

| State | X-offset | Y-offset | Blur | Color |
|-------|----------|----------|------|-------|
| **Drop start** | `-50px` | `50px` | `50px` | `rgba(0,0,0,0.5)` |
| **Final/Rest** | `2px` | `30px` | `10px` | `rgba(0,0,0,0.5)` |

**Purpose:** Shadow changes from large/distant to small/close during drop

---

### Depth Configuration (Fixed - No Animation)

| Face | Width/Height | Purpose |
|------|--------------|---------|
| Left face | `5px` width | Fixed depth |
| Bottom face | `6px` height | Fixed depth |

**Note:** These values do NOT animate (no breathing effect)

---

## 📦 Quick Implementation Checklist

### Step 1: HTML Setup
- [ ] Create `index.html` with the exact structure above
- [ ] Link to `style.css`
- [ ] Add your image file (e.g., `vector.jpg`)
- [ ] Update `<img src="">` with your image filename

### Step 2: CSS Setup
- [ ] Create `style.css`
- [ ] Copy all CSS sections in order
- [ ] Ensure both animations (`dropDownStraight` and `shadowDrop`) are present
- [ ] Verify timing values match (both 0.8s)

### Step 3: Customization (Optional)
- [ ] Adjust tile dimensions (`width: 350px`, `height: 180px`)
- [ ] Modify drop height (`translateY(-150px)`)
- [ ] Change color scheme (replace gray colors)
- [ ] Adjust 3D angle (`rotate(-30deg) skew(25deg)`)

### Step 4: Testing
- [ ] Open `index.html` in browser
- [ ] Verify drop animation plays once on load
- [ ] Check shadow animates with drop
- [ ] Test hover effect (lift and stay gray)
- [ ] Refresh page to replay animation

---

## 🎨 Customization Examples

### Example 1: Higher Drop with Slower Animation

```css
ul li {
    animation: dropDownStraight 1.5s ease-out forwards;  /* Changed from 0.8s */
}

@keyframes dropDownStraight {
    0% {
        transform: translateY(-300px);  /* Changed from -150px */
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

ul li a {
    animation: shadowDrop 1.5s ease-out forwards;  /* Changed from 0.8s */
}
```

---

### Example 2: Different Color Theme (Blue)

```css
ul li a {
    background: #4a90e2;  /* Blue instead of gray */
}

ul li:hover:nth-child(1) a {
    background: #4a90e2;
}

ul li:hover:nth-child(1) a::before {
    background: #357abd;  /* Darker blue */
}

ul li:hover:nth-child(1) a::after {
    background: #6ba3e8;  /* Lighter blue */
}
```

---

### Example 3: Larger Tile

```css
ul li a {
    width: 500px;   /* Changed from 350px */
    height: 250px;  /* Changed from 180px */
}

/* Adjust pseudo-elements proportionally */
ul li a::before {
    width: 7px;  /* Changed from 5px */
}

ul li a::after {
    height: 8px;  /* Changed from 6px */
}
```

---

## ⚠️ Important Notes

### 1. Animation Synchronization
**Both animations MUST have the same duration:**
- `dropDownStraight`: 0.8s
- `shadowDrop`: 0.8s

If they don't match, the drop and shadow will be out of sync!

### 2. Transform Order Matters
Always maintain this order in transforms:
```css
transform: rotate(-30deg) skew(25deg) translate(X, Y);
```

Changing the order will produce different visual results.

### 3. Image Rotation
The image rotation is set to 90 degrees to convert vertical images to horizontal layout. If your image is already horizontal, remove or adjust the rotation:

```css
/* For horizontal images, remove rotation */
ul li a img {
    transform: translateX(-50%);  /* Remove rotate(90deg) */
}
```

### 4. Hover Colors
The current setup maintains the same gray color on hover. To change colors on hover, update the hover state values:

```css
ul li:hover:nth-child(1) a {
    background: #YOUR_COLOR;
}
```

### 5. Browser Compatibility
This uses standard CSS3 features supported by all modern browsers:
- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- Opera: ✅

---

## 🐛 Troubleshooting

### Issue: Animation plays repeatedly
**Solution:** Ensure `forwards` is in the animation property:
```css
animation: dropDownStraight 0.8s ease-out forwards;
```

### Issue: Tile drops diagonally instead of straight down
**Solution:** Verify the animation is on `ul li`, not `ul li a`:
```css
/* Correct */
ul li {
    animation: dropDownStraight 0.8s ease-out forwards;
}

/* Wrong */
ul li a {
    animation: dropDownStraight 0.8s ease-out forwards;  /* Don't do this */
}
```

### Issue: Shadow doesn't animate
**Solution:** Check that `shadowDrop` animation is applied to `ul li a` and keyframes are defined.

### Issue: Image is cut off or too small
**Solution:** Adjust the image transform values or use `object-fit: contain`:
```css
ul li a img {
    height: 100%;
    width: auto;
    object-fit: contain;
}
```

### Issue: 3D effect not visible
**Solution:** Verify all transform values are present:
- `rotate(-30deg)`
- `skew(25deg)`
- `skewY(-45deg)` for left face
- `skewX(-45deg)` for bottom face

---

## 📊 Configuration Value Reference Table

| Configuration | Property | Value | Customizable |
|---------------|----------|-------|--------------|
| **Tile Size** | width | 350px | ✅ |
| | height | 180px | ✅ |
| **Drop Animation** | duration | 0.8s | ✅ |
| | start position | -150px | ✅ |
| | timing | ease-out | ✅ |
| **3D Angle** | rotation | -30deg | ⚠️ Advanced |
| | skew | 25deg | ⚠️ Advanced |
| **Shadow** | start blur | 50px | ✅ |
| | end blur | 10px | ✅ |
| | start offset | -50px, 50px | ✅ |
| | end offset | 2px, 30px | ✅ |
| **Colors** | front | #d3d3d3 | ✅ |
| | left face | #b1b1b1 | ✅ |
| | bottom face | #b1b1b1 | ✅ |
| **3D Depth** | left width | 5px | ✅ |
| | bottom height | 6px | ✅ |
| **Hover** | translate X | 20px | ✅ |
| | translate Y | -15px | ✅ |

Legend:
- ✅ Safe to customize
- ⚠️ Advanced (affects overall 3D appearance)

---

## 📝 Complete CSS File (Copy-Paste Ready)

```css
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap");

* {
  font-family: "Roboto", sans-serif;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
    background: #ccc;
}

ul {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    margin: 0;
    padding: 0;
}

ul li {
    list-style: none;
    margin: 0 5px;
    animation: dropDownStraight 0.8s ease-out forwards;
}

@keyframes dropDownStraight {
    0% {
        transform: translateY(-150px);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

ul li a {
    text-decoration: none;
    display: block;
    width: 350px;
    height: 180px;
    background: #d3d3d3;
    padding-left: 20px;
    text-align: left;
    transform: rotate(-30deg) skew(25deg) translate(0, 0);
    transition: 0.5s;
    box-shadow: 2px 30px 10px rgba(0,0,0,0.5);
    animation: shadowDrop 0.8s ease-out forwards;
}

@keyframes shadowDrop {
    0% {
        box-shadow: -50px 50px 50px rgba(0,0,0,0.5);
    }
    100% {
        box-shadow: 2px 30px 10px rgba(0,0,0,0.5);
    }
}

ul li a img {
    width: auto;
    height: 100%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: rotate(90deg) translateX(-50%);
    transform-origin: center center;
    transition: 0.5s;
}

ul li a::before {
    content: '';
    position: absolute;
    top: 3px;
    right: 100%;
    height: 100%;
    width: 5px;
    background-color: #b1b1b1;
    transition: 0.5s;
    transform: rotate(0deg) skewY(-45deg);
    transform-origin: right center;
}

ul li a::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: -3px;
    height: 6px;
    width: 100%;
    background: #b1b1b1;
    transition: 0.5s;
    transform: rotate(0deg) skewX(-45deg);
}

ul li a:hover {
    transform: rotate(-30deg) skew(25deg) translate(20px, -15px);
}

ul li:hover:nth-child(1) a {
    background: #d3d3d3;
}

ul li:hover:nth-child(1) a::before {
    background: #b8b8b8;
}

ul li:hover:nth-child(1) a::after {
    background: #e0e0e0;
}
```

---

## 🎯 Summary

This configuration creates:
1. **Single drop animation** (0.8s) on page load
2. **Synchronized shadow animation** during drop
3. **Fixed 3D perspective** (no breathing/growing)
4. **Rotated image display** (90° for vertical images)
5. **Light gray color scheme**
6. **Smooth hover lift effect**

**Key Points:**
- Animation plays **once** per page load
- Both animations are **synchronized** (0.8s)
- 3D depth is **fixed** (no animation)
- Colors stay **light gray** on hover
- Image is **rotated 90°** and fully visible

---

**Created:** December 8, 2025  
**Version:** 1.0  
**For:** Single 3D tile with drop animation
