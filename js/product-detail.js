/* ---------------- CHI TIẾT SẢN PHẨM (Cửa hàng) ---------------- */
const productId = Number(new URLSearchParams(window.location.search).get("id"));
let currentImages = [];
let currentImageIdx = 0;

function renderProductDetail(){
  const book = findBook(productId);
  if (!book){
    document.getElementById("product-root").innerHTML =
      `<div class="empty">Không tìm thấy sản phẩm này. <a href="../index.html" style="color:var(--ink); font-weight:600;">Quay lại cửa hàng</a></div>`;
    return;
  }

  currentImages = getBookImages(book);
  currentImageIdx = 0;

  document.getElementById("pd-genre").textContent = book.genre;
  document.getElementById("pd-title").textContent = book.title;
  document.getElementById("pd-author").textContent = book.author + (book.pages ? ` · ${book.pages} trang` : "");
  document.getElementById("pd-price").textContent = formatVND(book.price);
  document.getElementById("pd-desc").textContent = book.description || "Chưa có mô tả cho sản phẩm này.";

  renderMainImage();
  renderThumbs();
}

function renderMainImage(){
  const el = document.getElementById("main-image");
  const book = findBook(productId);
  if (currentImages.length){
    el.innerHTML = `<img src="../${currentImages[currentImageIdx]}" alt="${book.title}" />`;
  } else {
    el.innerHTML = coverHTML(book.title, book.genre, "lg");
  }
}

function renderThumbs(){
  const el = document.getElementById("thumbs");
  if (currentImages.length <= 1){ el.innerHTML = ""; return; }
  el.innerHTML = currentImages.map((src, idx) => `
    <div class="thumb ${idx === currentImageIdx ? 'active' : ''}" onclick="selectImage(${idx})">
      <img src="../${src}" alt="Ảnh ${idx+1}" />
    </div>
  `).join("");
}

function selectImage(idx){
  currentImageIdx = idx;
  renderMainImage();
  renderThumbs();
}

function addToCartFromDetail(){
  state.cart.push(productId);
  saveState();
  updateCartBadge();
  showToast("Đã thêm vào giỏ hàng");
}

function buyNow(){
  state.cart.push(productId);
  saveState();
  window.location.href = "cart.html";
}

document.addEventListener("DOMContentLoaded", renderProductDetail);