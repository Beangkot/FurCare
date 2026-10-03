/* ============================================================
   FurCare - Main Application Script
   ------------------------------------------------------------
   Handles all dynamic rendering across every page:
   - Navigation bar & mobile menu
   - Footer with newsletter / links
   - Home: feature cards + statistics cards
   - My Pets: pet cards, search & filtering
   - Calendar: monthly grid + reminders
   - Alerts: alert cards + summary
   - Profile: settings list
   - Scroll reveal animations
   ============================================================ */

'use strict';

/* ============================================================
   01. DATA STORES
   ============================================================ */

/* Navigation links - rendered on every page */
const NAV_LINKS = [
  { label: 'Home',    icon: 'fa-house',          url: 'index.html' },
  { label: 'My Pets', icon: 'fa-paw',            url: 'pets.html' },
  { label: 'Calendar', icon: 'fa-calendar-days', url: 'calendar.html' },
  { label: 'Alerts',  icon: 'fa-bell',           url: 'alerts.html' },
  { label: 'Profile', icon: 'fa-circle-user',    url: 'profile.html' }
];

/* Footer quick links */
const FOOTER_LINKS = {
  navigate: [
    { label: 'Home',        url: 'index.html' },
    { label: 'My Pets',     url: 'pets.html' },
    { label: 'Calendar',    url: 'calendar.html' },
    { label: 'Alerts',      url: 'alerts.html' },
    { label: 'Profile',     url: 'profile.html' }
  ],
  services: [
    { label: 'Pet Health Records', url: '#' },
    { label: 'Vaccination Tracking', url: '#' },
    { label: 'Feeding Schedules', url: '#' },
    { label: 'Vet Appointments', url: '#' },
    { label: 'Emergency Alerts', url: '#' }
  ]
};

const SOCIAL_LINKS = [
  { icon: 'fa-facebook-f', url: '#' },
  { icon: 'fa-x-twitter',  url: '#' },
  { icon: 'fa-instagram',  url: '#' },
  { icon: 'fa-youtube',    url: '#' }
];

/* Feature cards for the Home page */
const FEATURES = [
  {
    icon: 'fa-paw',
    cls: 'c-1',
    title: 'Health Records',
    text: 'Store medical history, weight and growth charts for every pet in one secure place.',
    link: 'pets.html'
  },
  {
    icon: 'fa-calendar-check',
    cls: 'c-2',
    title: 'Smart Scheduling',
    text: 'Never miss a vaccination, feeding time or vet visit with our intelligent calendar.',
    link: 'calendar.html'
  },
  {
    icon: 'fa-bell',
    cls: 'c-3',
    title: 'Smart Alerts',
    text: 'Get instant reminders for medicines, appointments and wellness checkups.',
    link: 'alerts.html'
  },
  {
    icon: 'fa-heart-pulse',
    cls: 'c-4',
    title: 'Wellness Insights',
    text: 'Track activity, mood and nutrition so your furry friend stays at their best.',
    link: 'pets.html'
  }
];

/* Statistics for the Home page */
const STATS = [
  { icon: 'fa-paw',        num: '24', suffix: '',  label: 'Pets Cared For' },
  { icon: 'fa-shield-heart', num: '186', suffix: '+', label: 'Vaccinations' },
  { icon: 'fa-calendar-check', num: '132', suffix: '', label: 'Appointments' },
  { icon: 'fa-star',       num: '4.9', suffix: '',  label: 'Rating' }
];

/* Pet data - rendered as cards on the My Pets page */
const PETS = [
  {
    name: 'Buddy',
    breed: 'Golden Retriever',
    age: 3,
    weight: '28 kg',
    status: 'Healthy',
    statusBadge: 'success',
    icon: 'fa-paw'
  },
  {
    name: 'Luna',
    breed: 'Siamese Cat',
    age: 2,
    weight: '4 kg',
    status: 'Healthy',
    statusBadge: 'success',
    icon: 'fa-paw'
  },
  {
    name: 'Max',
    breed: 'German Shepherd',
    age: 5,
    weight: '32 kg',
    status: 'In Treatment',
    statusBadge: 'warning',
    icon: 'fa-paw'
  },
  {
    name: 'Coco',
    breed: 'Poodle',
    age: 4,
    weight: '8 kg',
    status: 'Healthy',
    statusBadge: 'success',
    icon: 'fa-paw'
  },
  {
    name: 'Bella',
    breed: 'Persian Cat',
    age: 1,
    weight: '3.5 kg',
    status: 'Needs Vet',
    statusBadge: 'danger',
    icon: 'fa-paw'
  },
  {
    name: 'Rocky',
    breed: 'Beagle',
    age: 6,
    weight: '12 kg',
    status: 'Recovering',
    statusBadge: 'info',
    icon: 'fa-paw'
  }
];

/* Pet filters */
const PET_FILTERS = ['All', 'Dogs', 'Cats'];

/* Alerts data - rendered on the Alerts page */
const ALERTS = [
  {
    type: 'danger',
    icon: 'fa-syringe',
    title: 'Vaccination Due',
    desc: 'Luna is due for her annual feline vaccination. Book a vet appointment soon.',
    date: 'Aug 08, 2026',
    time: '2 days left',
    badge: 'Urgent'
  },
  {
    type: 'warning',
    icon: 'fa-pills',
    title: 'Medication Reminder',
    desc: 'Max needs his daily anti-inflammatory dose before breakfast.',
    date: 'Aug 06, 2026',
    time: 'Today',
    badge: 'Pending'
  },
  {
    type: 'info',
    icon: 'fa-calendar-check',
    title: 'Vet Appointment',
    desc: 'Yearly wellness check-up for Buddy at City Pet Clinic, 10:30 AM.',
    date: 'Aug 12, 2026',
    time: 'In 6 days',
    badge: 'Scheduled'
  },
  {
    type: 'warning',
    icon: 'fa-bowl-food',
    title: 'Feeding Reminder',
    desc: "Coco's lunch portion is due. Don't forget the dental chews afterwards.",
    date: 'Aug 06, 2026',
    time: '12:00 PM',
    badge: 'Pending'
  },
  {
    type: 'success',
    icon: 'fa-shield-heart',
    title: 'Treatment Completed',
    desc: 'Rocky finished his antibiotics course. Schedule a follow-up if symptoms persist.',
    date: 'Aug 04, 2026',
    time: '2 days ago',
    badge: 'Done'
  },
  {
    type: 'info',
    icon: 'fa-stethoscope',
    title: 'Grooming Session',
    desc: "Bella's grooming appointment confirmed for next Saturday.",
    date: 'Aug 15, 2026',
    time: 'In 9 days',
    badge: 'Scheduled'
  }
];

/* Calendar reminders for the Calendar page */
const CALENDAR_EVENTS = {
  '2026-8-6':  ['Feeding: Coco @ 12:00', 'Medication: Max @ 18:00'],
  '2026-8-8':  ['Vaccination: Luna @ 09:30'],
  '2026-8-12': ['Vet visit: Buddy @ 10:30'],
  '2026-8-15': ['Grooming: Bella @ 14:00'],
  '2026-8-18': ['Vaccination: Rocky @ 11:00'],
  '2026-8-22': ['Feeding schedule update']
};

const UPCOMING_APPOINTMENTS = [
  { icon: 'fa-calendar-check', cls: 'r-info',    title: 'Vet check-up',      meta: 'Buddy · Aug 12, 10:30 AM' },
  { icon: 'fa-syringe',        cls: 'r-warning', title: 'Rabies vaccination', meta: 'Luna · Aug 08, 09:30 AM' },
  { icon: 'fa-scissors',       cls: 'r-success', title: 'Grooming session',  meta: 'Bella · Aug 15, 02:00 PM' }
];

const VACCINATION_REMINDERS = [
  { icon: 'fa-syringe',        cls: 'r-warning', title: 'Distemper booster',   meta: 'Due Aug 22, 2026' },
  { icon: 'fa-shield-virus',   cls: 'r-info',    title: 'Parvo vaccine',       meta: 'Due Sep 05, 2026' },
  { icon: 'fa-syringe',        cls: 'r-success', title: 'Rabies completed',    meta: 'Done · Jul 30, 2026' }
];

const FEEDING_REMINDERS = [
  { icon: 'fa-bowl-food',  cls: 'r-info',    title: 'Morning meal',  meta: 'Every day · 08:00 AM' },
  { icon: 'fa-bowl-food',  cls: 'r-warning', title: 'Lunch portion', meta: 'Every day · 12:00 PM' },
  { icon: 'fa-moon',       cls: 'r-success', title: 'Evening meal', meta: 'Every day · 07:00 PM' }
];

/* Profile settings (left column of the Profile page) */
const PROFILE_SETTINGS = [
  { icon: 'fa-user-pen',        title: 'Account Information', desc: 'Name, email & phone', toggle: false },
  { icon: 'fa-bell',            title: 'Notifications',       desc: 'Push, email & SMS alerts', toggle: true },
  { icon: 'fa-moon',            title: 'Dark Mode',           desc: 'Toggle appearance', toggle: true, theme: true },
  { icon: 'fa-shield-halved',   title: 'Privacy',             desc: 'Manage data & permissions', toggle: false }
];

/* ============================================================
   02. SMALL HELPERS
   ============================================================ */

/* Get the current page's file name, e.g. "pets.html" */
function getPageName() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  return path;
}

/* Shorthand query selector */
function $(selector, scope) {
  return (scope || document).querySelector(selector);
}

/* ============================================================
   02b. THEME (DARK MODE)
   Toggles a data-theme attribute on <html> and persists the
   choice in localStorage so it survives page reloads.
   ============================================================ */

const THEME_STORAGE_KEY = 'furcare-theme';

/* Read the stored theme, defaulting to "light" */
function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) || 'light';
  } catch (e) {
    return 'light';
  }
}

/* Apply a theme ("dark" | "light") and sync every toggle switch */
function setTheme(theme) {
  const mode = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', mode);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch (e) { /* storage unavailable - ignore */ }
  syncThemeToggles(mode);
}

/* Flip between light and dark */
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
}

/* Reflect the current theme on all .theme-toggle switches */
function syncThemeToggles(theme) {
  const isDark = theme === 'dark';
  document.querySelectorAll('.theme-toggle').forEach(function (t) {
    t.classList.toggle('on', isDark);
    t.setAttribute('aria-pressed', String(isDark));
  });
}

/* Apply the stored theme on startup (before rendering) */
function initTheme() {
  setTheme(getStoredTheme());
}

/* ============================================================
   03. SHARED LAYOUT: NAVBAR + FOOTER
   ============================================================ */

/**
 * Builds the sticky navigation bar and injects it into <header>.
 * Highlights the active link and wires up the mobile hamburger menu.
 */
function renderNavbar() {
  const header = $('header');
  if (!header) return;

  const page = getPageName();

  const linksHtml = NAV_LINKS.map(function (link) {
    const active = page === link.url ? ' class="active"' : '';
    return (
      '<a href="' + link.url + '"' + active + '>' +
        '<i class="fa-solid ' + link.icon + '"></i>' + link.label +
      '</a>'
    );
  }).join('');

  header.innerHTML =
    '<nav class="navbar" aria-label="Primary navigation">' +
      '<div class="container">' +
        '<a href="index.html" class="nav-logo">' +
          '<span class="logo-icon"><i class="fa-solid fa-paw"></i></span>' +
          'Fur<span>Care</span>' +
        '</a>' +
        '<div class="nav-links" id="navLinks">' + linksHtml +
          '<a href="profile.html" class="nav-cta"><i class="fa-solid fa-heart"></i>Get Started</a>' +
        '</div>' +
        '<button class="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">' +
          '<i class="fa-solid fa-bars"></i>' +
        '</button>' +
      '</div>' +
    '</nav>';

  /* Mobile menu toggle */
  const toggle = $('#navToggle');
  const navLinks = $('#navLinks');
  toggle.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  /* Close the menu when a link is clicked (mobile) */
  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      navLinks.classList.remove('open');
      toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
}

/**
 * Builds the site-wide footer and injects it into <footer>.
 * All link lists are generated from the FOOTER_LINKS data.
 */
function renderFooter() {
  const footer = $('footer');
  if (!footer) return;

  const linkList = function (links) {
    return links
      .map(function (l) { return '<li><a href="' + l.url + '">' + l.label + '</a></li>'; })
      .join('');
  };

  const socialHtml = SOCIAL_LINKS
    .map(function (s) { return '<a href="' + s.url + '" aria-label="Social link"><i class="fa-brands ' + s.icon + '"></i></a>'; })
    .join('');

  footer.innerHTML =
    '<div class="container">' +
      '<div class="footer-grid">' +
        '<div class="footer-brand">' +
          '<a href="index.html" class="nav-logo">' +
            '<span class="logo-icon"><i class="fa-solid fa-paw"></i></span>' +
            'Fur<span class="footer-logo-accent">Care</span>' +
          '</a>' +
          '<p>Your all-in-one companion for pet health, feeding schedules and wellness reminders. Because they deserve the best.</p>' +
          '<div class="social-links">' + socialHtml + '</div>' +
        '</div>' +
        '<div>' +
          '<h4>Navigate</h4>' +
          '<ul class="footer-links">' + linkList(FOOTER_LINKS.navigate) + '</ul>' +
        '</div>' +
        '<div>' +
          '<h4>Services</h4>' +
          '<ul class="footer-links">' + linkList(FOOTER_LINKS.services) + '</ul>' +
        '</div>' +
        '<div class="footer-newsletter">' +
          '<h4>Stay in the loop</h4>' +
          '<p>Monthly tips & wellness reminders for your furry friends.</p>' +
          '<form class="newsletter-form" id="newsletterForm">' +
            '<input type="email" placeholder="Your email address" aria-label="Email address" required>' +
            '<button type="submit" class="btn btn-primary btn-sm"><i class="fa-solid fa-paper-plane"></i></button>' +
          '</form>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<span>&copy; 2026 FurCare. Made with <i class="fa-solid fa-heart"></i> for pets.</span>' +
        '<span>Frontend demo · No backend required</span>' +
      '</div>' +
    '</div>';

  /* Prevent default on the newsletter form (UI only) */
  const form = $('#newsletterForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = form.querySelector('input');
      input.value = 'Thanks for subscribing!';
      setTimeout(function () { input.value = ''; }, 2500);
    });
  }
}

/* ============================================================
   04. HOME PAGE
   ============================================================ */

/* Render the four feature cards */
function renderFeatures() {
  const grid = $('#featuresGrid');
  if (!grid) return;

  grid.innerHTML = FEATURES.map(function (f) {
    return (
      '<article class="card feature-card reveal">' +
        '<div class="feature-icon ' + f.cls + '"><i class="fa-solid ' + f.icon + '"></i></div>' +
        '<h3>' + f.title + '</h3>' +
        '<p>' + f.text + '</p>' +
        '<a href="' + f.link + '" class="feature-link">Learn more <i class="fa-solid fa-arrow-right"></i></a>' +
      '</article>'
    );
  }).join('');
}

/* Render the statistics cards */
function renderStats() {
  const band = $('#statsBand');
  if (!band) return;

  band.innerHTML = STATS.map(function (s, i) {
    return (
      '<div class="stat-card reveal">' +
        '<i class="fa-solid ' + s.icon + '"></i>' +
        '<div class="stat-num">' + s.num + '<span>' + s.suffix + '</span></div>' +
        '<div class="stat-label">' + s.label + '</div>' +
      '</div>'
    );
  }).join('');
}

/* ============================================================
   05. MY PETS PAGE
   ============================================================ */

/* Global helper: opens an alert-style detail panel (UI only) */
function showPetDetails(index) {
  const pet = PETS[index];
  if (!pet) return;
  alert(
    'Pet Details\n\n' +
    'Name: ' + pet.name + '\n' +
    'Breed: ' + pet.breed + '\n' +
    'Age: ' + pet.age + ' years\n' +
    'Weight: ' + pet.weight + '\n' +
    'Health: ' + pet.status
  );
}

/* Render the search + filter toolbar */
function renderPetToolbar() {
  const toolbar = $('#petsToolbar');
  if (!toolbar) return;

  toolbar.innerHTML =
    '<div class="search-box">' +
      '<i class="fa-solid fa-magnifying-glass"></i>' +
      '<input type="text" id="petSearch" placeholder="Search by name, breed..." aria-label="Search pets">' +
    '</div>' +
    '<div class="filter-group" id="petFilters">' +
      PET_FILTERS.map(function (f) {
        return '<button class="filter-btn' + (f === 'All' ? ' active' : '') + '" data-filter="' + f + '">' + f + '</button>';
      }).join('') +
    '</div>';

  /* Wire up search input (debounced) */
  const search = $('#petSearch');
  let debounceTimer;
  search.addEventListener('input', function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () { renderPetCards(); }, 200);
  });

  /* Wire up filter buttons */
  $('#petFilters').addEventListener('click', function (e) {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    this.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    renderPetCards();
  });
}

/* Theme class for each pet (replaces inline gradient styles) */
const PET_THEMES = ['theme-1', 'theme-2', 'theme-3', 'theme-4', 'theme-5', 'theme-6'];

/* Render the pet cards into the grid, honoring search + filter */
function renderPetCards() {
  const grid = $('#petsGrid');
  if (!grid) return;

  const query = ($('#petSearch') ? $('#petSearch').value : '').trim().toLowerCase();
  const filter = $('#petFilters') ? $('#petFilters').querySelector('.filter-btn.active').dataset.filter : 'All';

  const filtered = PETS.filter(function (pet) {
    const matchesSearch =
      !query ||
      pet.name.toLowerCase().includes(query) ||
      pet.breed.toLowerCase().includes(query);
    const matchesFilter = filter === 'All' || pet.breed.toLowerCase().includes(filter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  /* Empty state when nothing matches */
  if (!filtered.length) {
    grid.innerHTML =
      '<div class="empty-state fade-in">' +
        '<i class="fa-solid fa-magnifying-glass"></i>' +
        '<h3>No pets found</h3>' +
        '<p>Try a different search term or filter.</p>' +
      '</div>';
    return;
  }

  grid.innerHTML = filtered.map(function (pet, i) {
    return (
      '<article class="card pet-card fade-in">' +
        '<div class="pet-media ' + PET_THEMES[i % PET_THEMES.length] + '">' +
          '<i class="fa-solid ' + pet.icon + '"></i>' +
          '<span class="badge badge-' + pet.statusBadge + '">' + pet.status + '</span>' +
        '</div>' +
        '<div class="pet-body">' +
          '<h3>' + pet.name + '</h3>' +
          '<span class="pet-breed">' + pet.breed + '</span>' +
          '<div class="pet-meta">' +
            '<div class="pet-meta-item"><i class="fa-solid fa-cake-candles"></i><strong>' + pet.age + ' yrs</strong><span>Age</span></div>' +
            '<div class="pet-meta-item"><i class="fa-solid fa-weight-scale"></i><strong>' + pet.weight + '</strong><span>Weight</span></div>' +
          '</div>' +
          '<div class="pet-health"><span class="health-dot ' + pet.statusBadge + '"></span>' +
            '<span>Health: ' + pet.status + '</span>' +
          '</div>' +
          '<button class="btn btn-primary btn-sm view-details" data-index="' + i + '">' +
            '<i class="fa-solid fa-eye"></i> View Details' +
          '</button>' +
        '</div>' +
      '</article>'
    );
  }).join('');
}

/* ============================================================
   06. CALENDAR PAGE
   ============================================================ */

let currentMonth = 7;   /* 0-indexed: 7 = August (default month) */
let currentYear = 2026;

/**
 * Renders the monthly calendar grid for the currently
 * selected month/year and marks days that have events.
 */
function renderCalendar() {
  const grid = $('#calendarDays');
  if (!grid) return;

  const title = $('#calendarMonthLabel');
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  if (title) title.textContent = monthNames[currentMonth] + ' ' + currentYear;

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrev = new Date(currentYear, currentMonth, 0).getDate();

  let html = '';

  /* Leading days from the previous month */
  for (let i = firstDay - 1; i >= 0; i--) {
    html += '<div class="calendar-day other-month">' + (daysInPrev - i) + '</div>';
  }

  /* Actual days of the current month */
  for (let day = 1; day <= daysInMonth; day++) {
    const key = currentYear + '-' + (currentMonth + 1) + '-' + day;
    const hasEvent = CALENDAR_EVENTS[key];
    const isToday =
      day === new Date().getDate() &&
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear();

    let cls = 'calendar-day';
    if (isToday) cls += ' today';
    if (hasEvent) cls += ' has-event';

    html += '<div class="' + cls + '" title="' + (hasEvent ? hasEvent.join('; ') : '') + '">' +
      day + (hasEvent ? '<span class="day-dot"></span>' : '') +
    '</div>';
  }

  /* Trailing days from the next month */
  const total = firstDay + daysInMonth;
  for (let i = 1; i <= (7 - (total % 7)) % 7; i++) {
    html += '<div class="calendar-day other-month">' + i + '</div>';
  }

  grid.innerHTML = html;
}

/* Navigation handlers for the calendar */
function prevMonth() {
  currentMonth--;
  if (currentMonth < 0) { currentMonth = 11; currentYear--; }
  renderCalendar();
}

function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) { currentMonth = 0; currentYear++; }
  renderCalendar();
}

/* Wire up the month navigation buttons (no inline JS) */
function initCalendarNav() {
  const prev = $('#prevMonthBtn');
  const next = $('#nextMonthBtn');
  if (prev) prev.addEventListener('click', prevMonth);
  if (next) next.addEventListener('click', nextMonth);
}

/* Render a generic reminder list into its container */
function renderReminderList(containerId, items) {
  const container = $(containerId);
  if (!container) return;

  container.innerHTML = items.map(function (r) {
    return (
      '<div class="reminder-item">' +
        '<div class="reminder-icon ' + r.cls + '"><i class="fa-solid ' + r.icon + '"></i></div>' +
        '<div class="reminder-content">' +
          '<strong>' + r.title + '</strong>' +
          '<span>' + r.meta + '</span>' +
        '</div>' +
      '</div>'
    );
  }).join('');
}

/* ============================================================
   07. ALERTS PAGE
   ============================================================ */

/* Render the summary cards (counts by badge) */
function renderAlertSummary() {
  const summary = $('#alertsSummary');
  if (!summary) return;

  const urgent = ALERTS.filter(function (a) { return a.badge === 'Urgent'; }).length;
  const pending = ALERTS.filter(function (a) { return a.badge === 'Pending'; }).length;
  const scheduled = ALERTS.filter(function (a) { return a.badge === 'Scheduled'; }).length;

  summary.innerHTML =
    '<div class="card alert-summary-card i-1 reveal">' +
      '<i class="fa-solid fa-triangle-exclamation"></i>' +
      '<div><strong>' + urgent + '</strong><span>Urgent Alerts</span></div>' +
    '</div>' +
    '<div class="card alert-summary-card i-2 reveal">' +
      '<i class="fa-solid fa-clock-rotate-left"></i>' +
      '<div><strong>' + pending + '</strong><span>Pending</span></div>' +
    '</div>' +
    '<div class="card alert-summary-card i-3 reveal">' +
      '<i class="fa-solid fa-calendar-check"></i>' +
      '<div><strong>' + scheduled + '</strong><span>Scheduled</span></div>' +
    '</div>';
}

/* Render all alert cards into the list container */
function renderAlertCards() {
  const list = $('#alertsList');
  if (!list) return;

  list.innerHTML = ALERTS.map(function (a) {
    return (
      '<article class="card alert-card fade-in">' +
        '<div class="alert-icon type-' + a.type + '"><i class="fa-solid ' + a.icon + '"></i></div>' +
        '<div class="alert-content">' +
          '<h4>' + a.title + '</h4>' +
          '<p>' + a.desc + '</p>' +
          '<div class="alert-meta">' +
            '<span><i class="fa-regular fa-calendar"></i>' + a.date + '</span>' +
            '<span><i class="fa-regular fa-clock"></i>' + a.time + '</span>' +
            '<span class="badge badge-' + badgeClass(a.badge) + '">' + a.badge + '</span>' +
          '</div>' +
          '<div class="alert-actions">' +
            '<button class="btn btn-primary btn-sm"><i class="fa-solid fa-check"></i> Mark done</button>' +
            '<button class="btn btn-ghost btn-sm"><i class="fa-solid fa-eye"></i> View</button>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }).join('');
}

/* Map alert badge text to a badge CSS class */
function badgeClass(badge) {
  const map = { Urgent: 'danger', Pending: 'warning', Scheduled: 'info', Done: 'success' };
  return map[badge] || 'info';
}

/* ============================================================
   08. PROFILE PAGE
   ============================================================ */

/* Render the settings cards with toggle switches */
function renderProfileSettings() {
  const list = $('#settingsList');
  if (!list) return;

  list.innerHTML = PROFILE_SETTINGS.map(function (s) {
    return (
      '<div class="setting-item">' +
        '<div class="setting-label">' +
          '<span class="setting-icon"><i class="fa-solid ' + s.icon + '"></i></span>' +
          '<div><strong>' + s.title + '</strong><span>' + s.desc + '</span></div>' +
        '</div>' +
        (s.toggle
          ? '<button class="toggle' + (s.theme ? ' theme-toggle' : '') + '" aria-label="Toggle ' + s.title + '" aria-pressed="false"></button>'
          : '<button class="btn btn-ghost btn-sm">Edit</button>') +
      '</div>'
    );
  }).join('');

  /* Toggle switch interaction (UI only) */
  list.querySelectorAll('.toggle').forEach(function (t) {
    t.addEventListener('click', function () {
      /* Theme switches call the real theme logic */
      if (t.classList.contains('theme-toggle')) {
        toggleTheme();
        return;
      }
      const isOn = t.classList.toggle('on');
      t.setAttribute('aria-pressed', String(isOn));
    });
  });
}

/* ============================================================
   09. SCROLL REVEAL
   ============================================================ */

/**
 * Adds the "visible" class to any .reveal element as it
 * enters the viewport using an IntersectionObserver.
 */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(function (item) { observer.observe(item); });
}

/* ============================================================
   10. INITIALIZATION
   ============================================================ */

/**
 * Boots the site: builds shared layout, then runs only the
 * renderers relevant to the current page.
 */
function init() {
  /* Apply saved theme before anything renders (prevents a flash) */
  initTheme();

  renderNavbar();
  renderFooter();

  const page = getPageName();

  /* Home */
  if (page === 'index.html' || page === '') {
    renderFeatures();
    renderStats();
  }

  /* Wire up pet cards */
  if (page === 'pets.html') {
    renderPetToolbar();
    renderPetCards();

    /* Event delegation: handles all "View Details" buttons */
    $('#petsGrid').addEventListener('click', function (e) {
      const btn = e.target.closest('.view-details');
      if (!btn) return;
      showPetDetails(Number(btn.dataset.index));
    });
  }

  /* Calendar */
  if (page === 'calendar.html') {
    renderCalendar();
    initCalendarNav();
    renderReminderList('#upcomingList', UPCOMING_APPOINTMENTS);
    renderReminderList('#vaccinationList', VACCINATION_REMINDERS);
    renderReminderList('#feedingList', FEEDING_REMINDERS);
  }

  /* Alerts */
  if (page === 'alerts.html') {
    renderAlertSummary();
    renderAlertCards();
  }

  /* Profile */
  if (page === 'profile.html') {
    renderProfileSettings();
  }

  /* Keep any theme toggles in sync after rendering */
  syncThemeToggles(getStoredTheme());

  /* Global reveal-on-scroll */
  initReveal();
}

/* Wait for the DOM to be ready */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
