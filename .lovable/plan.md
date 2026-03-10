

## Change background opacity on Our Story page

**Current state:** `ParallaxBackground` uses a fixed 15% opacity globally. The Our Story page uses this same component.

**Plan:** Pass an optional `opacity` prop to `ParallaxBackground` and use `opacity-[0.08]` when rendered from `OurStory.tsx`.

### Changes

1. **`src/components/ParallaxBackground.tsx`** — Add optional `className` or `opacity` prop, apply it to the inner div instead of hardcoded `opacity-15`.

2. **`src/pages/OurStory.tsx`** — Pass `opacity={8}` (or similar) to `ParallaxBackground`.

