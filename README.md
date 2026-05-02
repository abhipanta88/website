# UofT Quercus Grades Portal — Demo Clone

A pixel-faithful, single-page static replica of the **University of Toronto
Quercus** (Canvas LMS) student grades portal, built for demo / portfolio
purposes for the student **Aditya Deol**.

The project reproduces:

- The UofT navy global navigation rail with the tree-and-shield crest,
  notification badge, collapse control, and all icon labels
  (Account, Dashboard, Courses, Groups, Calendar, Inbox, History,
  Materials Costs, Course Evals, Help)
- The Quercus secondary course sidebar (Home / Syllabus / Modules /
  Grades / Library Resources …) with the term label and the active
  state matching the original
- Top breadcrumb (`COURSE › Grades › Aditya Deol`) and hamburger
- The "Grades for Aditya Deol" page with:
  - `Course` and `Arrange By` selectors + `Apply` button
  - `Print Grades` action
  - The full grades table (Name / Due / Submitted / Status / Score)
    with `missing` / `late` status pills, blue dots, hidden-grade
    eye icons, comment-bubble + numeric badges, and rubric / colour
    swatch indicators
  - Per-group breakdown rows + final `Total` row (e.g. EESA06H3)
- Right rail with `Calculation of totals has been disabled` /
  computed total display, `Show All Details` button,
  `Show Saved "What-If" Scores`, weighted-by-group table, and
  `Calculate based only on graded assignments` checkbox + help blurb
- The "Courses I'm Taking" landing page that lists every course
  with its computed final grade

## Running locally

The site is pure HTML / CSS / vanilla JS — no build step. Serve the
folder from any static server, for example:

```bash
python -m http.server 8000
# then open http://localhost:8000/index.html
```

## Deploy on Render

1. Push this folder to a Git repository (GitHub, GitLab, or Bitbucket).
2. In the [Render Dashboard](https://dashboard.render.com/), choose **New → Static Site**, connect the repo, and set:
   - **Root directory** (optional): leave blank if the repo root *is* this project. If the site lives in a subfolder (e.g. `websites/`), set that path here **or** add `rootDir: websites` under the service in `render.yaml` and keep `staticPublishPath: .` relative to that root.
   - **Build command**: `echo "Static site — no build"` (or leave empty if the UI allows — matches `render.yaml`).
   - **Publish directory**: `.` (current directory after build).
3. Alternatively, use **Blueprints**: add this repo and point Render at `render.yaml` at the repo root so the static site is created automatically.

The app uses **hash** routes (`#/course/...`), so you do not need SPA rewrite rules. `404.html` redirects unknown paths back to `/` for stray URLs.

Environment variable **`SKIP_INSTALL_DEPS=true`** (set in `render.yaml`) skips `npm install` when there are no runtime dependencies.

## File layout

```
websites/
├── index.html   # Page shell + global left navigation
├── styles.css   # Quercus visual styling (navy rail, table, right rail)
├── data.js      # Course / item definitions for all 15 courses
├── app.js       # Hash router + grades-page renderer + math
└── images/      # Reference screenshots used while building the clone
```

## Course list & grade distribution

The user's requested distribution is implemented automatically by the
item-level scores in `data.js`; `app.js` recomputes group totals and the
weighted (or unweighted) final from the items, so component marks ×
weights always equal the displayed final grade.

| # | Course | Term | Final | Tier |
|---|--------|------|-------|------|
| 1 | EESA06H3 — Introduction to Planet Earth | 2026 Winter | 65.3% | 60s |
| 2 | ANT208H1 — Medical Anthropology (Evol.) | 2026 Winter | 71.8% | 70s |
| 3 | MUZA99H3 — Listening to Music | 2026 Winter | 76.3% | 70s |
| 4 | RGASC PELS UTM | 2026 Winter | 72.7% | 70s |
| 5 | Summer 2024 Eagle Squad 11 | 2024 Summer | 75.0% | 70s |
| 6 | ANT102H5 — Medical Anthropology (Bio) | 2024 Fall | 72.9% | 70s |
| 7 | POL114H5 — Canada in Comparative Persp. | 2024 Fall | 74.7% | 70s |
| 8 | SOC109H5 — Sociology of Health & Illness | 2024 Fall | 82.0% | 80s |
| 9 | RLG207H5 — Religion in Practice | 2025 Winter | 76.2% | 70s |
| 10 | POL113H5 — Intro to International Rel. | 2025 Winter | 63.8% | 60s |
| 11 | SOC100H5 — Introduction to Sociology | 2025 Winter | 83.8% | 80s |
| 12 | ISP100H5 — Writing for University | 2025 Winter | 71.0% | 70s |
| 13 | CLA101H5 — Classics & the World Today | 2025 Fall | 61.7% | 60s |
| 14 | PHL113H5 — Logic & Critical Thinking | 2025 Fall | 72.6% | 70s |
| 15 | WGS101H5 — Women's & Gender Studies | 2025 Fall | 85.5% | 80s |

Tier counts: **3 in 80s, 9 in 70s, 3 in 60s** → matches the requested
20% / 60% / 20% split across 15 courses.

## How the grade math works

Every score / weight that appears on the page lives in `data.js` as a
plain item:

```js
A("Unit 5: Earth Materials Assignment", "Virtual Field Trip Assignments",
  "Mar 9 by 11:59p.m.", "Mar 9 at 10:59p.m.", null, 14, 20)
```

In `app.js`:

1. `computeGroupTotals(course)` walks each course's items, sums
   `score / max` per assignment group, and skips items that are
   hidden, excused (`EX`), `✕` (not done), or N/A.
2. `computeFinal(course)`:
   - If `weighting: "weighted"`, it returns
     `Σ (groupRatio × groupWeight)` over the configured weights.
   - If `weighting: "unweighted"`, it returns
     `Σ points / Σ max × 100` across all items.

The same group totals power both the bottom breakdown rows and the
"Total" line, so what the student sees is always self-consistent.
