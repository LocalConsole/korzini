// Dev-panel: qurilmalar, til, mavzu, palitra (o'z rangi + kontrast tekshiruvi), animatsiya.
// ?preview=0 — yashirish, ?preview=1 — qaytarish. Prod-yig'ishda ulanmaydi: node tools/build.js --prod
(function () {
  "use strict";
  var q = new URLSearchParams(location.search);
  try {
    if (q.get("preview") === "0") sessionStorage.setItem("us_nopv", "1");
    if (q.get("preview") === "1") sessionStorage.removeItem("us_nopv");
    if (sessionStorage.getItem("us_nopv") || q.get("frame") === "1" || window.self !== window.top) return;
  } catch (e) {}
  var US = window.US; if (!US) return;
  var html = document.documentElement;
  var get = function (k, d) { try { return localStorage.getItem(k) || d; } catch (e) { return d; } };

  /* ---------- OKLCH -> sRGB + WCAG kontrast ---------- */
  function lin(x) { return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); }
  function hexRgb(h) { return [1, 3, 5].map(function (i) { return parseInt(h.substr(i, 2), 16) / 255; }); }
  function hex2oklch(hex) {
    var c = hexRgb(hex).map(lin);
    var l = Math.cbrt(0.4122214708 * c[0] + 0.5363325363 * c[1] + 0.0514459929 * c[2]);
    var m = Math.cbrt(0.2119034982 * c[0] + 0.6806995451 * c[1] + 0.1073969566 * c[2]);
    var s = Math.cbrt(0.0883024619 * c[0] + 0.2817188376 * c[1] + 0.6299787005 * c[2]);
    var L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, b = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
    return [L, Math.sqrt(a * a + b * b), (Math.atan2(b, a) * 180 / Math.PI + 360) % 360];
  }
  function oklch2rgb(L, C, h) {
    var a = C * Math.cos(h * Math.PI / 180), b = C * Math.sin(h * Math.PI / 180);
    var l = Math.pow(L + 0.3963377774 * a + 0.2158037573 * b, 3), m = Math.pow(L - 0.1055613458 * a - 0.0638541728 * b, 3), s = Math.pow(L - 0.0894841775 * a - 1.291485548 * b, 3);
    return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s]
      .map(function (x) { x = Math.max(0, Math.min(1, x)); return x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055; });
  }
  function toHex(rgb) { return "#" + rgb.map(function (x) { return ("0" + Math.round(x * 255).toString(16)).slice(-2); }).join(""); }
  function lum(rgb) { var c = rgb.map(lin); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; }
  function contrast(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
  var LIGHT_BG = hexRgb("#f4f5f1"), DARK_BG = hexRgb("#0d120f"), WHITE = [1, 1, 1], DARK_TXT = hexRgb("#10150f"), BADGE_TXT = hexRgb("#16211b");

  // Bir xil tusdan light/dark tokenlar; kontrast 4.5:1 dan past bo'lsa yorug'lik avtomatik suriladi
  function paletteFrom(hex) {
    var o = hex2oklch(hex), C = Math.min(Math.max(o[1], 0.06), 0.17), h = o[2], L, rgb;
    for (L = 0.56; L > 0.2; L -= 0.01) { rgb = oklch2rgb(L, C, h); if (contrast(rgb, WHITE) >= 4.5 && contrast(rgb, LIGHT_BG) >= 4.5) break; }
    var a = rgb;
    for (L = 0.74; L < 0.97; L += 0.01) { rgb = oklch2rgb(L, C * 0.8, h); if (contrast(rgb, DARK_BG) >= 4.5 && contrast(rgb, DARK_TXT) >= 4.5) break; }
    var ad = rgb, h2 = (h + 150) % 360;
    for (L = 0.72; L < 0.95; L += 0.01) { rgb = oklch2rgb(L, 0.13, h2); if (contrast(rgb, BADGE_TXT) >= 4.5) break; }
    return { "--a": toHex(a), "--a-dk": toHex(ad), "--b": toHex(rgb), _report: [contrast(a, WHITE), contrast(a, LIGHT_BG), contrast(ad, DARK_BG), contrast(rgb, BADGE_TXT)] };
  }
  window.US_palette = paletteFrom; // ko'rib chiqish skripti uchun

  /* ---------- panel ---------- */
  var DEV = [["Phone", 360, 740], ["Phone+", 390, 844], ["Tablet", 768, 1024], ["Tablet+", 820, 1180], ["Laptop", 1366, 768], ["Desktop", 1920, 1080], ["Ultrawide", 2560, 1080]];
  var PALS = ["anor", "pista", "orik", "uzum", "feruza"];
  var css = document.createElement("link"); css.rel = "stylesheet"; css.href = "css/preview.css?v=" + Date.now().toString(36).slice(0, 5); document.head.appendChild(css);

  var root = document.createElement("div");
  root.className = "pv"; root.setAttribute("data-open", "false");
  root.innerHTML =
    '<button class="pv__fab" type="button" aria-expanded="false" aria-controls="pvPanel">Preview</button>' +
    '<div class="pv__panel" id="pvPanel" role="dialog" aria-label="Preview panel">' +
    '<div class="pv__row"><b>Ekran</b><div class="pv__chips">' + DEV.map(function (d, i) { return '<button type="button" data-dev="' + i + '">' + d[0] + "<small>" + d[1] + "</small></button>"; }).join("") + "</div></div>" +
    '<div class="pv__row"><b>Til</b><div class="pv__chips">' + ["uz", "ru", "en"].map(function (l) { return '<button type="button" data-pl="' + l + '">' + l.toUpperCase() + "</button>"; }).join("") + "</div></div>" +
    '<div class="pv__row"><b>Mavzu</b><div class="pv__chips">' + [["light", "Light"], ["dark", "Dark"], ["system", "System"]].map(function (t) { return '<button type="button" data-pt="' + t[0] + '">' + t[1] + "</button>"; }).join("") + "</div></div>" +
    '<div class="pv__row"><b>Palitra</b><div class="pv__chips">' + PALS.map(function (p) { return '<button type="button" class="pv__sw sw--' + p + '" data-pp="' + p + '" aria-label="' + p + '"><i></i></button>'; }).join("") +
    '<label class="pv__color" title="O\'z rangi"><input type="color" id="pvColor" value="#9b2242"><span>Custom</span></label></div><p class="pv__note" id="pvNote"></p></div>' +
    '<div class="pv__row"><b>Animatsiya</b><div class="pv__chips">' + ["off", "subtle", "rich"].map(function (m) { return '<button type="button" data-pm="' + m + '">' + m[0].toUpperCase() + m.slice(1) + "</button>"; }).join("") + "</div></div>" +
    '<div class="pv__row pv__foot"><button type="button" data-replay>Intro</button><button type="button" data-hide>Yashirish</button></div>' +
    "</div>" +
    '<div class="pv__stage" hidden><div class="pv__bar"><span id="pvLabel"></span><button type="button" data-rot>Rotate</button><button type="button" data-close>Close</button></div><div class="pv__frame"><iframe title="Device preview"></iframe></div></div>';
  document.body.appendChild(root);

  var fab = root.querySelector(".pv__fab"), stage = root.querySelector(".pv__stage"), iframe = root.querySelector("iframe"), frameBox = root.querySelector(".pv__frame");
  var cur = null, land = false;

  function mark() {
    var th = get("us_theme", "system"), pal = html.getAttribute("data-palette"), mo = html.getAttribute("data-motion");
    root.querySelectorAll("[data-pl]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-pl") === html.lang)); });
    root.querySelectorAll("[data-pt]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-pt") === th)); });
    root.querySelectorAll("[data-pp]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-pp") === pal)); });
    root.querySelectorAll("[data-pm]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-pm") === mo)); });
    root.querySelectorAll("[data-dev]").forEach(function (b) { b.setAttribute("aria-pressed", String(cur !== null && +b.getAttribute("data-dev") === cur)); });
  }
  function both(fn) { fn(US); try { if (!stage.hidden && iframe.contentWindow.US) fn(iframe.contentWindow.US); } catch (e) {} mark(); }
  function fit() {
    if (cur === null) return;
    var d = DEV[cur], w = land ? d[2] : d[1], h = land ? d[1] : d[2];
    var availW = window.innerWidth - 40, availH = window.innerHeight - 90, k = Math.min(1, availW / w, availH / h);
    iframe.style.width = w + "px"; iframe.style.height = h + "px"; iframe.style.transform = "scale(" + k + ")";
    frameBox.style.width = w * k + "px"; frameBox.style.height = h * k + "px";
    root.querySelector("#pvLabel").textContent = d[0] + " " + w + "×" + h + (k < 1 ? "  (" + Math.round(k * 100) + "%)" : "");
  }
  function openDev(i) {
    cur = i; var u = new URL(location.href); u.searchParams.set("frame", "1");
    if (stage.hidden || iframe.getAttribute("src") !== u.toString()) iframe.src = u.toString();
    stage.hidden = false; fit(); mark();
  }

  root.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    if (b === fab) { var o = root.getAttribute("data-open") !== "true"; root.setAttribute("data-open", String(o)); fab.setAttribute("aria-expanded", String(o)); return; }
    if (b.hasAttribute("data-dev")) openDev(+b.getAttribute("data-dev"));
    else if (b.hasAttribute("data-pl")) both(function (u) { u.setLang(b.getAttribute("data-pl")); });
    else if (b.hasAttribute("data-pt")) both(function (u) { u.setTheme(b.getAttribute("data-pt")); });
    else if (b.hasAttribute("data-pp")) both(function (u) { u.setPal(b.getAttribute("data-pp")); });
    else if (b.hasAttribute("data-pm")) US.setMotion(b.getAttribute("data-pm"));
    else if (b.hasAttribute("data-rot")) { land = !land; fit(); }
    else if (b.hasAttribute("data-close")) { stage.hidden = true; cur = null; iframe.removeAttribute("src"); mark(); }
    else if (b.hasAttribute("data-replay")) { try { sessionStorage.removeItem("us_splash"); } catch (x) {} location.reload(); }
    else if (b.hasAttribute("data-hide")) { try { sessionStorage.setItem("us_nopv", "1"); } catch (x) {} root.remove(); }
  });
  var color = root.querySelector("#pvColor"), note = root.querySelector("#pvNote");
  color.addEventListener("input", function () {
    var p = paletteFrom(color.value), r = p._report; delete p._report;
    both(function (u) { u.setVars(p); });
    note.textContent = "Kontrast: tugma " + r[0].toFixed(1) + ", matn " + r[1].toFixed(1) + ", tungi " + r[2].toFixed(1) + " — WCAG AA ✓ (avtomatik moslandi)";
  });
  window.addEventListener("resize", fit);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !stage.hidden) root.querySelector("[data-close]").click(); });
  mark();
})();
