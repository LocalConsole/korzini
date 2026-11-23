(function () {
  "use strict";
  var D = window.I18N, C = window.CONFIG, P = window.PRODUCTS, CAT = window.CATEGORIES, HOT = window.HOT || [];
  var html = document.documentElement, body = document.body, page = body.getAttribute("data-page");
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var LI = { uz: 0, ru: 1, en: 2 };
  var lang = LI[html.lang] !== undefined ? html.lang : "uz";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  function T(k) { var e = D[k]; return e ? (e[lang] || e.uz) : k; }
  function money(n) { return n.toLocaleString("ru-RU").replace(/ | /g, " ") + " " + T("cur"); }
  function fill(s) { return s.replace("{free}", money(C.freeDeliveryFrom)).replace("{fee}", money(C.deliveryFee)); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function nm(p, l) { return p.name[LI[l || lang]]; }
  function ds(p) { return p.desc[LI[lang]]; }
  function byId(id) { for (var i = 0; i < P.length; i++) if (P[i].id === id) return P[i]; return null; }
  function unit(p) { return "1 " + T("unit." + p.unit); }
  var GIFTS = P.filter(function (p) { return p.cat === "sovga"; });

  var cart = {};
  try { cart = JSON.parse(store.get("us_cart", "{}")) || {}; } catch (e) { cart = {}; }
  Object.keys(cart).forEach(function (id) { if (!byId(id) || !(cart[id] > 0)) delete cart[id]; });
  function saveCart() { store.set("us_cart", JSON.stringify(cart)); }

  /* ---------- word split ---------- */
  function split(el, text) {
    var replay = el.classList.contains("in");
    el.textContent = "";
    text.split(/\s+/).forEach(function (w, i, arr) {
      var o = document.createElement("span"), inner = document.createElement("i");
      o.className = "w"; inner.style.setProperty("--i", i); inner.textContent = w;
      o.appendChild(inner); el.appendChild(o);
      if (i < arr.length - 1) el.appendChild(document.createTextNode(" "));
    });
    el.classList.add("is-split");
    if (replay && !reduce) { el.classList.remove("in"); void el.offsetWidth; el.classList.add("in"); }
  }

  /* ---------- photo slots ---------- */
  var phCache = {};
  function initPh(root) {
    $$(".ph[data-src]", root).forEach(function (fig) {
      if (fig.getAttribute("data-init")) return;
      fig.setAttribute("data-init", "1");
      var src = fig.getAttribute("data-src");
      if (phCache[src] === "fail") return;
      var img = new Image();
      img.alt = "";
      img.decoding = "async";
      img.onload = function () { phCache[src] = "ok"; fig.appendChild(img); requestAnimationFrame(function () { fig.classList.add("has"); }); };
      img.onerror = function () { phCache[src] = "fail"; };
      img.src = src;
    });
  }
  function phHTML(file, shape) {
    return '<figure class="ph ph--' + shape + '" data-src="images/' + file + '"><div class="ph__empty"><svg aria-hidden="true"><use href="#s-star"/></svg><span data-i18n="ph.label">' + esc(T("ph.label")) + "</span></div></figure>";
  }

  /* ---------- renderers ---------- */
  function action(p) {
    if (cart[p.id]) {
      return '<span class="qty"><button type="button" data-dec="' + p.id + '" aria-label="' + esc(T("aria.dec")) + '">−</button><b>' + cart[p.id] +
        '</b><button type="button" data-inc="' + p.id + '" aria-label="' + esc(T("aria.inc")) + '">+</button></span>';
    }
    return '<button type="button" class="add" data-add="' + p.id + '">' + esc(T("add")) + "</button>";
  }
  function row(p) {
    return '<div class="row"><div class="row__n">' + esc(nm(p)) + '</div><div class="row__p">' + money(p.price) + " <small>/ " + unit(p) + "</small></div>" +
      '<div class="row__d">' + esc(ds(p)) + '</div><div class="row__a">' + action(p) + "</div></div>";
  }
  function giftCard(p, i) {
    return '<article class="gift reveal" style="--d:' + i * 90 + 'ms" data-tilt>' + phHTML("gift-" + p.id.replace("sovga-", "") + ".jpg", "round") +
      '<div class="gift__b"><span class="gift__tag" data-i18n="tag.' + p.tag + '">' + esc(T("tag." + p.tag)) + "</span><h3>" + esc(nm(p)) + "</h3><p>" + esc(ds(p)) + "</p>" +
      '<div class="gift__f"></div></div></article>';
  }

  var state = { cat: "all", q: "" };
  if (page === "catalog") {
    var qc = new URLSearchParams(location.search).get("cat");
    if (qc && CAT.some(function (c) { return c.id === qc; })) state.cat = qc;
  }

  function renderTabs() {
    var el = $("#tabs"); if (!el) return;
    el.innerHTML = ["all"].concat(CAT.map(function (c) { return c.id; })).map(function (id) {
      return '<button type="button" class="tab" data-cat="' + id + '" aria-pressed="' + (state.cat === id) + '">' + esc(T("cat." + id)) + "</button>";
    }).join("");
  }
  function renderList() {
    var el = $("#list"); if (!el) return;
    var q = state.q.trim().toLowerCase(), out = "", any = false;
    CAT.forEach(function (c) {
      if (state.cat !== "all" && state.cat !== c.id) return;
      var items = P.filter(function (p) {
        if (p.cat !== c.id) return false;
        if (!q) return true;
        return p.name.some(function (n) { return n.toLowerCase().indexOf(q) > -1; });
      });
      if (!items.length) return;
      any = true;
      out += '<section class="group"><div class="group__h"><h2>' + esc(T("cat." + c.id)) + "</h2><span>" + items.length + '</span></div><div class="rows">' + items.map(row).join("") + "</div></section>";
    });
    el.innerHTML = out;
    $("#empty").hidden = any;
  }
  function renderHot() { var el = $("#hot"); if (el) el.innerHTML = HOT.map(byId).filter(Boolean).map(row).join(""); }
  // sovg'a kartalari bir marta chiziladi; til va savat o'zgarganda faqat matn/tugmalar yangilanadi
  function renderGifts() {
    var el = $("#giftGrid"); if (!el) return;
    if (!el.children.length) { el.innerHTML = GIFTS.map(giftCard).join(""); initPh(el); bindTilt(el); }
    $$(".gift", el).forEach(function (g, i) {
      var p = GIFTS[i];
      $("h3", g).textContent = nm(p); $(".gift__b p", g).textContent = ds(p);
      $(".gift__tag", g).textContent = T("tag." + p.tag);
      $(".ph__empty span", g).textContent = T("ph.label");
    });
    renderGiftActions();
  }
  function renderGiftActions() {
    $$(".gift").forEach(function (g, i) { $(".gift__f", g).innerHTML = "<b>" + money(GIFTS[i].price) + "</b>" + action(GIFTS[i]); });
  }
  function renderMarquee() {
    var el = $("#mq"); if (!el) return;
    var items = P.filter(function (p) { return p.cat !== "sovga"; }).map(function (p) {
      return "<span>" + esc(nm(p)) + '</span><svg aria-hidden="true"><use href="#s-star"/></svg>';
    }).join("");
    el.innerHTML = items + items;
  }
  function totals() {
    var sub = 0;
    Object.keys(cart).forEach(function (id) { sub += byId(id).price * cart[id]; });
    var fee = sub === 0 ? 0 : (sub >= C.freeDeliveryFrom ? 0 : C.deliveryFee);
    return { sub: sub, fee: fee, total: sub + fee };
  }
  function renderCart() {
    var ids = Object.keys(cart), t = totals();
    $("#cartCount").textContent = ids.reduce(function (s, id) { return s + cart[id]; }, 0);
    $("#cartItems").innerHTML = ids.length ? ids.map(function (id) {
      var p = byId(id);
      return '<div class="ci"><h3>' + esc(nm(p)) + "</h3>" + action(p) + "<small>" + cart[id] + " × " + money(p.price) + " = " + money(p.price * cart[id]) + "</small></div>";
    }).join("") : '<div class="cart-empty"><p>' + esc(T("cart.empty")) + '</p><a class="btn btn--line" href="catalog.html">' + esc(T("cart.go")) + "</a></div>";
    $("#sub").textContent = money(t.sub);
    $("#fee").textContent = t.sub === 0 ? "—" : (t.fee ? money(t.fee) : T("cart.free"));
    $("#total").textContent = money(t.total);
    $("#submitBtn").disabled = ids.length === 0;
  }
  function renderContacts() {
    var el = $("#clist"); if (!el) return;
    el.innerHTML =
      "<li><span>" + esc(T("lbl.phone")) + '</span><a href="tel:' + C.phone.replace(/\s/g, "") + '">' + esc(C.phone) + "</a></li>" +
      "<li><span>" + esc(T("lbl.tg")) + '</span><a href="https://t.me/' + C.telegram + '" target="_blank" rel="noopener">@' + esc(C.telegram) + "</a></li>" +
      "<li><span>" + esc(T("lbl.ig")) + '</span><a href="https://instagram.com/' + C.instagram + '" target="_blank" rel="noopener">@' + esc(C.instagram) + "</a></li>" +
      "<li><span>" + esc(T("lbl.city")) + "</span><b>" + esc(T("city")) + "</b></li>";
  }
  function renderProducts() { renderTabs(); renderList(); renderHot(); renderGifts(); renderMarquee(); renderCart(); }

  /* ---------- language ---------- */
  function applyLang() {
    html.lang = lang;
    $$("[data-i18n]").forEach(function (el) {
      if (el.closest(".gift")) return;
      var v = fill(T(el.getAttribute("data-i18n")));
      if (el.hasAttribute("data-split")) split(el, v); else el.textContent = v;
    });
    $$("[data-i18n-ph]").forEach(function (el) { el.placeholder = T(el.getAttribute("data-i18n-ph")); });
    $$("[data-i18n-aria]").forEach(function (el) { el.setAttribute("aria-label", T(el.getAttribute("data-i18n-aria"))); });
    document.title = T("title." + page);
    var md = $('meta[name="description"]'); if (md) md.content = T("desc");
    $$("[data-lang]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang)); });
    $("#palName").textContent = T("pal." + html.getAttribute("data-palette"));
    renderProducts();
    renderContacts();
  }
  function setLang(l) {
    if (l === lang || LI[l] === undefined) return;
    lang = l; store.set("us_lang", l);
    applyLang();
  }

  /* ---------- theme & palette ---------- */
  function syncSettings() {
    var th = html.getAttribute("data-theme"), pal = html.getAttribute("data-palette");
    $$("[data-theme-set]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-theme-set") === th)); });
    $$("[data-pal]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-pal") === pal)); });
    $("#palName").textContent = T("pal." + pal);
    var meta = $('meta[name="theme-color"]');
    if (meta) meta.content = th === "dark" ? "#0d120f" : "#f4f5f1";
  }
  function setTheme(t) { html.setAttribute("data-theme", t); store.set("us_theme", t); syncSettings(); }
  function setPal(p) { html.setAttribute("data-palette", p); store.set("us_pal", p); syncSettings(); }

  /* ---------- cart drawer ---------- */
  var lastFocus = null;
  function openCart(v) {
    var d = $("#drawer");
    if (v) lastFocus = document.activeElement;
    d.classList.toggle("open", v);
    d.setAttribute("aria-hidden", String(!v));
    $("#overlay").hidden = !v;
    body.style.overflow = v ? "hidden" : "";
    if (v) setTimeout(function () { $("#closeCart").focus(); }, 60);
    else if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function bump() { var b = $("#openCart"); b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump"); }
  function fly(fromEl) {
    if (reduce || !fromEl || !body.animate) { bump(); return; }
    var a = fromEl.getBoundingClientRect(), b = $("#openCart").getBoundingClientRect();
    var x0 = a.left + a.width / 2 - 8, y0 = a.top + a.height / 2 - 8, x1 = b.right - 22, y1 = b.top + b.height / 2 - 8;
    var dot = document.createElement("div"); dot.className = "fly"; body.appendChild(dot);
    var peak = Math.min(y0, y1) - 90;
    dot.animate([
      { transform: "translate(" + x0 + "px," + y0 + "px) scale(1)" },
      { transform: "translate(" + (x0 + (x1 - x0) * 0.5) + "px," + peak + "px) scale(1.25)", offset: 0.45 },
      { transform: "translate(" + x1 + "px," + y1 + "px) scale(.4)", opacity: 0.6 }
    ], { duration: 750, easing: "cubic-bezier(.5,0,.3,1)" }).onfinish = function () { dot.remove(); bump(); };
  }
  function change(id, d, src) {
    var rect = src ? src : null;
    cart[id] = (cart[id] || 0) + d;
    if (cart[id] <= 0) delete cart[id];
    saveCart();
    if (d > 0 && rect) fly(rect);
    renderList(); renderHot(); renderGiftActions(); renderCart();
  }

  /* ---------- events ---------- */
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-add],[data-inc],[data-dec],[data-cat],[data-lang],[data-theme-set],[data-pal]");
    if (!t) return;
    if (t.hasAttribute("data-add")) change(t.getAttribute("data-add"), 1, t);
    else if (t.hasAttribute("data-inc")) change(t.getAttribute("data-inc"), 1);
    else if (t.hasAttribute("data-dec")) change(t.getAttribute("data-dec"), -1);
    else if (t.hasAttribute("data-cat")) {
      state.cat = t.getAttribute("data-cat"); renderTabs(); renderList();
      var u = new URL(location.href); if (state.cat === "all") u.searchParams.delete("cat"); else u.searchParams.set("cat", state.cat);
      history.replaceState(null, "", u);
    }
    else if (t.hasAttribute("data-lang")) setLang(t.getAttribute("data-lang"));
    else if (t.hasAttribute("data-theme-set")) setTheme(t.getAttribute("data-theme-set"));
    else if (t.hasAttribute("data-pal")) setPal(t.getAttribute("data-pal"));
  });

  var search = $("#search");
  if (search) search.addEventListener("input", function () { state.q = search.value; renderList(); });
  var reset = $("#resetSearch");
  if (reset) reset.addEventListener("click", function () { search.value = ""; state.q = ""; state.cat = "all"; renderTabs(); renderList(); search.focus(); });

  $("#openCart").addEventListener("click", function () { openCart(true); });
  $("#closeCart").addEventListener("click", function () { openCart(false); });
  $("#overlay").addEventListener("click", function () { openCart(false); });

  var setBtn = $("#setBtn"), setPanel = $("#setPanel");
  function togglePanel(v) { setPanel.hidden = !v; setBtn.setAttribute("aria-expanded", String(v)); }
  setBtn.addEventListener("click", function (e) { e.stopPropagation(); togglePanel(setPanel.hidden); });
  document.addEventListener("click", function (e) { if (!setPanel.hidden && !e.target.closest(".settings")) togglePanel(false); });

  var burger = $("#burger"), nav = $("#nav");
  burger.addEventListener("click", function () { var o = nav.classList.toggle("open"); burger.setAttribute("aria-expanded", String(o)); });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if ($("#drawer").classList.contains("open")) openCart(false);
    if (!setPanel.hidden) { togglePanel(false); setBtn.focus(); }
    if (nav.classList.contains("open")) { nav.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); burger.focus(); }
  });

  var header = $("#top");
  function onScroll() { header.classList.toggle("scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ---------- order ---------- */
  function orderText(f, t) {
    var lines = Object.keys(cart).map(function (id, i) {
      var p = byId(id); return (i + 1) + ". " + nm(p, "uz") + " x " + cart[id] + " " + p.unit + " = " + p.price * cart[id];
    });
    return "Yangi buyurtma (" + lang.toUpperCase() + ")\n\nIsm: " + f.name + "\nTelefon: " + f.phone + "\nManzil: " + f.address +
      (f.time ? "\nVaqt: " + f.time : "") + (f.note ? "\nIzoh: " + f.note : "") +
      "\n\n" + lines.join("\n") + "\n\nMahsulotlar: " + t.sub + " so'm\nYetkazish: " + t.fee + " so'm\nJami: " + t.total + " so'm";
  }
  var form = $("#orderForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var msg = $("#formMsg"), btn = $("#submitBtn");
    var f = { name: form.name.value.trim(), phone: form.phone.value.trim(), address: form.address.value.trim(), time: form.time.value.trim(), note: form.note.value.trim() };
    var okPhone = f.phone.replace(/\D/g, "").length >= 9;
    form.name.classList.toggle("bad", !f.name); form.address.classList.toggle("bad", !f.address); form.phone.classList.toggle("bad", !okPhone);
    if (!f.name || !f.address || !okPhone) {
      msg.className = "form-msg err"; msg.textContent = T("form.err");
      (!f.name ? form.name : !okPhone ? form.phone : form.address).focus();
      return;
    }
    var text = orderText(f, totals());
    btn.disabled = true; msg.className = "form-msg"; msg.textContent = T("form.sending");
    var done = function (k) { cart = {}; saveCart(); form.reset(); renderList(); renderHot(); renderGiftActions(); renderCart(); msg.className = "form-msg ok"; msg.textContent = T(k); };
    if (C.orderEndpoint) {
      fetch(C.orderEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: text }) })
        .then(function (r) { if (!r.ok) throw new Error(r.status); done("form.ok"); })
        .catch(function () { btn.disabled = false; msg.className = "form-msg err"; msg.textContent = T("form.fail"); });
    } else {
      console.log(text);
      setTimeout(function () { done("form.demo"); }, 500);
    }
  });
  ["name", "phone", "address"].forEach(function (n) { form[n].addEventListener("input", function () { form[n].classList.remove("bad"); }); });

  /* ---------- motion ---------- */
  function countUp(el, instant) {
    var target = +el.getAttribute("data-count"); if (!target) return;
    var suf = el.getAttribute("data-suffix") || "", t0 = performance.now(), dur = 1600;
    var show = function (n) { el.textContent = Math.round(n).toLocaleString("ru-RU").replace(/ | /g, " ") + suf; };
    if (instant) { show(target); return; }
    (function tick(now) {
      var k = Math.min(1, (now - t0) / dur); show(target * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(tick);
    })(t0);
  }
  function startReveal() {
    var els = $$(".reveal:not(.in), .words, .steps li, [data-count], #bigword");
    if (reduce || !("IntersectionObserver" in window)) { els.forEach(function (el) { el.classList.add("in"); countUp(el, true); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("in"); countUp(en.target); io.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    var vh = window.innerHeight;
    els.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) { el.classList.add("in"); countUp(el); }
      else io.observe(el);
    });
  }
  function bindTilt(root) {
    if (!finePointer || reduce) return;
    $$("[data-tilt]", root).forEach(function (el) {
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = "perspective(900px) rotateX(" + (-y * 6) + "deg) rotateY(" + (x * 7) + "deg) translateY(-4px)";
      });
      el.addEventListener("pointerleave", function () { el.style.transform = ""; });
    });
  }
  function bindMagnet() {
    if (!finePointer || reduce) return;
    document.addEventListener("pointermove", function (e) {
      var el = e.target.closest && e.target.closest(".btn, .cart-btn");
      if (!el) return;
      var r = el.getBoundingClientRect();
      el.style.transform = "translate(" + ((e.clientX - r.left - r.width / 2) * 0.14) + "px," + ((e.clientY - r.top - r.height / 2) * 0.22) + "px)";
    }, { passive: true });
    document.addEventListener("pointerout", function (e) {
      var el = e.target.closest && e.target.closest(".btn, .cart-btn");
      if (el && !el.contains(e.relatedTarget)) el.style.transform = "";
    });
  }
  function bindParallax() {
    var stage = $("#stage"); if (!stage || !finePointer || reduce) return;
    var shapes = $$("[data-depth]", stage);
    window.addEventListener("pointermove", function (e) {
      var x = e.clientX / window.innerWidth - 0.5, y = e.clientY / window.innerHeight - 0.5;
      shapes.forEach(function (s) { var d = +s.getAttribute("data-depth"); s.style.transform = "translate(" + x * d + "px," + y * d + "px)"; });
    }, { passive: true });
  }

  /* ---------- footer word: konteyner kengligiga aniq moslash ---------- */
  function fitBig() {
    var el = $("#bigword"); if (!el) return;
    el.style.fontSize = "100px";
    var w = 0; $$("span", el).forEach(function (s) { w += s.getBoundingClientRect().width; });
    el.style.fontSize = Math.max(40, 100 * el.clientWidth / w * 0.985) + "px";
  }
  fitBig();
  window.addEventListener("resize", fitBig);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitBig);

  /* ---------- boot ---------- */
  applyLang();
  syncSettings();
  initPh(document);
  bindMagnet();
  bindParallax();
  $$("[data-tg]").forEach(function (a) { a.href = "https://t.me/" + C.telegram; });
  $("#year").textContent = new Date().getFullYear();

  function ready() { html.classList.add("ready"); startReveal(); }
  if (html.classList.contains("splash-on")) {
    var t0 = performance.now(), minT = 1250;
    var fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    Promise.race([fontsReady, new Promise(function (r) { setTimeout(r, 2000); })]).then(function () {
      setTimeout(function () {
        html.classList.add("splash-go");
        setTimeout(ready, 380);
        setTimeout(function () {
          html.classList.remove("splash-on", "splash-go");
          try { sessionStorage.setItem("us_splash", "1"); } catch (e) {}
        }, 1050);
      }, Math.max(0, minT - (performance.now() - t0)));
    });
  } else ready();
})();
