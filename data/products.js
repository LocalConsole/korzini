// Mahsulotlar. DEMO narxlar — haqiqiy narxlar bilan almashtiriladi.
// Mahsulot rasmi: images/<id>.jpg (ixtiyoriy). Sovg'a savatlari uchun `photo` ishlatiladi.
var U = function (id, w) { return "https://images.unsplash.com/photo-" + id + "?auto=format&fit=crop&q=70&w=" + (w || 900); };

window.PHOTOS = {
  hero: U("1710857397974-f0617001c39e", 1400),   // quruq meva va yong'oq, savdo peshtaxtasi
  mix: U("1641291361624-38b69b86b1cf", 800),     // meva va yong'oq aralashmasi
  dried: U("1647945387141-387b88af06fd", 800),   // quruq mevalar uyumi
  boxes: U("1674066253665-4d2553a3bcb8", 1200),  // turli mevalar solingan qutilar
  nuts: U("1633168850968-76be3bb0a2fc", 800),    // yong'oq va mayiz
  almond: U("1595412017587-b7f3117dff54", 800)   // bodom
};

window.CATEGORIES = [
  { id: "all", name: "Hammasi" },
  { id: "meva", name: "Yangi mevalar" },
  { id: "quruq", name: "Quruq mevalar" },
  { id: "yongoq", name: "Yong'oq va mag'iz" },
  { id: "sovga", name: "Sovg'a savatlari" }
];

window.PRODUCTS = [
  { id: "olma", cat: "meva", name: "Samarqand olmasi", unit: "kg", price: 18000, desc: "Shirali, xushbo'y, mahalliy bog'lardan" },
  { id: "anor", cat: "meva", name: "Kattaqo'rg'on anori", unit: "kg", price: 35000, desc: "Shirin-nordon, yirik donali" },
  { id: "uzum", cat: "meva", name: "Husayni uzumi", unit: "kg", price: 30000, desc: "Uzun, zich, shirin" },
  { id: "behi", cat: "meva", name: "Behi", unit: "kg", price: 20000, desc: "Xushbo'y, qish uchun" },
  { id: "xurmo", cat: "meva", name: "Xurmo", unit: "kg", price: 25000, desc: "Yumshoq va shirin, mavsumiy" },
  { id: "mandarin", cat: "meva", name: "Mandarin", unit: "kg", price: 22000, desc: "Yangi mavsum" },
  { id: "banan", cat: "meva", name: "Banan", unit: "kg", price: 20000, desc: "Pishgan, tanlangan" },
  { id: "qovun", cat: "meva", name: "Qishki qovun", unit: "kg", price: 15000, desc: "Uzoq saqlanadigan, shirin" },

  { id: "mayiz", cat: "quruq", name: "Mayiz", unit: "kg", price: 60000, desc: "Qora va sariq, quyoshda quritilgan" },
  { id: "turshak", cat: "quruq", name: "To'rshak", unit: "kg", price: 80000, desc: "Danakli quritilgan o'rik" },
  { id: "kuraga", cat: "quruq", name: "Quraga", unit: "kg", price: 90000, desc: "Danaksiz, yumshoq o'rik" },
  { id: "anjir", cat: "quruq", name: "Quritilgan anjir", unit: "kg", price: 110000, desc: "Tabiiy shirinlik" },
  { id: "hurma", cat: "quruq", name: "Hurmo", unit: "kg", price: 85000, desc: "Yumshoq, shirin" },
  { id: "olxori", cat: "quruq", name: "Quritilgan olxo'ri", unit: "kg", price: 75000, desc: "Danaksiz, nordon-shirin" },

  { id: "bodom", cat: "yongoq", name: "Bodom", unit: "kg", price: 120000, desc: "Tozalangan, xom" },
  { id: "yongoq", cat: "yongoq", name: "Yong'oq mag'zi", unit: "kg", price: 90000, desc: "Yangi, och rangli" },
  { id: "pista", cat: "yongoq", name: "Pista", unit: "kg", price: 180000, desc: "Qovurilgan, sho'r" },
  { id: "funduk", cat: "yongoq", name: "Funduk", unit: "kg", price: 140000, desc: "Yirik, xushbo'y" },

  { id: "sovga-mini", cat: "sovga", name: "Mini savat", unit: "dona", price: 150000, desc: "Mayiz, bodom, quraga va hurmo. Chiroyli qadoqda.", badge: "To'y uchun", photo: "nuts" },
  { id: "sovga-oila", cat: "sovga", name: "Oilaviy savat", unit: "dona", price: 320000, desc: "Yangi va quruq mevalar aralashmasi.", badge: "Mehmon uchun", photo: "boxes" },
  { id: "sovga-premium", cat: "sovga", name: "Premium savat", unit: "dona", price: 550000, desc: "Pista, bodom, anjir, hurmo va mavsumiy mevalar.", badge: "Bayram uchun", photo: "mix" }
];
