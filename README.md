# Asad Aslam Portfolio

A 3D, interactive personal portfolio built with **React + Vite + Three.js
(react-three-fiber) + Tailwind CSS + Framer Motion**. The hero features an
interactive, glowing "knowledge graph" that reacts to your cursor, with
scroll-triggered reveals, magnetic buttons, spotlight cards, and a custom
cursor throughout.

---

## Prerequisites

You need **Node.js 18 or newer** installed.
Check by running this in a terminal:

```bash
node -v
```

If you don't have it, download the LTS version from https://nodejs.org and
install it (this also installs `npm`).

---

## Run it in VS Code (step by step)

1. **Open the folder in VS Code**
   Unzip this project, then in VS Code choose **File → Open Folder…** and pick
   the `asad-portfolio` folder.

2. **Open the integrated terminal**
   Menu: **Terminal → New Terminal** (or press `` Ctrl+` ``).
   Make sure the terminal path ends in `asad-portfolio`.

3. **Install the dependencies** (only needed the first time)
   ```bash
   npm install
   ```
   This downloads everything into a `node_modules` folder. It can take a
   minute or two.

4. **Start the dev server**
   ```bash
   npm run dev
   ```
   It will print a local address (usually **http://localhost:5173**) and try
   to open it automatically. If not, `Ctrl+Click` the link in the terminal.

5. **Edit and watch it live**
   Any change you save in the `src/` files reloads the browser instantly.
   To stop the server, click the terminal and press `Ctrl+C`.

6. **Build the production version** (when you're ready to deploy)
   ```bash
   npm run build
   ```
   The optimized site is generated in a `dist/` folder. Preview it with:
   ```bash
   npm run preview
   ```

---

## How to customize

Almost everything you'll want to change lives in **one file**:

### ✏️ Text, projects, skills, links → `src/data/content.js`
Open it and edit the values. It's organized into clearly labeled sections:
`profile`, `about`, `experience`, `projects`, `skills`, `education`,
`certifications`, `volunteering`, and `gallery`. No coding required, just
change the text between the quotes.

- **Your GitHub link:** in `content.js`, find `github:` inside `profile` and
  replace the URL with your real GitHub profile.
- **Add a project:** copy one `{ ... }` block inside the `projects` array,
  paste it, and edit. Set `featured: true` to make a card span the full width.
  The `category` must match one of the names in `projectCategories` so the
  filter buttons work.

### 🖼️ Photos
- **Profile photo:** replace `public/images/profile.jpg` with your own
  (keep it roughly square for the best look).
- **Gallery / convocation photos:** replace the placeholder files in
  `public/images/gallery/` using the **same file names**, OR add new images and
  update the `gallery` list in `content.js`.
- **Extra images:** drop anything into `public/assets/` and reference it as
  `/assets/your-file.jpg`. (There's a note inside that folder too.)
- **CV:** replace `public/Asad_Aslam_CV.pdf` with your latest CV (same name),
  or change the `cv:` path in `content.js`.

### 🎨 Colors & fonts
- Colors and fonts are defined in `tailwind.config.js` (see the `colors` and
  `fontFamily` sections) and `src/index.css`.
- The 3D graph colors are the `PALETTE` array at the top of
  `src/three/KnowledgeGraph.jsx`.

---

## Project structure

```
asad-portfolio/
├─ public/
│  ├─ images/            # profile + gallery photos
│  ├─ assets/            # drop extra images here
│  ├─ favicon.svg
│  └─ Asad_Aslam_CV.pdf
├─ src/
│  ├─ data/content.js    # ← edit your content here
│  ├─ three/KnowledgeGraph.jsx   # the 3D hero scene
│  ├─ components/        # all UI sections
│  ├─ hooks/             # scroll-spy + magnetic hooks
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css
├─ index.html
├─ package.json
├─ tailwind.config.js
├─ postcss.config.js
└─ vite.config.js
```

---

## Deploying (optional)

The `dist/` folder from `npm run build` is a static site you can host
anywhere. Easiest options:

- **Vercel** or **Netlify:** connect the repo (or drag-and-drop the `dist`
  folder). Build command `npm run build`, output directory `dist`.
- **GitHub Pages:** push the repo and serve the `dist` folder.

---

## Troubleshooting

- **`npm install` fails:** make sure `node -v` shows 18+ and you have an
  internet connection. Delete `node_modules` and the `package-lock.json` file,
  then run `npm install` again.
- **Blank page / 3D not showing:** open the browser console (F12) and check for
  errors. The 3D scene needs WebGL; it's enabled in all modern browsers.
- **Port 5173 already in use:** Vite will pick the next free port and print it.
- **Animations feel like too much:** the site automatically respects your OS
  "Reduce Motion" setting and tones things down.

Enjoy! 🚀
