// Campus Event & Club Hub - filtering, calendar and bookmarks.

// Backup copy of data/events.txt (used when the page is opened without a web server,
// because browsers block fetch() on file:// pages).
const EMBEDDED = `
# id|title|club|category|date|time|location|description
e01|Midterm Study Marathon|Honor Society|Academic|2026-10-14|09:00|Library Room 204|All-day group study with free coffee and peer tutors for math, science and programming.
e02|Intro to Web Dev Workshop|Computer Science Club|Academic|2026-10-16|15:00|Lab B, IT Building|Hands-on HTML, CSS and JavaScript session for beginners. Bring your laptop.
e03|Intramural Basketball Opener|Varsity Sports Council|Sports|2026-10-17|16:00|Main Gymnasium|Opening games of the intramural season. Come cheer for your department.
e04|Fall Welcome Mixer|Student Council|Social|2026-10-20|18:00|Student Plaza|Meet clubs, enjoy food stalls and live acoustic music.
e05|Research Poster Fair|Science Society|Academic|2026-10-22|10:00|Atrium Hall|Students present research posters. Open to everyone, judges from faculty.
e06|Fun Run 5K|Fitness Club|Sports|2026-10-24|06:30|Campus Oval|A friendly 5K run around campus. Registration includes a free shirt.
e07|Movie Night Under the Stars|Film Society|Social|2026-10-28|19:00|North Lawn|Outdoor screening of a student-voted film. Bring a blanket.
e08|Career Talk: Careers in Tech|Computer Science Club|Academic|2026-11-03|14:00|Auditorium A|Alumni from local tech companies share advice on internships and first jobs.
e09|Volleyball Friendly Match|Varsity Sports Council|Sports|2026-11-07|15:00|Main Gymnasium|Friendly match between the engineering and business teams.
e10|Cultural Night|Cultural Arts Guild|Social|2026-11-12|18:30|Open Theater|Dance, music and food showcasing the many cultures of our campus.
e11|Debate Tournament Finals|Debate Society|Academic|2026-11-18|13:00|Auditorium B|Final round of the inter-college debate tournament.
e12|Badminton Open|Fitness Club|Sports|2026-11-21|09:00|Sports Annex|Singles and doubles badminton tournament for all skill levels.
`;

const KEY = "campusHubBookmarks";
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const pad = (n) => String(n).padStart(2, "0");
const iso = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;

function parse(text) {
  return text.split(/\r?\n/).map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => l.split("|").map((x) => x.trim()))
    .filter((p) => p.length === 8)
    .map((p) => ({ id: p[0], title: p[1], club: p[2], category: p[3], date: p[4], time: p[5], location: p[6], description: p[7] }))
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
}

async function loadEvents() {
  try {
    const r = await fetch("data/events.txt");
    if (!r.ok) throw new Error("not found");
    const list = parse(await r.text());
    if (list.length) return list;
  } catch (e) { /* fall back below */ }
  return parse(EMBEDDED);
}

function getBookmarks() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; }
}
function setBookmarks(ids) {
  try { localStorage.setItem(KEY, JSON.stringify(ids)); } catch (e) { /* storage unavailable */ }
}
function toggleBookmark(id) {
  const ids = getBookmarks();
  const i = ids.indexOf(id);
  if (i >= 0) ids.splice(i, 1); else ids.push(id);
  setBookmarks(ids);
}

function fmtDate(d) {
  return new Date(d + "T00:00:00").toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}
function fmtTime(t) {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}:${pad(m)} ${h >= 12 ? "PM" : "AM"}`;
}

function cardHTML(ev) {
  const saved = getBookmarks().includes(ev.id);
  return `<article class="card cat-${esc(ev.category)}">
    <div class="top">
      <span class="tag">${esc(ev.category)}</span>
      <button class="bm-btn" data-id="${esc(ev.id)}" aria-pressed="${saved}">${saved ? "★ Saved" : "☆ Save"}</button>
    </div>
    <h3>${esc(ev.title)}</h3>
    <p class="meta">${fmtDate(ev.date)} at ${fmtTime(ev.time)} &middot; ${esc(ev.location)}</p>
    <p class="meta">${esc(ev.club)}</p>
    <p>${esc(ev.description)}</p>
  </article>`;
}

function fill(el, list, emptyMsg) {
  el.innerHTML = list.length ? list.map(cardHTML).join("") : `<p class="empty">${emptyMsg}</p>`;
}

// ---------- pages ----------
function initHome(events) {
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((e) => e.date >= today);
  const cats = new Set(events.map((e) => e.category));
  $("#stats").innerHTML =
    `<div class="stat"><strong>${events.length}</strong>events</div>` +
    `<div class="stat"><strong>${new Set(events.map((e) => e.club)).size}</strong>clubs</div>` +
    `<div class="stat"><strong>${cats.size}</strong>categories</div>`;
  return () => fill($("#upcoming"), (upcoming.length ? upcoming : events).slice(0, 3), "No events yet.");
}

function initEvents(events) {
  let cat = "All", q = "";
  const render = () => {
    const list = events.filter((e) =>
      (cat === "All" || e.category === cat) &&
      (e.title + e.club + e.location + e.description).toLowerCase().includes(q));
    fill($("#events"), list, "No events match your search.");
    $("#count").textContent = `Showing ${list.length} of ${events.length} events`;
  };
  document.querySelectorAll(".filter-btn").forEach((b) => b.addEventListener("click", () => {
    cat = b.dataset.cat;
    document.querySelectorAll(".filter-btn").forEach((x) => x.classList.toggle("active", x === b));
    render();
  }));
  $("#search").addEventListener("input", (e) => { q = e.target.value.trim().toLowerCase(); render(); });
  return render;
}

function initCalendar(events) {
  const now = new Date();
  const today = iso(now.getFullYear(), now.getMonth(), now.getDate());
  const first = events.find((e) => e.date >= today) || events[0];
  const start = first ? new Date(first.date + "T00:00:00") : now;
  let y = start.getFullYear(), m = start.getMonth(), selected = first ? first.date : today;

  const render = () => {
    $("#month-label").textContent = new Date(y, m, 1).toLocaleDateString(undefined, { month: "long", year: "numeric" });
    let html = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => `<div class="dow">${d}</div>`).join("");
    const lead = new Date(y, m, 1).getDay(), days = new Date(y, m + 1, 0).getDate();
    for (let i = 0; i < lead; i++) html += `<div class="day blank"></div>`;
    for (let d = 1; d <= days; d++) {
      const key = iso(y, m, d), evs = events.filter((e) => e.date === key);
      html += `<button class="day${key === today ? " today" : ""}${key === selected ? " selected" : ""}" data-date="${key}" aria-label="${fmtDate(key)}, ${evs.length} events">
        <span class="n">${d}</span>${evs.map((e) => `<span class="dot cat-${esc(e.category)}">${esc(e.title)}</span>`).join("")}</button>`;
    }
    $("#calendar").innerHTML = html;
    const dayEvs = events.filter((e) => e.date === selected);
    $("#day-title").textContent = `Events on ${fmtDate(selected)}`;
    fill($("#day-events"), dayEvs, "No events on this day.");
  };
  const shift = (n) => { m += n; if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; } render(); };
  $("#prev").addEventListener("click", () => shift(-1));
  $("#next").addEventListener("click", () => shift(1));
  $("#calendar").addEventListener("click", (e) => {
    const b = e.target.closest(".day[data-date]");
    if (b) { selected = b.dataset.date; render(); }
  });
  return render;
}

function initBookmarks(events) {
  const render = () => {
    const ids = getBookmarks(), list = events.filter((e) => ids.includes(e.id));
    fill($("#bookmarks"), list, 'No saved events yet. Press "Save" on any event in the Events page.');
    $("#bm-count").textContent = `${list.length} saved event${list.length === 1 ? "" : "s"}`;
    $("#clear-bm").hidden = !list.length;
  };
  $("#clear-bm").addEventListener("click", () => { if (confirm("Remove all bookmarks?")) { setBookmarks([]); render(); } });
  return render;
}

// ---------- start ----------
(async function () {
  const page = document.body.dataset.page;
  const inits = { home: initHome, events: initEvents, calendar: initCalendar, bookmarks: initBookmarks };
  if (!inits[page]) return;
  const events = await loadEvents();
  const render = inits[page](events);
  render();
  // One click handler for every Save button on the page.
  document.addEventListener("click", (e) => {
    const b = e.target.closest(".bm-btn");
    if (b) { toggleBookmark(b.dataset.id); render(); }
  });
})();
