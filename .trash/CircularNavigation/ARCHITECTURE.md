# Visual Architecture Guide

## Component Structure

```
┌─────────────────────────────────────────────────────────────┐
│                    .component (Flexbox)                      │
│  display: flex; align-items: flex-end; gap: [calculated]    │
│                                                              │
│  ┌──────────┐         ┌──────────────┐        ┌──────────┐ │
│  │          │         │              │        │          │ │
│  │  LEFT    │         │   CONTENT    │        │  RIGHT   │ │
│  │ TRIGGER  │         │     AREA     │        │ TRIGGER  │ │
│  │          │         │              │        │          │ │
│  └──────────┘         └──────────────┘        └──────────┘ │
│      ↓                                             ↓        │
│  ┌──────────┐                              ┌──────────┐    │
│  │   LEFT   │                              │  RIGHT   │    │
│  │   MENU   │                              │   MENU   │    │
│  │ (Fixed)  │                              │ (Fixed)  │    │
│  └──────────┘                              └──────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Positioning System

### Old System (Absolute)
```
Trigger positioned absolutely
  ↓
Hardcoded pixel offsets
  ↓
Menu positioned relative to trigger
  ↓
⚠️ Breaks when trigger size changes
```

### New System (Fixed + Flexbox)
```
Container uses flexbox
  ↓
Triggers auto-positioned by flexbox
  ↓
Menus use fixed position + CSS variables
  ↓
✅ Adapts to any trigger size
```

## CSS Variables Flow

```
:root {
  --cn-trigger-size ────────┬──────────────┐
  --cn-menu-diameter ───┐   │              │
  --cn-primary-color ───┼───┼────┐         │
  --cn-angle-1 ─────────┼───┼────┼────┐    │
}                       │   │    │    │    │
                        ↓   ↓    ↓    ↓    ↓
                     ┌──────────────────────────┐
                     │   All Components Use     │
                     │   These Variables        │
                     └──────────────────────────┘
                               │
              ┌────────────────┼────────────────┐
              ↓                ↓                ↓
         .cn-button      .cn-wrapper    Menu Items
```

## Transform Chain

### Menu Item Positioning
```
                    ┌─────────────────┐
                    │  Menu Wrapper   │
                    │  (Fixed Center) │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │   List Items    │
                    │  position: abs  │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │   Transform 1   │
                    │  rotate + skew  │
                    │ (fan out items) │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │   Anchor <a>    │
                    │   Transform 2   │
                    │  skew + rotate  │
                    │ (straighten)    │
                    └─────────────────┘
```

## State Machine

```
         ┌─────────────┐
         │   CLOSED    │
         │  opacity: 0 │
         │  scale(0.1) │
         └──────┬──────┘
                │
       mouseenter on trigger
                │
                ▼
         ┌─────────────┐
         │   OPENING   │
         │  transition │
         │  (0.3s)     │
         └──────┬──────┘
                │
                ▼
         ┌─────────────┐
         │   OPENED    │
         │  opacity: 1 │
         │  scale(1.0) │
         │ .opened-nav │
         └──────┬──────┘
                │
       mouseleave wrapper
                │
                ▼
         ┌─────────────┐
         │   CLOSING   │
         │  transition │
         │  (0.3s)     │
         └──────┬──────┘
                │
                ▼
         ┌─────────────┐
         │   CLOSED    │
         └─────────────┘
```

## Responsive Scaling

```
Desktop (> 768px)          Tablet (768px)           Mobile (480px)
┌───────────────┐         ┌──────────┐            ┌─────────┐
│               │         │          │            │         │
│   ┌─────┐    │         │  ┌───┐   │            │  ┌──┐   │
│   │ [M] │    │   →     │  │[M]│   │     →      │  │[M]│  │
│   └─────┘    │         │  └───┘   │            │  └──┘   │
│               │         │          │            │         │
└───────────────┘         └──────────┘            └─────────┘
Trigger: 4.5em            Trigger: 3.5em          Trigger: 3em
Menu: 27em                Menu: 20em              Menu: 18em
```

## Z-Index Layers

```
Layer 11: .cn-button, .cn-button-right (Triggers - always on top)
          ↑
Layer 10: .cn-wrapper, .cn-wrapper-right (Menu circles)
          ↑
Layer 10: .cn-wrapper:after (Click-blocking cover)
          ↑
Layer 1:  Menu items <li> (pointer-events: none when closed)
          ↑
Layer 0:  .component (Container)
```

## Event Flow

```
User Action          →  JavaScript          →  CSS State
─────────────────────────────────────────────────────────
mouseenter trigger   →  classie.add()       →  .opened-nav
                     →  change text
                     
mouseenter wrapper   →  classie.add()       →  maintain .opened-nav
                     
mouseleave wrapper   →  classie.remove()    →  remove .opened-nav
                     →  restore text
                     
click menu item      →  (your handler)      →  navigate/action
```

## Angle Calculation Example

For 5 items spread across 140 degrees (-85° to 55°):

```
Item 1: -85°    ●
Item 2: -50°      ●
Item 3: -15°        ●
Item 4:  20°          ●
Item 5:  55°            ●

Total spread: 140°
Gap between items: ~35°
```

To add more items, calculate:
```
Total spread = 140°
Number of items = N
Gap = Total spread / (N - 1)

For N=7:
Gap = 140° / 6 = 23.3°

Angles: -85°, -61.7°, -38.3°, -15°, 8.3°, 31.7°, 55°
```

## File Dependencies

```
index2.html
    ↓
    ├─→ css/normalize.css (Browser reset)
    ├─→ css/demo.css (Page styling)
    ├─→ css/component2.css (Main navigation styles)
    ├─→ css/custom-config.css (Optional overrides)
    ├─→ js/modernizr-2.6.2.min.js (Feature detection)
    ├─→ js/polyfills.js (classie helper)
    └─→ js/demo2.js (Event handlers)
```

## Customization Decision Tree

```
                    What do you want to change?
                              │
        ┌─────────────────────┼─────────────────────┐
        ↓                     ↓                     ↓
     Colors?              Sizes?                 Shape?
        │                     │                     │
    Change                Change                Change
    5 color            2-3 size            border-radius
    variables          variables           variable
        │                     │                     │
        └─────────────────────┴─────────────────────┘
                              │
                    Edit :root in CSS
                    or custom-config.css
```

## Performance Considerations

```
✅ Good Practices:
   - Using CSS transforms (GPU accelerated)
   - Fixed positioning (no reflow)
   - CSS variables (instant updates)
   - Transitions (smooth animations)

⚠️ Watch Out For:
   - Too many menu items (> 10)
   - Very large menu diameters (> 50em)
   - Extremely fast transitions (< 0.1s)
   - Multiple instances (test performance)
```

## Browser Support

```
Modern Browsers (Full Support):
├─ Chrome/Edge: ✅ All features
├─ Firefox:     ✅ All features
├─ Safari:      ✅ All features (with -webkit- prefixes)
└─ Mobile:      ✅ All features

Legacy Browsers (Fallback):
├─ IE 9-11:     ⚠️ No CSS Variables (use fallback values)
├─ Old Mobile:  ⚠️ May need more prefixes
└─ No JS:       ⚠️ .no-csstransforms fallback
```

---

## Quick Architecture Summary

| Component | Position | Purpose | Key Feature |
|-----------|----------|---------|-------------|
| `.component` | relative | Container | Flexbox layout |
| `.cn-button` | relative | Trigger | User interaction |
| `.cn-wrapper` | fixed | Menu | Circular display |
| `li` | absolute | Item container | Rotation base |
| `a` | absolute | Menu item | User clicks |

**Key Insight**: Separating trigger positioning (flexbox) from menu positioning (fixed) allows independent scaling and movement without breaking the layout.
