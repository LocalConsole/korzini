// Sozlamalar. Haqiqiy ma'lumotlar bilan almashtiring.
window.CONFIG = {
  shopName: "UZB Savat",
  phone: "+998 90 000 00 00",          // DEMO raqam
  telegram: "uzb_savat",               // Telegram username
  instagram: "uzb_savat",
  currency: "so'm",
  freeDeliveryFrom: 300000,
  deliveryFee: 20000,
  // Buyurtmalar Telegram-botga serverdan yuboriladi (tokenni brauzerga qo'ymang!).
  // Server/Cloudflare Worker manzilini shu yerga yozing. Bo'sh bo'lsa — demo rejim.
  orderEndpoint: "",
  // Vaqtinchalik suratlar (Unsplash, bepul tijorat litsenziyasi). images/<fayl> qo'yilsa — o'sha ustun.
  photos: (function () {
    var u = function (id, w) { return "https://images.unsplash.com/photo-" + id + "?auto=format&fit=crop&q=72&w=" + (w || 900); };
    return {
      "hero.jpg": u("1710857397974-f0617001c39e", 1100),
      "cat-meva.jpg": u("1760333949041-1c6e16f1c72c"),
      "cat-quruq.jpg": u("1647945387141-387b88af06fd"),
      "cat-yongoq.jpg": u("1595412017587-b7f3117dff54"),
      "cat-sovga.jpg": u("1628689469838-524a4a973b8e"),
      "gifts.jpg": u("1704229779642-b97ae927124f", 1000),
      "gifts-2.jpg": u("1633168850968-76be3bb0a2fc", 600),
      "gift-mini.jpg": u("1641291361624-38b69b86b1cf"),
      "gift-oila.jpg": u("1773823307113-2dcc3609aa79"),
      "gift-premium.jpg": u("1619566636858-adf3ef46400b"),
      "custom.jpg": u("1674066253665-4d2553a3bcb8", 1000),
      "custom-2.jpg": u("1654648742474-7f22ca616d0b", 600),
      "shop.jpg": u("1743416981320-5b48fd647f3b", 1000)
    };
  })()
};
