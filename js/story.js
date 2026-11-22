(function () {
  "use strict";
  var WHATSAPP = "919552773143";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var body = document.body;

  /* ---------- The day: page colour follows the chapter on screen ---------- */
  var names = { dawn: "Dawn", haldi: "Morning: Haldi", mehendi: "Afternoon: Mehendi", ready: "Getting ready",
                pheras: "Evening: Pheras", reception: "Night: Reception", day: "Before and after", plan: "Plan your shoot" };
  var themed = Array.prototype.slice.call(document.querySelectorAll("[data-theme]")).filter(function (el) { return el !== body; });
  var dayLinks = Array.prototype.slice.call(document.querySelectorAll(".day a"));
  var order = dayLinks.map(function (a) { return a.getAttribute("data-ch"); });
  var dayNow = document.getElementById("dayNow");
  function setTheme(t, id) {
    if (body.getAttribute("data-theme") !== t) body.setAttribute("data-theme", t);
    dayNow.textContent = names[t] || "";
    var idx = order.indexOf(id);
    dayLinks.forEach(function (a, i) {
      a.classList.toggle("on", i === idx);
      a.classList.toggle("past", idx > -1 ? i < idx : t !== "dawn");
    });
  }
  var themeWatch = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) setTheme(e.target.getAttribute("data-theme"), e.target.id); });
  }, { rootMargin: "-48% 0px -48% 0px" });
  themed.forEach(function (el) { themeWatch.observe(el); });

  /* ---------- The sun crosses the header from haldi to reception ---------- */
  var sun = document.getElementById("sun");
  var first = document.getElementById("haldi"), last = document.getElementById("reception");
  var bar = document.querySelector(".bar");
  var parallax = Array.prototype.slice.call(document.querySelectorAll("[data-speed]"));
  var ticking = false;
  function frame() {
    ticking = false;
    var y = window.scrollY, vh = window.innerHeight;
    var start = first.offsetTop - vh * .5, end = last.offsetTop + last.offsetHeight - vh * .5;
    var p = Math.max(0, Math.min(1, (y - start) / (end - start)));
    sun.style.left = (p * 100) + "%";
    var doc = document.documentElement.scrollHeight - vh;
    bar.style.setProperty("--progress", (doc > 0 ? y / doc * 100 : 0) + "%");
    if (!reduce && window.innerWidth > 860) {
      parallax.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        var offset = (r.top + r.height / 2 - vh / 2) * Number(el.getAttribute("data-speed"));
        el.style.transform = "translate3d(0," + offset.toFixed(1) + "px,0)";
      });
    }
  }
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
  window.addEventListener("resize", frame);
  frame();

  /* ---------- Photos unveil as they arrive; tap to view large ---------- */
  var seen = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("seen"); seen.unobserve(e.target); } });
  }, { threshold: .15 });
  var viewer = document.getElementById("viewer"), viewerImg = document.getElementById("viewerImg");
  document.querySelectorAll(".p").forEach(function (fig) {
    seen.observe(fig);
    fig.addEventListener("click", function () {
      var img = fig.querySelector("img");
      viewerImg.src = img.src; viewerImg.alt = img.alt;
      if (typeof viewer.showModal === "function") viewer.showModal();
    });
  });
  document.getElementById("vclose").addEventListener("click", function () { viewer.close(); });
  viewer.addEventListener("click", function (e) { if (e.target === viewer) viewer.close(); });

  /* ---------- Album ---------- */
  var book = document.getElementById("book");
  var pic = function (n, cap) { return '<div class="pic" style="background-image:url(images/' + n + '.jpg)"></div><div class="cap">' + cap + "</div>"; };
  var face = function (side, html) { return html.indexOf('<div class="face') === 0 ? html : '<div class="face ' + side + '">' + html + "</div>"; };
  var leaves = [
    { front: '<div class="face front cover"><div class="zari"></div><h3>Wedding Album</h3><div class="pic" style="background-image:url(images/hero-main.jpg)"></div><p>SUBODH ZADTE PHOTOGRAPHY</p><div class="zari"></div></div>',
      back: pic("wedding-4", "Mehendi") },
    { front: pic("wedding-5", "Haldi"), back: pic("wedding-3", "Varmala") },
    { front: pic("wedding-1", "Together"),
      back: '<div class="two"><div class="pic" style="background-image:url(images/wedding-2.jpg)"></div><div class="pic" style="background-image:url(images/prewedding-3.jpg)"></div></div><div class="cap">Candid moments</div>' },
    { front: pic("service-wedding", "Reception"),
      back: '<div class="face back cover"><div class="zari"></div><h3>Your album next</h3><p>Plan your shoot below</p><div class="zari"></div></div>' }
  ];
  book.insertAdjacentHTML("beforeend", leaves.map(function (l) {
    return '<div class="leaf">' + face("front", l.front) + face("back", l.back) + "</div>";
  }).join(""));
  var leafEls = Array.prototype.slice.call(book.querySelectorAll(".leaf"));
  var turned = 0, zTimer = null;
  var labels = ["Cover", "Pages 1–2", "Pages 3–4", "Pages 5–6", "Back cover"];
  function setZ() { leafEls.forEach(function (el, i) { el.style.zIndex = i < turned ? i + 1 : leafEls.length - i + 10; }); }
  function renderBook() {
    leafEls.forEach(function (el, i) { el.classList.toggle("flipped", i < turned); });
    book.classList.toggle("open", turned > 0);
    document.getElementById("bPos").textContent = labels[turned];
  }
  function turn(d) {
    var n = Math.max(0, Math.min(leafEls.length, turned + d));
    if (n === turned) return;
    leafEls[d > 0 ? turned : turned - 1].style.zIndex = 50;
    turned = n; renderBook();
    clearTimeout(zTimer); zTimer = setTimeout(setZ, reduce ? 0 : 1150);
  }
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
    if (e.target.closest("input, textarea, select")) return;
    var r = book.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) return;
    if (e.key === "ArrowRight") turn(1);
    if (e.key === "ArrowLeft") turn(-1);
  });
  setZ(); renderBook();

  /* ---------- Drag the strip sideways with a mouse ---------- */
  var strip = document.getElementById("strip"), down = null, moved = false;
  strip.addEventListener("pointerdown", function (e) {
    if (e.pointerType !== "mouse") return;
    down = { x: e.clientX, left: strip.scrollLeft }; moved = false;
  });
  window.addEventListener("pointermove", function (e) {
    if (!down) return;
    var dx = e.clientX - down.x;
    if (Math.abs(dx) > 5) { moved = true; strip.classList.add("drag"); }
    strip.scrollLeft = down.left - dx;
  });
  window.addEventListener("pointerup", function () { down = null; setTimeout(function () { strip.classList.remove("drag"); }, 0); });
  strip.addEventListener("click", function (e) {
    var card = e.target.closest(".card");
    if (!card) return;
    if (moved) { e.preventDefault(); moved = false; return; }
    preset("shoot", card.getAttribute("data-pick"));
  }, true);

  /* ---------- Planner: five steps, ends in a WhatsApp message ---------- */
  var steps = Array.prototype.slice.call(document.querySelectorAll("#planner .step"));
  var progress = document.getElementById("progress"), back = document.getElementById("back");
  var answers = { shoot: "", when: "", style: "", extras: [] };
  var cur = 0;
  function show(i) {
    cur = i;
    steps.forEach(function (s, k) { s.classList.toggle("is-on", k === i); });
    progress.style.width = (i / (steps.length - 1) * 100) + "%";
    back.hidden = i === 0;
  }
  function preset(name, value) {
    var group = document.querySelector('.opts[data-name="' + name + '"]');
    group.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.textContent === value)); });
    answers[name] = value;
    show(1);
  }
  document.querySelectorAll(".opts").forEach(function (group) {
    var name = group.getAttribute("data-name"), multi = group.classList.contains("multi");
    group.querySelectorAll("button").forEach(function (b) {
      b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", function () {
        if (multi) {
          var on = b.getAttribute("aria-pressed") !== "true";
          b.setAttribute("aria-pressed", String(on));
          answers.extras = Array.prototype.slice.call(group.querySelectorAll('[aria-pressed="true"]')).map(function (x) { return x.textContent; });
          return;
        }
        group.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        answers[name] = b.textContent;
        if (name === "when") document.getElementById("pDate").value = "";
        setTimeout(function () { show(cur + 1); }, reduce ? 0 : 220);
      });
    });
  });
  document.getElementById("pDate").addEventListener("change", function (e) {
    if (!e.target.value) return;
    var d = new Date(e.target.value + "T00:00:00");
    answers.when = d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
    document.querySelectorAll('.opts[data-name="when"] button').forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
  });
  document.querySelectorAll("#planner .next").forEach(function (b) {
    if (b.id === "finish") return;
    b.addEventListener("click", function () { show(cur + 1); });
  });
  back.addEventListener("click", function () { show(Math.max(0, cur - 1)); });

  document.getElementById("finish").addEventListener("click", function () {
    var name = document.getElementById("pName").value.trim();
    var venue = document.getElementById("pVenue").value.trim();
    var err = document.getElementById("pErr");
    if (!name) { err.hidden = false; document.getElementById("pName").focus(); return; }
    err.hidden = true;
    var rows = [
      ["Name", name],
      ["Shoot", answers.shoot || "Not chosen yet"],
      ["Date", answers.when || "Not fixed yet"],
      ["Style", answers.style || "Happy to discuss"],
      ["Extras", answers.extras.length ? answers.extras.join(", ") : "None for now"]
    ];
    if (venue) rows.push(["Venue", venue]);
    var esc = function (t) { return t.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
    document.getElementById("summary").innerHTML = rows.map(function (r) { return "<dt>" + r[0] + "</dt><dd>" + esc(r[1]) + "</dd>"; }).join("");
    var msg = "Hello Subodh Zadte Photography, I'd like to check availability.\n\n" +
      rows.map(function (r) { return r[0] + ": " + r[1]; }).join("\n");
    document.getElementById("waLink").href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(msg);
    show(5);
  });
  show(0);

  document.getElementById("year").textContent = new Date().getFullYear();
})();
