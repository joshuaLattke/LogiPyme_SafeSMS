---
name: LogiPyme Direct Logistics
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#434655'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#525f75'
  on-secondary: '#ffffff'
  secondary-container: '#d6e3fe'
  on-secondary-container: '#58657b'
  tertiary: '#006058'
  on-tertiary: '#ffffff'
  tertiary-container: '#007b71'
  on-tertiary-container: '#b3fff3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#d6e3fe'
  secondary-fixed-dim: '#bac7e1'
  on-secondary-fixed: '#0e1c2f'
  on-secondary-fixed-variant: '#3a475c'
  tertiary-fixed: '#89f5e7'
  tertiary-fixed-dim: '#6bd8cb'
  on-tertiary-fixed: '#00201d'
  on-tertiary-fixed-variant: '#005049'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.03em
  code-tracking:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  space-3xl: 4rem
  gutter-mobile: 1rem
  gutter-desktop: 1.5rem
  container-max: 80rem
---

## Brand & Style

This design system serves microentrepreneurs and small business owners managing direct-to-consumer parcel logistics in Colombia. Operating primarily across mobile devices, messaging channels, and desktop dashboards, these users require speed, immediate status clarity, and an interface that demystifies multi-carrier shipping without enterprise clutter.

The aesthetic blends **Modern Corporate** reliability with a **Clean Tactile SaaS** finish:
- **Authority & Trust:** Anchored in deep maritime navy tones that signal operational stability, security, and institutional backing for cash-on-delivery (contra-entrega) funds.
- **Accessible & Empowering:** Replaces dense logistics jargon with explicit statuses, visual progress trails, and scannable financial recaps.
- **Crisp & Tactical:** High surface clarity, restrained borders, and functional status colors allow quick triage of batch shipments during peak operational windows.

## Colors

The palette is engineered for rapid visual parsing, prioritizing logistics states and operational certainty over decorative flourishes.

### Core Roles
- **Primary (`#2563EB`):** Used for primary conversion triggers (e.g., "Crear Envío", "Generar Guía", "Recargar Saldo"), focus outlines, and active navigation indicators. Hover states shift to `#1D4ED8`.
- **Secondary (`#0B192C`):** Used for high-authority structural frameworks, primary navigation bars, sidebar shells, and modal headers. Represents financial solidity and operational permanence.
- **Tertiary (`#0D9488`):** Colombian emerald/teal used for completed deliveries, positive cash-flow balances, and payout milestones.
- **Neutral Surface & Text (`#0F172A` / `#F8FAFC`):** Primary body text leverages deep slate (`#0F172A`), muted text uses `#64748B`, while core application surfaces rest on an ultra-clean `#F8FAFC` canvas framed with `#E2E8F0` borders.

### Operational State Tokens
- **State - Success (`#10B981` / Background `#ECFDF5`):** Reserved for *Entregado* (Delivered) and *Liquidado* (Funds settled).
- **State - Warning (`#F59E0B` / Background `#FFFBEB`):** Reserved for *Pendiente de Recogida* (Pending pickup) and *En tránsito* (In transit).
- **State - Destructive (`#EF4444` / Background `#FEF2F2`):** Reserved for *Novedad / Fallido* (Delivery exceptions, returned packages) and destructive account actions.
- **State - Informational (`#0284C7` / Background `#F0F9FF`):** Used for shipment updates and multi-carrier integration notices.

## Typography

**Plus Jakarta Sans** is selected for all primary textual roles across desktop and mobile contexts. Its open apertures, tall x-height, and geometric stability ensure high legibility under poor mobile conditions (e.g., couriers on the move, business owners scanning tracking IDs on low-cost Android displays).

### Typography Guidance
- **Headlines:** Use tight tracking (`-0.02em` to `-0.01em`) and bold weights for rapid anchoring on metrics and modal headers.
- **Tabular & Identifiers:** Tracking numbers (*Número de Guía*), monetary figures in Colombian Pesos (COP), and phone/carrier IDs employ `JetBrains Mono` or tabular figures (`tnum`) to eliminate visual jitter during real-time filtering and status checks.
- **Labels:** Status badges and step indicators strictly mandate `label-md` or `label-sm` with upper or sentence casing for instant non-technical comprehension.

## Layout & Spacing

The layout philosophy utilizes an adaptable 8pt grid with dedicated fluid reflow across three main device tiers. Small merchant workflows frequently jump between mobile WhatsApp webviews and full desktop packing stations.

### Grid & Layout Tiers
- **Mobile (< 768px):** 4-column fluid layout with `16px` outer margins and `12px` gutters. Content is strictly stacked; multi-action cards collapse into single-column operational feeds with persistent bottom sheets.
- **Tablet (768px - 1024px):** 8-column layout with `24px` margins and `16px` gutters. Metric summaries sit in 2x2 grids; tracking lists retain full horizontal width.
- **Desktop (> 1024px):** 12-column layout with a fixed `260px` navy navigation rail, `24px` gutters, and content clamped at `1280px` (`80rem`) max width to maintain optimal scanning paths.

### Spacing Patterns
- **Internal Card Padding:** `1.25rem` (`20px`) for desktop surfaces; `1rem` (`16px`) for mobile cards.
- **Form Layouts:** `1rem` vertical separation between related logistical inputs (e.g., Ciudad Origen, Destinatario), with `1.5rem` grouping separate operational steps (Datos del Paquete vs. Recaudo Contra-Entrega).

## Elevation & Depth

Visual hierarchy uses **ambient, low-opacity layered shadows** combined with **subtle neutral borders** (`#E2E8F0`). This creates a calm, structured dashboard that keeps heavy operational data clear and readable.

### Layer Hierarchy
- **Level 0 (Base Canvas):** `#F8FAFC`. Used for main application viewport backgrounds.
- **Level 1 (Card & Surface Tiers):** `#FFFFFF` with border `1px solid #E2E8F0` and `box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.05)`. Used for shipment listings, form cards, and KPI panels.
- **Level 2 (Hover & Active States):** `#FFFFFF` with `box-shadow: 0 4px 12px -2px rgba(15, 23, 42, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.04)`. Applied to elevated shipment rows, active delivery dispatches, and interactive filter controls.
- **Level 3 (Floating Sheets & Dropdowns):** `#FFFFFF` with `box-shadow: 0 10px 25px -5px rgba(11, 25, 44, 0.12), 0 8px 10px -6px rgba(11, 25, 44, 0.04)`. Used for courier selection pickers, tracking detail flyouts, and contextual action menus.
- **Level 4 (Modal Dialogs & Alerts):** `#FFFFFF` accompanied by a navy-tinted backdrop scrim (`#0B192C` at 50% opacity with `backdrop-filter: blur(4px)`).

## Shapes

The design system employs a **Rounded** (scale `2`) geometry profile. This delivers approachable warmth for non-technical users while preserving structural efficiency on dense data screens.

### Radius Implementations
- **Base Components (Inputs, Buttons, Dropdowns):** `0.5rem` (8px). Delivers a crisp, tactile target.
- **Standard Cards & Metric Tiles (`rounded-lg`):** `1rem` (16px). Distinctly encloses shipment workflows and financial summaries.
- **Modals, Drawers & Large Banners (`rounded-xl`):** `1.5rem` (24px). Softens dominant container surfaces.
- **Badges, Tags & Status Pills:** Fully circular (`rounded-full` / 9999px) to distinctly contrast against rectangular input fields and data cells.

## Components

### Buttons
- **Primary:** Background `#2563EB`, text `#FFFFFF`, radius `8px`, font `label-lg`. Padding: `10px 20px`. Hover: `#1D4ED8`. Active: `#1E40AF`.
- **Secondary (Destructive / Outline):** Border `1px solid #E2E8F0`, background `#FFFFFF`, text `#0F172A`. Hover: `#F1F5F9`.
- **Operational / Quick-Action (WhatsApp Link):** Background `#25D366` (or emerald `#0D9488`), text `#FFFFFF`, icon prefix support.
- **Height Standard:** `40px` for standard desktop operations; `44px` on mobile touch screens.

### Status Pills & Badges
All status badges use `label-md` with `font-weight: 600`, fully rounded edges (`rounded-full`), and an integrated `6px` status dot indicator:
- **Pendiente:** Background `#FFFBEB`, text `#B45309`, dot `#F59E0B`.
- **Recogido / En Tránsito:** Background `#EFF6FF`, text `#1D4ED8`, dot `#2563EB`.
- **Entregado:** Background `#ECFDF5`, text `#047857`, dot `#10B981`.
- **Novedad / Fallido:** Background `#FEF2F2`, text `#B91C1C`, dot `#EF4444`.

### Input Fields
- Container: Height `42px`, border `1px solid #CBD5E1`, background `#FFFFFF`, radius `8px`.
- Typography: `body-md` (`14px`). Placeholder `#94A3B8`.
- Focus State: Border color `#2563EB` paired with an external halo `0 0 0 3px rgba(37, 99, 235, 0.15)`.
- Contextual Attachments: Prefix slots for Colombian peso symbol (`$ COP`), carrier logos (Servientrega, Coordinadora, Envía, Inter Rapidísimo), and phone country code (`+57`).

### Checkboxes & Radio Controls
- Checkbox: Size `18px x 18px`, radius `4px`, border `1.5px solid #94A3B8`. Active state fills `#2563EB` with a white checkmark icon.
- Radio Button: Size `18px x 18px`, outer ring `#CBD5E1`, inner circle `8px` `#2563EB` when checked.

### Shipment & Metric Cards
- **Metric Cards:** White surface, border `1px solid #E2E8F0`, radius `16px`, padding `16px 20px`. Top line displays category micro-copy (`label-md` in `#64748B`), middle line features primary value (`headline-xl`), bottom line displays trajectory pill (e.g., "+12 envíos hoy").
- **Shipment List Card (Row):** Border `1px solid #E2E8F0`, radius `12px`, padding `14px 18px`. Features a horizontal split: Customer name & destination city on left, carrier icon & mono tracking code in center, status pill & quick WhatsApp notify icon button on right.

### Dedicated Logistics Modules
- **Contra-Entrega (COD) Breakdown Tile:** Highlights total delivery fee, product collection amount, and net merchant balance payable with emerald accent highlights.
- **Courier Selection Matrix:** Selectable radio cards displaying carrier badge, pickup ETA window (e.g., "Hoy antes de 3:00 PM"), insurance coverage, and direct quote comparisons.