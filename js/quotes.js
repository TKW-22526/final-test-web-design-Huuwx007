/* ---------------- KHO TRÍCH DẪN TỔNG HỢP (mọi cuốn sách) ---------------- */
function renderQuotesView(){
  const search = (document.getElementById("quote-search").value || "").toLowerCase();
  const all = [];
  state.library.forEach(e => {
    const book = findBook(e.bookId);
    e.quotes.forEach(q => all.push({
      ...q,
      bookId: e.bookId,
      bookTitle: book.title,
      quoteAuthor: q.author || book.author
    }));
  });
  const filtered = all.filter(q =>
    !search || q.content.toLowerCase().includes(search) || q.bookTitle.toLowerCase().includes(search)
  );
  const el = document.getElementById("all-quotes-grid");
  if (filtered.length === 0){
    el.innerHTML = `<div class="empty">Bạn chưa lưu trích dẫn nào. Mở một cuốn sách trong thư viện để bắt đầu.</div>`;
    return;
  }
  el.innerHTML = filtered.map(q => `
    <div class="quote-source-card" onclick="window.location.href='book-detail.html?id=${q.bookId}'">
      <p>"${escapeHTML(q.content)}"</p>
      <div class="foot"><strong>${escapeHTML(q.bookTitle)}</strong> — ${escapeHTML(q.quoteAuthor)} ${q.page ? "· tr." + escapeHTML(q.page) : ""}</div>
    </div>
  `).join("");
}

document.addEventListener("DOMContentLoaded", renderQuotesView);
