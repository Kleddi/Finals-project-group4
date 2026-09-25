## Week of: 2026-09-24

## What changed this week
* Created core Java backend files (`Event.java`, `EventReader.java`, `Main.java`) to read and parse pipe-delimited records from `events.txt`.
* Built the complete multi-page HTML frontend (`index.html`, `events.html`, `calendar.html`, `bookmarks.html`) featuring shared navigation and team metadata.
* Coded a robust UI design system in `style.css` using CSS Grid and color-coded tags for categories (`--academic`, `--social`, `--sports`).

## Why
To establish the core architecture, data ingestion flow, and multi-page user interface for the Campus Event & Club Hub application.

## What broke or what I got stuck on
* `Main.java` threw local `IOException` path errors until relative directory paths (`../data/events.txt`) were properly aligned with execution workspace rules.
* The `script.js` file is currently just a placeholder log, meaning interactive filtering and calendar rendering logic are still pending development.

## What is left
* Implement functional event filtering and calendar generation inside `script.js` for Week 2.
