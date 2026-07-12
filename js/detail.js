/* ---------------- CHI TIẾT SÁCH (trong thư viện) ---------------- */
const activeBookId = Number(new URLSearchParams(window.location.search).get("id"));

function renderDetail(){
  const book = findBook(activeBookId);
  const entry = findLibEntry(activeBookId);

  if (!book || !entry){
    document.getElementById("detail-root").innerHTML =
      `<div class="empty">Không tìm thấy sách này trong thư viện của bạn. <a href="library.html" style="color:var(--ink); font-weight:600;">Quay lại thư viện</a></div>`;
    return;
  }

  document.getElementById("detail-cover").innerHTML = coverHTML(book.title, book.genre, "md",book.cover,true);
  document.getElementById("detail-title").textContent = book.title;
  document.getElementById("detail-sub").textContent = `${book.author} · ${book.pages} trang`;

  document.getElementById("detail-status-choices").innerHTML = STATUS_LIST.map(s => `
    <button class="pill ${entry.status===s.key?'active':''}" onclick="setStatus('${s.key}')">${s.label}</button>
  `).join("");

  const progressEl = document.getElementById("detail-progress");
  if (entry.status === "dang_doc"){
    progressEl.innerHTML = `
      <label class="slider-label" id="page-label">Trang hiện tại: ${entry.currentPage}/${book.pages}</label>
      <input type="range" min="0" max="${book.pages}" value="${entry.currentPage}"
        oninput="onPageDrag(this.value)" onchange="onPageRelease(this.value)" />
    `;
  } else {
    progressEl.innerHTML = "";
  }

  document.getElementById("detail-stars").innerHTML = [1,2,3,4,5].map(i => `
    <svg class="star" width="16" height="16" viewBox="0 0 24 24"
      fill="${i<=entry.rating ? '#C9A227' : 'none'}" stroke="${i<=entry.rating ? '#C9A227' : '#B9AF98'}" stroke-width="2"
      onclick="setRating(${i})">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  `).join("");

  renderDetailQuotes();
}
function deleteCurrentBook(){
  if (!confirm("Xóa sách này khỏi thư viện? Mọi trích dẫn đã lưu sẽ bị xóa.")) return;
  state.library = state.library.filter(e => e.bookId !== activeBookId);
  saveState();
  window.location.href = "library.html";
}
function setStatus(status){
  findLibEntry(activeBookId).status = status;
  saveState();
  renderDetail();
}
// Cập nhật số trang NGAY khi đang kéo (chỉ trong bộ nhớ, chưa lưu)
function onPageDrag(val){
  const entry = findLibEntry(activeBookId);
  const book = findBook(activeBookId);
  entry.currentPage = Number(val);
  const label = document.getElementById("page-label");
  if (label) label.textContent = `Trang hiện tại: ${val}/${book.pages}`;
}
// Khi thả tay ra: lưu dữ liệu thật
function onPageRelease(val){
  findLibEntry(activeBookId).currentPage = Number(val);
  saveState();
}
function setRating(v){
  findLibEntry(activeBookId).rating = v;
  saveState();
  renderDetail();
}

/* ---- Trích dẫn RIÊNG của cuốn sách này ---- */
function renderDetailQuotes(){
  const entry = findLibEntry(activeBookId);
  const book = findBook(activeBookId);
  const el = document.getElementById("detail-quotes");
  if (entry.quotes.length === 0){
    el.innerHTML = `<div class="empty small">Chưa có trích dẫn nào cho cuốn sách này. Thêm câu văn bạn tâm đắc ở trên.</div>`;
    return;
  }
  el.innerHTML = `<div class="quotes-grid">` + entry.quotes.map(q => `
    <div class="quote-card">
      <span class="mark">"</span>
      <p>${escapeHTML(q.content)}</p>
      <div class="foot">
        <span class="page">${escapeHTML(q.author || book.author)}${q.page ? " · Trang " + escapeHTML(q.page) : ""}</span>
        <button class="del" onclick="deleteQuote(${q.id})">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </div>
    </div>
  `).join("") + `</div>`;
}

function addQuote(){
  const input = document.getElementById("quote-input");
  const authorInput = document.getElementById("quote-author-input");
  const pageInput = document.getElementById("quote-page-input");
  const content = input.value.trim();
  if (!content) return;

  const book = findBook(activeBookId);
  const entry = findLibEntry(activeBookId);
  const author = authorInput.value.trim() || book.author;

  entry.quotes.push({ id: Date.now(), content, page: pageInput.value.trim(), author });
  saveState();
  input.value = "";
  authorInput.value = "";
  pageInput.value = "";
  renderDetailQuotes();
}

function deleteQuote(qid){
  const entry = findLibEntry(activeBookId);
  entry.quotes = entry.quotes.filter(q => q.id !== qid);
  saveState();
  renderDetailQuotes();
}

document.addEventListener("DOMContentLoaded", renderDetail);
