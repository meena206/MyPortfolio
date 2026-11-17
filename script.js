const root = document.documentElement;

// dark / light button
try {
  const saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-theme", saved);
} catch (e) {}

document.getElementById("theme").addEventListener("click", function () {
  const isDark = root.getAttribute("data-theme") === "dark";
  const next = isDark ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch (e) {}
});

// menu button on phones
const menuBtn = document.getElementById("menu");
const navList = document.getElementById("navlist");

menuBtn.addEventListener("click", function () {
  const open = navList.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});

// close the menu after clicking a link
navList.addEventListener("click", function (e) {
  if (e.target.matches("a")) {
    navList.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

// highlight the nav link of the section on screen
const links = document.querySelectorAll("a.link");

const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        links.forEach(function (a) {
          a.classList.toggle("on", a.getAttribute("href") === "#" + entry.target.id);
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

document.querySelectorAll("main section").forEach(function (s) {
  observer.observe(s);
});

// project filter buttons (All / Python / Web)
const filterBtns = document.querySelectorAll(".filters button");
const cards = document.querySelectorAll(".card");

filterBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    filterBtns.forEach(function (b) {
      b.setAttribute("aria-pressed", b === btn);
    });
    cards.forEach(function (card) {
      card.hidden = !(btn.dataset.f === "all" || card.dataset.t === btn.dataset.f);
    });
  });
});

// contact form - opens the email app
// TODO: put my real email here
const myEmail = "your.email@example.com";

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("n").value;
  const email = document.getElementById("e").value;
  const msg = document.getElementById("m").value;

  location.href =
    "mailto:" + myEmail +
    "?subject=" + encodeURIComponent("Portfolio message from " + name) +
    "&body=" + encodeURIComponent(msg + "\n\n" + name + " (" + email + ")");
});

// year in the footer
document.getElementById("yr").textContent = new Date().getFullYear();