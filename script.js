(function () {
  var cells = Array.prototype.slice.call(document.querySelectorAll(".gallery__cell"));
  var srcs = cells.map(function (c) { return c.getAttribute("data-src"); });
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var current = 0;

  function open(i) {
    current = (i + srcs.length) % srcs.length;
    lbImg.setAttribute("src", srcs[current]);
    lb.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function close() {
    lb.hidden = true;
    lbImg.setAttribute("src", "");
    document.body.style.overflow = "";
  }

  cells.forEach(function (c, i) {
    c.addEventListener("click", function () { open(i); });
  });
  document.getElementById("lbClose").addEventListener("click", close);
  document.getElementById("lbPrev").addEventListener("click", function (e) { e.stopPropagation(); open(current - 1); });
  document.getElementById("lbNext").addEventListener("click", function (e) { e.stopPropagation(); open(current + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") open(current - 1);
    else if (e.key === "ArrowRight") open(current + 1);
  });
})();
