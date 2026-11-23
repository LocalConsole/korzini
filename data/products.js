// Mahsulotlar. DEMO narxlar — haqiqiy narxlar bilan almashtiriladi.
// name/desc: [o'zbekcha, ruscha, inglizcha]
(function (g) {
  var C = [
    { id: "meva" }, { id: "quruq" }, { id: "yongoq" }, { id: "sovga" }
  ];
  var P = [];
  function p(id, cat, price, unit, name, desc, tag) { P.push({ id: id, cat: cat, price: price, unit: unit, name: name, desc: desc, tag: tag }); }

  p("olma", "meva", 18000, "kg", ["Samarqand olmasi", "Самаркандские яблоки", "Samarkand apples"], ["Shirali, xushbo'y", "Сочные, ароматные", "Juicy and fragrant"]);
  p("anor", "meva", 35000, "kg", ["Kattaqo'rg'on anori", "Гранат из Каттакургана", "Kattakurgan pomegranates"], ["Shirin-nordon, yirik donali", "Кисло-сладкий, крупное зерно", "Sweet-tart, large seeds"]);
  p("uzum", "meva", 30000, "kg", ["Husayni uzumi", "Виноград хусайни", "Husayni grapes"], ["Uzun, zich, shirin", "Длинный, плотный, сладкий", "Long, firm and sweet"]);
  p("behi", "meva", 20000, "kg", ["Behi", "Айва", "Quince"], ["Xushbo'y, qish uchun", "Ароматная, на зиму", "Fragrant, a winter favourite"]);
  p("xurmo", "meva", 25000, "kg", ["Xurmo", "Хурма", "Persimmons"], ["Yumshoq va shirin", "Мягкая и сладкая", "Soft and sweet"]);
  p("mandarin", "meva", 22000, "kg", ["Mandarin", "Мандарины", "Mandarins"], ["Yangi mavsum", "Новый сезон", "New season"]);
  p("banan", "meva", 20000, "kg", ["Banan", "Бананы", "Bananas"], ["Pishgan, tanlangan", "Спелые, отборные", "Ripe and hand-picked"]);
  p("qovun", "meva", 15000, "kg", ["Qishki qovun", "Зимняя дыня", "Winter melon"], ["Uzoq saqlanadi, shirin", "Долго хранится, сладкая", "Keeps well, sweet"]);

  p("mayiz", "quruq", 60000, "kg", ["Mayiz", "Изюм", "Raisins"], ["Qora va sariq, quyoshda quritilgan", "Тёмный и светлый, сушёный на солнце", "Dark and golden, sun-dried"]);
  p("turshak", "quruq", 80000, "kg", ["To'rshak", "Урюк", "Whole dried apricots"], ["Danakli quritilgan o'rik", "Сушёный абрикос с косточкой", "Sun-dried, stone in"]);
  p("kuraga", "quruq", 90000, "kg", ["Quraga", "Курага", "Dried apricots"], ["Danaksiz, yumshoq", "Без косточки, мягкая", "Pitted and soft"]);
  p("anjir", "quruq", 110000, "kg", ["Quritilgan anjir", "Сушёный инжир", "Dried figs"], ["Tabiiy shirinlik", "Натуральная сладость", "Naturally sweet"]);
  p("hurma", "quruq", 85000, "kg", ["Hurmo", "Финики", "Dates"], ["Yumshoq, shirin", "Мягкие, сладкие", "Soft and sweet"]);
  p("olxori", "quruq", 75000, "kg", ["Quritilgan olxo'ri", "Чернослив", "Prunes"], ["Danaksiz, nordon-shirin", "Без косточки, кисло-сладкий", "Pitted, sweet-tart"]);

  p("bodom", "yongoq", 120000, "kg", ["Bodom", "Миндаль", "Almonds"], ["Tozalangan, xom", "Очищенный, сырой", "Shelled, raw"]);
  p("yongoq", "yongoq", 90000, "kg", ["Yong'oq mag'zi", "Грецкий орех, ядро", "Walnut kernels"], ["Yangi, och rangli", "Свежий, светлый", "Fresh and light"]);
  p("pista", "yongoq", 180000, "kg", ["Pista", "Фисташки", "Pistachios"], ["Qovurilgan, sho'r", "Жареные, солёные", "Roasted and salted"]);
  p("funduk", "yongoq", 140000, "kg", ["Funduk", "Фундук", "Hazelnuts"], ["Yirik, xushbo'y", "Крупный, ароматный", "Large and fragrant"]);

  p("sovga-mini", "sovga", 150000, "dona", ["Mini savat", "Мини-корзина", "Mini basket"], ["Mayiz, bodom, quraga va hurmo, chiroyli qadoqda.", "Изюм, миндаль, курага и финики в красивой упаковке.", "Raisins, almonds, apricots and dates, gift-wrapped."], "wedding");
  p("sovga-oila", "sovga", 320000, "dona", ["Oilaviy savat", "Семейная корзина", "Family basket"], ["Yangi va quruq mevalar aralashmasi.", "Свежие фрукты и сухофрукты вместе.", "Fresh and dried fruit together."], "guest");
  p("sovga-premium", "sovga", 550000, "dona", ["Premium savat", "Премиум-корзина", "Premium basket"], ["Pista, bodom, anjir, hurmo va mavsumiy mevalar.", "Фисташки, миндаль, инжир, финики и сезонные фрукты.", "Pistachios, almonds, figs, dates and seasonal fruit."], "holiday");

  var out = { CATEGORIES: C, PRODUCTS: P, HOT: ["olma", "anor", "mayiz", "kuraga", "bodom", "pista"] };
  if (typeof module !== "undefined") module.exports = out; else { g.CATEGORIES = C; g.PRODUCTS = P; g.HOT = out.HOT; }
})(this);
