Thư mục này dùng để chứa ảnh bìa sách thật (nếu sau này bạn muốn thay
ảnh bìa vẽ bằng CSS/JS trong js/data.js bằng ảnh chụp bìa sách thật).

Cách dùng:
1. Đặt file ảnh vào đây, ví dụ: assets/images/dac-nhan-tam.jpg
2. Trong js/data.js, thêm trường "cover" cho sách tương ứng, ví dụ:
   { id: 2, title: "Đắc Nhân Tâm", ..., cover: "assets/images/dac-nhan-tam.jpg" }
3. Cập nhật hàm coverHTML() trong js/data.js để dùng <img src="..."> khi
   sách có trường "cover", thay vì vẽ bìa bằng màu.
