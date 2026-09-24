// Campus Event & Club Hub: filters, calendar, and bookmarks.
// EVENTS comes from events.js, which the Java program creates.

const ALL = typeof EVENTS !== "undefined" ? EVENTS : [];
const STORAGE_KEY = "hubBookmarks";
let refresh = function () {}; // each page sets this to redraw its event cards

// ---------- Bookmarks (localStorage) ----------
function getBookmarks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function toggleBookmark(id) {
  const ids = getBookmarks();
  const index = ids.indexOf(id);
  if (index === -1) {
    ids.push(id);
  } else {
    ids.splice(index, 1);
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch (e) {
    console.log("Could not save bookmarks", e);
  }
}

// ---------- Helpers ----------
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Turns a Date into "YYYY-MM-DD" so it matches the dates from Java
function toKey(d) {
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return d.getFullYear() + "-" + month + "-" + day;
}

function formatDate(key) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function formatTime(t) {
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  return ((h % 12) || 12) + ":" + String(m).padStart(2, "0") + " " + ampm;
}

function sortEvents(list) {
  return list.slice().sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
}

// ---------- Event cards ----------
function cardHTML(ev) {
  const saved = getBookmarks().includes(ev.id);
  return `
    <article class="card cat-${escapeHtml(ev.category)}">
      <span class="tag">${escapeHtml(ev.category)}</span>
      <h3>${escapeHtml(ev.title)}</h3>
      <p class="meta">${formatDate(ev.date)} at ${formatTime(ev.time)} &middot; ${escapeHtml(ev.location)}</p>
      <p class="meta">Hosted by ${escapeHtml(ev.club)}</p>
      <p>${escapeHtml(ev.description)}</p>
      <button class="bookmark-btn" data-id="${escapeHtml(ev.id)}" aria-pressed="${saved}">
        ${saved ? "&#9733; Saved" : "&#9734; Bookmark"}
      </button>
    </article>`;
}

function showEvents(list, container, emptyMessage) {
  const sorted = sortEvents(list);
  container.innerHTML = sorted.length
    ? sorted.map(cardHTML).join("")
    : `<p class="empty">${emptyMessage}</p>`;
}

// One click listener handles every bookmark button on the page
document.addEventListener("click", function (e) {
  const btn = e.target.closest(".bookmark-btn");
  if (!btn) return;
  toggleBookmark(btn.dataset.id);
  refresh();
});

// ---------- Pages ----------
function initHome() {
  const box = document.getElementById("upcoming");
  const today = toKey(new Date());
  const upcoming = sortEvents(ALL.filter(ev => ev.date >= today)).slice(0, 3);
  refresh = function () {
    showEvents(upcoming, box, "No upcoming events yet. Check back soon!");
  };
  refresh();
}

function initEvents() {
  const box = document.getElementById("events");
  const buttons = document.querySelectorAll(".filter-btn");
  let category = "All";

  refresh = function () {
    const list = category === "All" ? ALL : ALL.filter(ev => ev.category === category);
    showEvents(list, box, "No events in this category yet.");
  };

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      category = btn.dataset.category;
      buttons.forEach(function (b) {
        const isOn = b === btn;
        b.classList.toggle("active", isOn);
        b.setAttribute("aria-pressed", isOn);
      });
      refresh();
    });
  });
  refresh();
}

function initBookmarks() {
  const box = document.getElementById("bookmarked");
  refresh = function () {
    const ids = getBookmarks();
    showEvents(ALL.filter(ev => ids.includes(ev.id)), box,
      "No bookmarks yet. Go to the Events page and tap Bookmark on an event.");
  };
  refresh();
}

function initCalendar() {
  const grid = document.getElementById("calendar-grid");
  const title = document.getElementById("month-title");
  const dayBox = document.getElementById("day-events");
  const today = new Date();
  let view = new Date(today.getFullYear(), today.getMonth(), 1); // first day of the shown month
  let selected = null; // "YYYY-MM-DD" of the clicked day

  function drawMonth() {
    const year = view.getFullYear();
    const month = view.getMonth();
    title.textContent = view.toLocaleDateString("en-US", { month: "long", year: "numeric" });

    const firstWeekday = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let html = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      .map(d => `<div class="dow">${d}</div>`).join("");
    for (let i = 0; i < firstWeekday; i++) {
      html += '<div class="day empty"></div>';
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const key = toKey(new Date(year, month, day));
      const dayEvents = ALL.filter(ev => ev.date === key);
      const dots = dayEvents.map(ev => `<span class="dot cat-${escapeHtml(ev.category)}"></span>`).join("");
      html += `<button class="day${key === selected ? " selected" : ""}" data-date="${key}"
                 aria-label="${formatDate(key)}, ${dayEvents.length} events">
                 <span>${day}</span><span class="dots">${dots}</span></button>`;
    }
    grid.innerHTML = html;
    refresh();
  }

  refresh = function () {
    if (!selected) {
      dayBox.innerHTML = '<p class="empty">Click a day to see its events.</p>';
    } else {
      showEvents(ALL.filter(ev => ev.date === selected), dayBox, "No events on this day.");
    }
  };

  grid.addEventListener("click", function (e) {
    const btn = e.target.closest(".day[data-date]");
    if (!btn) return;
    selected = btn.dataset.date;
    drawMonth();
  });
  document.getElementById("prev-month").addEventListener("click", function () {
    view = new Date(view.getFullYear(), view.getMonth() - 1, 1);
    drawMonth();
  });
  document.getElementById("next-month").addEventListener("click", function () {
    view = new Date(view.getFullYear(), view.getMonth() + 1, 1);
    drawMonth();
  });
  drawMonth();
}

const page = document.body.dataset.page;
if (page === "index") initHome();
if (page === "events") initEvents();
if (page === "calendar") initCalendar();
if (page === "bookmarks") initBookmarks();
