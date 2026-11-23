# UZB Savat — demo sayt

Statik ko'p sahifali sayt: `index`, `catalog`, `gifts`, `delivery`, `contact`.
Tillar: o'zbek / rus / ingliz. Kunduzgi va tungi rejim, 5 ta rang palitrasi.

## Tahrirlash
- Matnlar: `js/i18n.js` (har bir kalit uchun uz/ru/en)
- Mahsulotlar va narxlar: `data/products.js` (hozir DEMO narxlar)
- Telefon, username, yetkazish narxi: `js/config.js`
- Sahifalar `tools/build.js` dan yig'iladi. Matn yoki tuzilmani o'zgartirgandan keyin: `node tools/build.js`

## Rasmlar
Hozir vaqtinchalik Unsplash suratlari (`js/config.js` → `photos`, bepul tijorat litsenziyasi). Do'kon o'z suratlarini `images/` ga qo'yishi bilan ular avtomatik almashtiriladi.

`images/` papkasiga quyidagi nomlar bilan qo'ying — sayt ularni o'zi ko'rsatadi, bo'lmasa "Surat joyi" ko'rinadi:

`hero.jpg`, `cat-meva.jpg`, `cat-quruq.jpg`, `cat-yongoq.jpg`, `cat-sovga.jpg`, `gifts.jpg`, `gifts-2.jpg`,
`gift-mini.jpg`, `gift-oila.jpg`, `gift-premium.jpg`, `custom.jpg`, `custom-2.jpg`, `shop.jpg`

## Buyurtmalar
Buyurtma Telegram-botga **server orqali** yuboriladi (bot tokenini brauzerga qo'ymang).
`js/config.js` dagi `orderEndpoint` bo'sh bo'lsa — demo rejim.
