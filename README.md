# asadaslam.tech

My personal portfolio. One page, dark theme, built around an interactive 3D
"knowledge graph" in the hero that reacts to the cursor. The graph is not just
decoration: it is a nod to the kind of work I actually do, which is graph data,
pipelines and connected systems.

**Live site:** https://asadaslam.tech

## Stack

| Tool | Why it's here |
| --- | --- |
| React 18 | UI, all components are function components with hooks |
| Vite 5 | Dev server and production build |
| Three.js via react-three-fiber | The 3D hero scene |
| Tailwind CSS | Styling, with a small set of custom component classes |
| Framer Motion | Scroll reveals, page transitions, the preloader |
| Web3Forms | Contact form delivery, so there is no backend to run |

No state library, no router, no UI kit. It is one page with hash anchors, so
none of that would earn its keep.

## Quick start

Needs Node.js 18 or newer.

```bash
npm install     # first time only
npm run dev     # http://localhost:5173, hot reloads on save
```

Other scripts:

```bash
npm run build     # production bundle into dist/
npm run preview   # serve the built dist/ locally to check it before deploying
```

## How it fits together

`main.jsx` mounts `App.jsx`. `App.jsx` renders the preloader, the fixed
background, the navbar, then every section in order, then the footer. Sections
read their content from `src/data/content.js` and their layout from a shared
`Section` wrapper. That is the whole architecture.

The one rule worth knowing: **content is kept out of the components.** Every
piece of text, every project, every skill, every photo caption lives in
`src/data/content.js` as a plain object or array. Updating the site never means
touching JSX.

## Every file, and what it does

### Root

| File | What it does |
| --- | --- |
| `index.html` | The single HTML page. Holds the `<title>`, meta description, Open Graph and Twitter card tags for link previews, and the Google Fonts link. |
| `package.json` | Dependencies and the three npm scripts. |
| `vite.config.js` | Vite setup. Registers the React plugin, pins the dev server to port 5173 and opens the browser automatically. |
| `tailwind.config.js` | The theme. Custom colors (`void`, `abyss`, `panel`, `edge`), the three fonts (Syne for display, Hanken Grotesk for body, JetBrains Mono for code), and keyframes for the float, shimmer and pulse animations. |
| `postcss.config.js` | Wires Tailwind and autoprefixer into the build. Never touched. |
| `.gitignore` | Ignores `node_modules`, `dist`, env files, editor junk, and any PDF or Word file so documents never land in a public repo by accident. |

### `src/`

| File | What it does |
| --- | --- |
| `main.jsx` | Entry point. Mounts `<App />` into `#root` and imports the global stylesheet. Ten lines, never changes. |
| `App.jsx` | Composition root. Wraps everything in Framer Motion's `MotionConfig` with `reducedMotion="user"` so the whole site respects the visitor's OS motion setting, then renders the preloader, background and every section in page order. |
| `index.css` | Tailwind's three layers plus the custom classes used across the site: `container-x` (page gutter), `btn-primary` and `btn-ghost`, `glass` and `glass-strong` (frosted panels), `card-hairline`, `chip`, `eyebrow`, `gradient-text`, `spotlight`, `grid-bg` (the dotted background grid), `link-muted`. |

### `src/data/`

| File | What it does |
| --- | --- |
| `content.js` | **The file you actually edit.** Ten named exports: `profile` (name, role, tagline, contact links, the `showGithub` toggle, the Web3Forms key), `about`, `experience`, `projectCategories`, `projects`, `skillGroups`, `education`, `certifications`, `volunteering`, `gallery`. Everything the site displays comes from here. |

### `src/three/`

| File | What it does |
| --- | --- |
| `KnowledgeGraph.jsx` | The 3D hero scene, and the most complex file in the project. Procedurally builds a graph of nodes and edges on a sphere, draws them with instanced meshes, fakes a bloom glow with a radial-gradient sprite texture instead of a real post-processing pass (much cheaper), and rotates the whole thing toward the pointer. It scales itself down on mobile: 30 nodes instead of 46, 70 particles instead of 160, and a capped pixel ratio. An `IntersectionObserver` switches the render loop to `demand` once the hero scrolls out of view, so it stops burning frames when nobody is looking at it. The color palette is the `PALETTE` array at the top. |

### `src/hooks/`

| File | What it does |
| --- | --- |
| `useActiveSection.js` | Scroll spy. Uses an `IntersectionObserver` with a tight root margin to report which section is currently in view, which is what highlights the right link in the navbar. |
| `useMagnetic.js` | Returns a ref and mouse handlers that pull an element slightly toward the cursor while hovering. Higher `intensity` means a subtler pull. |

### `src/components/`

Layout and utility pieces:

| File | What it does |
| --- | --- |
| `Section.jsx` | The wrapper every content section uses. Gives it a scroll anchor, a numbered eyebrow heading, and a subtle rise-and-tilt as it enters the viewport. Change this file and every section changes at once. |
| `Icons.jsx` | One `<Icon name="..." />` component holding every inline SVG the site uses. Avoids pulling in an entire icon library for a dozen glyphs. |
| `MagneticButton.jsx` | Wraps any clickable content with the magnetic hover effect. Renders as an `<a>` if you pass `href`, otherwise a `<button>`. |
| `SpotlightCard.jsx` | Card with a glow that follows the cursor across its surface, plus optional 3D tilt on hover. |
| `RevealText.jsx` | Animates text into view one word at a time on scroll. |
| `BackgroundFX.jsx` | The fixed full-viewport background sitting behind everything: base color, dotted grid, and aurora glows. Deliberately uses radial gradients rather than large `blur()` filters, because blur compositing is expensive and used to stutter badly on mobile Safari. |
| `Preloader.jsx` | Counts 0 to 100, then wipes away to reveal the page. Signals `ready` to the hero so the hero animation only starts once the page is actually visible. |

Page sections, in the order they appear:

| File | What it does |
| --- | --- |
| `Navbar.jsx` | Fixed nav. Highlights the section you are currently in (via `useActiveSection`), plus a LinkedIn button on desktop and a slide-down menu on mobile. |
| `Hero.jsx` | Name, role, tagline, and the two calls to action. The 3D canvas is lazy loaded with `React.lazy` and `Suspense`, so the text paints immediately and the heavy Three.js bundle streams in behind it instead of blocking first render. |
| `About.jsx` | Bio paragraphs and the four stat cards. |
| `Experience.jsx` | Work history as a vertical timeline. |
| `Projects.jsx` | Project grid with filter pills across the top. Filtering is client side against the `category` field, and a project marked `featured: true` spans the full row width. |
| `Skills.jsx` | Skills grouped into categories as spotlight cards. |
| `Education.jsx` | Degrees. |
| `Certifications.jsx` | Certification list with issuers. |
| `Highlights.jsx` | Event photo gallery plus volunteering. Clicking an event opens a lightbox rendered through a React portal, with arrow key navigation, Escape to close, and a body scroll lock while it is open. Gallery images are lazy loaded. |
| `Contact.jsx` | Contact form. Posts as JSON to the Web3Forms API and tracks its own submit state (`idle`, `submitting`, `success`, `error`, `invalid`). If no form key is configured in `content.js`, it falls back to opening the visitor's own email client instead of silently failing. |
| `Footer.jsx` | Social links and copyright. |

### `public/`

Everything here is copied to the site root as-is and served publicly.

| Path | What it does |
| --- | --- |
| `images/profile.jpg` | Hero portrait. Square works best. |
| `images/portrait-tall.jpg`, `images/portrait-wide.jpg` | Alternate crops. |
| `images/gallery/` | Event photos, named by event, referenced from the `gallery` array in `content.js`. |
| `og-image.png` | The 1200x630 card that shows up when the site is shared on LinkedIn, WhatsApp or Slack. |
| `favicon.svg` | Tab icon. |

## Notes on performance

The hero runs a WebGL scene, so the rest of the page has to stay cheap. A few
deliberate choices:

- The Three.js bundle is code split and lazy loaded, so it never blocks the
  first paint
- The graph drops its node count, particle count and pixel ratio on mobile, and
  stops rendering entirely once it scrolls out of view
- The background uses radial gradients instead of `blur()` filters
- Gallery images are lazy loaded and compressed
- `reducedMotion="user"` is set globally, so anyone with "Reduce Motion" enabled
  gets a calm version of the site rather than a broken one

There is no custom cursor. There used to be, and it looked good, but a
lerped trailing ring competing with a WebGL canvas for frames made the whole
site feel like it was hanging. The native cursor is the better call.

## Making changes

- **Text, projects, skills, links:** `src/data/content.js`
- **Colors and fonts:** `tailwind.config.js`
- **Reusable classes:** `src/index.css`
- **The 3D graph's colors:** the `PALETTE` array at the top of `src/three/KnowledgeGraph.jsx`
- **Section spacing and heading style:** `src/components/Section.jsx`, once, for all sections

## Deployment

`npm run build` produces a static `dist/` folder that can be hosted anywhere.
This site is deployed on Vercel: every push to `main` triggers a build and
Vercel serves `dist/` on the custom domain. No config file is needed, since it
is a single page using hash anchors rather than client side routing, so there
are no rewrite rules to set up.

## License

No license. The code and content are mine and are not meant to be reused as a
template. Happy to answer questions about how any part of it works.