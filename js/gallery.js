(function () {
  "use strict";
  var WHATSAPP = "919552773143";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var src = function (n) { return "images/" + n + ".jpg"; };
  var esc = function (t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  /* =========================================================
     CONTENT: edit stories, spreads, packages, steps, reviews
     and FAQ here. Photo names refer to images/<name>.jpg
     ========================================================= */
  var stories = [
    { id: "wedding", title: "Weddings", line: "Rituals, family and the quiet moments", cover: "g-bride-2", book: "Wedding",
      photos: [["hero-main", "Blue pheta, Paithani and a stolen glance"], ["g-bride-2", "The groom's turn to be teased"], ["wedding-1", "Under the fairy lights"], ["wedding-3", "Varmala, and everyone cheering"], ["service-wedding", "Reception stage, the whole day behind them"], ["g-bride-bw", "One frame in black and white, always"]] },
    { id: "prewedding", title: "Pre-wedding", line: "Sunsets, sets and stories", cover: "g-sunset-1", book: "Pre-wedding",
      photos: [["g-sunset-1", "Golden hour on the coast"], ["g-sunset-2", "Ten seconds of wind, one red dress"], ["g-arches", "Yellow arches, a set that feels like Goa"], ["g-western", "A western set, because why not"], ["g-reddress", "White studio, one red dress"], ["prewedding-2", "Lakeside, in black and white"], ["g-couple-2", "Rain, an umbrella and a laugh"]] },
    { id: "portraits", title: "After dark", line: "Paithani portraits in coloured light", cover: "g-paithani-2", book: "Portraits",
      photos: [["g-paithani-1", "A single warm lamp"], ["g-paithani-2", "Paithani, nath and a confident smile"], ["g-paithani-3", "Reflections in red"], ["g-paithani-4", "Light through a doorway"], ["g-night-1", "Street lamp, slow shutter"], ["g-night-2", "Night portrait, warm and close"]] },
    { id: "kids", title: "Kids", line: "Lit like cinema, shot at their pace", cover: "g-kid-5", book: "Kids & newborn",
      photos: [["g-kid-3", "Blue light and a rocking horse"], ["g-kid-4", "First drive"], ["g-kid-5", "A yellow dress and fairy lights"], ["g-kid-1", "Snowfall in the studio"], ["g-kid-2", "That smile"]] },
    { id: "maternity", title: "Maternity", line: "Calm sessions, before baby arrives", cover: "maternity-1", book: "Maternity",
      photos: [["maternity-1", "A red gown and a proud dad"], ["maternity-2", "Two pairs of hands"], ["hero-3", "Studio light, soft and simple"]] },
    { id: "mehendi", title: "Mehendi", line: "Patterns, hands and haldi mornings", cover: "g-mehendi-2", book: "Mehendi & haldi",
      photos: [["g-mehendi-1", "Hands up, eyes closed"], ["g-mehendi-2", "Every line of the design"], ["g-mehendi-3", "Feet, flowers and patience"], ["wedding-4", "Showing it off"], ["wedding-5", "Haldi, and nobody stays clean"], ["service-haldi", "Shy, for about a second"]] },
    { id: "fashion", title: "Fashion", line: "Portfolios and lookbooks", cover: "service-fashion", book: "Fashion",
      photos: [["service-fashion", "A lehenga twirl"], ["fashion-1", "Red saree among the trees"], ["portrait-1", "Bridal portrait in black and white"], ["hero-2", "Pink saree, garden light"]] },
    { id: "men", title: "Men's portraits", line: "Dramatic, low-key studio light", cover: "g-man-3", book: "Portraits",
      photos: [["g-man-2", "Black and white, sharp"], ["g-man-3", "Low key"], ["g-man-4", "A red shirt in the dark"], ["g-man-1", "Almost all shadow"]] },
    { id: "kushti", title: "Kushti", line: "Documentary, from the wrestling ground", cover: "g-kushti-2", book: "Something else",
      photos: [["g-kushti-1", "The first grip"], ["g-kushti-2", "Lift"], ["g-kushti-3", "Into the mud"], ["g-kushti-4", "Dust and crowd"], ["g-kushti-5", "Colour, for once"]] }
  ];
  var byId = {}; stories.forEach(function (s) { byId[s.id] = s; });

  // Photos on the hero wall (small copies live in images/wall/)
  var wallPhotos = ["fashion-1","g-arches","g-bride-1","g-bride-2","g-bride-bw","g-couple-1","g-couple-2","g-kid-1","g-kid-2","g-kid-3","g-kid-4","g-kid-5",
    "g-kushti-1","g-kushti-2","g-kushti-3","g-kushti-4","g-kushti-5","g-lights","g-man-2","g-man-3","g-man-4","g-mehendi-1","g-mehendi-2","g-mehendi-3",
    "g-night-1","g-night-2","g-paithani-1","g-paithani-2","g-paithani-3","g-paithani-4","g-reddress","g-sunset-1","g-sunset-2","g-western","hero-2","hero-3",
    "hero-main","maternity-1","maternity-2","portrait-1","prewedding-1","prewedding-2","service-fashion","service-haldi","service-wedding",
    "wedding-1","wedding-2","wedding-3","wedding-4","wedding-5","g-man-1"];

  var spreads = [
    { title: "A sunset on the coast", story: "prewedding", photos: ["g-sunset-1", "g-sunset-2", "g-lights"],
      text: "One location, one red dress and about fifteen minutes of light. We plan the timing, the wind and where to stand, so the couple only has to hold each other.",
      tags: ["Pre-wedding", "Golden hour", "Outdoor"] },
    { title: "Paithani after dark", story: "portraits", photos: ["g-paithani-2", "g-paithani-1", "g-night-2"],
      text: "A single coloured lamp instead of a big flash. The silk glows, the gold catches, and the portrait feels like a film still rather than a studio photo.",
      tags: ["Portraits", "Studio", "Low light"] },
    { title: "Kids, at their own speed", story: "kids", photos: ["g-kid-5", "g-kid-3", "g-kid-4"],
      text: "Toy cars, fairy lights and a lot of waiting. Children don't pose on cue, so the set does the work and we catch the moment they forget about the camera.",
      tags: ["Kids", "Birthdays", "Studio"] }
  ];

  var packages = [
    { title: "Wedding", pick: "Wedding", photo: "service-wedding", main: true, tag: "Most booked", for: "Haldi to reception, every ritual covered",
      items: ["Traditional and candid photography", "Cinematic video and highlight film", "Haldi, mehendi, wedding and reception", "Printed wedding album", "Drone shots where the venue allows"] },
    { title: "Pre-wedding", pick: "Pre-wedding", photo: "g-arches", for: "Before the big day, outdoor or on a set",
      items: ["One or two locations or sets", "Outfit changes and styling advice", "Edited high-resolution photos", "Short reel for Instagram"] },
    { title: "Maternity & kids", pick: "Maternity", photo: "maternity-1", for: "Maternity, newborn and birthday shoots",
      items: ["Studio or at-home session", "Gowns and props available", "Themed sets for kids", "Edited high-resolution photos"] },
    { title: "Portraits & fashion", pick: "Portraits", photo: "g-paithani-3", for: "Family, Paithani, model and brand shoots",
      items: ["Studio lighting setups", "Paithani and traditional looks", "Portfolio and lookbook shoots", "Retouched final images"] }
  ];

  var steps = [
    ["Say hello", "Send your date, venue and what you're planning on WhatsApp. Subodh confirms if the date is free."],
    ["Plan together", "Pick a package, talk through the rituals, the looks and any must-have photos."],
    ["Shoot day", "The team arrives early, works quietly, and guides you only where it helps."],
    ["Edit and colour", "Every photo is selected and colour-graded by hand; films are cut to music."],
    ["Album and delivery", "Your photos, films and printed album, ready to keep and share."]
  ];

  // Word-for-word excerpts from public Google reviews.
  var reviews = [
    { n: "Sheetal Oholkar", e: "Wedding", c: "wedding", t: "The poses they guided us through felt natural, graceful, and every picture turned out absolutely stunning." },
    { n: "Radhika Ghaytadak", e: "Wedding", c: "wedding", t: "They took the time to understand our vision and made us feel completely at ease, both during the planning process and on the big day." },
    { n: "Kapil Shahapure", e: "Wedding photography & video", c: "wedding video", t: "Both the photos and videos were of outstanding quality, perfectly edited, and delivered on time." },
    { n: "Aarti Kale", e: "Wedding", c: "wedding", t: "Your attention to detail, creative angles, and ability to catch candid, heartfelt moments made the entire album feel alive and authentic." },
    { n: "Gaurav Sanap", e: "Engagement", c: "wedding", t: "Not only his images are stunning, but his editing and color work are really very great." },
    { n: "Bhushan Dengale", e: "Photoshoot", c: "portrait", t: "Their talent for capturing natural, beautifully composed moments is truly outstanding." },
    { n: "Anushka Joshi", e: "Video", c: "video", t: "The editing is beautiful, creative, and perfectly captured every special moment." },
    { n: "Pooja Pawar", e: "Photoshoot", c: "portrait mr", t: "Subodh zadte यांची फोटोग्राफी खूप उत्तम आहे कारण त्यांनी काढलेला प्रत्येक फोटो खूप natural वाटतो..", lang: "mr" },
    { n: "Archana Jadhav", e: "Photoshoot & video", c: "portrait video", t: "Every small detail was thoughtfully arranged, and the entire setup looked absolutely amazing." },
    { n: "Swapnil Rothe", e: "Engagement", c: "wedding", t: "The colors were vibrant, and the composition was perfect. We received the photos promptly" },
    { n: "Vishal Rajguru", e: "Photoshoot", c: "portrait", t: "He brings amazing poses out of us, a very different kind of perception and frame selection" },
    { n: "Prem Tayade", e: "Kids", c: "portrait", t: "is amazing at capturing the perfect moment in a short amount of time! My kids have short attention spans" },
    { n: "Sarthak Chaudhar", e: "Family", c: "portrait", t: "He made sure everyone was comfortable and enjoying the experience. He has captured most special moments of my family's life." },
    { n: "Rajnandini Ambekar", e: "Photoshoot", c: "portrait mr", t: "आमचा अनुभव खूप छान होता. माझे photos सुबोध सरांनी खूप छान काढलेत.", lang: "mr" },
    { n: "Ajit Bade", e: "Engagement", c: "wedding", t: "the clarity in his photos was an experience I had never had before. Thank you for making my engagement memorable." },
    { n: "Vishal Shelke", e: "Wedding", c: "wedding", t: "excellent and extremely professional and great at giving directions. Photos turned out perfect!" },
    { n: "Vivek Pawar", e: "Friend's wedding", c: "wedding", t: "Subodh and his team did amazing job in my friend's wedding the pre-wedding and all events were fabulously covered" },
    { n: "Paresh Bothara", e: "Wedding & engagement", c: "wedding", t: "Best photographer in Maharashtra , very happy with his album" }
  ];
  var featured = [0, 3, 1, 12, 2];

  var faqs = [
    ["How do we check if our date is free?", "Send your date, city and what you're planning on WhatsApp, or use the form below. Wedding season dates go first, so message as soon as your date is fixed."],
    ["Do you shoot video as well as photos?", "Yes. Wedding packages can include cinematic video and a highlight film alongside traditional and candid photography."],
    ["Do you travel outside Chhatrapati Sambhajinagar?", "Share your venue when you message, and Subodh will confirm travel and any extra costs for your dates."],
    ["Can we see full albums before booking?", "Yes. Visit the studio in Tisgaon to see printed albums and talk through your plans in person."],
    ["Do you do studio shoots for kids and families?", "Yes. Maternity, newborn, kids' birthdays and family portraits are shot in the studio or at home, with themed sets for children."],
    ["How much do packages cost?", "Prices depend on the dates, the events covered and what you add (video, album, drone). Ask on WhatsApp for a quote for your plans."]
  ];

  /* ---------- Header ---------- */
  var top = document.querySelector(".top");
  var onScroll = function () { top.classList.toggle("solid", window.scrollY > window.innerHeight * .6); };
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ---------- Hero: a dome of photographs around the viewer ---------- */
  var roomScene = document.getElementById("roomScene"), roomWall = document.getElementById("roomWall");
  var tiles = [], yaw = -8, pitch = 0, targetPitch = 0, vel = 0, persp = 800, back = 100, builtW = 0;
  var dragging = false, dragX = 0, moved = 0, roomOn = true;
  // spread photos so neighbours differ: a fixed shuffle
  var order = wallPhotos.map(function (n, i) { return [((i * 37) % 101) / 101, n]; }).sort(function (x, y) { return x[0] - y[0]; }).map(function (x) { return x[1]; });
  function buildWall() {
    var W = window.innerWidth, H = window.innerHeight;
    builtW = W;
    var tw = Math.round(Math.min(Math.max(W * (W < 700 ? .2 : .105), 92), 190)), th = Math.round(tw * .68), gap = Math.round(tw * .08);
    var R = tw * (W < 700 ? 4.6 : 5.6);
    persp = Math.round(R * (W < 700 ? .55 : .62));
    back = Math.round(R * .14); // camera sits a little behind the centre of the dome
    roomScene.style.setProperty("--persp", persp + "px");
    roomWall.style.setProperty("--tw", tw + "px"); roomWall.style.setProperty("--th", th + "px");
    var rowStep = (th + gap) / R * 180 / Math.PI, html = [], k = 0;
    tiles = [];
    for (var e = -rowStep * (W < 700 ? 1.6 : 3.6); e < 62; e += rowStep) {
      var cols = Math.max(8, Math.floor(2 * Math.PI * R * Math.cos(e * Math.PI / 180) / (tw + gap)));
      var colStep = 360 / cols, offset = (Math.round(e / rowStep) % 2) * colStep / 2;
      var lit = Math.max(.45, .98 - Math.abs(e) / 62 * .5);
      for (var c = 0; c < cols; c++) {
        var az = c * colStep + offset, name = order[(k * 7 + c) % order.length];
        tiles.push({ az: az, off: false });
        html.push('<button class="tile" tabindex="-1" data-photo="' + name + '" style="--lit:' + lit.toFixed(2) +
          ";transform:rotateY(" + az.toFixed(2) + "deg) rotateX(" + (-e).toFixed(2) + "deg) translateZ(calc(var(--lift, 0px) - " + R + 'px))"><img src="images/wall/' + name + '.jpg" alt="" decoding="async"></button>');
        k++;
      }
    }
    roomWall.innerHTML = html.join("");
    var els = roomWall.children;
    tiles.forEach(function (t, i) { t.el = els[i]; });
    render(true);
  }
  function render(force) {
    roomWall.style.transform = "translateZ(" + (persp - back) + "px) rotateX(" + pitch.toFixed(2) + "deg) rotateY(" + yaw.toFixed(2) + "deg)";
    for (var i = 0; i < tiles.length; i++) {
      var t = tiles[i], rel = ((t.az + yaw) % 360 + 540) % 360 - 180, off = Math.abs(rel) > 80;
      if (off !== t.off || force) { t.off = off; t.el.classList.toggle("off", off); }
    }
  }
  function loop() {
    if (roomOn) {
      if (!dragging) { vel *= .94; yaw += vel + (reduce ? 0 : .025); }
      pitch += (targetPitch - pitch) * .06;
      render(false);
    }
    requestAnimationFrame(loop);
  }
  roomScene.addEventListener("pointerdown", function (e) { dragging = true; dragX = e.clientX; moved = 0; vel = 0; roomScene.classList.add("drag"); });
  window.addEventListener("pointermove", function (e) {
    if (dragging) { var dx = e.clientX - dragX; dragX = e.clientX; moved += Math.abs(dx); yaw += dx * .12; vel = dx * .12; }
    if (!reduce && e.pointerType === "mouse") targetPitch = (e.clientY / window.innerHeight - .5) * -5;
  });
  window.addEventListener("pointerup", function () { dragging = false; roomScene.classList.remove("drag"); });
  // a drag should not open a photo
  roomScene.addEventListener("click", function (e) { if (moved > 6) { e.stopPropagation(); e.preventDefault(); } moved = 0; }, true);
  var roomSeen = new IntersectionObserver(function (es) { roomOn = es[0].isIntersecting; });
  roomSeen.observe(document.getElementById("room"));
  var resizeTimer = null;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { if (Math.abs(window.innerWidth - builtW) > 60) buildWall(); }, 250);
  });
  buildWall(); requestAnimationFrame(loop);

  // headline lines rotate: 01 / 03, 02 / 03, 03 / 03
  var lines = document.querySelectorAll(".room-line"), roomNo = document.getElementById("roomNo"), lineI = 0;
  if (!reduce) setInterval(function () {
    lines[lineI].classList.remove("on"); lineI = (lineI + 1) % lines.length; lines[lineI].classList.add("on");
    roomNo.textContent = "0" + (lineI + 1);
  }, 6000);

  /* ---------- Stories: tall reel cards ---------- */
  document.getElementById("storyRow").innerHTML = stories.map(function (s) {
    return '<button class="story" data-open-story="' + s.id + '" aria-label="Watch the ' + esc(s.title) + ' story, ' + s.photos.length + ' photos">' +
      '<img src="' + src(s.cover) + '" alt="" loading="lazy"><span class="dashes" aria-hidden="true">' + s.photos.map(function () { return "<i></i>"; }).join("") + "</span>" +
      '<span class="s-play" aria-hidden="true"></span><span class="s-text"><span class="s-title">' + esc(s.title) + '</span><span class="s-line">' + esc(s.line) + "</span></span></button>";
  }).join("");

  /* ---------- Featured spreads ---------- */
  document.getElementById("spreads").innerHTML = spreads.map(function (sp, i) {
    var cls = ["a", "b", "c"];
    return '<article class="spread' + (i % 2 ? " alt" : "") + '"><div class="sp-photos">' +
      sp.photos.map(function (n, k) { return '<button class="' + cls[k] + '" data-photo="' + n + '" aria-label="View photo larger"><img src="' + src(n) + '" alt="" loading="lazy"></button>'; }).join("") +
      '</div><div class="sp-copy"><h3>' + esc(sp.title) + "</h3><p>" + esc(sp.text) + '</p><div class="sp-meta">' +
      sp.tags.map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("") +
      '</div><button class="btn ghost" data-open-story="' + sp.story + '">Watch the full story</button></div></article>';
  }).join("");

  /* ---------- Packages ---------- */
  document.getElementById("pkGrid").innerHTML = packages.map(function (p) {
    return '<article class="pk' + (p.main ? " main" : "") + '"><img src="' + src(p.photo) + '" alt="" loading="lazy"><div class="pk-body">' +
      (p.tag ? '<span class="tag">' + esc(p.tag) + "</span>" : "") +
      "<h3>" + esc(p.title) + '</h3><p class="for">' + esc(p.for) + "</p><ul>" + p.items.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") +
      '</ul><p class="price">Price on enquiry</p><a class="btn' + (p.main ? "" : " ghost") + '" href="#book" data-pick="' + esc(p.pick) + '">Ask about this package</a></div></article>';
  }).join("");

  /* ---------- Process ---------- */
  document.getElementById("steps").innerHTML = steps.map(function (s) { return "<li><h3>" + esc(s[0]) + "</h3><p>" + esc(s[1]) + "</p></li>"; }).join("");

  /* ---------- Reviews ---------- */
  var palette = ["#D4AE5A", "#E58F7B", "#B9A3E3", "#8CC7A1", "#E9D39A", "#F0A6C1"];
  var initials = function (n) { return n.split(" ").map(function (w) { return w[0]; }).slice(0, 2).join("").toUpperCase(); };
  var grid = document.getElementById("revGrid");
  grid.innerHTML = reviews.map(function (r, i) {
    return '<figure class="rev" data-c="' + r.c + '"><div class="r-head"><span class="av" style="background:' + palette[i % palette.length] + '" aria-hidden="true">' + initials(r.n) +
      '</span><span class="who"><b>' + esc(r.n) + "</b><span>" + esc(r.e) + '</span></span><span class="g">Google</span></div>' +
      '<span class="stars" aria-label="5 out of 5 stars">★★★★★</span><blockquote' + (r.lang ? ' lang="' + r.lang + '"' : "") + ">" + esc(r.t) + "</blockquote></figure>";
  }).join("");
  var revEls = Array.prototype.slice.call(grid.children), revFilter = "all", expanded = false, LIMIT = 9;
  var moreBtn = document.getElementById("revMore");
  function renderReviews() {
    var shown = 0;
    revEls.forEach(function (el) {
      var match = revFilter === "all" || el.getAttribute("data-c").split(" ").indexOf(revFilter) > -1;
      var visible = match && (expanded || revFilter !== "all" || shown < LIMIT);
      el.hidden = !visible; if (visible) shown++;
    });
    moreBtn.hidden = expanded || revFilter !== "all";
  }
  var chips = Array.prototype.slice.call(document.querySelectorAll(".rev-filters .chip"));
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      revFilter = chip.getAttribute("data-f");
      chips.forEach(function (c) { c.classList.toggle("is-on", c === chip); c.setAttribute("aria-pressed", String(c === chip)); });
      renderReviews();
    });
  });
  moreBtn.addEventListener("click", function () { expanded = true; renderReviews(); });
  renderReviews();

  var fq = document.querySelector(".feature-quote"), fqText = document.getElementById("fqText"), fqWho = document.getElementById("fqWho"), fqI = 0;
  function showQuote(i) {
    var r = reviews[featured[i]];
    fqText.textContent = "“" + r.t + "”"; fqWho.textContent = r.n + ", " + r.e.toLowerCase();
  }
  showQuote(0);
  if (!reduce) setInterval(function () {
    if (fq.matches(":hover")) return;
    fq.classList.add("fade");
    setTimeout(function () { fqI = (fqI + 1) % featured.length; showQuote(fqI); fq.classList.remove("fade"); }, 420);
  }, 7000);

  /* ---------- FAQ ---------- */
  document.getElementById("faqList").innerHTML = faqs.map(function (f, i) {
    return "<details" + (i === 0 ? " open" : "") + "><summary>" + esc(f[0]) + "</summary><p>" + esc(f[1]) + "</p></details>";
  }).join("");

  /* ---------- Spotlight parallax ---------- */
  var spotBg = document.querySelector(".spot-bg");
  if (!reduce) {
    window.addEventListener("scroll", function () {
      var r = spotBg.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      spotBg.style.transform = "translate3d(0," + (r.top * -.15).toFixed(1) + "px,0)";
    }, { passive: true });
  }

  /* ---------- Single photo viewer (photos from the wall close by themselves after 3 seconds) ---------- */
  var frameView = document.getElementById("frameView"), frameImg = document.getElementById("frameImg");
  var frameBar = document.createElement("span"); frameBar.className = "frame-timer"; frameBar.setAttribute("aria-hidden", "true");
  frameView.appendChild(frameBar);
  var frameTimer = null, PEEK = 3000;
  function openPhoto(name, peek) {
    clearTimeout(frameTimer);
    frameImg.src = src(name);
    frameView.classList.toggle("peek", !!peek);
    frameBar.style.animation = "none"; void frameBar.offsetWidth; frameBar.style.animation = "";
    if (!frameView.open && typeof frameView.showModal === "function") frameView.showModal();
    if (peek) frameTimer = setTimeout(function () { frameView.close(); }, PEEK);
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-photo]"); if (!b) return;
    openPhoto(b.getAttribute("data-photo"), b.classList.contains("tile"));
  });
  document.getElementById("frameClose").addEventListener("click", function () { frameView.close(); });
  frameView.addEventListener("click", function (e) { if (e.target === frameView || e.target === frameImg) frameView.close(); });
  frameView.addEventListener("close", function () { clearTimeout(frameTimer); frameView.classList.remove("peek"); });

  /* ---------- Story viewer ---------- */
  var viewer = document.getElementById("viewer"), vBars = document.getElementById("vBars"), vImg = document.getElementById("vImg"), vBlur = document.getElementById("vBlur");
  var vTitle = document.getElementById("vTitle"), vDot = document.getElementById("vDot"), vEnd = document.getElementById("vEnd"), vCaption = document.getElementById("vCaption");
  var cur = null, idx = 0, start = 0, elapsed = 0, paused = false, raf = null, DUR = 4500;
  function openStory(id) {
    cur = byId[id]; if (!cur) return;
    vTitle.textContent = cur.title;
    vDot.style.backgroundImage = "url(" + src(cur.cover) + ")";
    vBars.innerHTML = cur.photos.map(function () { return "<span><i></i></span>"; }).join("");
    document.querySelectorAll('.story[data-open-story="' + id + '"]').forEach(function (b) { b.classList.add("seen"); });
    if (!viewer.open && typeof viewer.showModal === "function") viewer.showModal();
    go(0);
  }
  function go(i) {
    if (!cur) return;
    if (i < 0) i = 0;
    if (i >= cur.photos.length) { finish(); return; }
    idx = i; vEnd.hidden = true; paused = false;
    var ph = cur.photos[i];
    vImg.src = src(ph[0]); vBlur.src = src(ph[0]); vImg.alt = ph[1]; vCaption.textContent = ph[1];
    vImg.classList.remove("in"); void vImg.offsetWidth; vImg.classList.add("in");
    var next = cur.photos[i + 1]; if (next) { var pre = new Image(); pre.src = src(next[0]); }
    Array.prototype.forEach.call(vBars.children, function (b, k) { b.firstChild.style.width = k < i ? "100%" : "0"; });
    elapsed = 0; start = performance.now(); cancelAnimationFrame(raf); raf = requestAnimationFrame(step);
  }
  function step(now) {
    if (!viewer.open) return;
    if (!paused) elapsed = now - start; else start = now - elapsed;
    var p = Math.min(1, elapsed / DUR);
    var bar = vBars.children[idx]; if (bar) bar.firstChild.style.width = (p * 100) + "%";
    if (p >= 1 && !reduce) { go(idx + 1); return; }
    raf = requestAnimationFrame(step);
  }
  function finish() {
    cancelAnimationFrame(raf);
    Array.prototype.forEach.call(vBars.children, function (b) { b.firstChild.style.width = "100%"; });
    vEnd.hidden = false;
  }
  function closeStory() { cancelAnimationFrame(raf); vEnd.hidden = true; if (viewer.open) viewer.close(); }

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-open-story]"); if (!t) return;
    e.preventDefault(); openStory(t.getAttribute("data-open-story"));
  });
  document.getElementById("vClose").addEventListener("click", function (e) { e.stopPropagation(); closeStory(); });
  document.getElementById("vNext").addEventListener("click", function () { go(idx + 1); });
  document.getElementById("vPrev").addEventListener("click", function () { go(idx - 1); });
  document.getElementById("vReplay").addEventListener("click", function () { go(0); });
  document.getElementById("vNextStory").addEventListener("click", function () {
    var i = stories.indexOf(cur); openStory(stories[(i + 1) % stories.length].id);
  });
  document.getElementById("vBook").addEventListener("click", function (e) {
    e.preventDefault(); var pick = cur.book; closeStory(); goBook(pick);
  });
  var stage = document.getElementById("vStage"), holdTimer = null;
  stage.addEventListener("pointerdown", function () { holdTimer = setTimeout(function () { paused = true; }, 180); });
  var release = function () { clearTimeout(holdTimer); paused = false; };
  stage.addEventListener("pointerup", release); stage.addEventListener("pointercancel", release); stage.addEventListener("pointerleave", release);
  viewer.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") go(idx + 1);
    if (e.key === "ArrowLeft") go(idx - 1);
  });
  viewer.addEventListener("close", function () { cancelAnimationFrame(raf); });
  var sy = null;
  stage.addEventListener("touchstart", function (e) { sy = e.touches[0].clientY; }, { passive: true });
  stage.addEventListener("touchend", function (e) { if (sy !== null && e.changedTouches[0].clientY - sy > 90) closeStory(); sy = null; });

  /* ---------- Booking ---------- */
  function goBook(pick) {
    var sel = document.getElementById("bShoot");
    Array.prototype.forEach.call(sel.options, function (o) { if (o.text === pick) sel.value = o.value || o.text; });
    document.getElementById("book").scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    setTimeout(function () { document.getElementById("bName").focus({ preventScroll: true }); }, 700);
  }
  document.querySelectorAll("[data-pick]").forEach(function (a) {
    a.addEventListener("click", function (e) { e.preventDefault(); goBook(a.getAttribute("data-pick")); });
  });
  document.getElementById("bookForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("bName").value.trim(), err = document.getElementById("bErr");
    if (!name) { err.hidden = false; document.getElementById("bName").focus(); return; }
    err.hidden = true;
    var lines = ["Hello Subodh Zadte Photography, I'd like to check availability.", "", "Name: " + name, "Shoot: " + document.getElementById("bShoot").value];
    var d = document.getElementById("bDate").value;
    if (d) lines.push("Date: " + new Date(d + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }));
    var v = document.getElementById("bVenue").value.trim(); if (v) lines.push("Venue: " + v);
    var m = document.getElementById("bMsg").value.trim(); if (m) lines.push("", m);
    window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
