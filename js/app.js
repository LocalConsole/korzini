(function () {
  "use strict";
  var C = window.CONFIG, P = window.PRODUCTS, CAT = window.CATEGORIES, PH = window.PHOTOS;
  var $ = function (s) { return document.querySelector(s); };
  var fmt = function (n) { return n.toLocaleString("ru-RU").replace(/ /g, " ") + " " + C.currency; };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };

  var cart = {};
  try { cart = JSON.parse(localStorage.getItem("uzbsavat_cart") || "{}"); } catch (e) {}
  var state = { cat: "all", q: "" };
  var save = function () { try { localStorage.setItem("uzbsavat_cart", JSON.stringify(cart)); } catch (e) {} };
  var byId = function (id) { return P.find(function (p) { return p.id === id; }); };
  var unitLabel = function (p) { return p.unit === "kg" ? "1 kg" : "1 dona"; };

  // fotosuratlar
  $("#ph-hero").src = PH.hero; $("#ph-dried").src = PH.dried; $("#ph-nuts").src = PH.nuts; $("#ph-boxes").src = PH.boxes;

  function action(p) {
    if (cart[p.id]) return '<span class="qty"><button data-dec="' + p.id + '" aria-label="Kamaytirish">−</button><b>' + cart[p.id] + '</b><button data-inc="' + p.id + '" aria-label="Ko\'paytirish">+</button></span>';
    return '<button class="add" data-add="' + p.id + '">Savatga</button>';
  }
  function row(p) {
    return '<div class="row"><div class="row__n">' + esc(p.name) + '</div><div class="row__p">' + fmt(p.price) + ' <small>/ ' + unitLabel(p) + '</small></div>' +
      '<div class="row__d">' + esc(p.desc) + '</div><div class="row__a">' + action(p) + '</div></div>';
  }
  function gift(p) {
    return '<article class="gift"><img src="' + PH[p.photo] + '" alt="' + esc(p.name) + '" loading="lazy" width="600" height="450"><div class="gift__b">' +
      '<span class="gift__tag">' + esc(p.badge || "") + '</span><h3>' + esc(p.name) + '</h3><p>' + esc(p.desc) + '</p>' +
      '<div class="gift__f"><b>' + fmt(p.price) + '</b>' + action(p) + '</div></div></article>';
  }

  function renderTabs() {
    $("#tabs").innerHTML = CAT.map(function (c) {
      return '<button class="tab' + (c.id === state.cat ? " on" : "") + '" data-cat="' + c.id + '">' + c.name + "</button>";
    }).join("");
  }
  function renderList() {
    var q = state.q.trim().toLowerCase(), html = "", any = false;
    CAT.forEach(function (c) {
      if (c.id === "all") return;
      if (state.cat !== "all" && state.cat !== c.id) return;
      if (state.cat === "all" && c.id === "sovga") return;
      var items = P.filter(function (p) { return p.cat === c.id && (!q || p.name.toLowerCase().indexOf(q) > -1); });
      if (!items.length) return;
      any = true;
      html += '<section class="group"><h3>' + c.name + '</h3><div class="rows">' + items.map(c.id === "sovga" ? row : row).join("") + "</div></section>";
    });
    $("#list").innerHTML = html;
    $("#empty").hidden = any;
  }
  function renderGifts() { $("#giftGrid").innerHTML = P.filter(function (p) { return p.cat === "sovga"; }).map(gift).join(""); }

  function totals() {
    var sub = 0;
    Object.keys(cart).forEach(function (id) { var p = byId(id); if (p) sub += p.price * cart[id]; });
    var fee = sub === 0 ? 0 : (sub >= C.freeDeliveryFrom ? 0 : C.deliveryFee);
    return { sub: sub, fee: fee, total: sub + fee };
  }
  function renderCart() {
    var t = totals(), ids = Object.keys(cart).filter(byId);
    $("#cartCount").textContent = ids.length;
    $("#cartItems").innerHTML = ids.length ? ids.map(function (id) {
      var p = byId(id);
      return '<div class="ci"><h4>' + esc(p.name) + '</h4>' + action(p) + '<small>' + fmt(p.price) + " / " + unitLabel(p) + " · " + fmt(p.price * cart[id]) + "</small></div>";
    }).join("") : '<p class="cart-empty">Savat bo\'sh. Ro\'yxatdan mahsulot tanlang.</p>';
    $("#sub").textContent = fmt(t.sub);
    $("#fee").textContent = t.sub === 0 ? "—" : (t.fee ? fmt(t.fee) : "Bepul");
    $("#total").textContent = fmt(t.total);
    $("#submitBtn").disabled = ids.length === 0;
  }
  function refresh() { save(); renderList(); renderGifts(); renderCart(); }
  function change(id, d) { cart[id] = (cart[id] || 0) + d; if (cart[id] <= 0) delete cart[id]; refresh(); }

  function openCart(v) {
    $("#drawer").classList.toggle("open", v);
    $("#drawer").setAttribute("aria-hidden", String(!v));
    $("#overlay").hidden = !v;
    document.body.style.overflow = v ? "hidden" : "";
    if (v) $("#closeCart").focus(); else $("#openCart").focus();
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-add],[data-inc],[data-dec],[data-cat]");
    if (!t) return;
    if (t.dataset.add) change(t.dataset.add, 1);
    else if (t.dataset.inc) change(t.dataset.inc, 1);
    else if (t.dataset.dec) change(t.dataset.dec, -1);
    else if (t.dataset.cat) { state.cat = t.dataset.cat; renderTabs(); renderList(); }
  });
  $("#search").addEventListener("input", function (e) { state.q = e.target.value; renderList(); });
  $("#openCart").addEventListener("click", function () { openCart(true); });
  $("#closeCart").addEventListener("click", function () { openCart(false); });
  $("#overlay").addEventListener("click", function () { openCart(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") openCart(false); });
  $("#burger").addEventListener("click", function (e) {
    var open = $("#nav").classList.toggle("open"); e.currentTarget.setAttribute("aria-expanded", String(open));
  });
  $("#nav").addEventListener("click", function () { $("#nav").classList.remove("open"); $("#burger").setAttribute("aria-expanded", "false"); });

  function orderText(f, t) {
    var lines = Object.keys(cart).map(function (id, i) {
      var p = byId(id); return (i + 1) + ". " + p.name + " x " + cart[id] + " " + p.unit + " = " + fmt(p.price * cart[id]);
    });
    return "Yangi buyurtma\n\nIsm: " + f.name + "\nTelefon: " + f.phone + "\nManzil: " + f.address +
      (f.time ? "\nVaqt: " + f.time : "") + (f.note ? "\nIzoh: " + f.note : "") +
      "\n\n" + lines.join("\n") + "\n\nMahsulotlar: " + fmt(t.sub) + "\nYetkazish: " + (t.fee ? fmt(t.fee) : "Bepul") + "\nJami: " + fmt(t.total);
  }

  $("#orderForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var form = e.target, msg = $("#formMsg"), btn = $("#submitBtn");
    var f = { name: form.name.value.trim(), phone: form.phone.value.trim(), address: form.address.value.trim(), time: form.time.value.trim(), note: form.note.value.trim() };
    var digits = f.phone.replace(/\D/g, "");
    form.name.classList.toggle("bad", !f.name); form.address.classList.toggle("bad", !f.address); form.phone.classList.toggle("bad", digits.length < 9);
    if (!f.name || !f.address || digits.length < 9) { msg.className = "form-msg err"; msg.textContent = "Ism, telefon va manzilni to'ldiring."; return; }
    var t = totals(), text = orderText(f, t);
    btn.disabled = true; msg.className = "form-msg"; msg.textContent = "Yuborilmoqda...";
    var done = function (m) { cart = {}; form.reset(); refresh(); msg.className = "form-msg ok"; msg.textContent = m; };
    if (C.orderEndpoint) {
      fetch(C.orderEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: text }) })
        .then(function (r) { if (!r.ok) throw 0; done("Buyurtma qabul qilindi. Tez orada bog'lanamiz."); })
        .catch(function () { btn.disabled = false; msg.className = "form-msg err"; msg.textContent = "Yuborilmadi. Qaytadan urinib ko'ring yoki Telegram'da yozing."; });
    } else {
      console.log(text);
      setTimeout(function () { done("Demo: buyurtma Telegram-botga shu ko'rinishda tushadi (brauzer konsolida)."); }, 500);
    }
  });

  $("#deliveryNote").textContent = fmt(C.freeDeliveryFrom) + " dan yuqori buyurtmalarga yetkazish bepul, qolganlariga " + fmt(C.deliveryFee) + ".";
  $("#clist").innerHTML =
    '<li><span>Telefon</span><a href="tel:' + C.phone.replace(/\s/g, "") + '">' + C.phone + "</a></li>" +
    '<li><span>Telegram</span><a href="https://t.me/' + C.telegram + '" target="_blank" rel="noopener">@' + C.telegram + "</a></li>" +
    '<li><span>Instagram</span><a href="https://instagram.com/' + C.instagram + '" target="_blank" rel="noopener">@' + C.instagram + "</a></li>";
  $("#year").textContent = new Date().getFullYear();

  renderTabs(); renderList(); renderGifts(); renderCart();
})();
