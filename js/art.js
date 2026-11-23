// Surat o'rnidagi chizilgan kompozitsiyalar. Haqiqiy surat (images/*.jpg) bo'lsa, uning ostida qoladi.
// [shakl, x%, y%, kenglik%, burilish]
(function (g) {
  var SYM = { apple: "s-apple", pom: "s-pom", grape: "s-grape", apricot: "s-apricot", almond: "s-almond", walnut: "s-walnut", pista: "s-pista", basket: "s-basket", leaf: "s-leaf", raisin: "s-seed", star: "s-star" };
  var COL = { apricot: "#ec9a45", almond: "#c99a68", leaf: "#5f8f3a", raisin: "#5a2436", star: "var(--b)" };
  var SETS = {
    hero: [["basket", 50, 72, 66, 0], ["pom", 54, 40, 30, 6], ["apple", 30, 46, 26, -12], ["grape", 74, 48, 26, 10], ["apricot", 40, 26, 15, 0], ["leaf", 68, 24, 16, -24], ["star", 22, 22, 8, 0]],
    meva: [["pom", 42, 54, 48, -6], ["apple", 72, 34, 30, 12], ["grape", 68, 74, 32, -8], ["leaf", 24, 26, 16, -30]],
    quruq: [["apricot", 38, 40, 32, 0], ["apricot", 66, 58, 26, 20], ["apricot", 36, 72, 22, -10], ["raisin", 68, 28, 10, 15], ["raisin", 78, 38, 9, -20], ["raisin", 60, 82, 10, 30], ["raisin", 18, 56, 9, 0]],
    yongoq: [["walnut", 40, 44, 40, -8], ["almond", 72, 30, 20, 30], ["almond", 74, 64, 22, -20], ["pista", 34, 76, 24, 15]],
    sovga: [["basket", 50, 66, 66, 0], ["apple", 34, 38, 24, -10], ["grape", 62, 34, 26, 8], ["leaf", 78, 20, 14, 20]],
    mini: [["almond", 34, 36, 26, -20], ["apricot", 64, 40, 28, 0], ["raisin", 40, 66, 11, 0], ["raisin", 52, 74, 11, 20], ["pista", 68, 68, 24, 15]],
    oila: [["basket", 50, 68, 60, 0], ["pom", 40, 38, 28, 0], ["apple", 64, 38, 24, 10], ["apricot", 54, 22, 14, 0]],
    premium: [["basket", 50, 68, 60, 0], ["grape", 34, 36, 28, -10], ["pom", 62, 34, 28, 8], ["walnut", 50, 20, 16, 0], ["star", 82, 18, 10, 0]],
    duo: [["almond", 40, 44, 34, -24], ["apricot", 62, 58, 32, 0]],
    shop: [["basket", 50, 70, 62, 0], ["pom", 42, 40, 28, 0], ["grape", 66, 42, 26, 10], ["apple", 26, 50, 22, -10], ["leaf", 70, 20, 16, -20], ["star", 20, 18, 8, 0]]
  };
  function art(key) {
    var s = SETS[key] || SETS.meva;
    return '<div class="art" aria-hidden="true"><svg class="art__bg"><use href="#s-rosette"/></svg>' + s.map(function (f, i) {
      return '<span class="fr" style="left:' + f[1] + "%;top:" + f[2] + "%;width:" + f[3] + "%;--r:" + f[4] + "deg;--d:" + (i * 110) + "ms;--f:" + (5 + (i % 3)) + "s" +
        (COL[f[0]] ? ";color:" + COL[f[0]] : "") + '"><svg><use href="#' + SYM[f[0]] + '"/></svg></span>';
    }).join("") + "</div>";
  }
  if (typeof module !== "undefined") module.exports = art; else g.ART = art;
})(this);
