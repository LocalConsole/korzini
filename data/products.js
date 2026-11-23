// Mahsulotlar ma'lumotlari. DEMO narxlar — haqiqiy narxlar bilan almashtiriladi.
// Rasm: images/<id>.jpg qo'yilsa avtomatik ko'rinadi, aks holda emoji ko'rsatiladi.
window.CATEGORIES = [
  { id: "all", name: "Hammasi", icon: "🧺" },
  { id: "meva", name: "Yangi mevalar", icon: "🍎" },
  { id: "quruq", name: "Quruq mevalar", icon: "🍇" },
  { id: "yongoq", name: "Yong'oq va magiz", icon: "🥜" },
  { id: "sovga", name: "Sovg'a savatlari", icon: "🎁" }
];

window.PRODUCTS = [
  // Yangi mevalar
  { id: "olma", cat: "meva", name: "Samarqand olmasi", unit: "kg", price: 18000, emoji: "🍎", desc: "Shirali, xushbo'y, mahalliy bog'lardan." },
  { id: "anor", cat: "meva", name: "Kattaqo'rg'on anori", unit: "kg", price: 35000, emoji: "🍎", desc: "Shirin-nordon, yirik donali." },
  { id: "uzum", cat: "meva", name: "Husayni uzumi", unit: "kg", price: 30000, emoji: "🍇", desc: "Uzun, zich, mevaning shohi." },
  { id: "behi", cat: "meva", name: "Behi", unit: "kg", price: 20000, emoji: "🍐", desc: "Xushbo'y, qish uchun ajoyib." },
  { id: "xurmo", cat: "meva", name: "Xurmo", unit: "kg", price: 25000, emoji: "🍊", desc: "Shirin va yumshoq, mavsumiy." },
  { id: "mandarin", cat: "meva", name: "Mandarin", unit: "kg", price: 22000, emoji: "🍊", desc: "Yangi mavsum, shirin." },
  { id: "banan", cat: "meva", name: "Banan", unit: "kg", price: 20000, emoji: "🍌", desc: "Pishgan, energiya uchun." },
  { id: "qovun", cat: "meva", name: "Qovun (qishki)", unit: "kg", price: 15000, emoji: "🍈", desc: "Uzoq saqlanadigan, shirin." },

  // Quruq mevalar
  { id: "mayiz", cat: "quruq", name: "Mayiz (qora, sariq)", unit: "kg", price: 60000, emoji: "🍇", desc: "Quyoshda quritilgan, tabiiy." },
  { id: "turshak", cat: "quruq", name: "To'rshak (o'rik)", unit: "kg", price: 80000, emoji: "🍑", desc: "Danakli quritilgan o'rik." },
  { id: "kuraga", cat: "quruq", name: "Quraga", unit: "kg", price: 90000, emoji: "🍑", desc: "Danaksiz, yumshoq quritilgan o'rik." },
  { id: "anjir", cat: "quruq", name: "Quritilgan anjir", unit: "kg", price: 110000, emoji: "🫐", desc: "Tabiiy shirinlik, tolaga boy." },
  { id: "hurma", cat: "quruq", name: "Hurmo (xurma)", unit: "kg", price: 85000, emoji: "🌴", desc: "Yumshoq, kofe rangli." },
  { id: "olxori", cat: "quruq", name: "Quritilgan olxo'ri", unit: "kg", price: 75000, emoji: "🫐", desc: "Danaksiz, nordon-shirin." },

  // Yong'oq
  { id: "bodom", cat: "yongoq", name: "Bodom", unit: "kg", price: 120000, emoji: "🥜", desc: "Tozalangan, xomaki." },
  { id: "yongoq", cat: "yongoq", name: "Yong'oq (mag'iz)", unit: "kg", price: 90000, emoji: "🌰", desc: "Yangi, oqish mag'iz." },
  { id: "pista", cat: "yongoq", name: "Pista", unit: "kg", price: 180000, emoji: "🥜", desc: "Sho'rlangan, qovurilgan." },
  { id: "funduk", cat: "yongoq", name: "Funduk", unit: "kg", price: 140000, emoji: "🌰", desc: "Yirik, xushbo'y." },

  // Sovg'a savatlari
  { id: "sovga-mini", cat: "sovga", name: "Mini sovg'a savati", unit: "dona", price: 150000, emoji: "🎁", desc: "Mayiz, bodom, quraga, hurmo — chiroyli qadoqda.", badge: "To'y uchun" },
  { id: "sovga-oila", cat: "sovga", name: "Oilaviy sovg'a savati", unit: "dona", price: 320000, emoji: "🧺", desc: "Yangi mevalar va quruq mevalar mix.", badge: "Mehmon uchun" },
  { id: "sovga-premium", cat: "sovga", name: "Premium savat", unit: "dona", price: 550000, emoji: "🎀", desc: "Pista, bodom, anjir, hurmo va mavsumiy mevalar.", badge: "Bayram uchun" }
];
