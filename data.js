/* ============================================================
   UofT Quercus Grades Portal — Course Data
   ============================================================
   Student: Aditya Deol
   Grade-distribution targets:
     - 60% of courses (9):  low-to-mid 70s
     - 20% of courses (3):  low-to-mid 80s
     - 20% of courses (3):  low-to-mid 60s
   Each course's group totals are auto-computed from item scores
   (see app.js renderer); items below are hand-tuned so the
   weighted sum lands on the target final grade per course.
   ============================================================ */

window.STUDENT = {
  firstName: "Aditya",
  lastName: "Deol",
  fullName: "Aditya Deol"
};

/* Default sidebar nav templates (Quercus / Canvas style)
   "current" is set per page render. */
const NAV_FULL = [
  "Home", "Announcements", "Syllabus", "Modules",
  "Discussions", "Assignments", "Quizzes",
  "Grades", "Library Resources"
];
const NAV_LITE = ["Home", "Announcements", "Grades", "Modules", "Library Resources"];

/* --------------------------------------------------------------
   Helper builders
   -------------------------------------------------------------- */

// Quick assignment builder
function A(name, group, due, sub, status, score, max, opts = {}) {
  return {
    name, group, due, submitted: sub,
    status: status || null,
    score, max,
    hidden: !!opts.hidden,
    naScore: !!opts.naScore,
    icons: opts.icons || null,
    rowHighlight: !!opts.rowHighlight,
    mutedDue: !!opts.mutedDue,
    mutedSub: !!opts.mutedSub,
    asPercent: !!opts.asPercent
  };
}

/* --------------------------------------------------------------
   COURSES
   -------------------------------------------------------------- */

window.COURSES = [

  /* ============================================================
     1) EESA06H3 S 20261 — Introduction to Planet Earth
     Term: 2026 Winter   Target final: 65% (60s tier)
     Weights: Mid 32, Final 36, VFT 32, BonusAsg 4, BonusQuiz 2,
              BonusScantron 1, Surveys 0  (=107%)
     Calculation enabled — totals visible.
     ============================================================ */
  {
    id: "EESA06H3",
    code: "EESA06H3 S 20261",
    fullCode: "EESA06H3 S 20261:Introduction to Planet Earth",
    shortCode: "EESA06H3 S 20261:Introd",
    title: "Introduction to Planet Earth",
    term: "2026 Winter",
    termSort: 7,
    nav: ["Home", "Syllabus", "Announcements", "Grades", "Modules",
          "Library Resources", "Media Gallery", "Discussions"],
    gradesBadge: 8,
    weighting: "weighted",
    calcDisabled: false,
    weights: [
      { name: "Midterm", weight: 32 },
      { name: "Final Exam", weight: 36 },
      { name: "Virtual Field Trip Assignments", weight: 32 },
      { name: "Bonus Assignment", weight: 4 },
      { name: "Bonus Course Outline Quiz", weight: 2 },
      { name: "Bonus Scantron Quiz", weight: 1 },
      { name: "Surveys", weight: 0 }
    ],
    weightTotalLabel: "107%",
    finalDisplay: "65.3%",
    finalDisplayLetter: "C+",
    items: [
      A("Unit 1: Earth's Structure Assignment", "Virtual Field Trip Assignments",
        "Jan 26 by 11:59p.m.", "", null, 11, 20, { rowHighlight: false }),
      A("Course outline and lecture schedule quiz (worth 2 bonus points)", "Bonus Course Outline Quiz",
        "Jan 31 by 11:59p.m.", "Jan 31 at 11:59p.m.", null, 1.5, 2),
      A("Unit 2: Divergent Boundaries Assignment", "Virtual Field Trip Assignments",
        "Feb 9 by 11:59p.m.", "Feb 9 at 10:42p.m.", null, 11, 20),
      A("Unit 3: Convergent Boundaries Assignment", "Virtual Field Trip Assignments",
        "Feb 16 by 11:59p.m.", "Feb 16 at 4:33p.m.", null, 14, 20),
      A("Unit 4: The Plate Tectonic Paradigm Assignment", "Virtual Field Trip Assignments",
        "Feb 23 by 11:59p.m.", "Feb 23 at 10:25p.m.", null, 13, 20),
      A("Filling out a scantron - 1 bonus mark", "Bonus Scantron Quiz",
        "Mar 6 by 11:59p.m.", "Mar 6 at 10:14a.m.", null, 1, 1),
      A("Unit 5: Earth Materials Assignment", "Virtual Field Trip Assignments",
        "Mar 9 by 11:59p.m.", "Mar 9 at 10:59p.m.", null, 14, 20),
      A("Unit 6: Geologic Time Assignment", "Virtual Field Trip Assignments",
        "Mar 16 by 11:59p.m.", "Mar 16 at 9:14p.m.", null, 10, 20, { mutedDue: true }),
      A("Unit 7: Canadian Shield Assignment", "Virtual Field Trip Assignments",
        "Mar 30 by 11:59p.m.", "Mar 30 at 10:31p.m.", null, 11, 20, { mutedDue: true }),
      A("Unit 8: The Paleozoic Assignment", "Virtual Field Trip Assignments",
        "Mar 30 by 11:59p.m.", "Mar 30 at 11:42p.m.", null, 10, 20, { mutedDue: true }),
      A("Unit 9: The Pleistocene Assignment", "Virtual Field Trip Assignments",
        "Apr 6 by 11:59p.m.", "Apr 6 at 9:18p.m.", null, 9, 20),
      A("Unit 10: The Anthropocene Assignment", "Bonus Assignment",
        "Apr 6 by 11:59p.m.", "Apr 6 at 10:55p.m.", null, 14, 20),
      A("Final Exam", "Final Exam",
        "", "", null, 58, 100),
      A("Midterm Exam", "Midterm",
        "", "", null, 65, 100)
    ],
    showGroupBreakdown: true,
    notice: "Your instructor has not posted the grade. While your instructor has not posted the grade, grade and comment information is unavailable."
  },

  /* ============================================================
     2) ANT208H1 S LEC0101 — Medical Anthropology: Evolutionary
     Term: 2026 Winter   Target: 71%
     Weights: Invigilated tests 80, Tutorials 20
     ============================================================ */
  {
    id: "ANT208H1",
    code: "ANT208H1 S LEC0101",
    fullCode: "ANT208H1 S LEC0101 20261:Medical Anthropology: an Evolutionary Perspective on Human Health",
    shortCode: "ANT208H1 S LEC0101 20",
    title: "Medical Anthropology: an Evolutionary Perspective on Human Health",
    term: "2026 Winter",
    termSort: 7,
    nav: ["Home", "Assignments", "Announcements", "Grades", "Modules", "Library Resources"],
    gradesBadge: 7,
    weighting: "weighted",
    calcDisabled: true,
    weights: [
      { name: "Invigilated tests", weight: 80 },
      { name: "Tutorials", weight: 20 }
    ],
    weightTotalLabel: "100%",
    finalDisplay: "71.4%",
    items: [
      A("Midterm test 1", "Invigilated tests", "", "", null, 14, 20),
      A("Midterm test 2", "Invigilated tests", "", "", null, 14.5, 20),
      A("Tutorial 1", "Tutorials", "", "", null, 4.5, 5),
      A("Tutorial 2", "Tutorials", "", "", null, 3.5, 5),
      A("Tutorial 3", "Tutorials", "", "", null, 3.5, 5, { rowHighlight: false }),
      A("Tutorial 4", "Tutorials", "", "", null, 3.5, 5),
      A("Tutorial 5", "Tutorials", "", "", null, 3.5, 5)
    ],
    groupRowsHidden: ["Invigilated tests", "Tutorials"],
    showGroupBreakdown: false
  },

  /* ============================================================
     3) MUZA99H3 S LEC01 — Listening to Music
     Term: 2026 Winter   Target: 76%   Weighting: NOT weighted
     ============================================================ */
  {
    id: "MUZA99H3",
    code: "MUZA99H3 S LEC01",
    fullCode: "MUZA99H3 S LEC01 20261:Listening to Music",
    shortCode: "MUZA99H3 S LEC01 2026",
    title: "Listening to Music",
    term: "2026 Winter",
    termSort: 7,
    nav: ["Home", "Announcements", "Modules", "Grades", "Assignments"],
    gradesBadge: 4,
    weighting: "unweighted",
    calcDisabled: true,
    weights: [],
    finalDisplay: "76.2%",
    items: [
      A("Assignment 1: Personal Listening Questionnaire", "Assignments",
        "Jan 22 by 11:59p.m.", "Jan 29 at 5:40p.m.", "late", 3.75, 5,
        { icons: [{ kind: "comments", n: 1 }] }),
      A("Assignment 2: Live Music Investigation", "Assignments",
        "Feb 12 by 11:59p.m.", "Feb 12 at 11:08p.m.", null, 7.5, 10,
        { icons: [{ kind: "rubric" }, { kind: "comments", n: 1 }] }),
      A("Assignment 3: Soundwalk Field Notes", "Assignments",
        "Mar 12 by 11:59p.m.", "Mar 13 at 9:14p.m.", null, 7, 10),
      A("Assignment 4: Recorded Music Investigation", "Assignments",
        "Apr 2 by 11:59p.m.", "Apr 8 at 11:47p.m.", "late", 12, 15,
        { icons: [{ kind: "rubric" }, { kind: "comments", n: 2 }] }),
      A("Final Exam", "Tests", "", "", null, 30, 40),
      A("Midterm Test", "Tests", "", "", null, 16, 20)
    ],
    groupRowsHidden: ["Assignments", "Tests"]
  },

  /* ============================================================
     4) RGASC Winter 2026 PELS UTM
     Pass-bearing course   Target: 73%
     ============================================================ */
  {
    id: "RGASC2026PELS",
    code: "RGASC Winter 2026 PELS UTM",
    fullCode: "RGASC Winter 2026 Professional English Language Skills (PELS) UTM",
    shortCode: "RGASC Winter 2026 Profe",
    title: "Professional English Language Skills (PELS)",
    term: "2026 Winter",
    termSort: 7,
    nav: ["Home", "Modules", "Announcements", "Grades", "Library Resources"],
    gradesBadge: 1,
    weighting: "unweighted",
    calcDisabled: true,
    weights: [],
    finalDisplay: "72.7%",
    items: [
      A("Module 1 Quiz", "Assignments", "Feb 2 by 11:30a.m.", "Feb 2 at 11:18a.m.", null, 7.5, 10),
      A("Module 2 Quiz", "Assignments", "Feb 9 by 11:30a.m.", "Feb 9 at 10:55a.m.", null, 7, 10),
      A("Module 3 Quiz", "Assignments", "Feb 23 by 11:30a.m.", "Feb 23 at 11:02a.m.", null, 7, 10),
      A("Module 4 Assignment: Analyze, Paraphrase, Analyze Again!", "Assignments",
        "Mar 2 by 11:30a.m.", "Mar 2 at 9:42a.m.", null, 7, 10),
      A("Module 5 Quiz", "Assignments", "Mar 9 by 11:30a.m.", "Mar 9 at 10:31a.m.", null, 9, 12),
      A("Module 6 Quiz", "Assignments", "Mar 16 by 11:30a.m.", "Mar 16 at 11:05a.m.", null, 7, 10),
      A("Module 7 Quiz", "Assignments", "Mar 23 by 11:30a.m.", "Mar 23 at 10:48a.m.", null, 8, 10),
      A("Module 8 Reflection Assignment", "Assignments",
        "Mar 30 by 11:30p.m.", "Mar 30 at 9:55p.m.", null, 7, 10),
      A("Final CCR PELS (CR/NCR or pass/fail (1=pass, 0=fail))", "Assignments",
        "", "", null, 1, 1),
      A("PELS Final Mark for CCT110 or RLG101 (3% of final grade)", "Assignments",
        "", "", null, 2, 3, { icons: [{ kind: "info" }] })
    ],
    groupRowsHidden: ["Assignments"]
  },

  /* ============================================================
     5) Summer 2024 Eagle Squad 11
     Target: 75%
     ============================================================ */
  {
    id: "EAGLE2024",
    code: "Summer 2024 Eagle Squad 11",
    fullCode: "Summer 2024 Eagle Squad 11",
    shortCode: "Summer 2024 Eagle Squad",
    title: "Eagle Squad 11",
    term: "2024 Summer",
    termSort: 1,
    nav: ["Home", "Announcements", "Grades", "Modules", "Discussions",
          "Quizzes", "Library Resources", "Academic Calendar", "New Student Website"],
    weighting: "unweighted",
    calcDisabled: true,
    weights: [],
    finalDisplay: "75.0%",
    items: [
      A("4.1 - Final Quiz", "Imported Assignments",
        "", "", null, 15, 20)
    ],
    groupRowsHidden: ["Assignments", "Imported Assignments"]
  },

  /* ============================================================
     6) ANT102H5 F 2024 — Medical Anthropology (Bio)
     Target: 73%
     ============================================================ */
  {
    id: "ANT102H5",
    code: "ANT102H5 F 2024- All Sections",
    fullCode: "ANT102H5 F 2024- All Sections",
    shortCode: "ANT102H5 F 2024- All Sec",
    title: "Medical Anthropology: a Biological Perspective",
    term: "2024 Fall",
    termSort: 2,
    nav: ["Home", "Announcements", "Syllabus", "Modules", "Discussions",
          "Assignments", "Quizzes", "Grades", "Library Resources"],
    weighting: "weighted",
    calcDisabled: true,
    showSavedWhatIf: true,
    weights: [
      { name: "Opinion Polls", weight: 5 },
      { name: "Academic Integrity Quiz", weight: 5 },
      { name: "Syllabus Quiz", weight: 5 },
      { name: "Midterm test", weight: 15 },
      { name: "Final Exam", weight: 35 },
      { name: "Weekly In-Class (tutorial) Assignments", weight: 20 },
      { name: "Tutorial Attendance", weight: 7 },
      { name: "Tutorial Participation", weight: 8 }
    ],
    weightTotalLabel: "100%",
    finalDisplay: "73.0%",
    items: [
      // Sept opinion polls in chronological order
      A("Opinion Week 2 - What's culture got to do with it?", "Opinion Polls",
        "", "Sep 8, 2024 at 9:39p.m.", null, 1, 1),
      A("Opinion Week 4 - Emotions", "Opinion Polls",
        "Sep 22, 2024 by 11:59p.m.", "Sep 21, 2024 at 4:19p.m.", null, 1, 1),
      A("4.1 - Final Quiz", "Academic Integrity Quiz",
        "Sep 27, 2024 by 11:59p.m.", "Sep 27, 2024 at 9:16p.m.", null, 16.5, 20),
      A("Syllabus Quiz", "Syllabus Quiz",
        "Sep 27, 2024 by 11:59p.m.", "Sep 27, 2024 at 9:02p.m.", null, 10, 10),
      A("1.2 - Plagiarism Quiz", "Academic Integrity Quiz",
        "", "Sep 27, 2024 at 2:28p.m.", null, 4, 4),
      A("1.3 - Unauthorized Aids Quiz", "Academic Integrity Quiz",
        "", "Sep 27, 2024 at 9:06p.m.", null, 8, 8),
      A("1.4 - Forgery, Concoction, Impersonation, and Other Forms of Cheating Quiz", "Academic Integrity Quiz",
        "", "Sep 27, 2024 at 9:08p.m.", null, 4, 4),
      A("3.1 - Academic Offence Process Quiz", "Academic Integrity Quiz",
        "", "Sep 27, 2024 at 9:10p.m.", null, 4, 5),
      A("Opinion Week 5 - Gift giving", "Opinion Polls",
        "Sep 29, 2024 by 11:59p.m.", "Sep 27, 2024 at 2:47p.m.", null, 1, 1),
      A("Opinion Week 6 - Witchcraft and Magic", "Opinion Polls",
        "Oct 6, 2024 by 11:59p.m.", "Oct 4, 2024 at 2:23p.m.", null, 1, 1),
      A("MIDTERM TEST", "Midterm test",
        "Oct 16, 2024 by 8p.m.", "Oct 16, 2024 at 5:54p.m.", null, 31, 36),
      A("Opinion Week 8 - Intro to linguistic Anthropology", "Opinion Polls",
        "Oct 20, 2024 by 11:59p.m.", "", null, 0, 1),
      A("Opinion Week 9 - Animal communication", "Opinion Polls",
        "Nov 3, 2024 by 11:59p.m.", "Nov 3, 2024 at 3:16p.m.", null, 1, 1),
      A("Opinion Week 10 - Language and worldview", "Opinion Polls",
        "Nov 10, 2024 by 11:59p.m.", "Nov 10, 2024 at 4:09p.m.", null, 1, 1),
      A("Opinion Week 11 - Language acquisition and Socialization", "Opinion Polls",
        "Nov 17, 2024 by 11:59p.m.", "Nov 17, 2024 at 5:21p.m.", null, 1, 1),
      A("Opinion Week 12 - Language and Race", "Opinion Polls",
        "Nov 24, 2024 by 11:59p.m.", "", null, 0, 1),
      A("Opinion Week 13 - Language and Gender", "Opinion Polls",
        "Dec 1, 2024 by 11:59p.m.", "", null, 0, 1, { mutedDue: true, mutedSub: true }),
      A("Assignment 10 - Week 13", "Weekly In-Class (tutorial) Assignments",
        "Dec 4, 2024 by 8p.m.", "Dec 4, 2024 at 3:22p.m.", null, 3, 5),
      A("Final Exam", "Final Exam",
        "Dec 6, 2024 by 11a.m.", "", null, 62, 100),
      // Weekly In-Class assignments (1-9)
      A("Assignment 1", "Weekly In-Class (tutorial) Assignments", "", "", null, 10, 10),
      A("Assignment 2", "Weekly In-Class (tutorial) Assignments", "", "", null, 10, 10),
      A("Assignment 3", "Weekly In-Class (tutorial) Assignments", "", "", null, 10, 10),
      A("Assignment 4", "Weekly In-Class (tutorial) Assignments", "", "", null, 5, 10),
      A("Assignment 5", "Weekly In-Class (tutorial) Assignments", "", "", null, 6, 10, { rowHighlight: true }),
      A("Assignment 6", "Weekly In-Class (tutorial) Assignments", "", "", null, 5, 10, { rowHighlight: true }),
      A("Assignment 7", "Weekly In-Class (tutorial) Assignments", "", "", null, 5, 10),
      A("Assignment 8", "Weekly In-Class (tutorial) Assignments", "", "", null, 6, 10),
      A("Assignment 9", "Weekly In-Class (tutorial) Assignments", "", "", null, 4, 10),
      A("Tutorial Attendance", "Tutorial Attendance", "", "", null, 9, 10),
      A("Tutorial Participation", "Tutorial Participation", "", "", null, 7, 10)
    ]
  },

  /* ============================================================
     7) POL114H5 F LEC0101 — Canada in Comparative Perspective
     Term: 2024 Fall   Target: 74%   Calc disabled / unweighted display
     The screenshot shows raw % per item; we'll preserve that.
     ============================================================ */
  {
    id: "POL114H5",
    code: "POL114H5 F LEC0101",
    fullCode: "POL114H5 F LEC0101 20249",
    shortCode: "POL114H5 F LEC0101 202",
    title: "Canada in Comparative Perspective",
    term: "2024 Fall",
    termSort: 2,
    nav: ["Home", "Announcements", "Grades", "Modules", "Assignments",
          "Syllabus", "Library Reading List", "Library Resources"],
    weighting: "unweighted",
    calcDisabled: true,
    weights: [],
    finalDisplay: "74.0%",
    items: [
      A("Short Reading Reflection (10%) [300-400 words]", "Assignments",
        "Oct 2, 2024 by 11:59p.m.", "Oct 2, 2024 at 11:45p.m.", null, 77, 100,
        { asPercent: true, icons: [{ kind: "comments", n: 1 }, { kind: "swatch", color: "blue" }] }),
      A("Midterm Exam (20%)", "Assignments",
        "Oct 21, 2024 by 11:59p.m.", "", null, 72.5, 100, { asPercent: true }),
      A("Essay: 25% [1200-1500 words, excluding bibliography]", "Assignments",
        "Nov 27, 2024 by 11:59p.m.", "Nov 27, 2024 at 11:50p.m.", null, 73, 100,
        { asPercent: true, icons: [{ kind: "comments", n: 1 }, { kind: "swatch", color: "green" }] }),
      A("bonus mark - survey", "Assignments",
        "", "", null, null, 1, { hidden: true }),
      A("Final Exam (35%) [TBC: Dec 6-19 Exam Period]", "Assignments",
        "", "", null, 76, 100, { asPercent: true }),
      A("Participation: 10%", "Assignments",
        "", "", null, 75, 100, { asPercent: true })
    ],
    groupRowsHidden: ["Assignments"]
  },

  /* ============================================================
     8) SOC109H5 F LEC0101 — Sociology of Health and Illness
     Term: 2024 Fall   Target: 81%
     Calc disabled / unweighted (screenshot shows mixed item types)
     ============================================================ */
  {
    id: "SOC109H5",
    code: "SOC109H5 F LEC0101",
    fullCode: "SOC109H5 F LEC0101 20249",
    shortCode: "SOC109H5 F LEC0101 20",
    title: "Sociology of Health and Illness",
    term: "2024 Fall",
    termSort: 2,
    nav: ["Home", "Announcements", "Modules", "Syllabus", "Assignments",
          "Quizzes", "Library Resources", "Discussions", "Grades"],
    weighting: "unweighted",
    calcDisabled: true,
    showSavedWhatIf: true,
    weights: [],
    finalDisplay: "81.4%",
    items: [
      A("Term Test 1", "Term Tests",
        "Sep 23, 2024 by 10:50a.m.", "Sep 23, 2024 at 10:41a.m.", null, 16.5, 20),
      A("Essay Introduction Assignment", "Essay Introduction Assignment",
        "Oct 21, 2024 by 11:59p.m.", "Oct 23, 2024 at 10:45a.m.", "late", 8.5, 10,
        { icons: [{ kind: "rubric" }, { kind: "comments", n: 3 }] }),
      A("Term Test 2", "Term Tests",
        "Nov 13, 2024 by 10:50a.m.", "Nov 13, 2024 at 10:36a.m.", null, 24, 30),
      A("Analytical Essay", "Analytical Essay",
        "Nov 20, 2024 by 11:59p.m.", "Nov 20, 2024 at 11:56p.m.", null, null, null, { hidden: true }),
      A("Bonus point!", "Essay Introduction Assignment",
        "", "", null, 1, 1)
    ],
    groupRowsHidden: ["Essay Introduction Assignment", "Term Tests",
                      "Analytical Essay", "Final In-Class Test", "In-Class Midterm"],
    notice: "Your instructor has not posted the grade. While your instructor has not posted the grade, grade and comment information is unavailable."
  },

  /* ============================================================
     9) RLG207H5 S LEC0101 — Religion (Reflection journal etc.)
     Term: 2025 Winter   Target: 76%   unweighted display
     ============================================================ */
  {
    id: "RLG207H5",
    code: "RLG207H5 S LEC0101",
    fullCode: "RLG207H5 S LEC0101 20251",
    shortCode: "RLG207H5 S LEC0101 202",
    title: "Religion in Practice",
    term: "2025 Winter",
    termSort: 3,
    nav: ["Home", "Announcements", "Grades", "Modules", "Library Resources",
          "Files", "Assignments", "Pages"],
    weighting: "unweighted",
    calcDisabled: true,
    weights: [],
    finalDisplay: "76.1%",
    items: [
      A("Mid-Term Test", "Tests",
        "Feb 27, 2025 by 2p.m.", "Feb 27, 2025 at 1:46p.m.", null, 22, 30,
        { icons: [{ kind: "rubric" }] }),
      A("Second Upload Link - Reflection Journal", "Assignments",
        "Mar 23, 2025 by 11:59p.m.", "Mar 24, 2025 at 3:58p.m.", "late", 73, 100,
        { asPercent: true, icons: [{ kind: "comments", n: 1 }, { kind: "swatch", color: "green" }] }),
      A("Reflection Journal", "Assignments",
        "Mar 23, 2025 by 11:59p.m.", "Mar 23, 2025 at 11:16p.m.", null, "EX", null,
        { icons: [{ kind: "comments", n: 1 }, { kind: "swatch", color: "red" }],
          mutedDue: true, mutedSub: true }),
      A("Final Exam", "Exams",
        "Apr 25, 2025 by 1p.m.", "", null, 29, 40),
      A("Lecture Participation", "Participation",
        "", "", null, 78, 100, { asPercent: true }),
      A("Tutorial Participation", "Participation",
        "", "", null, 80, 100, { asPercent: true })
    ],
    groupRowsHidden: ["Assignments", "Tests", "Participation", "Exams"]
  },

  /* ============================================================
     10) POL113H5 S LEC0101 — Intro to International Relations
     Term: 2025 Winter   Target: 63%
     Weights: Assg 0, Mid 20, Essay 30, Part 10, Final 40 (= 100%)
     ============================================================ */
  {
    id: "POL113H5",
    code: "POL113H5 S LEC0101",
    fullCode: "POL113H5 S LEC0101 20251",
    shortCode: "POL113H5 S LEC0101 202",
    title: "Introduction to International Relations",
    term: "2025 Winter",
    termSort: 3,
    nav: ["Home", "Announcements", "Grades", "Modules", "Assignments", "Library Resources"],
    weighting: "weighted",
    calcDisabled: true,
    weights: [
      { name: "Assignments", weight: 0 },
      { name: "Mid-term", weight: 20 },
      { name: "Essay", weight: 30 },
      { name: "Participation", weight: 10 },
      { name: "Final Exam", weight: 40 }
    ],
    weightTotalLabel: "100%",
    finalDisplay: "63.4%",
    items: [
      A("Essay", "Essay",
        "Mar 23, 2025 by 11:59p.m.", "Mar 23, 2025 at 11:24p.m.", null, 64, 100,
        { icons: [{ kind: "comments", n: 1 }, { kind: "swatch", color: "red" }] }),
      A("Final Exam", "Final Exam",
        "", "", null, 65, 100),
      A("Mid-term", "Mid-term",
        "", "", null, 62.8, 100),
      A("Participation", "Participation",
        "", "", null, 60, 100)
    ],
    groupRowsHidden: ["Assignments", "Mid-term", "Essay", "Participation", "Final Exam"]
  },

  /* ============================================================
     11) SOC100H5 S LEC0101 — Intro Sociology
     Term: 2025 Winter   Target: 83%
     Weights as in screenshot
     ============================================================ */
  {
    id: "SOC100H5",
    code: "SOC100H5 S LEC0101",
    fullCode: "SOC100H5 S LEC0101 20251",
    shortCode: "SOC100H5 S LEC0101 20",
    title: "Introduction to Sociology",
    term: "2025 Winter",
    termSort: 3,
    nav: ["Home", "Announcements", "Discussions", "Quizzes",
          "Grades", "Assignments"],
    weighting: "weighted",
    calcDisabled: true,
    weights: [
      { name: "Attendance records", weight: 0 },
      { name: "Textbook Interactive Questions Assignment", weight: 4 },
      { name: "Textbook Discussion Questions Assignment", weight: 6 },
      { name: "Writing Assignment", weight: 22 },
      { name: "Module One Test", weight: 10 },
      { name: "Module Two Test", weight: 10 },
      { name: "Module Three Test", weight: 14 },
      { name: "Final Exam", weight: 34 }
    ],
    weightTotalLabel: "100%",
    finalDisplay: "82.7%",
    items: [
      A("Test One", "Module One Test",
        "Jan 30, 2025 by 12:50p.m.", "Jan 30, 2025 at 12:28p.m.", null, 30, 35),
      A("Test Two", "Module Two Test",
        "Feb 11, 2025 by 11:57a.m.", "Feb 11, 2025 at 11:34a.m.", null, 29, 35),
      A("Discussion Questions Assignment", "Textbook Discussion Questions Assignment",
        "Feb 28, 2025 by 11:59p.m.", "Mar 3, 2025 at 4:43p.m.", "late", 26, 30,
        { icons: [{ kind: "comments", n: 1 }, { kind: "swatch", color: "green" }] }),
      A("Test Three", "Module Three Test",
        "Mar 11, 2025 by 11:57a.m.", "Mar 11, 2025 at 11:44a.m.", null, 30, 35),
      A("Writing Assignment", "Writing Assignment",
        "Apr 3, 2025 by 11:59p.m.", "Apr 3, 2025 at 11:59p.m.", null, 85, 100,
        { icons: [{ kind: "rubric" }, { kind: "comments", n: 1 }, { kind: "swatch", color: "green" }] }),
      A("Interactive Questions Assignment", "Textbook Interactive Questions Assignment",
        "Apr 4, 2025 by 11:59p.m.", "Apr 4, 2025 at 11:32p.m.", null, 152, 182),
      A("20251 SOC100 REG", "Final Exam",
        "", "", null, 88, 108),
      A("Peel Social Lab bonus point", "Attendance records",
        "", "", null, 1, 1),
      A("T1 attendance record", "Attendance records",
        "", "", null, 1, 1),
      A("T3 attendance record", "Attendance records",
        "", "", null, 1, 1),
      A("Test 2 Attendance", "Attendance records",
        "", "", null, 1, 1)
    ],
    groupRowsHidden: ["Attendance records", "Textbook Interactive Questions Assignment",
                      "Textbook Discussion Questions Assignment", "Writing Assignment",
                      "Module One Test", "Module Two Test", "Module Three Test", "Final Exam"],
    notice: "Your instructor has not posted the grade. While your instructor has not posted the grade, grade and comment information is unavailable."
  },

  /* ============================================================
     12) ISP100H5 S LEC0117 — Writing for University and Beyond
     Term: 2025 Winter   Target: 71%
     Weights: WS 15, DCA 25, GA 30, FP 20, SE 10
     ============================================================ */
  {
    id: "ISP100H5",
    code: "ISP100H5 S LEC0117",
    fullCode: "ISP100H5 S LEC0117 20251",
    shortCode: "ISP100H5 S LEC0117 202",
    title: "Writing for University and Beyond",
    term: "2025 Winter",
    termSort: 3,
    nav: ["Home", "Announcements", "Modules", "Assignments", "Grades"],
    weighting: "weighted",
    calcDisabled: true,
    weights: [
      { name: "Writing Story", weight: 15 },
      { name: "Discourse Community Analysis", weight: 25 },
      { name: "Genre Analysis", weight: 30 },
      { name: "Final Portfolio", weight: 20 },
      { name: "Scholarly Engagement", weight: 10 }
    ],
    weightTotalLabel: "100%",
    finalDisplay: "70.7%",
    items: [
      A("Writing Story", "Writing Story",
        "Jan 24, 2025 by 9a.m.", "Jan 24, 2025 at 1:41a.m.", null, 78, 100,
        { asPercent: true, icons: [{ kind: "rubric" }, { kind: "comments", n: 1 }] }),
      A("Discourse Community Analysis", "Discourse Community Analysis",
        "Feb 28, 2025 by 11:59p.m.", "Mar 3, 2025 at 4:25p.m.", "late", 69, 100,
        { asPercent: true, icons: [{ kind: "rubric" }, { kind: "comments", n: 2 }] }),
      A("In-class writing: defining genre", "Scholarly Engagement",
        "Mar 11, 2025 by 3p.m.", "", null, "✕", null),
      A("Genre Analysis Rough Draft", "Scholarly Engagement",
        "Mar 25, 2025 by 12p.m.", "Mar 25, 2025 at 11:55a.m.", null, null, null, { hidden: true }),
      A("Genre Analysis - Reader Response", "Scholarly Engagement",
        "Mar 25, 2025 by 3p.m.", "", null, "✕", null,
        { icons: [{ kind: "comments", n: 1 }] }),
      A("Genre Analysis", "Genre Analysis",
        "Mar 28, 2025 by 9a.m.", "Apr 1, 2025 at 12:32a.m.", "late", 72, 100,
        { asPercent: true, icons: [{ kind: "rubric" }, { kind: "comments", n: 3 }] }),
      A("Final Portfolio", "Final Portfolio",
        "Apr 4, 2025 by 9a.m.", "Apr 4, 2025 at 8:46a.m.", null, 70, 100, { asPercent: true }),
      A("Scholarly Engagement", "Scholarly Engagement",
        "", "", null, 65, 100, { asPercent: true })
    ],
    groupRowsHidden: ["Writing Story", "Discourse Community Analysis", "Genre Analysis",
                      "Final Portfolio", "Scholarly Engagement"]
  },

  /* ============================================================
     13) CLA101H5 F LEC0101 — Classics and the World Today
     Term: 2025 Fall   Target: 61%
     ============================================================ */
  {
    id: "CLA101H5",
    code: "CLA101H5 F LEC0101",
    fullCode: "CLA101H5 F LEC0101 20259",
    shortCode: "CLA101H5 F LEC0101 202",
    title: "Classics and the World Today",
    term: "2025 Fall",
    termSort: 5,
    nav: ["Home", "Announcements", "Modules", "Assignments",
          "Grades", "Syllabus", "Library Resources", "Zoom"],
    weighting: "weighted",
    calcDisabled: true,
    weights: [
      { name: "Participation", weight: 10 },
      { name: "Test Gender", weight: 25 },
      { name: "Assignment Worksheet", weight: 2 },
      { name: "Draft of Written Assignment", weight: 5 },
      { name: "Written Assignment", weight: 20 },
      { name: "Final Examination", weight: 30 },
      { name: "Classics and the World Today", weight: 8 }
    ],
    weightTotalLabel: "100%",
    finalDisplay: "61.0%",
    items: [
      A("Classics and the World Today Response", "Classics and the World Today",
        "Oct 10, 2025 by 11:59p.m.", "Dec 5, 2025 at 1:03a.m.", "late", 60, 100, { asPercent: true }),
      A("Test Gender", "Test Gender",
        "Oct 15, 2025 by 11a.m.", "Oct 15, 2025 at 11:14a.m.", null, 64, 100, { asPercent: true }),
      A("Inscription Worksheet", "Assignment Worksheet",
        "Oct 24, 2025 by 11:59p.m.", "Nov 11, 2025 at 4:04p.m.", "late", 13, 20,
        { icons: [{ kind: "rubric" }] }),
      A("Draft of Written Assignment", "Draft of Written Assignment",
        "Nov 7, 2025 by 11:59p.m.", "Nov 7, 2025 at 10:48p.m.", null, 60, 100, { asPercent: true }),
      A("Final Written Assignment", "Written Assignment",
        "Nov 28, 2025 by 11:59p.m.", "Dec 5, 2025 at 1:30a.m.", "late", 58, 100,
        { asPercent: true, icons: [{ kind: "rubric" }, { kind: "comments", n: 1 }] }),
      A("Active Participation", "Participation",
        "", "", null, 70, 100, { asPercent: true }),
      A("Final Examination", "Final Examination",
        "", "", null, 60, 100, { asPercent: true })
    ],
    groupRowsHidden: ["Participation", "Test Gender", "Assignment Worksheet",
                      "Draft of Written Assignment", "Written Assignment",
                      "Final Examination", "Classics and the World Today"]
  },

  /* ============================================================
     14) PHL113H5 F LEC0101 — Critical Thinking / Logic
     Term: 2025 Fall   Target: 73%
     ============================================================ */
  {
    id: "PHL113H5",
    code: "PHL113H5 F LEC0101",
    fullCode: "PHL113H5 F LEC0101 20259",
    shortCode: "PHL113H5 F LEC0101 202",
    title: "Introduction to Logic and Critical Thinking",
    term: "2025 Fall",
    termSort: 5,
    nav: ["Home", "Syllabus", "Announcements", "Assignments",
          "Modules", "Pages", "Grades", "Library Resources"],
    weighting: "weighted",
    calcDisabled: true,
    weights: [
      { name: "Assignments", weight: 0 },
      { name: "Quiz", weight: 15 },
      { name: "In-Class Short Answer Test", weight: 20 },
      { name: "Participation", weight: 20 },
      { name: "Short Paper", weight: 20 },
      { name: "Final Exam REG", weight: 25 }
    ],
    weightTotalLabel: "100%",
    finalDisplay: "72.7%",
    items: [
      A("Course Mark", "Assignments",
        "Dec 1, 2025 by 11:59p.m.", "", null, 73, 100, { asPercent: true }),
      A("Participation", "Participation",
        "Dec 1, 2025 by 11:59p.m.", "", null, 70, 100, { asPercent: true }),
      A("Short Paper", "Short Paper",
        "Dec 5, 2025 by 5p.m.", "", null, 72, 100, { asPercent: true }),
      A("Final Exam REG", "Final Exam REG",
        "", "Jan 21 at 1:22p.m.", null, 73.5, 100, { asPercent: true }),
      A("In-Class Short Answer Test", "In-Class Short Answer Test",
        "", "", null, 75, 100, { asPercent: true }),
      A("Quiz", "Quiz",
        "", "", null, 72, 100, { asPercent: true })
    ],
    groupRowsHidden: ["Assignments", "Quiz", "In-Class Short Answer Test",
                      "Participation", "Short Paper", "Final Exam REG"]
  },

  /* ============================================================
     15) WGS101H5 F LEC0101 — Intro to Women & Gender Studies
     Term: 2025 Fall   Target: 85%
     Calc disabled / unweighted display
     ============================================================ */
  {
    id: "WGS101H5",
    code: "WGS101H5 F LEC0101",
    fullCode: "WGS101H5 F LEC0101 20259",
    shortCode: "WGS101H5 F LEC0101 20",
    title: "Introduction to Women's and Gender Studies",
    term: "2025 Fall",
    termSort: 5,
    nav: ["Home", "Announcements", "Grades", "Files", "Assignments", "Syllabus"],
    weighting: "unweighted",
    calcDisabled: true,
    showSavedWhatIf: true,
    weights: [],
    finalDisplay: "85.0%",
    items: [
      A("Annotated Bibliography & Research Proposal", "Assignments",
        "Oct 14, 2025 by 11:59p.m.", "Oct 16, 2025 at 11:39p.m.", "late", 8.5, 10,
        { icons: [{ kind: "comments", n: 1 }] }),
      A("Research Paper", "Assignments",
        "Nov 19, 2025 by 11:59p.m.", "Nov 19, 2025 at 10:53p.m.", null, 13, 15,
        { icons: [{ kind: "comments", n: 1 }] }),
      A("WGS-Related Paper", "Assignments",
        "Nov 19, 2025 by 11:59p.m.", "", null, 4.25, 5),
      A("Final Exam", "Assignments",
        "", "", null, 30, 35),
      A("Mid-Term Test", "Assignments",
        "", "", null, 12.75, 15),
      A("Tutorial Attendance & Participation", "Assignments",
        "", "", null, 17, 20)
    ],
    groupRowsHidden: ["Assignments"]
  }
];
