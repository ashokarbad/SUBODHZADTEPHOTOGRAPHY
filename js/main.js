(function () {
  "use strict";

  var WHATSAPP_NUMBER = "919552773143"; // country code + number, no "+" or spaces

  // Load real photos into each slot. If a file is missing, the soft placeholder stays.
  function loadPhoto(el) {
    var src = el.getAttribute("data-img");
    if (!src) return;
    var img = new Image();
    img.onload = function () {
      el.style.backgroundImage = "url('" + src + "')";
      el.classList.add("has-img");
    };
    img.src = src;
  }
  document.querySelectorAll(".ph[data-img]").forEach(loadPhoto);

  // Mobile menu
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  toggle.addEventListener("click", function () {
    var open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("is-open", !open);
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    }
  });

  // Gallery filters
  var chips = document.querySelectorAll(".chip");
  var shots = Array.prototype.slice.call(document.querySelectorAll(".shot"));
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var f = chip.getAttribute("data-filter");
      chips.forEach(function (c) {
        var on = c === chip;
        c.classList.toggle("is-active", on);
        c.setAttribute("aria-pressed", String(on));
      });
      shots.forEach(function (s) {
        s.hidden = !(f === "all" || s.getAttribute("data-cat") === f);
      });
    });
  });

  // Lightbox
  var lb = document.getElementById("lightbox");
  var lbPh = lb.querySelector(".lb-ph");
  var current = 0;
  function visibleShots() { return shots.filter(function (s) { return !s.hidden; }); }
  function show(i) {
    var list = visibleShots();
    if (!list.length) return;
    current = (i + list.length) % list.length;
    var src = list[current].querySelector(".ph");
    lbPh.className = "ph lb-ph";
    lbPh.style.backgroundImage = "";
    lbPh.setAttribute("data-label", src.getAttribute("data-label"));
    lbPh.setAttribute("data-img", src.getAttribute("data-img"));
    loadPhoto(lbPh);
  }
  shots.forEach(function (s) {
    s.addEventListener("click", function () {
      show(visibleShots().indexOf(s));
      if (typeof lb.showModal === "function") lb.showModal();
    });
  });
  lb.querySelector(".lb-close").addEventListener("click", function () { lb.close(); });
  lb.querySelector(".lb-prev").addEventListener("click", function () { show(current - 1); });
  lb.querySelector(".lb-next").addEventListener("click", function () { show(current + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) lb.close(); });
  lb.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });

  // Package buttons pre-select the event type
  var typeSelect = document.getElementById("f-type");
  document.querySelectorAll("[data-package]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var pkg = btn.getAttribute("data-package");
      Array.prototype.forEach.call(typeSelect.options, function (o) {
        if (o.text === pkg) typeSelect.value = o.value || o.text;
      });
      var msg = document.getElementById("f-msg");
      if (!msg.value) msg.value = "I'd like to know more about the " + pkg + " package.";
    });
  });

  // Enquiry form opens WhatsApp with the details filled in
  var form = document.getElementById("enquiry");
  var errorBox = document.getElementById("form-error");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.elements.name.value.trim();
    var phone = form.elements.phone.value.trim();
    var type = form.elements.type.value;
    var missing = [];
    [["name", name, "your name"], ["phone", phone, "your phone number"], ["type", type, "what you're planning"]].forEach(function (f) {
      var field = form.elements[f[0]];
      field.setAttribute("aria-invalid", f[1] ? "false" : "true");
      if (!f[1]) missing.push(f[2]);
    });
    if (missing.length) {
      errorBox.textContent = "Please add " + missing.join(", ") + ".";
      errorBox.hidden = false;
      form.querySelector("[aria-invalid='true']").focus();
      return;
    }
    errorBox.hidden = true;

    var lines = [
      "Hello Subodh Zadte Photography,",
      "",
      "Name: " + name,
      "Phone: " + phone,
      "Shoot: " + type
    ];
    if (form.elements.date.value) {
      var d = new Date(form.elements.date.value + "T00:00:00");
      lines.push("Date: " + d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }));
    }
    if (form.elements.venue.value.trim()) lines.push("Venue: " + form.elements.venue.value.trim());
    if (form.elements.message.value.trim()) lines.push("", form.elements.message.value.trim());

    var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
    window.open(url, "_blank", "noopener");
  });

  // Header turns solid once you scroll past the top of the hero
  var header = document.querySelector(".site-header");
  function onScroll() { header.classList.toggle("is-solid", window.scrollY > 60); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Lazy background images (hero slides, quote band)
  document.querySelectorAll("[data-bg]").forEach(function (el) {
    var img = new Image();
    img.onload = function () { el.style.backgroundImage = "url('" + el.getAttribute("data-bg") + "')"; };
    img.src = el.getAttribute("data-bg");
  });

  // Hero slideshow
  var slides = document.querySelectorAll(".hero-slide");
  var dots = document.querySelectorAll(".hero-dots button");
  var slideIndex = 0, timer = null;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function goTo(i) {
    slides[slideIndex].classList.remove("is-active");
    dots[slideIndex].classList.remove("is-active");
    slideIndex = (i + slides.length) % slides.length;
    slides[slideIndex].classList.add("is-active");
    dots[slideIndex].classList.add("is-active");
  }
  function start() { if (!reduceMotion) timer = setInterval(function () { goTo(slideIndex + 1); }, 6000); }
  dots.forEach(function (d, i) {
    d.addEventListener("click", function () { clearInterval(timer); goTo(i); start(); });
  });
  start();

  // Reviews slider arrows
  var track = document.querySelector(".reviews-track");
  document.querySelectorAll(".slider-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var card = track.querySelector(".review");
      var step = card ? card.getBoundingClientRect().width + 20 : 300;
      track.scrollBy({ left: step * Number(btn.getAttribute("data-dir")), behavior: reduceMotion ? "auto" : "smooth" });
    });
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
