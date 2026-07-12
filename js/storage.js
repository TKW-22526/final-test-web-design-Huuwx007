
const STORAGE_KEY = "giaymuc-state-v1";

let state = { cart: [], library: [] };

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) state = JSON.parse(raw);
  } catch (e) {
    console.warn("Không đọc được dữ liệu đã lưu, dùng dữ liệu mặc định:", e);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("Không lưu được dữ liệu:", e);
  }
}

function findLibEntry(id){ return state.library.find(e => e.bookId === Number(id)); }

function updateCartBadge(){
  const el = document.getElementById("cart-count");
  if (el) el.textContent = state.cart.length ? `(${state.cart.length})` : "";
}

// Tải dữ liệu ngay khi script được nạp, trước khi các trang render nội dung
loadState();
document.addEventListener("DOMContentLoaded", updateCartBadge);
