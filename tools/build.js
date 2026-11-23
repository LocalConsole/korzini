// Statik sahifalarni yig'adi: node tools/build.js
// Matnlar js/i18n.js dan olinadi (o'zbekcha — standart), qolgan tillarni brauzer almashtiradi.
const fs = require("fs");
const path = require("path");
const D = require("../js/i18n.js");
const ROOT = path.join(__dirname, "..");

const t = (k) => { if (!D[k]) throw new Error("i18n key yo'q: " + k); return D[k].uz.replace("{free}", "300 000 so'm").replace("{fee}", "20 000 so'm"); };
const tx = (tag, key, attrs = "") => `<${tag}${attrs ? " " + attrs : ""} data-i18n="${key}">${t(key)}</${tag}>`;
const ph = (file, shape, extra = "") =>
  `<figure class="ph ph--${shape}${extra ? " " + extra : ""}" data-src="images/${file}" title="images/${file}"><div class="ph__empty"><svg aria-hidden="true"><use href="#s-star"/></svg><span data-i18n="ph.label">${t("ph.label")}</span></div></figure>`;
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
<div class="splash" aria-hidden="true"><div class="splash__in"><svg class="splash__star"><use href="#s-star"/></svg><div class="splash__word">${"UZB Savat".split("").map((c, i) => `<span style="--i:${i}">${c === " " ? "&nbsp;" : c}</span>`).join("")}</div><div class="splash__bar"><i></i></div></div></div>
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
    <div class="footer__big" aria-hidden="true">UZB Savat</div>
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
</div>${shapes ? `<span class="phead__s phead__s1"><svg><use href="#s-star"/></svg></span><span class="phead__s phead__s2"><svg><use href="#s-apricot"/></svg></span><span class="phead__s phead__s3"><svg><use href="#s-almond"/></svg></span>` : ""}</section>`;

const steps = () => `<ol class="steps">${[1, 2, 3, 4].map((n) => `<li class="reveal" style="--d:${(n - 1) * 90}ms">${tx("h3", "s" + n + ".t")}${tx("p", "s" + n + ".d")}</li>`).join("")}</ol>`;

const pages = {
  home: () => `
<section class="hero"><div class="wrap hero__in">
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
    ${ph("hero.jpg", "arch", "stage__ph")}
    <span class="shape sh1" data-depth="22"><svg><use href="#s-apricot"/></svg></span>
    <span class="shape sh2" data-depth="-14"><svg><use href="#s-almond"/></svg></span>
    <span class="shape sh3" data-depth="30"><svg><use href="#s-seed"/></svg></span>
    <span class="shape sh4" data-depth="-24"><svg><use href="#s-leaf"/></svg></span>
    <span class="shape sh5" data-depth="12"><svg><use href="#s-star"/></svg></span>
    <div class="badge" aria-hidden="true"><svg class="badge__ring" viewBox="0 0 120 120"><defs><path id="circ" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"/></defs><text><textPath href="#circ" textLength="274" lengthAdjust="spacing" data-i18n="hero.badge">${t("hero.badge")}</textPath></text></svg><svg class="badge__star"><use href="#s-star"/></svg></div>
  </div>
</div></section>
<div class="mq" aria-hidden="true"><div class="mq__track" id="mq"></div></div>

<section class="section"><div class="wrap">
  <div class="head">${tx("h2", "cats.title", 'class="words" data-split')}</div>
  <div class="cats">${["meva", "quruq", "yongoq", "sovga"].map((c, i) => `<a class="cat reveal" style="--d:${i * 90}ms" href="${c === "sovga" ? "gifts.html" : "catalog.html?cat=" + c}">${ph("cat-" + c + ".jpg", i % 2 ? "round" : "arch")}<span class="cat__t">${tx("b", "cat." + c)}${tx("small", "cat." + c + ".d")}</span></a>`).join("")}</div>
</div></section>

<section class="section section--tint"><div class="wrap">
  <div class="head head--row">${tx("h2", "hot.title", 'class="words" data-split')}<a class="link" href="catalog.html" data-i18n="hot.link">${t("hot.link")}</a></div>
  <div class="rows" id="hot"></div>
</div></section>

<section class="section section--deep"><div class="wrap">
  <div class="head">${tx("h2", "how.title", 'class="words" data-split')}</div>
  ${steps()}
</div></section>

<section class="section"><div class="wrap split">
  <div class="split__media reveal">${ph("gifts.jpg", "arch", "split__a")}${ph("gifts-2.jpg", "circle", "split__b")}</div>
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
<section class="section section--tint"><div class="wrap split split--rev">
  <div class="split__text">${tx("h2", "build.title", 'class="words" data-split')}${tx("p", "build.text", 'class="lead reveal"')}<a class="btn reveal" data-tg href="https://t.me/uzb_savat" target="_blank" rel="noopener" data-i18n="cta.btn">${t("cta.btn")}</a></div>
  <div class="split__media reveal">${ph("custom.jpg", "arch", "split__a")}${ph("custom-2.jpg", "circle", "split__b")}</div>
</div></section>
${cta()}`,

  delivery: () => `${phead("del.title", "del.sub")}
<section class="section section--flush"><div class="wrap">
  <dl class="info">${["area", "time", "pay"].map((k, i) => `<div class="reveal" style="--d:${i * 90}ms">${tx("dt", "del." + k + ".t")}${tx("dd", "del." + k + ".d")}</div>`).join("")}</dl>
  ${tx("p", "del.fee", 'class="note reveal"')}
</div></section>
<section class="section section--deep"><div class="wrap"><div class="head">${tx("h2", "how.title", 'class="words" data-split')}</div>${steps()}</div></section>
<section class="section"><div class="wrap faq">
  <div class="head">${tx("h2", "faq.title", 'class="words" data-split')}</div>
  <div>${[1, 2, 3, 4].map((n) => `<details class="reveal" style="--d:${(n - 1) * 70}ms"><summary data-i18n="q${n}">${t("q" + n)}</summary>${tx("p", "a" + n)}</details>`).join("")}</div>
</div></section>
${cta()}`,

  contact: () => `${phead("contact.title", "contact.sub")}
<section class="section section--flush"><div class="wrap contact">
  <ul class="clist reveal" id="clist"></ul>
  ${ph("shop.jpg", "arch", "contact__ph reveal")}
</div></section>
${cta()}`
};

const files = { home: "index.html", catalog: "catalog.html", gifts: "gifts.html", delivery: "delivery.html", contact: "contact.html" };
for (const [page, file] of Object.entries(files)) {
  fs.writeFileSync(path.join(ROOT, file), head(page) + "\n" + header(page) + pages[page]() + "\n" + footer());
  console.log("yozildi:", file);
}
