// Tarjimalar: uz / ru / en. Kalit -> [o'zbekcha, ruscha, inglizcha]
(function (g) {
  var D = {};
  function k(key, uz, ru, en) { D[key] = { uz: uz, ru: ru, en: en }; }

  // meta
  k("title.home", "UZB Savat — Toshkentda meva va quruq mevalar yetkazib berish", "UZB Savat — доставка фруктов и сухофруктов по Ташкенту", "UZB Savat — fruit and dried fruit delivery in Tashkent");
  k("title.catalog", "Katalog va narxlar — UZB Savat", "Каталог и цены — UZB Savat", "Catalog and prices — UZB Savat");
  k("title.gifts", "Sovg'a savatlari — UZB Savat", "Подарочные корзины — UZB Savat", "Gift baskets — UZB Savat");
  k("title.delivery", "Yetkazib berish — UZB Savat", "Доставка — UZB Savat", "Delivery — UZB Savat");
  k("title.contact", "Aloqa — UZB Savat", "Контакты — UZB Savat", "Contact — UZB Savat");
  k("desc", "Toshkentda meva yetkazib berish: yangi va quruq mevalar, yong'oq, tayyor sovg'a savatlari. Narxlar oldindan ko'rinadi, buyurtma bir daqiqada.", "Доставка фруктов по Ташкенту: свежие фрукты, сухофрукты, орехи и готовые подарочные корзины. Цены на сайте, заказ за минуту.", "Fruit delivery in Tashkent: fresh and dried fruit, nuts and ready gift baskets. Prices up front, order in a minute.");

  // umumiy
  k("skip", "Asosiy qismga o'tish", "Перейти к содержимому", "Skip to content");
  k("nav.home", "Bosh sahifa", "Главная", "Home");
  k("nav.catalog", "Katalog", "Каталог", "Catalog");
  k("nav.gifts", "Sovg'a savatlari", "Подарки", "Gift baskets");
  k("nav.delivery", "Yetkazib berish", "Доставка", "Delivery");
  k("nav.contact", "Aloqa", "Контакты", "Contact");
  k("aria.menu", "Menyu", "Меню", "Menu");
  k("aria.settings", "Ko'rinish sozlamalari", "Настройки оформления", "Appearance settings");
  k("aria.lang", "Til", "Язык", "Language");
  k("aria.cart", "Savatni ochish", "Открыть корзину", "Open cart");
  k("aria.close", "Yopish", "Закрыть", "Close");
  k("aria.dec", "Kamaytirish", "Уменьшить", "Decrease");
  k("aria.inc", "Ko'paytirish", "Увеличить", "Increase");
  k("cur", "so'm", "сум", "UZS");
  k("unit.kg", "kg", "кг", "kg");
  k("unit.dona", "dona", "шт", "pc");
  k("add", "Savatga", "В корзину", "Add to cart");
  k("ph.label", "Surat joyi", "Место для фото", "Photo goes here");

  k("set.title", "Ko'rinish", "Оформление", "Appearance");
  k("set.light", "Kunduzgi", "Светлая", "Light");
  k("set.dark", "Tungi", "Тёмная", "Dark");
  k("set.palette", "Rang", "Цвет", "Colour");
  k("pal.anor", "Anor", "Гранат", "Pomegranate");
  k("pal.pista", "Pista", "Фисташка", "Pistachio");
  k("pal.orik", "O'rik", "Абрикос", "Apricot");
  k("pal.uzum", "Uzum", "Виноград", "Grape");
  k("pal.feruza", "Feruza", "Бирюза", "Turquoise");

  // savat
  k("cart.title", "Savat", "Корзина", "Cart");
  k("cart.btn", "Savat", "Корзина", "Cart");
  k("cart.empty", "Savat bo'sh. Katalogdan mahsulot tanlang.", "Корзина пуста. Выберите товары в каталоге.", "Your cart is empty. Pick something from the catalog.");
  k("cart.go", "Katalogga o'tish", "Перейти в каталог", "Go to catalog");
  k("cart.sub", "Mahsulotlar", "Товары", "Items");
  k("cart.fee", "Yetkazib berish", "Доставка", "Delivery");
  k("cart.free", "Bepul", "Бесплатно", "Free");
  k("cart.total", "Jami", "Итого", "Total");
  k("form.name", "Ismingiz", "Ваше имя", "Your name");
  k("form.phone", "Telefon", "Телефон", "Phone");
  k("form.address", "Manzil", "Адрес", "Address");
  k("form.address.ph", "Tuman, ko'cha, uy", "Район, улица, дом", "District, street, house");
  k("form.time", "Qulay vaqt", "Удобное время", "Preferred time");
  k("form.time.ph", "Masalan: bugun 18:00 dan keyin", "Например: сегодня после 18:00", "For example: today after 6 pm");
  k("form.note", "Izoh", "Комментарий", "Note");
  k("form.submit", "Buyurtma berish", "Оформить заказ", "Place order");
  k("form.err", "Ism, telefon va manzilni to'ldiring.", "Заполните имя, телефон и адрес.", "Fill in your name, phone and address.");
  k("form.sending", "Yuborilmoqda...", "Отправляем...", "Sending...");
  k("form.ok", "Buyurtma qabul qilindi. Tez orada bog'lanamiz.", "Заказ принят. Скоро свяжемся с вами.", "Order placed. We'll be in touch shortly.");
  k("form.demo", "Demo: buyurtma Telegram-botga shu ko'rinishda tushadi (brauzer konsolida).", "Демо: заказ приходит в Telegram-бот в таком виде (см. консоль браузера).", "Demo: this is how the order reaches the Telegram bot (see browser console).");
  k("form.fail", "Buyurtma yuborilmadi. Qayta urinib ko'ring yoki Telegram'da yozing.", "Заказ не отправился. Попробуйте ещё раз или напишите в Telegram.", "The order didn't go through. Try again or message us on Telegram.");

  // bosh sahifa
  k("hero.title", "Bozordagi eng yaxshi mevalar — uyingizgacha", "Лучшее с базара — прямо к вашей двери", "The best of the bazaar, delivered to your door");
  k("hero.text", "Yangi va quruq mevalar, yong'oq va tayyor sovg'a savatlari. Narxlar oldindan ko'rinadi, buyurtma bir daqiqada.", "Свежие фрукты, сухофрукты, орехи и готовые подарочные корзины. Цены видны сразу, заказ — за минуту.", "Fresh and dried fruit, nuts and ready-made gift baskets. Prices up front, ordering takes a minute.");
  k("hero.cta1", "Katalogni ochish", "Открыть каталог", "Open the catalog");
  k("hero.cta2", "Sovg'a savatlari", "Подарочные корзины", "Gift baskets");
  k("hero.badge", "Toshkent bo'ylab yetkazib berish • ", "Доставка по всему Ташкенту • ", "Delivery across Tashkent • ");
  k("f.followers", "Instagram obunachi", "подписчиков в Instagram", "Instagram followers");
  k("f.clients", "mamnun mijoz", "довольных клиентов", "happy customers");
  k("f.years", "yillik tajriba", "лет опыта", "years in business");
  k("cats.title", "Nima olib kelaylik?", "Что вам привезти?", "What can we bring you?");
  k("cat.all", "Hammasi", "Все", "All");
  k("cat.meva", "Yangi mevalar", "Свежие фрукты", "Fresh fruit");
  k("cat.quruq", "Quruq mevalar", "Сухофрукты", "Dried fruit");
  k("cat.yongoq", "Yong'oq va mag'iz", "Орехи", "Nuts");
  k("cat.sovga", "Sovg'a savatlari", "Подарочные корзины", "Gift baskets");
  k("cat.meva.d", "Mavsumiy, har kuni saralanadi", "Сезонные, отбираем каждый день", "Seasonal, sorted daily");
  k("cat.quruq.d", "Quyoshda quritilgan, tabiiy", "Высушены на солнце, без добавок", "Sun-dried, nothing added");
  k("cat.yongoq.d", "Tozalangan va qovurilgan", "Очищенные и жареные", "Shelled and roasted");
  k("cat.sovga.d", "To'y, bayram, mehmon uchun", "На свадьбу, праздник, в гости", "For weddings, holidays, visits");
  k("hot.title", "Ko'p buyurtma qilinadi", "Часто заказывают", "Most ordered");
  k("hot.link", "Butun katalog", "Весь каталог", "Full catalog");
  k("how.title", "Buyurtma qanday beriladi", "Как сделать заказ", "How ordering works");
  k("s1.t", "Tanlang", "Выберите", "Choose");
  k("s1.d", "Mahsulot va miqdorni savatga qo'shing.", "Добавьте товары и количество в корзину.", "Add products and amounts to your cart.");
  k("s2.t", "Manzilni yozing", "Укажите адрес", "Add your address");
  k("s2.d", "Ism, telefon, manzil va qulay vaqt.", "Имя, телефон, адрес и удобное время.", "Name, phone, address and a good time.");
  k("s3.t", "Biz tasdiqlaymiz", "Мы подтверждаем", "We confirm");
  k("s3.d", "Buyurtma darhol Telegram-botimizga tushadi.", "Заказ сразу приходит в наш Telegram-бот.", "Your order lands in our Telegram bot instantly.");
  k("s4.t", "Qabul qiling", "Получите", "Receive");
  k("s4.d", "Kuryer kelishilgan vaqtda olib boradi.", "Курьер привезёт в согласованное время.", "A courier brings it at the agreed time.");
  k("gt.title", "Sovg'a tanlash qiyinmi?", "Не знаете, что подарить?", "Stuck on a gift?");
  k("gt.text", "Tayyor savatlar to'y, bayram va mehmondorchilik uchun. Tarkib va byudjetni ayting — o'zingizga moslab yig'amiz.", "Готовые корзины на свадьбу, праздник или в гости. Назовите состав и бюджет — соберём под вас.", "Ready baskets for weddings, holidays and visits. Tell us the contents and budget, and we'll build one for you.");
  k("gt.btn", "Savatlarni ko'rish", "Смотреть корзины", "See the baskets");
  k("cta.title", "Telegram'da ham buyurtma qabul qilamiz", "Заказы принимаем и в Telegram", "We take orders on Telegram too");
  k("cta.text", "Savol bo'lsa yoki maxsus savat kerak bo'lsa, yozing.", "Если есть вопрос или нужна особая корзина — напишите.", "Questions or a special basket in mind? Drop us a line.");
  k("cta.btn", "Telegram'da yozish", "Написать в Telegram", "Message on Telegram");

  // katalog
  k("catalog.title", "Katalog va narxlar", "Каталог и цены", "Catalog and prices");
  k("catalog.sub", "Qo'ng'iroq qilish shart emas: tanlang, savatga qo'shing, buyurtma bering.", "Звонить не нужно: выберите, добавьте в корзину, оформите заказ.", "No need to call: pick, add to cart, order.");
  k("search.label", "Qidirish", "Поиск", "Search");
  k("search.ph", "Olma, bodom, mayiz...", "Яблоки, миндаль, изюм...", "Apples, almonds, raisins...");
  k("empty", "Hech narsa topilmadi. Boshqa so'z bilan qidirib ko'ring.", "Ничего не нашлось. Попробуйте другое слово.", "Nothing found. Try a different word.");
  k("empty.reset", "Qidiruvni tozalash", "Сбросить поиск", "Clear search");

  // sovg'alar
  k("gifts.title", "Sovg'a savatlari", "Подарочные корзины", "Gift baskets");
  k("gifts.sub", "Chiroyli qadoqda, tayyor holda. Kerakli kunga yetkazamiz.", "В красивой упаковке, готовые к вручению. Привезём к нужному дню.", "Beautifully packed and ready to give. Delivered on the day you need.");
  k("tag.wedding", "To'y uchun", "На свадьбу", "For weddings");
  k("tag.guest", "Mehmonga", "В гости", "For visits");
  k("tag.holiday", "Bayram uchun", "На праздник", "For holidays");
  k("build.title", "O'zingizga moslab yig'amiz", "Соберём под ваш заказ", "Built to your brief");
  k("build.text", "Tarkib, miqdor va byudjetni yozing: kelin-kuyovga, ustozga, hamkasbga yoki katta dasturxon uchun.", "Напишите состав, количество и бюджет: для молодожёнов, учителя, коллег или большого дастархана.", "Send us contents, quantity and budget: for newlyweds, a teacher, colleagues or a big dastarkhan.");

  // yetkazib berish
  k("del.title", "Yetkazib berish", "Доставка", "Delivery");
  k("del.sub", "Butun Toshkent bo'ylab, siz uchun qulay vaqtda.", "По всему Ташкенту, в удобное для вас время.", "Anywhere in Tashkent, at a time that suits you.");
  k("del.area.t", "Hudud", "Зона", "Area");
  k("del.area.d", "Toshkent shahri", "Ташкент", "Tashkent city");
  k("del.time.t", "Vaqt", "Время", "Timing");
  k("del.time.d", "Buyurtma kuni yoki ertasiga", "В день заказа или на следующий", "Same day or next day");
  k("del.pay.t", "To'lov", "Оплата", "Payment");
  k("del.pay.d", "Naqd yoki karta, qabul qilganda", "Наличными или картой при получении", "Cash or card on delivery");
  k("del.fee", "{free} dan yuqori buyurtmalarga yetkazish bepul, qolganlariga — {fee}.", "Доставка бесплатна от {free}, в остальных случаях — {fee}.", "Free delivery on orders over {free}, otherwise {fee}.");
  k("faq.title", "Savollar va javoblar", "Вопросы и ответы", "Questions and answers");
  k("q1", "Yetkazish qancha vaqt oladi?", "Сколько ждать доставку?", "How long does delivery take?");
  k("a1", "Odatda buyurtma kuni yoki ertasiga. Aniq vaqtni buyurtma paytida yozasiz.", "Обычно в день заказа или на следующий. Точное время вы указываете при заказе.", "Usually the same or next day. You choose the exact time when ordering.");
  k("q2", "Qanday to'lanadi?", "Как оплатить?", "How do I pay?");
  k("a2", "Naqd yoki karta orqali, kuryerga qabul qilganingizda.", "Наличными или картой курьеру при получении.", "Cash or card, to the courier on delivery.");
  k("q3", "Savatni o'zimga moslab olsam bo'ladimi?", "Можно собрать корзину под себя?", "Can I customise a basket?");
  k("a3", "Ha. Tarkib va byudjetni izohga yozing — savatni siz uchun yig'amiz.", "Да. Напишите состав и бюджет в комментарии — соберём для вас.", "Yes. Put the contents and budget in the note and we'll build it.");
  k("q4", "Sifat mos kelmasa-chi?", "А если качество не устроит?", "What if the quality isn't right?");
  k("a4", "Mahsulot jo'natishdan oldin saralanadi. Mos kelmasa, almashtirib beramiz.", "Перед отправкой всё отбирается вручную. Если что-то не так — заменим.", "Everything is hand-sorted before dispatch. If something's off, we replace it.");

  // aloqa
  k("contact.title", "Aloqa", "Контакты", "Contact");
  k("contact.sub", "Yozing yoki qo'ng'iroq qiling — tez javob beramiz.", "Напишите или позвоните — ответим быстро.", "Write or call — we reply fast.");
  k("lbl.phone", "Telefon", "Телефон", "Phone");
  k("lbl.tg", "Telegram", "Telegram", "Telegram");
  k("lbl.ig", "Instagram", "Instagram", "Instagram");
  k("lbl.city", "Shahar", "Город", "City");
  k("city", "Toshkent", "Ташкент", "Tashkent");

  k("foot.tag", "Meva, quruq meva va sovg'a savatlari. Toshkent.", "Фрукты, сухофрукты и подарочные корзины. Ташкент.", "Fruit, dried fruit and gift baskets. Tashkent.");
  k("foot.demo", "Demo-versiya. Sayt: WebBuild", "Демо-версия. Сайт: WebBuild", "Demo version. Site by WebBuild");

  if (typeof module !== "undefined") module.exports = D; else g.I18N = D;
})(this);
