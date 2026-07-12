/* ---------------- THƯ VIỆN CỦA TÔI ---------------- */
let libFilter = "tat_ca";
let pickerOpen = false;

function renderLibPills(){
  const items = [{key:"tat_ca", label:"Tất cả"}, ...STATUS_LIST];
  document.getElementById("lib-pills").innerHTML = items.map(s =>
    `<button class="pill ${libFilter===s.key?'active':''}" onclick="setLibFilter('${s.key}')">${s.label}</button>`
  ).join("");
}
function setLibFilter(k){ libFilter = k; renderLibraryList(); }
function deleteFromLibrary(bookId){
  if (!confirm("Xóa sách này khỏi thư viện? Mọi trích dẫn đã lưu của sách cũng sẽ bị xóa.")) return;
  state.library = state.library.filter(e => e.bookId !== Number(bookId));
  saveState();
  renderLibraryList();
  showToast("Đã xóa sách khỏi thư viện");
}

function renderLibraryList(){
  renderLibPills();
  const el = document.getElementById("library-list");
  const list = state.library.filter(e => libFilter === "tat_ca" || e.status === libFilter);
  if (list.length === 0){
    el.innerHTML = `<div class="empty">Chưa có sách nào ở trạng thái này. Mua sách hoặc thêm sách trực tiếp vào thư viện.</div>`;
    return;
  }
  el.innerHTML = list.map(e => {
    const book = findBook(e.bookId);
    const pct = book.pages ? Math.min(100, Math.round((e.currentPage / book.pages) * 100)) : 0;
    const statusInfo = STATUS_LIST.find(s => s.key === e.status);
    return `
    <div class="lib-row" onclick="window.location.href='book-detail.html?id=${e.bookId}'">
      ${coverHTML(book.title, book.genre, "sm",book.cover,true)}
      <div class="info">
        <div class="t">${book.title}</div>
        <div class="a">${book.author}</div>
        <span class="status-pill status-${e.status}">${statusInfo.label}</span>
        ${e.status === "dang_doc" ? `
          <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
          <div class="progress-label">Trang ${e.currentPage}/${book.pages} · ${pct}%</div>
        ` : ""}
      </div>
      ${e.quotes.length > 0 ? `<div class="quote-count">❝ ${e.quotes.length}</div>` : ""}
      <button class="remove" onclick="event.stopPropagation(); deleteFromLibrary(${e.bookId})" title="Xóa khỏi thư viện">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
    </div>
  `;
  }).join("");
}

/* ---- Thêm sách vào thư viện mà không cần mua ---- */
function togglePicker(){
  pickerOpen = !pickerOpen;
  document.getElementById("picker-panel").classList.toggle("hidden", !pickerOpen);
  document.getElementById("add-book-toggle").textContent = pickerOpen ? "Đóng danh sách" : "+ Thêm sách vào thư viện";
  if (pickerOpen) renderPicker();
}

function renderPicker(){
  const available = SAMPLE_BOOKS.filter(b => !findLibEntry(b.id));
  const el = document.getElementById("picker-grid");
  if (available.length === 0){
    el.innerHTML = `<div class="empty small">Tất cả sách trong kho đã có trong thư viện của bạn.</div>`;
    return;
  }
  el.innerHTML = available.map(b => `
    <div class="book-card">
      ${coverHTML(b.title, b.genre, "md",b.cover,true)}
      <div class="book-info">
        <span class="genre-tag">${b.genre}</span>
        <span class="book-title">${b.title}</span>
        <span class="book-author">${b.author}</span>
        <button class="btn btn-primary" onclick="addToLibraryDirect(${b.id})">+ Thêm vào thư viện</button>
      </div>
    </div>
  `).join("");
}

function addToLibraryDirect(bookId){
  if (!findLibEntry(bookId)){
    state.library.push({ bookId, status: "muon_doc", currentPage: 0, rating: 0, quotes: [] });
    saveState();
  }
  showToast("Đã thêm sách vào thư viện");
  renderPicker();
  renderLibraryList();
}

document.addEventListener("DOMContentLoaded", renderLibraryList);
