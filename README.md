# Resume Builder

A fully offline, browser-based resume builder. No server required — open `resume-builder.html` directly in your browser and start editing.

## Getting Started

Open `resume-builder.html` in a modern browser (Firefox or Chrome). Your resume loads automatically with placeholder sections ready to fill in. No installation, no build step, no internet connection needed.

---

## Editing Your Resume

All text fields are directly editable — click any field and type. Fields include job titles, dates, descriptions, school names, locations, and so on. If you clear a field completely it will be omitted from the exported resume.

### Adding Sections

Use the toolbar buttons at the bottom of the page to add new top-level sections:

- **Add Education Section** — adds a new education block
- **Add Work Section** — adds a new work experience block
- **Add Skills Section** — adds a new skills list
- **Add Activities Section** — adds a new activities block

### Adding Entries Within a Section

Each section has an **Add** button (e.g. "Add School", "Add Job") that inserts a new entry into that section. Work experience entries also have an **Add Responsibility** button to add bullet points within a job.

### Removing Entries

Each entry has a **Remove** button. Section-level entries also have a **✕** button in their drag handle controls. You will not be asked to confirm deletion, so be deliberate.

### Reordering Sections and Entries

Drag the **☰** handle on any section or entry to reorder it. Sections within the resume, schools within education, jobs within work experience, and bullet points within a job are all independently sortable.

---

## Hiding Elements

Each section and entry has a **checkbox** in its controls. Unchecking it hides that element visually and excludes it from exported resumes. This is useful for keeping content in your master file that you don't want on every version — for example, hiding older jobs or a GPA you'd rather omit for certain applications.

Hidden elements remain in your saved file and can be re-checked at any time.

---

## Saving and Exporting

There are two distinct save actions:

### Save Master Resume (`your_base_resume.builder.html`)

Use **Save Master Resume** to save the full builder — including all hidden elements, drag handles, editable fields, and section controls — as a self-contained HTML file. Open this file later in your browser to continue editing where you left off.

This is your working file. Keep it somewhere safe and load it when you want to make changes.

> `your_base_resume.builder.html` is listed in `.gitignore` by default so your personal resume content is not committed to the repository.

### Export Resume (`resume.html`)

Use **Export Resume** to produce a clean, portable HTML file with no builder controls. Hidden elements are excluded, editable attributes are stripped, and empty fields are removed. This is the file you share, print, or convert to PDF.

To save as PDF from the exported file, open it in your browser and use **File → Print → Save as PDF**. The print stylesheet handles page margins and hides any remaining browser UI.

---

## Changing the Resume Style

Use the **style dropdown** in the toolbar to switch between available visual themes. The change applies immediately so you can preview before exporting.

Currently included styles:

| Name | Description |
|---|---|
| `vermillion` | Clean serif layout with accent colour headings |
| `standard` | Minimal sans-serif, traditional single-column layout |

---

## Adding a New Style Template

1. **Create your stylesheet** in `css/resume-styles/`. Name it after your theme, e.g. `css/resume-styles/myTheme.css`. Target the resume's class structure — all resume elements are prefixed with `rb-`:

```css
#rb-resume {
  font-family: Georgia, serif;
  max-width: 800px;
  margin: 0 auto;
}

.rb-section-header {
  border-bottom: 2px solid #333;
  font-size: 1.1em;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.rb-essentials {
  display: flex;
  justify-content: space-between;
}

/* Hide builder controls in print */
@media print {
  .rb-controls,
  .rb-entry-actions,
  .rb-section-actions {
    display: none;
  }
}
```

2. **Add to the CSS resume-styles.js file** at `js/resume-styles.js` that stores the CSS as a string. This is required because the builder is file-based and cannot fetch CSS files directly:

```js
window.ResumeStyles = window.ResumeStyles || {};
window.ResumeStyles['myTheme'] = `
  /* paste the full contents of myTheme.css here */
`;
```

3. **Add an option** to the style dropdown in `resume-builder.html`:

```html
<select id="rb-style-change">
  <option value="vermillion">Vermillion</option>
  <option value="standard">Standard</option>
  <option value="myTheme">My Theme</option>
</select>
```

Your theme will now appear in the dropdown and be inlined correctly on export. In the future the dropdown should be dynamically populated.

---

## Project Structure

```
resume-builder.html       — open this in your browser
css/
  resume-builder.css      — builder UI styles (controls, handles, layout)
  resume-styles/
    vermillion.css         — resume theme
    standard.css
fonts/
  OpenSans-Regular.ttf
js/
  templates.js             — all HTML templates as JS strings
  resume-styles.js          — css/resume-styles/* CSS as a JS string for export
  resume-builder.js        — builder logic
  Sortable-1.15.4/
    Sortable.js            — drag and drop (no other dependencies)
```

---

## Browser Compatibility

Works in current versions of Chrome and Firefox. Safari should work but is less tested. Internet Explorer is not supported.
