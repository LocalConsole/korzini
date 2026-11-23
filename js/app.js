(function () {
  "use strict";
  var C = window.CONFIG, P = window.PRODUCTS, CAT = window.CATEGORIES;
  var $ = function (s) { return document.querySelector(s); };
  var fmt = function (n) { return n.toLocaleString("ru-RU").replace(/ /g, " ") + " " + C.currency; };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };

  var cart = {}; // id -> qty
  try { cart = JSON.parse(localStorage.getItem("uzbsavat_cart") || "{}"); } catch (e) {}
  var state = { cat: "all", q: "" };

  function save() { try { localStorage.setItem("uzbsavat_cart", JSON.stringify(cart)); } catch (e) {} }
  function byId(id) { return P.find(function (p) { return p.id === id; }); }

  function card(p) {
    var step = p.unit === "kg" ? "1 kg" : "1 dona";
    return '<article class="card">' + (p.badge ? '<span class="badge">' + esc(p.badge) + '</span>' : '') +
      '<div class="card__img"><img src="images/' + p.id + '.jpg" alt="' + esc(p.name) + '" loading="lazy" onerror="this.replaceWith(document.createTextNode(\'' + p.emoji + '\'))"></div>' +
      '<div class="card__b"><h3>' + esc(p.name) + '</h3><p>' + esc(p.desc) + '</p>' +
      '<div class="card__f"><div class="price">' + fmt(p.price) + ' <small>/ ' + step + '</small></div>' +
      '<button class="add" data-add="' + p.id + '">+ Savatga</button></div></div></article>';
  }

  function renderTabs() {
    $("#tabs").innerHTML = CAT.map(function (c) {
      return '<button class="tab' + (c.id === state.cat ? " on" : "") + '" data-cat="' + c.id + '">' + c.icon + " " + c.name + "</button>";
    }).join("");
  }
  function renderGrid() {
    var q = state.q.trim().toLowerCase();
    var list = P.filter(function (p) {
      return p.cat !== "sovga" && (state.cat === "all" || p.cat === state.cat) && (!q || p.name.toLowerCase().indexOf(q) > -1);
    });
    if (state.cat === "sovga") list = P.filter(function (p) { return p.cat === "sovga"; });
    $("#grid").innerHTML = list.map(card).join("");
    $("#empty").hidden = list.length > 0;
  }
  function renderGifts() { $("#giftGrid").innerHTML = P.filter(function (p) { return p.cat === "sovga"; }).map(card).join(""); }

  function totals() {
    var sub = 0, n = 0;
    Object.keys(cart).forEach(function (id) { var p = byId(id); if (p) { sub += p.price * cart[id]; n += cart[id]; } });
    var fee = sub === 0 ? 0 : (sub >= C.freeDeliveryFrom ? 0 : C.deliveryFee);
    return { sub: sub, fee: fee, total: sub + fee, n: n };
  }
  function renderCart() {
    var t = totals(), ids = Object.keys(cart).filter(function (id) { return byId(id); });
    $("#cartCount").textContent = ids.length;
    $("#cartItems").innerHTML = ids.length ? ids.map(function (id) {
      var p = byId(id);
      return '<div class="ci"><div class="ci__e">' + p.emoji + '</div><div><h4>' + esc(p.name) + '</h4><small>' + fmt(p.price * cart[id]) + '</small></div>' +
        '<div class="qty"><button data-dec="' + id + '">−</button><b>' + cart[id] + '</b><button data-inc="' + id + '">+</button></div></div>';
    }).join("") : '<div class="cart-empty">🧺<br>Savat hozircha bo\'sh</div>';
    $("#sub").textContent = fmt(t.sub);
    $("#fee").textContent = t.sub === 0 ? "—" : (t.fee ? fmt(t.fee) : "Bepul");
    $("#total").textContent = fmt(t.total);
    $("#submitBtn").disabled = ids.length === 0;
  }

  function add(id, d) {
    cart[id] = (cart[id] || 0) + d;
    if (cart[id] <= 0) delete cart[id];
    save(); renderCart();
    var b = $("#openCart"); b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump");
  }
  function openCart(v) {
    $("#drawer").classList.toggle("open", v);
    $("#drawer").setAttribute("aria-hidden", String(!v));
    $("#overlay").hidden = !v;
    document.body.style.overflow = v ? "hidden" : "";
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-add],[data-inc],[data-dec],[data-cat]");
    if (!t) return;
    if (t.dataset.add) { add(t.dataset.add, 1); }
    else if (t.dataset.inc) add(t.dataset.inc, 1);
    else if (t.dataset.dec) add(t.dataset.dec, -1);
    else if (t.dataset.cat) { state.cat = t.dataset.cat; renderTabs(); renderGrid(); }
  });
  $("#search").addEventListener("input", function (e) { state.q = e.target.value; renderGrid(); });
  $("#openCart").addEventListener("click", function () { openCart(true); });
  $("#closeCart").addEventListener("click", function () { openCart(false); });
  $("#overlay").addEventListener("click", function () { openCart(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") openCart(false); });
  $("#burger").addEventListener("click", function () { $("#nav").classList.toggle("open"); });
  $("#nav").addEventListener("click", function () { $("#nav").classList.remove("open"); });

  function orderText(f, t) {
    var lines = Object.keys(cart).map(function (id, i) {
      var p = byId(id); return (i + 1) + ". " + p.name + " × " + cart[id] + " " + p.unit + " = " + fmt(p.price * cart[id]);
    });
    return "🧺 Yangi buyurtma\n\n👤 " + f.name + "\n📞 " + f.phone + "\n📍 " + f.address +
      (f.time ? "\n🕒 " + f.time : "") + (f.note ? "\n💬 " + f.note : "") +
      "\n\n" + lines.join("\n") + "\n\nMahsulotlar: " + fmt(t.sub) + "\nYetkazish: " + (t.fee ? fmt(t.fee) : "Bepul") + "\nJami: " + fmt(t.total);
  }

  $("#orderForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var form = e.target, msg = $("#formMsg"), btn = $("#submitBtn");
    var f = { name: form.name.value.trim(), phone: form.phone.value.trim(), address: form.address.value.trim(), time: form.time.value.trim(), note: form.note.value.trim() };
    ["name", "phone", "address"].forEach(function (k) { form[k].classList.toggle("bad", !f[k]); });
    var digits = f.phone.replace(/\D/g, "");
    if (!f.name || !f.address || digits.length < 9) { form.phone.classList.toggle("bad", digits.length < 9); msg.className = "form-msg err"; msg.textContent = "Ism, telefon va manzilni to'g'ri to'ldiring."; return; }
    var t = totals(), text = orderText(f, t);
    btn.disabled = true; msg.className = "form-msg"; msg.textContent = "Yuborilmoqda...";

    var done = function () {
      cart = {}; save(); renderCart(); form.reset();
      msg.className = "form-msg ok"; msg.textContent = "✅ Rahmat! Buyurtmangiz qabul qilindi. Tez orada bog'lanamiz.";
    };
    if (C.orderEndpoint) {
      fetch(C.orderEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: text }) })
        .then(function (r) { if (!r.ok) throw 0; done(); })
        .catch(function () { btn.disabled = false; msg.className = "form-msg err"; msg.textContent = "Xatolik. Qaytadan urinib ko'ring yoki Telegram'da yozing."; });
    } else { // DEMO rejim: bot ulanmagan
      console.log(text);
      setTimeout(function () { done(); msg.textContent = "✅ Demo: buyurtma Telegram-botga shunday tushadi (konsolga qarang)."; }, 600);
    }
  });

  // statik matnlar
  $("#deliveryNote").textContent = "🚚 " + fmt(C.freeDeliveryFrom) + " dan yuqori buyurtmalarga yetkazib berish bepul, qolganlariga — " + fmt(C.deliveryFee) + ".";
  $("#clist").innerHTML =
    '<li>📞 <a href="tel:' + C.phone.replace(/\s/g, "") + '">' + C.phone + "</a></li>" +
    '<li>✈️ <a href="https://t.me/' + C.telegram + '" target="_blank" rel="noopener">@' + C.telegram + "</a></li>" +
    '<li>📸 <a href="https://instagram.com/' + C.instagram + '" target="_blank" rel="noopener">@' + C.instagram + "</a></li>";
  $("#year").textContent = new Date().getFullYear();

  renderTabs(); renderGrid(); renderGifts(); renderCart();
})();
