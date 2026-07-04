/* ---------------- DỮ LIỆU KHO SÁCH ---------------- */
const GENRE_COLORS = {
  "Tiểu thuyết": "#7A3B2E",
  "Kỹ năng sống": "#C9A227",
  "Trinh thám": "#22343A",
  "Khoa học": "#2E5945",
  "Lịch sử": "#5B4636",
  "Tâm lý": "#6B3F5A",
  "Triết học": "#A1A1A1",
};

const SAMPLE_BOOKS = [
  { id: 1, 
    title: "Nhà Giả Kim", 
    author: "Paulo Coelho", 
    genre: "Tiểu thuyết", 
    price: 79000, 
    pages: 227,
    cover: "assets/images/nhagiakim.jpg"},
  { id: 2, 
    title: "Đi Tìm Lẽ Sống", 
    author: "Viktor E Frankl", 
    genre: "Tâm lý", 
    price: 78000, 
    pages: 224,
    cover: "assets/images/ditimlesong.webp",},
  { id: 3, 
    title: "Bố Già", 
    author: "Mario Puzo", 
    genre: "Tiểu thuyết", 
    price: 150000, 
    pages: 480,
    cover: "assets/images/bogia.jpg"},
  { id: 4, 
    title: "Vũ Trụ Trong Vỏ Hạt Dẻ", 
    author: "Stephen Hawking", 
    genre: "Khoa học", 
    price: 95000, 
    pages: 216,
    cover:"assets/images/vutrutronghatde.webp "},
  { id: 5, 
    title: "Thép đã tôi thế đấy", 
    author: "Nikolai Alekseyevich Ostrovsky", 
    genre: "Tiểu thuyết", 
    price: 145000, 
    pages: 620,
    cover:"assets/images/thepdatoitheday.webp"},
  { id: 6, 
    title: "Tuổi Trẻ Đáng Giá Bao Nhiêu", 
    author: "Rosie Nguyễn", 
    genre: "Kỹ năng sống", 
    price: 68000, 
    pages: 254,
    cover:"assets/images/tuoitredanggiabaonhieu.jpg"},
  { id: 7, 
    title: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh", 
    author: "Nguyễn Nhật Ánh", 
    genre: "Tiểu thuyết", 
    price: 92000, 
    pages: 378,
    cover:"assets/images/toithayhoavangtrencoxanh.webp"},
  { id: 8, 
    title: "Suy tưởng", 
    author: "Marcus Aurelius Antoninus", 
    genre: "Triết học", 
    price: 150000, 
    pages: 296,
    cover:"assets/images/suytuong.webp"},
  { id: 9, 
    title: "Sapiens Lược Sử Loài Người", 
    author: "Yuval Noah Harari", 
    genre: "Lịch sử", 
    price: 159000, 
    pages: 512,
    cover:"assets/images/sapiens.webp"},
];

const STATUS_LIST = [
  { key: "muon_doc", label: "Muốn đọc" },
  { key: "dang_doc", label: "Đang đọc" },
  { key: "da_doc", label: "Đã đọc" },
];


function formatVND(n){ return n.toLocaleString("vi-VN") + "đ"; }
function findBook(id){ return SAMPLE_BOOKS.find(b => b.id === Number(id)); }

function coverHTML(title, genre, size, cover, isSubPage = false) {
  if (cover) {
    // Nếu là trang con (như trang library), tự động thêm ../ vào trước đường dẫn ảnh
    const finalCoverPath = isSubPage ? `../${cover}` : cover;

    return `<div class="cover ${size}">
      <img src="${finalCoverPath}" alt="${title}" class="cover-img" style="width: 100%; height: 100%; object-fit: cover; border-radius: inherit;" />
    </div>`;
  }

  // Khúc vẽ bằng CSS giữ nguyên...
  const color = GENRE_COLORS[genre] || "#3A3226";
  const initial = title.trim().charAt(0).toUpperCase();
  return `<div class="cover ${size}" style="background:linear-gradient(155deg, ${color} 0%, ${color}CC 100%);"><div class="initial">${initial}</div><div class="cover-title">${title}</div></div>`;
}

function escapeHTML(str){
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}

function showToast(msg){
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.style.display = "flex";
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => { t.style.display = "none"; }, 1800);
}
function getBookImages(book){
  if (book.images && book.images.length) return book.images;
  return book.cover ? [book.cover] : [];
}