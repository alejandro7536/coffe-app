---
name: Amber Roast
colors:
  surface: "#1c110c"
  surface-dim: "#1c110c"
  surface-bright: "#453630"
  surface-container-lowest: "#160c07"
  surface-container-low: "#251913"
  surface-container: "#291d17"
  surface-container-high: "#342721"
  surface-container-highest: "#40322c"
  on-surface: "#f5ded5"
  on-surface-variant: "#d8c2b4"
  inverse-surface: "#f5ded5"
  inverse-on-surface: "#3b2d27"
  outline: "#a08d80"
  outline-variant: "#534439"
  surface-tint: "#ffb77f"
  primary: "#ffcca6"
  on-primary: "#4e2600"
  primary-container: "#f9a866"
  on-primary-container: "#733b00"
  inverse-primary: "#8d4f14"
  secondary: "#e3beb8"
  on-secondary: "#422a26"
  secondary-container: "#5b403c"
  on-secondary-container: "#d1ada7"
  tertiary: "#ffcabc"
  on-tertiary: "#601400"
  tertiary-container: "#ffa38a"
  on-tertiary-container: "#8e2200"
  error: "#ffb4ab"
  on-error: "#690005"
  error-container: "#93000a"
  on-error-container: "#ffdad6"
  primary-fixed: "#ffdcc3"
  primary-fixed-dim: "#ffb77f"
  on-primary-fixed: "#2f1500"
  on-primary-fixed-variant: "#6e3900"
  secondary-fixed: "#ffdad4"
  secondary-fixed-dim: "#e3beb8"
  on-secondary-fixed: "#2b1613"
  on-secondary-fixed-variant: "#5b403c"
  tertiary-fixed: "#ffdbd1"
  tertiary-fixed-dim: "#ffb5a0"
  on-tertiary-fixed: "#3b0900"
  on-tertiary-fixed-variant: "#872000"
  background: "#1c110c"
  on-background: "#f5ded5"
  surface-variant: "#40322c"
typography:
  headline-xl:
    fontFamily: Sora
    fontSize: 40px
    fontWeight: "700"
    lineHeight: 48px
  headline-lg:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: "700"
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 28px
    fontWeight: "700"
    lineHeight: 36px
  title-md:
    fontFamily: Sora
    fontSize: 18px
    fontWeight: "600"
    lineHeight: 24px
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 26px
  body-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 20px
  label-lg:
    fontFamily: Sora
    fontSize: 16px
    fontWeight: "600"
    lineHeight: 20px
  label-sm:
    fontFamily: Sora
    fontSize: 12px
    fontWeight: "500"
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-padding: 24px
  element-gap: 16px
  section-gap: 32px
  grid-columns: "12"
  gutter: 16px
---

## Brand & Style

This design system is crafted for premium, sensory-focused experiences. It evokes a cozy, high-end atmosphere through a "Dark Roast" aesthetic. The visual narrative combines **Glassmorphism** with **Tactile** elements to create a sense of depth and warmth.

The personality is sophisticated yet approachable, utilizing deep espresso-toned backgrounds and glowing amber accents to guide the user's attention. It prioritizes high-quality imagery and a sense of physical presence, making digital interactions feel as rich as a freshly brewed cup of coffee.

## Colors

The palette is rooted in the rich spectrum of coffee and firelight.

- **Primary (Amber):** Used for active states, primary call-to-actions, and highlights. It represents energy and warmth.
- **Secondary (Dark Cocoa):** Provides the base for container elements and subtle structural components.
- **Tertiary (Burnt Orange):** Reserved for semantic accents or secondary brand highlights.
- **Neutral (Obsidian):** A deep, warm black used for the background to ensure the glass effects and ambers "glow."
- **Text:** Headlines use high-contrast white (#FFFFFF) for readability, while secondary text uses a muted cream or light amber to maintain the warm atmosphere.

## Typography

The typography system uses a mix of geometric confidence and contemporary warmth.

**Sora** is the voice of the brand, used for headlines and button labels. Its wide aperture and modern structure feel premium and technological yet friendly. **Be Vietnam Pro** handles body copy, offering excellent legibility in dark mode environments with a clean, unassuming character that doesn't compete with the bold headlines.

## Layout & Spacing

The design system utilizes a **fluid grid** with generous safe areas to maintain a premium, spacious feel.

- **Mobile:** A 4-column layout with 24px side margins. Elements typically stack vertically to highlight large product imagery.
- **Desktop/Tablet:** A 12-column grid. Content is often centered in a constrained max-width container to preserve the intimate "app-like" feel even on wide screens.
- **Rhythm:** An 8px base unit drives all spacing. Component height and padding should always be multiples of 8 to ensure visual harmony.

## Elevation & Depth

Depth is achieved through **Tonal Layering** and **Glassmorphism** rather than traditional drop shadows.

1.  **The Canvas:** Deep obsidian (#1A0F0A) with a subtle radial gradient of amber in the center.
2.  **The Glass Layer:** Containers use a semi-transparent dark brown fill with a high-saturation backdrop blur (20px-30px). A subtle 1px inner border (white at 10% opacity) provides a "rim light" effect.
3.  **The Active Layer:** Elements that are selected or primary (like the active size button or the main CTA) use a solid or gradient fill of Amber to "pop" off the background.
4.  **Interaction:** Hover or press states should increase the opacity of the glass or the intensity of the inner glow.

## Shapes

The shape language is defined by large, friendly radii that mirror the curves of coffee cups and saucers.

- **Standard Buttons & Cards:** Use a 1rem (16px) radius to create a soft, approachable feel.
- **Pill Elements:** Secondary labels or small tags use a fully rounded "pill" shape (radius > 100px).
- **Icons:** Should be housed within rounded-square glass containers with a 12px radius.

## Components

### Buttons

- **Primary:** Pill-shaped or heavily rounded (1rem+). Uses a warm gradient from Tertiary to Primary. Text is dark cocoa (#3E2723) for maximum contrast.
- **Secondary (Selection):** Glass-morphic background with a subtle border. When active, it switches to a solid Primary color.

### Cards & Containers

- Cards use the "Glass Layer" style defined in Elevation. They should have a 1px stroke at 10-15% white to define their edges against the dark background.
- Content inside cards should be grouped with 16px of internal padding.

### Inputs & Selection

- **Chips/Selectors:** Used for attributes like "Size" or "Extra Shot." These are large, tactile blocks with 16px rounded corners.
- **Labels:** Small labels within glass containers should use the Primary color to denote significance (e.g., "Price" or "Score").

### Navigation

- Top navigation should be transparent, using only iconography and typography to avoid cluttering the visual field.
- Icon buttons (Back, Heart) are placed inside soft, dark-tinted circular glass containers.
