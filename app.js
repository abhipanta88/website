/* ============================================================
   UofT Quercus grades UI — SPA renderer
   ============================================================ */

const VIEWPORT = document.getElementById("viewport");
const STATUSBAR = document.getElementById("statusbar");
const LOADING_EL = () => document.getElementById("loadingOverlay");
const LAST_COURSE_KEY = "utoronto_quercus_last_course";

function escapeAttr(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/'/g, "&#39;");
}

function withLoading(run) {
  const el = LOADING_EL();
  if (el) {
    el.hidden = false;
    el.setAttribute("aria-hidden", "false");
  }
  window.scrollTo(0, 0);
  setTimeout(() => {
    try {
      run();
    } finally {
      if (el) {
        el.hidden = true;
        el.setAttribute("aria-hidden", "true");
      }
    }
  }, 520);
}

function parseCourseIdFromHash() {
  const m = /^#course\/([^/]+)/.exec(location.hash || "");
  return m ? m[1] : "";
}

function rememberCourseId(id) {
  try {
    sessionStorage.setItem(LAST_COURSE_KEY, id);
  } catch (_) {}
}

function readLastCourseId() {
  try {
    return sessionStorage.getItem(LAST_COURSE_KEY) || "";
  } catch (_) {
    return "";
  }
}

function updateGlobalNavActive(gn) {
  document.querySelectorAll("#globalNav [data-gn]").forEach((node) => {
    node.classList.remove("active");
  });
  const hit = document.querySelector(`#globalNav [data-gn="${gn}"]`);
  if (hit) hit.classList.add("active");
}

function buildSideNavHtml(course, activeLabel) {
  return `
    <nav class="side-nav" aria-label="Course Navigation">
      <div class="term-label">${escape(course.term)}</div>
      ${course.nav
        .map((label) => {
          const isGrades = label === "Grades";
          const active = label === activeLabel;
          const badge =
            isGrades && course.gradesBadge && active
              ? `<span class="badge">${course.gradesBadge}</span>`
              : "";
          if (isGrades) {
            const cls = active ? "current js-grades-nav" : "js-grades-nav";
            return `<a href="#course/${course.id}" class="${cls}">${escape(label)}${badge}</a>`;
          }
          const cls = active ? "current side-tool-link" : "side-tool-link";
          return `<a href="#" class="${cls}" data-tool="${escapeAttr(label)}">${escape(label)}</a>`;
        })
        .join("")}
    </nav>`;
}

/* ---------- Helpers ---------- */
const escape = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));

const fmtNum = (n) => {
  if (n === null || n === undefined) return "";
  if (typeof n !== "number") return n;
  return Number.isInteger(n) ? String(n) : n.toFixed(2).replace(/\.?0+$/, "");
};

function sortedCoursesByTerm() {
  // Group by term in chronological order
  const order = [
    { sort: 1, label: "Summer 2024" },
    { sort: 2, label: "Fall 2024" },
    { sort: 3, label: "Winter 2025" },
    { sort: 4, label: "Summer 2025" },
    { sort: 5, label: "Fall 2025" },
    { sort: 6, label: "Winter 2026" },
    { sort: 7, label: "Winter 2026" }
  ];
  const groups = new Map();
  for (const t of order) groups.set(t.sort, { label: t.label, courses: [] });
  for (const c of COURSES) {
    if (!groups.has(c.termSort)) groups.set(c.termSort, { label: c.term, courses: [] });
    groups.get(c.termSort).courses.push(c);
  }
  // Merge same-label adjacent groups (e.g., 6 & 7 both Winter 2026)
  return [...groups.entries()]
    .filter(([_, v]) => v.courses.length)
    .sort(([a],[b]) => a - b);
}

/* ---------- Group total / weighted total computation ---------- */
function computeGroupTotals(course) {
  const groups = new Map();
  for (const item of course.items) {
    const g = item.group || "Other";
    if (!groups.has(g)) groups.set(g, { points: 0, max: 0, items: 0, hasGraded: false });
    const G = groups.get(g);

    // Skip items that don't contribute (hidden grade, excused, X, naScore, no max)
    const isHidden = item.hidden;
    const isExcused = item.score === "EX";
    const isXMark = item.score === "✕" || item.score === "X" || item.score === "x";
    if (isHidden || isExcused || isXMark) continue;
    if (item.naScore) continue;
    if (item.score === null || item.score === undefined) continue;
    if (typeof item.score !== "number") continue;
    if (!item.max) continue;

    G.points += item.score;
    G.max    += item.max;
    G.items  += 1;
    G.hasGraded = true;
  }
  return groups;
}

function computeFinal(course) {
  const groupTotals = computeGroupTotals(course);
  if (course.weighting === "weighted") {
    let weighted = 0;
    let weightSum = 0;
    for (const w of course.weights) {
      const G = groupTotals.get(w.name);
      if (!G || !G.hasGraded || G.max === 0) continue;
      const ratio = G.points / G.max;
      weighted += w.weight * ratio;
      weightSum += w.weight;
    }
    return weighted; // already in percentage points
  } else {
    // unweighted: total points / total max
    let p = 0, m = 0;
    for (const G of groupTotals.values()) { p += G.points; m += G.max; }
    return m > 0 ? (p / m * 100) : 0;
  }
}

/* ============================================================
   Top breadcrumb bar
   ============================================================ */
function topBar(crumbs) {
  // crumbs = [{label, href?}, ...]
  return `
    <div class="top-bar">
      <button class="hamburger" aria-label="Menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="6"  x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
      <nav class="crumbs">
        ${crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1;
          const sep = i > 0 ? `<span class="sep">›</span>` : "";
          if (isLast) return `${sep}<span class="current">${escape(c.label)}</span>`;
          const cls = c.cls ? ` class="${escapeAttr(c.cls)}"` : "";
          return `${sep}<a href="${c.href || "#"}"${cls}>${escape(c.label)}</a>`;
        }).join("")}
      </nav>
    </div>
  `;
}

/* ============================================================
   Courses I'm Taking (root)
   ============================================================ */
function renderRoot() {
  const groups = sortedCoursesByTerm();

  const crumbs = [
    { label: STUDENT.fullName, href: "#" },
    { label: "Grades" }
  ];

  let courseListHtml = "";
  // Show "Courses I'm Taking" as a flat list (matches screenshot) but include all
  const allCourses = COURSES.slice().sort((a,b) => b.termSort - a.termSort);
  courseListHtml += `<div class="courses-list">`;
  for (const c of allCourses) {
    const grade = computeFinal(c);
    const showAsDim = !c.finalDisplay || c.finalDisplay === "--";
    const display = showAsDim ? "--" : `${grade.toFixed(1)}%`;
    courseListHtml += `
      <div class="course-row">
        <a href="#course/${c.id}">${escape(c.fullCode)}</a>
        <div class="grade ${showAsDim ? 'dim' : ''}">${display}</div>
      </div>`;
  }
  courseListHtml += `</div>`;

  VIEWPORT.innerHTML = `
    <div class="courses-page">
      ${topBar(crumbs).replace(`<div class="top-bar">`, `<div class="top-bar" style="padding-left:0;border:none;">`)}
      <h1>Courses I'm Taking</h1>
      ${courseListHtml}
    </div>
  `;
  updateGlobalNavActive("courses");
}

/* ============================================================
   Course Grades page
   ============================================================ */
function renderCourse(courseId) {
  const course = COURSES.find(c => c.id === courseId);
  if (!course) { renderRoot(); return; }
  rememberCourseId(course.id);

  /* ------- Top breadcrumbs: short course code › Grades › Aditya Deol ------- */
  const crumbs = [
    { label: course.code, href: "#", cls: "js-nav-courses" },
    { label: "Grades", href: `#course/${course.id}` },
    { label: STUDENT.fullName }
  ];

  /* ------- Side nav (per-course menu) ------- */
  const sideNavHtml = buildSideNavHtml(course, "Grades");

  /* ------- Group totals computed once, used for breakdown rows + weighted total ------- */
  const groupTotals = computeGroupTotals(course);
  const finalNum = computeFinal(course);
  const finalDisplay = `${finalNum.toFixed(1)}%`;

  /* ------- Right rail ------- */
  let rightRail = `<aside class="right-rail">`;
  if (course.id === "EESA06H3") {
    rightRail += `<div class="total-line"><strong>Total: ${finalDisplay} (C+)</strong></div>`;
  } else if (course.calcDisabled) {
    rightRail += `<h3>Calculation of totals has<br/>been disabled</h3>`;
  }

  if (course.showSavedWhatIf) {
    rightRail += `
      <div class="show-saved" role="button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
        </svg>
        Show Saved "What-If"<br/>Scores
      </div>`;
  }

  rightRail += `<button class="btn-show-details">Show All Details</button>`;

  if (course.weighting === "weighted") {
    rightRail += `<div class="weighted-label">Assignments are weighted by<br/>group:</div>`;
    rightRail += `
      <table class="weights">
        <thead><tr><th>Group</th><th>Weight</th></tr></thead>
        <tbody>
          ${course.weights.map(w => `
            <tr><td>${escape(w.name)}</td><td>${w.weight}%</td></tr>
          `).join("")}
          <tr><td><strong>Total</strong></td><td><strong>${escape(course.weightTotalLabel || "100%")}</strong></td></tr>
        </tbody>
      </table>
    `;
  } else if (course.weighting === "unweighted") {
    rightRail += `<div class="unweighted-label">Course assignments are not<br/>weighted.</div>`;
  }

  rightRail += `
    <label class="check-line">
      <input type="checkbox" checked />
      <span>Calculate based only on<br/>graded assignments</span>
    </label>
    <div class="help-blurb">
      You can view your grades based on What-If scores so that you know how grades will be affected by upcoming or resubmitted assignments. You can test scores for an assignment that already includes a score, or an assignment that has yet to be graded.
    </div>
  `;
  rightRail += `</aside>`;

  /* ------- Print row + course/arrange selectors ------- */
  const toolbar = `
    <div class="print-row">
      <button class="btn" onclick="window.print()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="6" y="3" width="12" height="6"/>
          <rect x="4" y="9" width="16" height="9" rx="1"/>
          <rect x="6" y="15" width="12" height="6"/>
        </svg>
        Print Grades
      </button>
    </div>
    <h1 class="page-title">Grades for ${escape(STUDENT.fullName)}</h1>
    <div class="toolbar-row">
      <div class="field">
        <label>Course</label>
        <select id="courseSelect">
          ${COURSES.map(c => {
            const sel = c.id === course.id ? "selected" : "";
            return `<option value="${escape(c.id)}" ${sel}>${escape(c.shortCode || c.code)}</option>`;
          }).join("")}
        </select>
      </div>
      <div class="field">
        <label>Arrange By</label>
        <select id="arrangeSelect">
          <option>Due Date</option>
          <option>Title</option>
          <option>Module</option>
          <option>Assignment Group</option>
        </select>
      </div>
      <button class="btn btn-primary" id="applyBtn">Apply</button>
    </div>
  `;

  /* ------- Items table ------- */
  let rows = "";
  for (const it of course.items) {
    rows += renderItemRow(it);
  }

  // Group breakdown rows (visible at bottom)
  if (course.showGroupBreakdown) {
    // Show full breakdown like EESA06H3 (Show All Details expanded)
    for (const w of course.weights) {
      const G = groupTotals.get(w.name);
      const points = G ? G.points : 0;
      const max = G ? G.max : 0;
      const ratio = (max > 0) ? `${(points/max*100).toFixed(0)}%` : "N/A";
      const ptsStr = max > 0
        ? `${points.toFixed(2)} / ${max.toFixed(2)}`
        : `0.00 / 0.00`;
      rows += `
        <tr class="group-row">
          <td><strong>${escape(w.name)}</strong></td>
          <td></td><td></td><td></td>
          <td class="col-score">
            <div style="display:inline-block;min-width:60px">${ratio}</div>
            <span style="margin-left:32px">${ptsStr}</span>
          </td>
        </tr>`;
    }
    // Total row
    rows += `
      <tr class="total-row">
        <td><strong>Total</strong></td>
        <td></td><td></td><td></td>
        <td class="col-score"><strong>${finalDisplay}</strong></td>
      </tr>`;
  } else if (course.groupRowsHidden) {
    // Render eye-icon group rows (like ANT208 & most others)
    for (const g of course.groupRowsHidden) {
      rows += `
        <tr class="group-row">
          <td><strong>${escape(g)}</strong></td>
          <td></td><td></td><td></td>
          <td class="col-score">${eyeSvg()}</td>
        </tr>`;
    }
  }

  let footerNoticeHtml = "";
  if (course.notice) {
    footerNoticeHtml = `
      <div class="footer-notice">
        <span class="eye-icon">${eyeSvg()}</span>
        <span>${escape(course.notice)}</span>
      </div>`;
  }

  const tableHtml = `
    <div class="table-scroll" role="region" aria-label="Grade table">
    <table class="grades-table">
      <colgroup>
        <col class="col-name" />
        <col class="col-due" />
        <col class="col-submitted" />
        <col class="col-status" />
        <col class="col-score" />
      </colgroup>
      <thead>
        <tr>
          <th>Name</th>
          <th>Due</th>
          <th>Submitted</th>
          <th>Status</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
    </div>
    ${footerNoticeHtml}
  `;

  const pageClass = "page";

  VIEWPORT.innerHTML = `
    ${topBar(crumbs)}
    <div class="${pageClass}">
      ${sideNavHtml}
      <section class="content">
        ${toolbar}
        ${tableHtml}
      </section>
      ${rightRail}
    </div>
  `;

  // Wire up Apply: always re-render; change hash when switching course
  const applyBtn = document.getElementById("applyBtn");
  const courseSelect = document.getElementById("courseSelect");
  if (applyBtn && courseSelect) {
    applyBtn.addEventListener("click", () => {
      const id = courseSelect.value;
      withLoading(() => {
        if (id && id !== course.id) {
          location.hash = `#course/${id}`;
        } else {
          renderCourse(id || course.id);
        }
      });
    });
  }

  updateGlobalNavActive("courses");
}

/* ---------- Item row renderer ---------- */
function renderItemRow(item) {
  const groupLabel = item.group || "";

  let scoreCell = "";
  if (item.hidden) {
    scoreCell = `<span class="hidden-eye">${eyeSvg()}</span>${item.max ? ` / ${fmtNum(item.max)}` : ""}`;
  } else if (item.naScore) {
    scoreCell = `- / ${fmtNum(item.max)} <span class="blue-dot"></span>`;
  } else if (item.score === "EX") {
    scoreCell = `EX <span class="blue-dot"></span>`;
  } else if (item.score === "✕" || item.score === "X" || item.score === "x") {
    scoreCell = `✕ <span class="blue-dot"></span>`;
  } else if (item.score === null || item.score === undefined) {
    scoreCell = `- / ${fmtNum(item.max)}`;
  } else if (item.asPercent) {
    scoreCell = `${fmtNum(item.score)}% <span class="blue-dot"></span>`;
  } else if (item.max != null) {
    scoreCell = `${fmtNum(item.score)} / ${fmtNum(item.max)} <span class="blue-dot"></span>`;
  } else {
    scoreCell = `${fmtNum(item.score)} <span class="blue-dot"></span>`;
  }

  let statusCell = "";
  if (item.status === "missing") {
    statusCell = `<span class="status-pill">missing</span>`;
  } else if (item.status === "late") {
    statusCell = `<span class="status-pill late">late</span>`;
  }

  const dueClass  = item.mutedDue  ? "col-due muted"       : "col-due";
  const subClass  = item.mutedSub  ? "col-submitted muted" : "col-submitted";

  let iconsHtml = "";
  if (item.icons && item.icons.length) {
    iconsHtml = `<span class="icons-cell">`;
    for (const ic of item.icons) {
      if (ic.kind === "rubric") {
        iconsHtml += `<span class="icon-pill" title="rubric">${rubricSvg()}</span>`;
      } else if (ic.kind === "comments") {
        iconsHtml += `<span class="icon-pill" title="comments">${commentsSvg()} ${ic.n || ""}</span>`;
      } else if (ic.kind === "swatch") {
        iconsHtml += `<span class="swatch ${ic.color || 'blue'}"></span>`;
      } else if (ic.kind === "info") {
        iconsHtml += `<span class="icon-pill" title="info">${infoSvg()}</span>`;
      }
    }
    iconsHtml += `</span>`;
  }

  const rowClass = item.rowHighlight ? "row-highlight" : "";

  return `
    <tr class="${rowClass}">
      <td class="assignment-name">
        <a href="#">${escape(item.name)}</a>
        <div class="assignment-group">${escape(groupLabel)}</div>
      </td>
      <td class="${dueClass}">${escape(item.due || "")}</td>
      <td class="${subClass}">${escape(item.submitted || "")}</td>
      <td class="col-status">${statusCell}</td>
      <td class="col-score"><span class="score-main">${scoreCell}</span>${iconsHtml}</td>
    </tr>
  `;
}

/* ---------- Inline SVGs ---------- */
function eyeSvg() {
  return `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/>
    <circle cx="12" cy="12" r="2.5"/>
    <line x1="3" y1="3" x2="21" y2="21"/>
  </svg>`;
}
function commentsSvg() {
  return `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>`;
}
function rubricSvg() {
  return `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6">
    <rect x="3" y="3" width="18" height="18" rx="1"/>
    <line x1="3" y1="9" x2="21" y2="9"/>
    <line x1="3" y1="15" x2="21" y2="15"/>
    <line x1="9" y1="3" x2="9" y2="21"/>
  </svg>`;
}
function infoSvg() {
  return `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6">
    <circle cx="12" cy="12" r="9"/>
    <line x1="12" y1="11" x2="12" y2="16"/>
    <circle cx="12" cy="8" r="0.8" fill="currentColor"/>
  </svg>`;
}

/* ============================================================
   Global / course tool placeholders + navigation
   ============================================================ */

const GLOBAL_PLACEHOLDER_COPY = {
  dashboard: {
    title: "Dashboard",
    lines: [
      "Your Canvas dashboard lists cards for each course, upcoming assignments, and recent activity.",
      "Additional course widgets and announcements appear here as your instructors publish them."
    ]
  },
  account: {
    title: "Account",
    lines: [
      "Manage notification preferences, display settings, pronouns, and your profile photo.",
      "Account changes are applied in your live Quercus session when you sign in through your institution."
    ]
  },
  groups: {
    title: "Groups",
    lines: [
      "Student groups and group assignments appear when your courses use them.",
      "Your instructor can add you to groups at any point in the term."
    ]
  },
  calendar: {
    title: "Calendar",
    lines: [
      "The Canvas calendar aggregates due dates from every enrolled course.",
      "Subscribe with your preferred calendar app from the Calendar menu in Quercus."
    ]
  },
  inbox: {
    title: "Inbox",
    lines: [
      "Conversations with instructors and classmates appear here; the badge shows unread messages.",
      "Select a course filter to narrow messages by course."
    ]
  },
  history: {
    title: "History",
    lines: [
      "Recently viewed pages across Quercus are listed here for quick access.",
      "History reflects pages you have opened while signed in."
    ]
  },
  materials: {
    title: "Materials Costs",
    lines: [
      "Course material fees and opt-out notices appear in this panel when your campus enables them.",
      "Contact your department if you have questions about listed materials."
    ]
  },
  evals: {
    title: "Course Evals",
    lines: [
      "End-of-term course evaluation links appear here during the official evaluation window.",
      "Your instructor will announce when evaluations are open."
    ]
  },
  help: {
    title: "Help",
    lines: [
      "Canvas documentation, Quercus support articles, and chat links are available from the Help menu.",
      "For technical issues, contact your campus help desk."
    ]
  }
};

function renderGlobalPlaceholderPage(gnKey) {
  const copy = GLOBAL_PLACEHOLDER_COPY[gnKey] || {
    title: "Quercus",
    lines: ["This page has no additional content to display right now."]
  };
  const crumbs = [
    { label: "Courses", href: "#", cls: "js-nav-courses" },
    { label: copy.title },
    { label: STUDENT.fullName }
  ];
  const paras = copy.lines.map((t) => `<p>${escape(t)}</p>`).join("");
  VIEWPORT.innerHTML = `
    ${topBar(crumbs)}
    <div class="placeholder-full">
      <div class="placeholder-inner">
        <h2>${escape(copy.title)}</h2>
        ${paras}
        <p class="hint"><a href="#" class="js-nav-courses">Return to Courses</a> · University of Toronto Quercus</p>
      </div>
    </div>
  `;
}

function toolPlaceholderBody(toolName, course) {
  const code = escape(course.code);
  const id = course.id;
  const gradeLink = `<a href="#course/${id}">Grades</a>`;
  switch (toolName) {
    case "Home":
      return `<p>Course home for <strong>${code}</strong> has no additional content to display on this page. Use ${gradeLink} in the course menu to open the gradebook.</p>`;
    case "Announcements":
      return `<p>There are no announcements to show for <strong>${code}</strong>.</p>`;
    case "Modules":
      return `<p>There are no modules to display yet for <strong>${code}</strong>.</p>`;
    case "Assignments":
      return `<p>No assignments are listed on this page for <strong>${code}</strong>. Use ${gradeLink} to view graded work.</p>`;
    case "Syllabus":
      return `<p>The syllabus for <strong>${code}</strong> opens here as a page or file when your instructor publishes it.</p>`;
    case "Discussions":
      return `<p>There are no discussions to display for <strong>${code}</strong>.</p>`;
    case "Quizzes":
      return `<p>There are no quizzes listed for <strong>${code}</strong> on this page.</p>`;
    case "Files":
      return `<p>Files and folders for <strong>${code}</strong> will appear here when your instructor adds them.</p>`;
    case "Pages":
      return `<p>Course pages for <strong>${code}</strong> will appear here when published.</p>`;
    case "Zoom":
      return `<p>Scheduled meetings for <strong>${code}</strong> appear here when the Zoom integration is enabled.</p>`;
    case "Media Gallery":
      return `<p>There is no media to display for <strong>${code}</strong> yet.</p>`;
    case "Library Resources":
    case "Library Reading List":
      return `<p>Library resources for <strong>${code}</strong> are provided through University of Toronto Libraries.</p>`;
    case "Academic Calendar":
    case "New Student Website":
      return `<p>This link opens an external resource in a new browser tab.</p>`;
    default:
      return `<p>The <strong>${escape(toolName)}</strong> section for <strong>${code}</strong> has no items to display. Use ${gradeLink} to view grades.</p>`;
  }
}

function renderCourseToolPage(courseId, toolName) {
  const course = COURSES.find((c) => c.id === courseId);
  if (!course) {
    renderRoot();
    return;
  }
  rememberCourseId(course.id);
  updateGlobalNavActive("courses");
  const crumbs = [
    { label: course.code, href: "#", cls: "js-nav-courses" },
    { label: toolName },
    { label: STUDENT.fullName }
  ];
  const sideNav = buildSideNavHtml(course, toolName);
  const bodyHtml = toolPlaceholderBody(toolName, course);
  VIEWPORT.innerHTML = `
    ${topBar(crumbs)}
    <div class="page no-rail">
      ${sideNav}
      <section class="content placeholder-wrap">
        <div class="placeholder-inner">
          <h2>${escape(toolName)}</h2>
          ${bodyHtml}
          <p class="hint"><a href="#course/${course.id}">Back to Grades</a> · University of Toronto Quercus</p>
        </div>
      </section>
    </div>
  `;
}

function onGlobalNavClick(e) {
  const target = e.target.closest("[data-gn]");
  if (!target) return;
  const gn = target.dataset.gn;
  if (!gn) return;
  e.preventDefault();
  if (gn === "courses") {
    withLoading(() => {
      if (location.hash && location.hash !== "#") {
        location.hash = "";
      } else {
        renderRoot();
      }
      updateGlobalNavActive("courses");
    });
    return;
  }
  if (gn === "logo") {
    withLoading(() => {
      renderGlobalPlaceholderPage("dashboard");
      updateGlobalNavActive("dashboard");
    });
    return;
  }
  const keys = new Set([
    "account",
    "dashboard",
    "groups",
    "calendar",
    "inbox",
    "history",
    "materials",
    "evals",
    "help"
  ]);
  if (keys.has(gn)) {
    withLoading(() => {
      renderGlobalPlaceholderPage(gn);
      updateGlobalNavActive(gn);
    });
  }
}

function onCourseToolClick(e) {
  const a = e.target.closest(".side-nav a.side-tool-link[data-tool]");
  if (!a) return;
  e.preventDefault();
  const toolName = a.getAttribute("data-tool");
  if (!toolName) return;
  const courseId = parseCourseIdFromHash() || readLastCourseId();
  if (!courseId) return;
  withLoading(() => renderCourseToolPage(courseId, toolName));
}

function onNavCoursesClick(e) {
  const a = e.target.closest("a.js-nav-courses");
  if (!a) return;
  e.preventDefault();
  withLoading(() => {
    if (location.hash && location.hash !== "#") {
      location.hash = "";
    } else {
      renderRoot();
    }
    updateGlobalNavActive("courses");
  });
}

function onGradesNavClick(e) {
  const a = e.target.closest("a.js-grades-nav");
  if (!a) return;
  e.preventDefault();
  const href = a.getAttribute("href") || "";
  const m = /^#course\/([^/]+)$/.exec(href);
  if (!m) return;
  const id = m[1];
  if (location.hash !== `#course/${id}`) {
    location.hash = `#course/${id}`;
    return;
  }
  withLoading(() => renderCourse(id));
}

/* ============================================================
   Hash router
   ============================================================ */
function route() {
  const hash = location.hash || "";
  if (hash.startsWith("#course/")) {
    renderCourse(hash.slice("#course/".length));
  } else {
    renderRoot();
  }
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", route);
route();

const globalNavEl = document.getElementById("globalNav");
if (globalNavEl) globalNavEl.addEventListener("click", onGlobalNavClick);
document.body.addEventListener("click", onCourseToolClick);
document.body.addEventListener("click", onNavCoursesClick);
document.body.addEventListener("click", onGradesNavClick);

/* Show URL status pill on hover over course links (like browser status bar in screenshots) */
document.addEventListener("mouseover", (e) => {
  const a = e.target.closest("a[href^='#course/']");
  if (a) {
    STATUSBAR.hidden = false;
    STATUSBAR.textContent = "https://q.utoronto.ca";
  }
});
document.addEventListener("mouseout", (e) => {
  if (e.target.closest("a[href^='#course/']")) {
    STATUSBAR.hidden = true;
  }
});
