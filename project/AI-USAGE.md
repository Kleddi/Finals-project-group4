# AI Usage

This project was built with AI assistance: Gemini for most of the starter code, and Claude for reviewing this file and fixing our draft. This file is the record of it.

> Before submitting, make sure the commit links work and that every entry here matches what the group actually did.

Commit links below: `5661a3b` = first upload (2026-09-24), `1788b2c` = second upload / cleanup (2026-09-24), `a72957f` = fixes uploaded 2026-10-04.

## 1. How I used AI

### Entry 1 - HTML page structure
* Date: 2026-09-24
* Tool: Gemini
* What I asked for: Semantic multi-page templates for index, events, calendar, and bookmarks.
* What it gave back: HTML5 boilerplate with a header and navigation.
* What I kept, what I changed, and why: Kept the semantic tags (`<header>`, `<main>`, `<nav>`, `<footer>`). Changed the header to list our real group members, and set `aria-current="page"` on the active nav link of each page so visitors can tell where they are.
* Commit: https://github.com/Kleddi/Finals-project-group4/commit/5661a3b (revised in https://github.com/Kleddi/Finals-project-group4/commit/1788b2c)

### Entry 2 - Reading events.txt in Java
* Date: 2026-09-24
* Tool: Gemini
* What I asked for: A Java method that reads lines from a text file and skips comment lines.
* What it gave back: A loop over `Files.readAllLines` that skips lines starting with `#`.
* What I kept, what I changed, and why: Kept the comment-skipping. Changed the splitting to `line.split("\\|", -1)` and added a check that every line has exactly 8 fields, so bad lines are reported and skipped instead of crashing the program.
* Commit: https://github.com/Kleddi/Finals-project-group4/commit/5661a3b (final version in https://github.com/Kleddi/Finals-project-group4/commit/1788b2c)

### Entry 3 - CSS grid and category colors
* Date: 2026-09-24
* Tool: Gemini
* What I asked for: A responsive CSS grid for event cards with color coding.
* What it gave back: A grid using `repeat(auto-fill, minmax(...))` and CSS variables for colors.
* What I kept, what I changed, and why: Kept the auto-fill grid and the `--academic`, `--social`, `--sports` variables. Changed the minimum card width to 260px to fit our card padding, and tied each color to a `.cat-Academic` / `.cat-Social` / `.cat-Sports` class through a shared `--c` variable.
* Commit: https://github.com/Kleddi/Finals-project-group4/commit/5661a3b (trimmed in https://github.com/Kleddi/Finals-project-group4/commit/1788b2c)

### Entry 4 - Main class to test the reader
* Date: 2026-09-24
* Tool: Gemini
* What I asked for: A sample `Main` class that tests reading events from a text file.
* What it gave back: A try/catch around `EventReader.readEvents()` that prints each event.
* What I kept, what I changed, and why: Kept the loop and the `IOException` handling. Changed the path to `../data/events.txt` to match our folder layout, and added a message telling the user to run it from the `java/` folder.
* Commit: https://github.com/Kleddi/Finals-project-group4/commit/5661a3b (changed in https://github.com/Kleddi/Finals-project-group4/commit/1788b2c)

### Entry 5 - Event data class
* Date: 2026-09-24
* Tool: Gemini
* What I asked for: A Java class to hold the details of one event.
* What it gave back: `Event.java` with private fields, a constructor, getters, and a `toString()`.
* What I kept, what I changed, and why: Kept it almost unchanged because it is a plain data holder. Edited the comments and field list to match our 8 columns (id, title, club, category, date, time, location, description).
* Commit: https://github.com/Kleddi/Finals-project-group4/commit/5661a3b (small edit in https://github.com/Kleddi/Finals-project-group4/commit/1788b2c)

### Entry 6 - Reviewing our draft and fixing files
* Date: 2026-10-04
* Tool: Claude (claude.ai)
* What I asked for: A review of our AI-USAGE draft against the rubric, checked against our actual files.
* What it gave back: A list of problems (placeholder commit links, sections 1 and 3 contradicting each other, "event" placeholders in `events.html`, no README credit) plus a corrected `events.html`, `README.md`, `REPORT.md`, and a draft of this file.
* What I kept, what I changed, and why: Kept the real category names in `events.html`, the README badge and credit, and the softer `REPORT.md` wording. Filled in the real commit links, dates, and our own explanations ourselves, because Claude could not know them.
* Commit: https://github.com/Kleddi/Finals-project-group4/commit/a72957f

## 2. Where the AI got it wrong

### Case 1 - Missing split limit
* What it gave me: `line.split("\\|")` with no limit.
* What was wrong with it: Java drops trailing empty strings, so a row ending in an empty field comes back with fewer than 8 parts and gets wrongly rejected or breaks array indexing.
* What I did instead: `line.split("\\|", -1)`, which keeps trailing empty fields, plus a check for exactly 8 fields.
* Commit: https://github.com/Kleddi/Finals-project-group4/commit/1788b2c

### Case 2 - Wrong file path
* What it gave me: A path of `events.txt`, as if the file sat next to the code.
* What was wrong with it: Our data file was meant to live in `data/`, one folder up from `java/`, so the program threw an `IOException`.
* What I did instead: Changed the path to `../data/events.txt` in `Main.java`.
* Commit: https://github.com/Kleddi/Finals-project-group4/commit/1788b2c

### Case 3 - Placeholder filter buttons
* What it gave me: Filter buttons and tags that all said "event".
* What was wrong with it: They did not match our data categories, so the filters would have been meaningless.
* What I did instead: After reviewing the draft with Claude, we renamed the buttons and tags to Academic, Social, and Sports to match the `cat-` classes and the CSS variables. We caught this late, which is why it needed a review.
* Commit: https://github.com/Kleddi/Finals-project-group4/commit/a72957f

## 3. Who wrote what

We built this together over Discord, and Keane (@Kleddi) uploaded the files to GitHub, so most commits are under his account. Each section below describes the parts that member wrote or changed and points to the commit that contains it. Where a member has pushed their own commit, it is listed as "My own commit".

> Each member section below is written in simple terms based on the work recorded in this file.

### @Kleddi (Keane Gloriani)

Group commit I worked in: `5661a3b`
* Commit: https://github.com/Kleddi/Finals-project-group4/commit/5661a3b

**Written by me**
* File: `index.html` / page navigation
* Commit: https://github.com/Kleddi/Finals-project-group4/commit/5661a3b
* What it does and why it is built this way: I worked on the page structure and navigation, including the group member names and the active-page link. I kept the navigation simple so users can move between the four pages easily. I also kept `aria-current="page"` because it helps show which page the user is currently on.

**The AI-written part I understand best**
* File: the `<nav>` in `index.html` / `events.html`
* Commit: https://github.com/Kleddi/Finals-project-group4/commit/5661a3b
* What it does and why we kept it: The navigation connects the four pages of the website. The link for the page you are currently on is marked with `aria-current="page"`, so it can be styled differently and is also easier for screen readers to understand. We kept it because it is simple and useful.

---

### @ranfyazz (Constantino)

Group commit I worked in: `1788b2c`
* Commit: https://github.com/Kleddi/Finals-project-group4/commit/1788b2c

**Written by me**
* File: `EventReader.java`
* Commit: https://github.com/Kleddi/Finals-project-group4/commit/1788b2c
* What it does and why it is built this way: I worked on the way `EventReader` splits each line and made it keep empty fields at the end. I also added a check for exactly 8 fields. This helps prevent an event with a missing description from being treated as a broken row, and bad rows can be skipped instead of crashing the program.

**The AI-written part I understand best**
* File: `Event.java`
* Commit: https://github.com/Kleddi/Finals-project-group4/commit/5661a3b
* What it does and why we kept it: `Event.java` stores the information for one event, such as its title, club, category, date, time, location, and description. The fields are private and the getters let the other classes access the information. We kept it because it gives `EventReader` a simple object to put the event data into.

---

### @oldspeed159 (Jeric Gurrobat)

Group commit I worked in: `1788b2c`
* Commit: https://github.com/Kleddi/Finals-project-group4/commit/1788b2c

**Written by me**
* File: `style.css` (event cards)
* Commit: https://github.com/Kleddi/Finals-project-group4/commit/1788b2c
* What it does and why it is built this way: I worked on the event-card layout in the CSS. The grid can fit more cards on a wide screen and fewer cards on a smaller screen, while keeping each card at a reasonable width. The category classes also let the border and category tag use the same color.

**The AI-written part I understand best**
* File: `style.css` (focus styles)
* Commit: https://github.com/Kleddi/Finals-project-group4/commit/5661a3b
* What it does and why we kept it: The focus style gives buttons and links an outline when someone is using the keyboard. This makes it easier to see what they are currently selecting without adding the outline every time someone clicks with a mouse.

---

### @mogumogu123123 (Stephen Pangan)

Group commit I worked in: `1788b2c`
* Commit: https://github.com/Kleddi/Finals-project-group4/commit/1788b2c

**Written by me**
* File: `Main.java`
* Commit: https://github.com/Kleddi/Finals-project-group4/commit/1788b2c
* What it does and why it is built this way: I worked on `Main.java` so it looks for the data file using `../data/events.txt`. The data folder is one level above the Java folder, so this matches the project structure. I also kept a simple message telling the user to run it from the `java/` folder if the path is wrong.

**The AI-written part I understand best**
* File: `Main.java` (try/catch)
* Commit: https://github.com/Kleddi/Finals-project-group4/commit/5661a3b
* What it does and why we kept it: The `try/catch` handles the error that can happen when the events file cannot be read. Instead of showing a long Java error message, it gives the user a simpler message explaining what went wrong.
