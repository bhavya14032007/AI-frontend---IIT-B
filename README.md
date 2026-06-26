# AI Data Automation Platform Landing Page

**[GitHub Repository Link](https://github.com/bhavya14032007/AI-frontend---IIT-B)**


## Chosen Vertical
The chosen vertical is an **Advanced AI-driven Data Automation Platform** (B2B SaaS). This caters to enterprises needing robust data pipelines, model training environments, and real-time analytics.

## Approach and Logic
- **Framework:** Built with **Next.js (App Router)** for optimized performance and easy component isolation.
- **Styling:** Utilized **Vanilla CSS Modules** to maintain maximum control over the strict 8px spacing grid, CSS custom property color mapping (ensuring easy theme switching), and micro-interaction animation curves.
- **Accessibility & SEO:** Uses semantic HTML5 tags (`<header>`, `<section>`, `<main>`), and respects `prefers-reduced-motion` for all reflows and micro-interactions.

## How the Solution Works
- **Hero Area:** Features a compelling headline with a fade-up animation. 
- **Social Proof:** Displays trusted enterprise logos in a flex grid to build immediate trust.
- **Feature Showcase (Bento-to-Accordion):** Implements a responsive grid that defaults to an interactive accordion on mobile. The expanded state of the accordion is persisted across reloads using `localStorage` and a `useEffect` hook.
- **Pricing Matrix (Performance-Isolated Currency Switcher):** Uses a `useMemo` hook to recalculate prices purely based on the selected currency, preventing unnecessary re-renders of unrelated DOM elements. 

## Assumptions Made
- The placeholder logos (Acme Corp, etc.) are sufficient as no official SVG logos were provided in the assets specifically for partner companies.
- Since Tailwind was not explicitly enforced over vanilla CSS with variables, CSS Modules were used for granular control of the specified timing curves (150ms and 300ms) and theme tokens.
- Next.js default optimizations (like font loading) were utilized to meet the performance criteria of a premium SaaS product.
