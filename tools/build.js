// Statik sahifalarni yig'adi: node tools/build.js
// Matnlar js/i18n.js dan olinadi (o'zbekcha — standart), qolgan tillarni brauzer almashtiradi.
const fs = require("fs");
const path = require("path");
const D = require("../js/i18n.js");
const ART = require("../js/art.js");
const ROOT = path.join(__dirname, "..");

const t = (k) => { if (!D[k]) throw new Error("i18n key yo'q: " + k); return D[k].uz.replace("{free}", "300 000 so'm").replace("{fee}", "20 000 so'm"); };
const tx = (tag, key, attrs = "") => `<${tag}${attrs ? " " + attrs : ""} data-i18n="${key}">${t(key)}</${tag}>`;
const ph = (file, shape, extra = "", art = "meva") =>
  `<figure class="ph ph--${shape}${extra ? " " + extra : ""}" data-src="images/${file}" title="images/${file}"><div class="ph__empty">${ART(art)}</div></figure>`;
const emb = (sym, cls, par, rot) => `<span class="emb ${cls}" data-par="${par}" data-rot="${rot}" aria-hidden="true"><svg><use href="#${sym}"/></svg></span>`;
const PALS = ["anor", "pista", "orik", "uzum", "feruza"];
const NAV = [["home", "index.html"], ["catalog", "catalog.html"], ["gifts", "gifts.html"], ["delivery", "delivery.html"], ["contact", "contact.html"]];

const SPRITE = `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
<symbol id="s-star" viewBox="0 0 100 100"><path fill="currentColor" d="M50 2l11 22 23-9-9 23 22 12-22 12 9 23-23-9-11 22-11-22-23 9 9-23L4 50l22-12-9-23 23 9z"/></symbol>
<symbol id="s-apricot" viewBox="0 0 100 100"><circle cx="50" cy="56" r="38" fill="currentColor"/><path d="M50 20c-6 14-6 30 0 44s5 22 0 30" fill="none" stroke="rgba(0,0,0,.16)" stroke-width="3" stroke-linecap="round"/><path d="M51 19c3-11 13-15 23-12-2 10-12 16-23 12z" fill="var(--leaf)"/></symbol>
<symbol id="s-almond" viewBox="0 0 100 100"><path fill="currentColor" d="M50 4c30 20 38 58 0 92C12 62 20 24 50 4z"/><path d="M50 18c-8 20-8 44 0 64" fill="none" stroke="rgba(0,0,0,.14)" stroke-width="2.5" stroke-linecap="round"/></symbol>
<symbol id="s-seed" viewBox="0 0 100 100"><path fill="currentColor" d="M50 6c22 18 34 38 34 56a34 34 0 0 1-68 0C16 44 28 24 50 6z"/><ellipse cx="38" cy="58" rx="7" ry="12" fill="rgba(255,255,255,.35)"/></symbol>
<symbol id="s-leaf" viewBox="0 0 100 100"><path fill="currentColor" d="M8 92C8 40 40 8 92 8c0 52-32 84-84 84z"/><path d="M14 86L78 22" stroke="rgba(0,0,0,.15)" stroke-width="3"/></symbol>
<symbol id="s-cart" viewBox="0 0 24 24"><path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 8H6.2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9.5" cy="20" r="1.3" fill="currentColor"/><circle cx="17" cy="20" r="1.3" fill="currentColor"/></symbol>
<symbol id="s-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>
<symbol id="s-moon" viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></symbol>
<symbol id="s-palette" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-1 1.6-2.1-.5-1.2.3-2.4 1.6-2.4H17a4 4 0 0 0 4-4C21 7 17 3 12 3z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="7.5" cy="11" r="1.4" fill="currentColor"/><circle cx="10.5" cy="7.2" r="1.4" fill="currentColor"/><circle cx="15" cy="7.6" r="1.4" fill="currentColor"/></symbol>
<symbol id="s-close" viewBox="0 0 24 24"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></symbol>
<symbol id="s-apple" viewBox="0 0 100 100"><path fill="#d8414a" d="M50 30c-8-6-26-8-34 6-9 16 0 44 14 52 7 4 13 2 20-1 7 3 13 5 20 1 14-8 23-36 14-52-8-14-26-12-34-6z"/><path d="M50 31c0-9 3-16 9-21" stroke="#5a3b22" stroke-width="3.5" fill="none" stroke-linecap="round"/><path fill="#5f8f3a" d="M55 22c6-10 18-12 26-8-4 9-16 13-26 8z"/><ellipse cx="31" cy="50" rx="6" ry="11" fill="rgba(255,255,255,.3)"/></symbol>
<symbol id="s-pom" viewBox="0 0 100 100"><path fill="#8e1b30" d="M37 22l3-14 10 8 10-8 3 14z"/><circle cx="50" cy="56" r="38" fill="#b3263e"/><circle cx="50" cy="56" r="30" fill="#f8dccf"/><circle cx="50" cy="38" r="4.6" fill="#c41d3c"/><circle cx="48.6" cy="36.4" r="1.3" fill="#ffd2da"/><circle cx="40" cy="44" r="4.6" fill="#c41d3c"/><circle cx="38.6" cy="42.4" r="1.3" fill="#ffd2da"/><circle cx="60" cy="44" r="4.6" fill="#c41d3c"/><circle cx="58.6" cy="42.4" r="1.3" fill="#ffd2da"/><circle cx="34" cy="55" r="4.6" fill="#c41d3c"/><circle cx="32.6" cy="53.4" r="1.3" fill="#ffd2da"/><circle cx="46" cy="52" r="4.6" fill="#c41d3c"/><circle cx="44.6" cy="50.4" r="1.3" fill="#ffd2da"/><circle cx="58" cy="54" r="4.6" fill="#c41d3c"/><circle cx="56.6" cy="52.4" r="1.3" fill="#ffd2da"/><circle cx="68" cy="56" r="4.6" fill="#c41d3c"/><circle cx="66.6" cy="54.4" r="1.3" fill="#ffd2da"/><circle cx="40" cy="64" r="4.6" fill="#c41d3c"/><circle cx="38.6" cy="62.4" r="1.3" fill="#ffd2da"/><circle cx="52" cy="63" r="4.6" fill="#c41d3c"/><circle cx="50.6" cy="61.4" r="1.3" fill="#ffd2da"/><circle cx="62" cy="66" r="4.6" fill="#c41d3c"/><circle cx="60.6" cy="64.4" r="1.3" fill="#ffd2da"/><circle cx="46" cy="73" r="4.6" fill="#c41d3c"/><circle cx="44.6" cy="71.4" r="1.3" fill="#ffd2da"/><circle cx="57" cy="74" r="4.6" fill="#c41d3c"/><circle cx="55.6" cy="72.4" r="1.3" fill="#ffd2da"/><circle cx="50" cy="45" r="4.6" fill="#c41d3c"/><circle cx="48.6" cy="43.4" r="1.3" fill="#ffd2da"/><circle cx="30" cy="64" r="4.6" fill="#c41d3c"/><circle cx="28.6" cy="62.4" r="1.3" fill="#ffd2da"/><circle cx="70" cy="46" r="4.6" fill="#c41d3c"/><circle cx="68.6" cy="44.4" r="1.3" fill="#ffd2da"/></symbol>
<symbol id="s-grape" viewBox="0 0 100 100"><path d="M48 26C48 16 52 10 58 6" stroke="#5a3b22" stroke-width="3" fill="none" stroke-linecap="round"/><path fill="#5f8f3a" d="M52 20c10-12 28-10 34-2-10 8-24 10-34 2z"/><circle cx="24" cy="36" r="9" fill="#6b3290"/><circle cx="21" cy="33" r="2.4" fill="#b892d6"/><circle cx="40" cy="36" r="9" fill="#6b3290"/><circle cx="37" cy="33" r="2.4" fill="#b892d6"/><circle cx="56" cy="36" r="9" fill="#6b3290"/><circle cx="53" cy="33" r="2.4" fill="#b892d6"/><circle cx="72" cy="36" r="9" fill="#6b3290"/><circle cx="69" cy="33" r="2.4" fill="#b892d6"/><circle cx="32" cy="50" r="9" fill="#6b3290"/><circle cx="29" cy="47" r="2.4" fill="#b892d6"/><circle cx="48" cy="50" r="9" fill="#6b3290"/><circle cx="45" cy="47" r="2.4" fill="#b892d6"/><circle cx="64" cy="50" r="9" fill="#6b3290"/><circle cx="61" cy="47" r="2.4" fill="#b892d6"/><circle cx="40" cy="64" r="9" fill="#6b3290"/><circle cx="37" cy="61" r="2.4" fill="#b892d6"/><circle cx="56" cy="64" r="9" fill="#6b3290"/><circle cx="53" cy="61" r="2.4" fill="#b892d6"/><circle cx="48" cy="78" r="9" fill="#6b3290"/><circle cx="45" cy="75" r="2.4" fill="#b892d6"/></symbol>
<symbol id="s-walnut" viewBox="0 0 100 100"><ellipse cx="50" cy="52" rx="34" ry="40" fill="#b8854f"/><path d="M50 12v80" stroke="#8a5d31" stroke-width="3"/><path d="M28 34c6 4 10 0 14 6M26 56c8-2 10 6 16 4M30 76c6-4 10 2 14-2M72 34c-6 4-10 0-14 6M74 56c-8-2-10 6-16 4M70 76c-6-4-10 2-14-2" stroke="#8a5d31" stroke-width="2.5" fill="none" stroke-linecap="round"/></symbol>
<symbol id="s-pista" viewBox="0 0 100 100"><path fill="#dcc59c" d="M20 60C20 30 42 12 62 14c-12 10-14 40-6 72C36 84 20 76 20 60z"/><path fill="#e8d6b2" d="M80 50c0 26-14 40-24 36-8-32-6-62 6-72 10 4 18 18 18 36z"/><ellipse cx="54" cy="50" rx="10" ry="24" fill="#8cb453" transform="rotate(8 54 50)"/><ellipse cx="51" cy="44" rx="3" ry="9" fill="#b9d98a" transform="rotate(8 54 50)"/></symbol>
<symbol id="s-basket" viewBox="0 0 100 100"><path d="M20 52C20 20 80 20 80 52" fill="none" stroke="#8a5530" stroke-width="5" stroke-linecap="round"/><path fill="#b7794a" d="M10 50h80l-10 44H20z"/><path d="M18 52 L24.0 92" stroke="rgba(0,0,0,.18)" stroke-width="2"/><path d="M26 52 L30.6 92" stroke="rgba(0,0,0,.18)" stroke-width="2"/><path d="M34 52 L37.2 92" stroke="rgba(0,0,0,.18)" stroke-width="2"/><path d="M42 52 L43.8 92" stroke="rgba(0,0,0,.18)" stroke-width="2"/><path d="M50 52 L50.4 92" stroke="rgba(0,0,0,.18)" stroke-width="2"/><path d="M58 52 L57.0 92" stroke="rgba(0,0,0,.18)" stroke-width="2"/><path d="M66 52 L63.599999999999994 92" stroke="rgba(0,0,0,.18)" stroke-width="2"/><path d="M74 52 L70.19999999999999 92" stroke="rgba(0,0,0,.18)" stroke-width="2"/><path d="M82 52 L76.8 92" stroke="rgba(0,0,0,.18)" stroke-width="2"/><path d="M14 64h72M17 78h66" stroke="rgba(0,0,0,.16)" stroke-width="2.5"/><rect x="8" y="46" width="84" height="9" rx="4.5" fill="#9a6036"/></symbol>
<symbol id="s-rosette" viewBox="0 0 100 100"><g fill="none" stroke="currentColor" stroke-width="1.2"><ellipse cx="50" cy="24" rx="7.5" ry="17" transform="rotate(0 50 50)"/><ellipse cx="50" cy="24" rx="7.5" ry="17" transform="rotate(45 50 50)"/><ellipse cx="50" cy="24" rx="7.5" ry="17" transform="rotate(90 50 50)"/><ellipse cx="50" cy="24" rx="7.5" ry="17" transform="rotate(135 50 50)"/><ellipse cx="50" cy="24" rx="7.5" ry="17" transform="rotate(180 50 50)"/><ellipse cx="50" cy="24" rx="7.5" ry="17" transform="rotate(225 50 50)"/><ellipse cx="50" cy="24" rx="7.5" ry="17" transform="rotate(270 50 50)"/><ellipse cx="50" cy="24" rx="7.5" ry="17" transform="rotate(315 50 50)"/><ellipse cx="50" cy="33" rx="4" ry="9" transform="rotate(22.5 50 50)"/><ellipse cx="50" cy="33" rx="4" ry="9" transform="rotate(67.5 50 50)"/><ellipse cx="50" cy="33" rx="4" ry="9" transform="rotate(112.5 50 50)"/><ellipse cx="50" cy="33" rx="4" ry="9" transform="rotate(157.5 50 50)"/><ellipse cx="50" cy="33" rx="4" ry="9" transform="rotate(202.5 50 50)"/><ellipse cx="50" cy="33" rx="4" ry="9" transform="rotate(247.5 50 50)"/><ellipse cx="50" cy="33" rx="4" ry="9" transform="rotate(292.5 50 50)"/><ellipse cx="50" cy="33" rx="4" ry="9" transform="rotate(337.5 50 50)"/><circle cx="50" cy="50" r="9"/><circle cx="50" cy="50" r="4"/><circle cx="50" cy="50" r="42"/><circle cx="96.0" cy="50.0" r="1.4" fill="currentColor" stroke="none"/><circle cx="94.4" cy="61.9" r="1.4" fill="currentColor" stroke="none"/><circle cx="89.8" cy="73.0" r="1.4" fill="currentColor" stroke="none"/><circle cx="82.5" cy="82.5" r="1.4" fill="currentColor" stroke="none"/><circle cx="73.0" cy="89.8" r="1.4" fill="currentColor" stroke="none"/><circle cx="61.9" cy="94.4" r="1.4" fill="currentColor" stroke="none"/><circle cx="50.0" cy="96.0" r="1.4" fill="currentColor" stroke="none"/><circle cx="38.1" cy="94.4" r="1.4" fill="currentColor" stroke="none"/><circle cx="27.0" cy="89.8" r="1.4" fill="currentColor" stroke="none"/><circle cx="17.5" cy="82.5" r="1.4" fill="currentColor" stroke="none"/><circle cx="10.2" cy="73.0" r="1.4" fill="currentColor" stroke="none"/><circle cx="5.6" cy="61.9" r="1.4" fill="currentColor" stroke="none"/><circle cx="4.0" cy="50.0" r="1.4" fill="currentColor" stroke="none"/><circle cx="5.6" cy="38.1" r="1.4" fill="currentColor" stroke="none"/><circle cx="10.2" cy="27.0" r="1.4" fill="currentColor" stroke="none"/><circle cx="17.5" cy="17.5" r="1.4" fill="currentColor" stroke="none"/><circle cx="27.0" cy="10.2" r="1.4" fill="currentColor" stroke="none"/><circle cx="38.1" cy="5.6" r="1.4" fill="currentColor" stroke="none"/><circle cx="50.0" cy="4.0" r="1.4" fill="currentColor" stroke="none"/><circle cx="61.9" cy="5.6" r="1.4" fill="currentColor" stroke="none"/><circle cx="73.0" cy="10.2" r="1.4" fill="currentColor" stroke="none"/><circle cx="82.5" cy="17.5" r="1.4" fill="currentColor" stroke="none"/><circle cx="89.8" cy="27.0" r="1.4" fill="currentColor" stroke="none"/><circle cx="94.4" cy="38.1" r="1.4" fill="currentColor" stroke="none"/></g></symbol>
<symbol id="s-girih" viewBox="0 0 100 100"><g fill="none" stroke="currentColor" stroke-width="1.6"><rect x="20" y="20" width="60" height="60"/><rect x="20" y="20" width="60" height="60" transform="rotate(45 50 50)"/><rect x="32" y="32" width="36" height="36"/><rect x="32" y="32" width="36" height="36" transform="rotate(45 50 50)"/><circle cx="50" cy="50" r="8"/></g></symbol>
<symbol id="s-bodom" viewBox="0 0 100 100"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M50 6c26 18 38 46 26 70-8 16-30 22-40 10-8-10 0-24 14-22"/><path d="M50 18c18 14 26 34 18 52-6 12-20 14-26 8"/><path d="M48 30c10 10 14 22 10 34"/><circle cx="50" cy="66" r="4"/></g></symbol>
</svg>`;

function head(page) {
  return `<!DOCTYPE html>
<html lang="uz" data-theme="light" data-palette="anor">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${t("title." + page)}</title>
<meta name="description" content="${t("desc")}">
<meta property="og:title" content="${t("title." + page)}">
<meta property="og:description" content="${t("desc")}">
<meta property="og:type" content="website">
<meta name="theme-color" content="#16211b">
<script>
(function(){var d=document.documentElement;d.classList.add("js");try{var s=localStorage,th=s.getItem("us_theme");if(!th)th=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";d.setAttribute("data-theme",th);d.setAttribute("data-palette",s.getItem("us_pal")||"anor");var l=s.getItem("us_lang");if(l==="ru"||l==="en")d.lang=l;if(!sessionStorage.getItem("us_splash")&&!matchMedia("(prefers-reduced-motion: reduce)").matches)d.classList.add("splash-on")}catch(e){}})();
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600&family=Unbounded:wght@500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
${page === "home" ? `<script type="application/ld+json">{"@context":"https://schema.org","@type":"GroceryStore","name":"UZB Savat","description":"Yangi mevalar, quruq mevalar va sovg'a savatlari yetkazib berish","areaServed":"Toshkent","address":{"@type":"PostalAddress","addressLocality":"Toshkent","addressCountry":"UZ"},"sameAs":["https://instagram.com/uzb_savat"]}</script>` : ""}
</head>
<body data-page="${page}">
${SPRITE}
<div class="progress" aria-hidden="true"><i id="progress"></i></div>
<div class="splash" aria-hidden="true">
  <div class="splash__l splash__l1"></div>
  <div class="splash__l splash__l2">
    <div class="splash__burst">${["s-apple","s-pom","s-grape","s-apricot","s-almond","s-walnut","s-pista","s-leaf"].map((id, i) => `<span style="--a:${i * 45}deg;--i:${i};color:${["","","","#ec9a45","#c99a68","","","#5f8f3a"][i]}"><svg><use href="#${id}"/></svg></span>`).join("")}</div>
    <div class="splash__in"><svg class="splash__star"><use href="#s-rosette"/></svg><div class="splash__word">${"UZB Savat".split("").map((c, i) => `<span style="--i:${i}">${c === " " ? "&nbsp;" : c}</span>`).join("")}</div><div class="splash__bar"><i></i></div></div>
  </div>
</div>
<a class="skip" href="#main" data-i18n="skip">${t("skip")}</a>`;
}

function langGroup(cls) {
  return `<div class="lang ${cls}" role="group" aria-label="${t("aria.lang")}" data-i18n-aria="aria.lang">${["uz", "ru", "en"].map((l) => `<button type="button" data-lang="${l}" aria-pressed="${l === "uz"}">${l.toUpperCase()}</button>`).join("")}</div>`;
}

function header(page) {
  return `<header class="header" id="top">
  <div class="wrap header__in">
    <a class="logo" href="index.html"><svg aria-hidden="true"><use href="#s-star"/></svg><span>UZB Savat</span></a>
    <nav class="nav" id="nav">${NAV.map(([k, h]) => `<a href="${h}"${k === page ? ' aria-current="page"' : ""} data-i18n="nav.${k}">${t("nav." + k)}</a>`).join("")}</nav>
    <div class="htools">
      ${langGroup("lang--head")}
      <div class="settings">
        <button class="ibtn" type="button" id="setBtn" aria-expanded="false" aria-controls="setPanel" aria-label="${t("aria.settings")}" data-i18n-aria="aria.settings"><svg><use href="#s-palette"/></svg></button>
        <div class="panel" id="setPanel" hidden>
          ${langGroup("lang--panel")}
          <p class="panel__h" data-i18n="set.title">${t("set.title")}</p>
          <div class="seg" role="group">
            <button type="button" data-theme-set="light"><svg aria-hidden="true"><use href="#s-sun"/></svg><span data-i18n="set.light">${t("set.light")}</span></button>
            <button type="button" data-theme-set="dark"><svg aria-hidden="true"><use href="#s-moon"/></svg><span data-i18n="set.dark">${t("set.dark")}</span></button>
          </div>
          <p class="panel__h"><span data-i18n="set.palette">${t("set.palette")}</span>: <b id="palName">${t("pal.anor")}</b></p>
          <div class="swatches">${PALS.map((p) => `<button type="button" class="sw sw--${p}" data-pal="${p}" aria-label="${t("pal." + p)}" data-i18n-aria="pal.${p}"><i></i></button>`).join("")}</div>
        </div>
      </div>
      <button class="cart-btn" type="button" id="openCart" aria-label="${t("aria.cart")}" data-i18n-aria="aria.cart"><svg aria-hidden="true"><use href="#s-cart"/></svg><span class="cart-btn__t" data-i18n="cart.btn">${t("cart.btn")}</span><b id="cartCount">0</b></button>
      <button class="ibtn burger" type="button" id="burger" aria-expanded="false" aria-controls="nav" aria-label="${t("aria.menu")}" data-i18n-aria="aria.menu"><span></span><span></span></button>
    </div>
  </div>
</header>
<main id="main">`;
}

function footer() {
  return `</main>
<footer class="footer">
  <div class="wrap">
    <div class="footer__top">
      <div><a class="logo" href="index.html"><svg aria-hidden="true"><use href="#s-star"/></svg><span>UZB Savat</span></a>${tx("p", "foot.tag", 'class="footer__tag"')}</div>
      <nav class="footer__nav">${NAV.map(([k, h]) => `<a href="${h}" data-i18n="nav.${k}">${t("nav." + k)}</a>`).join("")}</nav>
    </div>
    <div class="footer__big" id="bigword" aria-hidden="true">${"UZB Savat".split("").map((c, i) => c === " " ? '<span class="sp"></span>' : `<span style="--i:${i}">${c}</span>`).join("")}</div>
    <div class="footer__bottom"><span>&copy; <span id="year">2026</span> UZB Savat</span>${tx("span", "foot.demo")}</div>
  </div>
</footer>

<div class="overlay" id="overlay" hidden></div>
<aside class="drawer" id="drawer" aria-hidden="true" aria-labelledby="cartTitle">
  <div class="drawer__head"><h2 id="cartTitle" data-i18n="cart.title">${t("cart.title")}</h2><button class="ibtn" type="button" id="closeCart" aria-label="${t("aria.close")}" data-i18n-aria="aria.close"><svg><use href="#s-close"/></svg></button></div>
  <div class="drawer__scroll">
    <div id="cartItems"></div>
    <form class="order" id="orderForm" novalidate>
      <div class="totals">
        <div><span data-i18n="cart.sub">${t("cart.sub")}</span><b id="sub">0</b></div>
        <div><span data-i18n="cart.fee">${t("cart.fee")}</span><b id="fee">0</b></div>
        <div class="totals__sum"><span data-i18n="cart.total">${t("cart.total")}</span><b id="total">0</b></div>
      </div>
      <label class="field"><span data-i18n="form.name">${t("form.name")}</span><input name="name" required autocomplete="name"></label>
      <label class="field"><span data-i18n="form.phone">${t("form.phone")}</span><input name="phone" type="tel" required autocomplete="tel" placeholder="+998 __ ___ __ __"></label>
      <label class="field"><span data-i18n="form.address">${t("form.address")}</span><input name="address" required autocomplete="street-address" placeholder="${t("form.address.ph")}" data-i18n-ph="form.address.ph"></label>
      <label class="field"><span data-i18n="form.time">${t("form.time")}</span><input name="time" placeholder="${t("form.time.ph")}" data-i18n-ph="form.time.ph"></label>
      <label class="field"><span data-i18n="form.note">${t("form.note")}</span><textarea name="note" rows="2"></textarea></label>
      <button class="btn btn--block" type="submit" id="submitBtn" data-i18n="form.submit">${t("form.submit")}</button>
      <p class="form-msg" id="formMsg" role="status"></p>
    </form>
  </div>
</aside>

<script src="js/config.js"></script>
<script src="js/i18n.js"></script>
<script src="js/art.js"></script>
<script src="data/products.js"></script>
<script src="js/app.js"></script>
</body>
</html>
`;
}

const cta = () => `<section class="section section--cta"><div class="wrap"><div class="cta reveal">
  <svg class="cta__star" aria-hidden="true"><use href="#s-star"/></svg>
  <div class="cta__t">${tx("h2", "cta.title")}${tx("p", "cta.text")}</div>
  <a class="btn btn--light" data-tg href="https://t.me/uzb_savat" target="_blank" rel="noopener" data-i18n="cta.btn">${t("cta.btn")}</a>
</div></div></section>`;

const phead = (key, sub, shapes = true) => `<section class="phead"><div class="wrap">
  ${tx("h1", key, "class=\"words\" data-split")}
  ${tx("p", sub, 'class="lead reveal"')}
</div>${emb("s-rosette", "e-ph1", 0.5, 40)}${emb("s-bodom", "e-ph2", -0.3, -20)}${shapes ? `<span class="phead__s phead__s1"><svg><use href="#s-star"/></svg></span><span class="phead__s phead__s2"><svg><use href="#s-apricot"/></svg></span><span class="phead__s phead__s3"><svg><use href="#s-almond"/></svg></span>` : ""}</section>`;

const steps = () => `<ol class="steps">${[1, 2, 3, 4].map((n) => `<li class="reveal" style="--d:${(n - 1) * 90}ms">${tx("h3", "s" + n + ".t")}${tx("p", "s" + n + ".d")}</li>`).join("")}</ol>`;

const pages = {
  home: () => `
<section class="hero">${emb("s-girih", "e-h1", -0.4, -50)}${emb("s-bodom", "e-h2", 0.6, 30)}<div class="wrap hero__in">
  <div class="hero__text">
    ${tx("h1", "hero.title", 'class="words" data-split')}
    ${tx("p", "hero.text", 'class="lead reveal" style="--d:250ms"')}
    <div class="hero__cta reveal" style="--d:350ms"><a class="btn" href="catalog.html" data-i18n="hero.cta1">${t("hero.cta1")}</a><a class="btn btn--line" href="gifts.html" data-i18n="hero.cta2">${t("hero.cta2")}</a></div>
    <dl class="facts reveal" style="--d:450ms">
      <div><dt data-count="36000" data-suffix="+">36 000+</dt>${tx("dd", "f.followers")}</div>
      <div><dt data-count="10000" data-suffix="+">10 000+</dt>${tx("dd", "f.clients")}</div>
      <div><dt data-count="24">24</dt>${tx("dd", "f.years")}</div>
    </dl>
  </div>
  <div class="stage" id="stage">
    ${emb("s-rosette", "e-hero", 0.35, 60)}
    ${ph("hero.jpg", "arch", "stage__ph", "hero")}
    <span class="shape sh1" data-depth="22"><svg><use href="#s-apricot"/></svg></span>
    <span class="shape sh2" data-depth="-14"><svg><use href="#s-almond"/></svg></span>
    <span class="shape sh3" data-depth="30"><svg><use href="#s-seed"/></svg></span>
    <span class="shape sh4" data-depth="-24"><svg><use href="#s-leaf"/></svg></span>
    <span class="shape sh5" data-depth="12"><svg><use href="#s-star"/></svg></span>
    <div class="badge" aria-hidden="true"><svg class="badge__ring" viewBox="0 0 120 120"><defs><path id="circ" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"/></defs><text><textPath href="#circ" textLength="274" lengthAdjust="spacing" data-i18n="hero.badge">${t("hero.badge")}</textPath></text></svg><svg class="badge__star"><use href="#s-star"/></svg></div>
  </div>
</div></section>
<a class="scrollhint" href="#cats" aria-hidden="true" tabindex="-1"><span></span></a>
<div class="ribbons" aria-hidden="true"><div class="rib rib--a"><div class="rib__track" id="mq"></div></div><div class="rib rib--b"><div class="rib__track" id="mq2"></div></div></div>

<section class="section" id="cats">${emb("s-girih", "e-c1", 0.5, 90)}${emb("s-bodom", "e-c2", -0.4, -30)}<div class="wrap">
  <div class="head">${tx("h2", "cats.title", 'class="words" data-split')}</div>
  <div class="cats">${["meva", "quruq", "yongoq", "sovga"].map((c, i) => `<a class="cat reveal" style="--d:${i * 90}ms" href="${c === "sovga" ? "gifts.html" : "catalog.html?cat=" + c}">${ph("cat-" + c + ".jpg", i % 2 ? "round" : "arch", "", c)}<span class="cat__t">${tx("b", "cat." + c)}${tx("small", "cat." + c + ".d")}</span></a>`).join("")}</div>
</div></section>

<section class="section section--tint">${emb("s-rosette", "e-t1", 0.45, 70)}<div class="wrap">
  <div class="head head--row">${tx("h2", "hot.title", 'class="words" data-split')}<a class="link" href="catalog.html" data-i18n="hot.link">${t("hot.link")}</a></div>
  <div class="rows" id="hot"></div>
</div></section>

<section class="section section--deep">${emb("s-rosette", "e-d1", 0.3, -80)}<div class="wrap">
  <div class="head">${tx("h2", "how.title", 'class="words" data-split')}</div>
  ${steps()}
</div></section>

<section class="section">${emb("s-bodom", "e-s1", 0.5, 25)}<div class="wrap split">
  <div class="split__media reveal">${ph("gifts.jpg", "arch", "split__a", "sovga")}${ph("gifts-2.jpg", "circle", "split__b", "duo")}</div>
  <div class="split__text">${tx("h2", "gt.title", 'class="words" data-split')}${tx("p", "gt.text", 'class="lead reveal"')}<a class="btn reveal" href="gifts.html" data-i18n="gt.btn">${t("gt.btn")}</a></div>
</div></section>
${cta()}`,

  catalog: () => `${phead("catalog.title", "catalog.sub")}
<section class="section section--flush"><div class="wrap">
  <div class="tools">
    <div class="tabs" id="tabs"></div>
    <label class="search"><span class="sr" data-i18n="search.label">${t("search.label")}</span><input id="search" type="search" placeholder="${t("search.ph")}" data-i18n-ph="search.ph"></label>
  </div>
  <div id="list"></div>
  <div class="empty" id="empty" hidden>${tx("p", "empty")}<button class="btn btn--line" type="button" id="resetSearch" data-i18n="empty.reset">${t("empty.reset")}</button></div>
</div></section>`,

  gifts: () => `${phead("gifts.title", "gifts.sub")}
<section class="section section--flush"><div class="wrap"><div class="gifts" id="giftGrid"></div></div></section>
<section class="section section--tint">${emb("s-girih", "e-s2", 0.4, 60)}<div class="wrap split split--rev">
  <div class="split__text">${tx("h2", "build.title", 'class="words" data-split')}${tx("p", "build.text", 'class="lead reveal"')}<a class="btn reveal" data-tg href="https://t.me/uzb_savat" target="_blank" rel="noopener" data-i18n="cta.btn">${t("cta.btn")}</a></div>
  <div class="split__media reveal">${ph("custom.jpg", "arch", "split__a", "oila")}${ph("custom-2.jpg", "circle", "split__b", "quruq")}</div>
</div></section>
${cta()}`,

  delivery: () => `${phead("del.title", "del.sub")}
<section class="section section--flush"><div class="wrap">
  <dl class="info">${["area", "time", "pay"].map((k, i) => `<div class="reveal" style="--d:${i * 90}ms">${tx("dt", "del." + k + ".t")}${tx("dd", "del." + k + ".d")}</div>`).join("")}</dl>
  ${tx("p", "del.fee", 'class="note reveal"')}
</div></section>
<section class="section section--deep">${emb("s-rosette", "e-d1", 0.3, -80)}<div class="wrap"><div class="head">${tx("h2", "how.title", 'class="words" data-split')}</div>${steps()}</div></section>
<section class="section">${emb("s-bodom", "e-s1", 0.5, 25)}<div class="wrap faq">
  <div class="head">${tx("h2", "faq.title", 'class="words" data-split')}</div>
  <div>${[1, 2, 3, 4].map((n) => `<details class="reveal" style="--d:${(n - 1) * 70}ms"><summary data-i18n="q${n}">${t("q" + n)}</summary>${tx("p", "a" + n)}</details>`).join("")}</div>
</div></section>
${cta()}`,

  contact: () => `${phead("contact.title", "contact.sub")}
<section class="section section--flush"><div class="wrap contact">
  <ul class="clist reveal" id="clist"></ul>
  ${ph("shop.jpg", "arch", "contact__ph reveal", "shop")}
</div></section>
${cta()}`
};

const files = { home: "index.html", catalog: "catalog.html", gifts: "gifts.html", delivery: "delivery.html", contact: "contact.html" };
for (const [page, file] of Object.entries(files)) {
  fs.writeFileSync(path.join(ROOT, file), head(page) + "\n" + header(page) + pages[page]() + "\n" + footer());
  console.log("yozildi:", file);
}
