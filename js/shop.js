/* ---------------- TRANG CHỦ / CỬA HÀNG ---------------- */
let genreFilter = "Tất cả";

function renderGenrePills(){
  const genres = ["Tất cả", ...Object.keys(GENRE_COLORS)];
  const wrap = document.getElementById("genre-pills");
  wrap.innerHTML = genres.map(g =>
    `<button class="pill ${g===genreFilter?'active':''}" onclick="setGenreFilter('${g}')">${g}</button>`
  ).join("");
}

function setGenreFilter(g){ genreFilter = g; renderShop(); }

function renderShop(){
  renderGenrePills();
  const books = genreFilter === "Tất cả" ? SAMPLE_BOOKS : SAMPLE_BOOKS.filter(b => b.genre === genreFilter);
  document.getElementById("shop-grid").innerHTML = books.map(b => `
    <div class="book-card" onclick="window.location.href='html/product-detail.html?id=${b.id}'" style="cursor:pointer;">
      ${coverHTML(b.title, b.genre, "md",b.cover)}
      <div class="book-info">
        <span class="genre-tag">${b.genre}</span>
        <span class="book-title">${b.title}</span>
        <span class="book-author">${b.author}</span>
        <span class="book-price">${formatVND(b.price)}</span>
        <button class="btn btn-primary" onclick="event.stopPropagation(); addToCart(${b.id})">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          Thêm vào giỏ
        </button>
      </div>
    </div>
  `).join("");
}

function addToCart(id){
  state.cart.push(id);
  saveState();
  updateCartBadge();
  showToast("Đã thêm vào giỏ hàng");
}

document.addEventListener("DOMContentLoaded", renderShop);
function renderQOTD(){
  const el = document.getElementById("qotd-card");
  if (!el) return;

  const all = [];
  state.library.forEach(e => {
    const book = findBook(e.bookId);
    if (!book) return;
    e.quotes.forEach(q => all.push({ ...q, bookTitle: book.title, bookAuthor: q.author || book.author, bookId: e.bookId }));
  });

  if (all.length === 0){ el.innerHTML = ""; return; }

  const q = all[Math.floor(Math.random() * all.length)];

  el.innerHTML = `
    <div class="qotd-card" onclick="window.location.href='html/book-detail.html?id=${q.bookId}'">
      <span class="qotd-mark">"</span>
      <div class="qotd-label">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A227" stroke-width="2"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"/></svg>
        Trích dẫn hôm nay
      </div>
      <p class="qotd-content">${escapeHTML(q.content)}</p>
      <div class="qotd-foot">
        <span><strong>${escapeHTML(q.bookTitle)}</strong> — ${escapeHTML(q.bookAuthor)}</span>
        ${q.page ? `<span>Trang ${escapeHTML(q.page)}</span>` : ""}
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", renderQOTD);