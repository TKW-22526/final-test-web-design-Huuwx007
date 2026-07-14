function renderCart(){
  const el = document.getElementById("cart-content");
  if (state.cart.length === 0){
    el.innerHTML = `<div class="empty">Giỏ hàng đang trống. Hãy chọn vài cuốn sách ở Cửa hàng nhé.</div>`;
    return;
  }
  const books = state.cart.map(findBook);
  const total = books.reduce((s,b) => s + b.price, 0);
  el.innerHTML = `
    <div class="cart-box">
      ${books.map((b, idx) => `
        <div class="cart-row">
          ${coverHTML(b.title, b.genre, "sm",b.cover,true)}
          <div class="info">
            <div class="t">${b.title}</div>
            <div class="a">${b.author}</div>
          </div>
          <div class="price">${formatVND(b.price)}</div>
          <button class="remove" onclick="removeFromCart(${idx})">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
      `).join("")}
      <div class="cart-total">
        <span>Tổng cộng: <strong>${formatVND(total)}</strong></span>
        <button class="btn btn-gold" onclick="checkout()">Thanh toán</button>
      </div>
    </div>
  `;
}

function removeFromCart(idx){
  state.cart.splice(idx,1);
  saveState();
  renderCart();
  updateCartBadge();
}

function checkout(){
  if (state.cart.length === 0) return;
  state.cart.forEach(id => {
    if (!findLibEntry(id)){
      state.library.push({ bookId: id, status: "muon_doc", currentPage: 0, rating: 0, quotes: [] });
    }
  });
  state.cart = [];
  saveState();
  window.location.href = "library.html";
}

document.addEventListener("DOMContentLoaded", renderCart);
