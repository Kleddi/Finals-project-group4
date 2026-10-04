## Week of: 2026-09-24

## What changed this week
* Created the Java files (`Event.java`, `EventReader.java`, `Main.java`) to read and parse pipe-delimited records from `events.txt`.
* Created the four HTML pages (`index.html`, `events.html`, `calendar.html`, `bookmarks.html`) with shared navigation and our group member names. Only `events.html` has sample cards; the other pages still hold placeholder text.
* Wrote `style.css` with a CSS Grid card layout and color-coded category tags (`--academic`, `--social`, `--sports`).

## Why
To set up the basic structure, data reading, and page layout of the Campus Event & Club Hub.

## What broke or what I got stuck on
* `Main.java` threw an `IOException` until the path was changed to `../data/events.txt` and we ran it from the `java/` folder.
* The AI's first filter buttons all said "event", so we renamed them to Academic, Social, and Sports.
* `script.js` only logs a message, so filtering and the calendar do not work yet.

## What is left
* Build event filtering and the calendar in `script.js` (Week 2), then bookmarks (Week 3).
* Replace placeholder text on the Home, Calendar, and Bookmarks pages.
