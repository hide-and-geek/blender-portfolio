# hide &amp; geek

The portfolio site for **[hideandgeek.co.uk](https://hideandgeek.co.uk)** — a creative space for 3D experiments, worldbuilding, and digital art.

> Built slowly. Broken occasionally. Improved constantly.

---

## What this is

A fast, static website (plain HTML, CSS and JavaScript — no build step, no framework). It's hosted on **Cloudflare Pages**, which automatically republishes the site whenever a change is committed to this repo. A change is usually live within a minute.

## The files

| File | What it does |
| --- | --- |
| **`projects.js`** | ⭐ **The only file you edit to manage your work.** Holds the list of projects; the site is generated from it. |
| `index.html` | Page structure. Rarely needs touching. |
| `styles.css` | All styling. |
| `site.js` | Hero parallax, scroll animations, copy-email button. |
| `tweaks.jsx`, `tweaks-panel.jsx` | The design tweak panel (fonts / accent colour / motion). |
| `assets/` | All images — renders and the portrait. |

## Managing your work — quick reference

Everything below is editing **`projects.js`**. The homepage gallery, the big "Most proud of" feature, and the click-through project views are all built automatically from the `PROJECTS` list at the top of that file.

**Always resize images before adding them.** Renders from Blender are too big for the web. Use [squoosh.app](https://squoosh.app): format **MozJPEG**, quality **80**, resize the longest side to **2200px**. Aim for under ~1&nbsp;MB. Save with a lowercase, no-spaces name like `neon-city.jpg`.

### Add a photo to a project
Add a line to that project's `renders` list (mind the commas — every line ends in one except the last):
```js
renders: [
  { src: 'assets/warehouse.jpg', cap: 'Wide interior · Cycles' },
  { src: 'assets/warehouse-night.jpg', cap: 'Night lighting' }
],
```

### Add a new project
Copy a `{ … }` block, paste it near the **top** of the list (newest first), and edit the details. `id` must be unique, lowercase, no spaces.
```js
{
  id: 'forest-shrine',
  title: 'Forest Shrine',
  category: 'Environment',
  credit: 'a tutorial by Grant Abbitt',
  desc: 'A mossy stone shrine in dappled morning light…',
  renders: [
    { src: 'assets/forest-shrine.jpg', cap: 'Morning light' }
  ],
  more: 'More angles coming soon'   // optional
},
```
No renders yet? Use `renders: []` and add `comingSoon: true,` — it shows a tidy "in progress" card.

### Change the main / featured project
Move the line `featured: true,` onto the project you want as the big hero piece. Only **one** project should have it. The hero image is that project's **first** render.

## Publishing a change

1. Edit `projects.js` here on GitHub (click the file → the pencil ✎), or upload new images into `assets/` via **Add file → Upload files**.
2. Click **Commit changes**.
3. Wait ~1 minute, then check the site in a private/incognito window.

GitHub keeps every previous version, so a broken edit can always be reverted from the commit history.

## If something breaks

- **Blank page / empty gallery** → almost always a missing or extra comma in `projects.js`.
- **Image won't show** → the `src` path must match the file name exactly, including capitals and `.jpg`. Keep everything lowercase.
- **Still seeing the old version** → browser cache. Hard-refresh (`Ctrl/Cmd + Shift + R`) or use a private window.

---

*A fuller, illustrated version of these instructions lives in the project's **Update Guide**.*
