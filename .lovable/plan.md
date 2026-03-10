

## Plan: Add "Our Story" Page with SEO & Updated Navigation

### 1. Create `/our-story` page
- **New file: `src/pages/OurStory.tsx`**
  - Dedicated page with its own `<Header />` and `<Footer />`
  - SEO meta tags via `document.title` and meta description update on mount (using a small `useEffect` or a `Helmet`-style approach — since react-helmet isn't installed, we'll use a simple `useEffect` to set `document.title` and update meta description)
  - Placeholder content structure: hero heading, story body text sections — you'll fill in the actual copy
  - Structured data (Article/BlogPosting schema) injected via a `<script>` tag in the component

### 2. Update routing
- **`src/App.tsx`**: Add `<Route path="/our-story" element={<OurStory />} />`

### 3. Update Header navigation (`src/components/Header.tsx`)
- Detect current route using `useLocation()` from react-router-dom
- **On homepage (`/`)**: "What is Gaber?" and "Our Vision" remain as scroll links (current behavior). Add "Our Story" as a `<Link to="/our-story">`.
- **On `/our-story` page**: "What is Gaber?" and "Our Vision" become `<Link to="/#what-is-gaber">` and `<Link to="/#our-vision">` so they navigate back to homepage and scroll to the right section.
- "Join" button: on homepage scrolls to form; on other pages links to `/#subscription-form`.
- Update both desktop and mobile nav menus with the same logic.

### 4. Handle hash-based navigation on homepage
- **`src/pages/Index.tsx`**: Add a `useEffect` that reads `window.location.hash` on mount and scrolls to the matching section. This ensures links like `/#what-is-gaber` from other pages work correctly.

### 5. Update sitemap
- **`public/sitemap.xml`**: Add entry for `https://gaberapp.com/our-story` with appropriate priority (0.8).

### 6. Update Footer
- Add an "Our Story" link in the footer for additional internal linking (good for SEO).

### Files changed
| File | Action |
|------|--------|
| `src/pages/OurStory.tsx` | Create |
| `src/App.tsx` | Add route |
| `src/components/Header.tsx` | Route-aware nav logic |
| `src/pages/Index.tsx` | Hash scroll handling |
| `public/sitemap.xml` | Add `/our-story` entry |
| `src/components/Footer.tsx` | Add "Our Story" link |

