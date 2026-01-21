# Brand Guidelines UI - Design Document

**Date:** 2026-01-21
**Status:** Approved

## Overview

A collection of 10 self-documenting brand style guidelines, each as a standalone HTML landing page with custom CSS and JS. Each page demonstrates AND documents its style through live examples, color palettes, typography scales, and interactive components.

## Project Structure

```
brand-guideline-ui/
├── index.html              # Gallery page linking to all 10 styles
├── shared/
│   └── gallery.css         # Styles for the index gallery
├── styles/
│   ├── retro-arcade/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── effects.js
│   ├── pixel-art/
│   ├── cyberpunk/
│   ├── minimalist/
│   ├── brutalist/
│   ├── glassmorphism/
│   ├── neomorphism/
│   ├── vaporwave/
│   ├── corporate-saas/
│   └── handcrafted/
```

## Landing Page Sections (All Styles)

Each style's `index.html` contains:

1. **Hero Section**
   - Style name as headline
   - Brief tagline describing the aesthetic
   - Live animated background/effect unique to that style
   - "Explore Guidelines" CTA button

2. **Color Palette**
   - Primary, secondary, accent colors with hex codes
   - Click-to-copy functionality
   - Light/dark variants where applicable

3. **Typography**
   - Font family names (with Google Fonts links)
   - Heading scale (H1-H6) live examples
   - Body text, captions, labels

4. **Components Showcase**
   - Buttons (primary, secondary, ghost, disabled states)
   - Form inputs (text, checkbox, toggle, select)
   - Cards and containers
   - Badges and tags

5. **Usage Guidelines**
   - "Do" and "Don't" examples
   - Best practices for the style
   - Suggested use cases

6. **Footer**
   - Links back to gallery
   - Style credits (fonts, inspirations)

## Style-Specific Effects

| Style | Signature Effects |
|-------|-------------------|
| **Retro Arcade** | CRT scanlines overlay, screen flicker, 8-bit sound on button click, neon glow pulse |
| **Pixel Art** | Pixelated cursor, chunky hover transitions, sprite-like button animations |
| **Cyberpunk** | Glitch text effect, RGB split on hover, rain/matrix background, neon flicker |
| **Minimalist** | Smooth scroll reveals, subtle fade-ins, micro-interactions on focus |
| **Brutalist** | Harsh cursor trails, jarring hover states, intentionally "broken" animations |
| **Glassmorphism** | Parallax blur layers, floating glass cards, light refraction on mouse move |
| **Neomorphism** | Soft press/depress on click, shadow direction follows cursor, smooth morphs |
| **Vaporwave** | Floating 3D grid, chrome text reflections, pastel particle drift, sunset gradient shifts |
| **Corporate SaaS** | Animated counters, smooth chart reveals, professional micro-animations |
| **Handcrafted** | Hand-drawn line animations, paper texture parallax, stamp/ink effects on click |

## Color Palettes

### Retro Arcade
- `#0f0f23` - Dark background
- `#00ff41` - Neon green
- `#ff00ff` - Magenta
- `#ffff00` - Yellow
- **Fonts:** Press Start 2P, VT323

### Pixel Art
- `#1a1c2c` - Night
- `#f4f4f4` - White
- `#ff6b6b` - Coral
- `#4ecdc4` - Teal
- **Fonts:** Silkscreen, PixelMplus

### Cyberpunk
- `#0d0d0d` - Void
- `#00f0ff` - Cyan
- `#ff2a6d` - Hot pink
- `#05d9e8` - Electric blue
- **Fonts:** Orbitron, Share Tech Mono

### Minimalist
- `#ffffff` - White
- `#1a1a1a` - Black
- `#f5f5f5` - Gray
- `#0066ff` - Accent blue
- **Fonts:** Inter, Helvetica Neue

### Brutalist
- `#ffffff` - White
- `#000000` - Black
- `#ff0000` - Red
- `#0000ff` - Blue
- **Fonts:** Arial Black, Courier New

### Glassmorphism
- `rgba(255,255,255,0.2)` - Glass
- `#667eea` - Purple
- `#764ba2` - Violet
- `#f093fb` - Pink
- **Fonts:** Poppins, SF Pro

### Neomorphism
- `#e0e5ec` - Base
- `#a3b1c6` - Shadow
- `#ffffff` - Highlight
- `#6d5dfc` - Accent purple
- **Fonts:** Nunito, Quicksand

### Vaporwave
- `#ff71ce` - Pink
- `#01cdfe` - Cyan
- `#05ffa1` - Mint
- `#b967ff` - Purple
- **Fonts:** Monoton, Audiowide

### Corporate SaaS
- `#ffffff` - White
- `#1e293b` - Slate
- `#3b82f6` - Blue
- `#10b981` - Success green
- **Fonts:** Inter, System UI

### Handcrafted
- `#faf8f5` - Cream
- `#2d2a26` - Ink
- `#c9a87c` - Kraft
- `#e07a5f` - Terracotta
- **Fonts:** Caveat, Lora

## Gallery Index Page

The root `index.html` features:

- **Grid of 10 style cards** - Each previews its style's aesthetic
- **Hover effects** - Cards expand with signature style effects
- **Filter/search** - Tags: "dark", "playful", "professional", etc.
- **Responsive** - 3 columns desktop, 2 tablet, 1 mobile
- **Neutral dark theme** - `#121212` background, `#ffffff` text

## Shared Interactivity

All pages include:
- Scroll-triggered reveal animations
- Hover state transitions
- Click-to-copy for color codes and font names
- Responsive design
- Smooth scrolling navigation

## Technical Notes

- Pure HTML/CSS/JS (no frameworks)
- Google Fonts for typography
- CSS custom properties for theming
- Intersection Observer for scroll animations
- Web Audio API for sound effects (Retro Arcade)
