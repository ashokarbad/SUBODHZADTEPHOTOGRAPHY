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

  // Lazy background images (hero prints, quote band)
  document.querySelectorAll("[data-bg]").forEach(function (el) {
    var img = new Image();
    img.onload = function () { el.style.backgroundImage = "url('" + el.getAttribute("data-bg") + "')"; };
    img.src = el.getAttribute("data-bg");
  });

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Reviews slider arrows
  var track = document.querySelector(".reviews-track");
  document.querySelectorAll(".slider-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var card = track.querySelector(".review");
      var step = card ? card.getBoundingClientRect().width + 20 : 300;
      track.scrollBy({ left: step * Number(btn.getAttribute("data-dir")), behavior: reduceMotion ? "auto" : "smooth" });
    });
  });


  /* ===== 3D effects ===== */
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  // Hero: the print stack follows the pointer and tilts back as you scroll
  var scene = document.getElementById("scene"), stage = document.getElementById("stage");
  if (scene && !reduceMotion) {
    scene.addEventListener("pointermove", function (e) {
      var r = scene.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      stage.classList.remove("idle");
      stage.style.setProperty("--ry", (x * 30 - 8) + "deg");
      stage.style.setProperty("--rx", (-y * 22 + 4) + "deg");
    });
    scene.addEventListener("pointerleave", function () {
      stage.style.removeProperty("--ry"); stage.style.removeProperty("--rx"); stage.classList.add("idle");
    });
    window.addEventListener("scroll", function () {
      if (scene.matches(":hover")) return;
      stage.style.setProperty("--rx", (6 + Math.min(window.scrollY / 600, 1) * 18) + "deg");
    }, { passive: true });
  }

  // Tilt: cards lean toward the cursor and catch the light
  if (!reduceMotion && finePointer) {
    document.querySelectorAll("[data-tilt]").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        card.style.setProperty("--ty", ((x - .5) * 14) + "deg");
        card.style.setProperty("--tx", (-(y - .5) * 14) + "deg");
        card.style.setProperty("--gx", x * 100 + "%");
        card.style.setProperty("--gy", y * 100 + "%");
        card.style.setProperty("--go", 1);
      });
      card.addEventListener("pointerleave", function () {
        ["--tx", "--ty", "--go"].forEach(function (p) { card.style.removeProperty(p); });
      });
    });
  }

  // Portfolio ring: drag, swipe or use the arrows; turns slowly by itself until touched
  var ringPhotos = ["wedding-1", "prewedding-1", "maternity-2", "wedding-3", "portrait-1", "service-haldi",
                    "prewedding-2", "fashion-1", "wedding-2", "hero-3", "service-portrait", "prewedding-3"];
  var ring = document.getElementById("ring3d"), ringScene = document.getElementById("ringScene");
  if (ring) {
    ring.innerHTML = ringPhotos.map(function (n) { return '<figure style="background-image:url(images/' + n + '.jpg)"></figure>'; }).join("");
    var figs = Array.prototype.slice.call(ring.children), step = 360 / figs.length;
    var angle = 0, autoSpin = !reduceMotion, dragX = null, startAngle = 0, ringVisible = false;
    var layoutRing = function () {
      var w = Math.min(Math.max(ringScene.clientWidth * .16, 130), 220);
      var radius = Math.round((w / 2) / Math.tan(Math.PI / figs.length)) + 24;
      ring.style.setProperty("--w", w + "px");
      ring.style.setProperty("--r", radius + "px");
      figs.forEach(function (f, i) { f.style.transform = "rotateY(" + (i * step) + "deg) translateZ(" + radius + "px)"; });
    };
    var setAngle = function (a) { angle = a; ring.style.setProperty("--a", a + "deg"); };
    var ringResize = new ResizeObserver(layoutRing); ringResize.observe(ringScene);
    var ringSeen = new IntersectionObserver(function (es) { ringVisible = es[0].isIntersecting; }); ringSeen.observe(ringScene);
    (function tick() { if (autoSpin && ringVisible && dragX === null) setAngle(angle - .08); requestAnimationFrame(tick); })();
    var ease = "transform .6s cubic-bezier(.2,.7,.2,1)";
    ringScene.addEventListener("pointerdown", function (e) { dragX = e.clientX; startAngle = angle; autoSpin = false; ringScene.setPointerCapture(e.pointerId); ring.style.transition = "none"; });
    ringScene.addEventListener("pointermove", function (e) { if (dragX !== null) setAngle(startAngle + (e.clientX - dragX) * .35); });
    var endDrag = function () { if (dragX === null) return; dragX = null; ring.style.transition = ease; setAngle(Math.round(angle / step) * step); };
    ringScene.addEventListener("pointerup", endDrag);
    ringScene.addEventListener("pointercancel", endDrag);
    var nudge = function (d) { autoSpin = false; ring.style.transition = ease; setAngle(Math.round(angle / step) * step + d * step); };
    document.getElementById("ringPrev").addEventListener("click", function () { nudge(1); });
    document.getElementById("ringNext").addEventListener("click", function () { nudge(-1); });
  }

  // Album: each leaf has a front and a back page
  var book = document.getElementById("book");
  if (book) {
    var pic = function (n, cap) { return '<div class="pic" style="background-image:url(images/' + n + '.jpg)"></div><div class="cap">' + cap + "</div>"; };
    var face = function (side, html) { return html.indexOf('<div class="face') === 0 ? html : '<div class="face ' + side + '">' + html + "</div>"; };
    var leaves = [
      { front: '<div class="face front cover"><div class="zari"></div><h3>Wedding Album</h3><div class="pic" style="background-image:url(images/hero-main.jpg)"></div><p>SUBODH ZADTE PHOTOGRAPHY</p><div class="zari"></div></div>',
        back: pic("wedding-4", "Mehendi") },
      { front: pic("wedding-5", "Haldi"), back: pic("wedding-3", "Varmala") },
      { front: pic("wedding-1", "Together"),
        back: '<div class="two"><div class="pic" style="background-image:url(images/wedding-2.jpg)"></div><div class="pic" style="background-image:url(images/prewedding-3.jpg)"></div></div><div class="cap">Candid moments</div>' },
      { front: pic("service-wedding", "Reception"),
        back: '<div class="face back cover"><div class="zari"></div><h3>Your album next</h3><p>Check your date on WhatsApp<br>+91 95527 73143</p><div class="zari"></div></div>' }
    ];
    book.insertAdjacentHTML("beforeend", leaves.map(function (l, i) {
      return '<div class="leaf" data-i="' + i + '">' + face("front", l.front) + face("back", l.back) + "</div>";
    }).join(""));
    var leafEls = Array.prototype.slice.call(book.querySelectorAll(".leaf"));
    var turned = 0, zTimer = null;
    var labels = ["Cover", "Pages 1–2", "Pages 3–4", "Pages 5–6", "Back cover"];
    var setZ = function () { leafEls.forEach(function (el, i) { el.style.zIndex = i < turned ? i + 1 : leafEls.length - i + 10; }); };
    var renderBook = function () {
      leafEls.forEach(function (el, i) { el.classList.toggle("flipped", i < turned); });
      book.classList.toggle("open", turned > 0);
      document.getElementById("bPos").textContent = labels[turned];
    };
    var turn = function (d) {
      var n = Math.max(0, Math.min(leafEls.length, turned + d));
      if (n === turned) return;
      leafEls[d > 0 ? turned : turned - 1].style.zIndex = 50;
      turned = n; renderBook();
      clearTimeout(zTimer); zTimer = setTimeout(setZ, reduceMotion ? 0 : 1150);
    };
    leafEls.forEach(function (el, i) { el.addEventListener("click", function () { turn(i < turned ? -1 : 1); }); });
    document.getElementById("bPrev").addEventListener("click", function () { turn(-1); });
    document.getElementById("bNext").addEventListener("click", function () { turn(1); });
    var sx = null;
    book.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
    book.addEventListener("touchend", function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) turn(dx < 0 ? 1 : -1);
      sx = null;
    });
    document.addEventListener("keydown", function (e) {
      var r = book.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight || e.target.closest("input, textarea, select")) return;
      if (e.key === "ArrowRight") turn(1);
      if (e.key === "ArrowLeft") turn(-1);
    });
    setZ(); renderBook();
  }

  document.getElementById("year").textContent = new Date().getFullYear();
})();
