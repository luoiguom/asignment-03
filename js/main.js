// Smooth scroll khi click vào nav links // (Chú thích gốc)
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  // Bủa lưới querySelectorAll, tóm gọn mọi thẻ <a> có thuộc tính href chứa dấu '#' mở đầu, rải vòng lặp forEach đi qua từng sinh mệnh một
  anchor.addEventListener("click", function (e) {
    // Khắc thần chú lắng nghe sự kiện 'click' chuột lên đỉnh đầu từng thẻ <a> vừa gom được
    e.preventDefault(); // Lệnh tuyệt đối: Phế bỏ võ công dịch chuyển tức thời chớp giật mặc định của trình duyệt web (ngăn nhảy cái bụp xuống dòng)
    var target = document.querySelector(this.getAttribute("href")); // Rút linh hồn (giá trị href '#info', '#experience'...) của cái thẻ vừa bị bấm, dùng nó làm ngọn đèn chỉ điểm để mò tìm chính xác Khối thẻ <div> đang giữ cái id đó
    if (target) {
      // Nếu la bàn chỉ đúng mục tiêu (thẻ có id đó thật sự tồn tại)
      target.scrollIntoView({ behavior: "smooth" }); // Triệu hồi khinh công 'scrollIntoView', cấu hình tham số 'smooth' mượt mà, cuộn trục y màn hình lướt như mây trôi nước chảy tới đúng cổng nhà mục tiêu
    } // Đóng lệnh if
  }); // Đóng EventListener cho sự kiện click
}); // Đóng vòng lặp forEach duyệt thẻ <a>

// Highlight nav item active khi scroll // (Chú thích gốc)
const sections = document.querySelectorAll("section[id]"); // Quét radar toàn map, nhốt tất cả những thẻ <section> có gắn bảng tên 'id' vào trong mảng biến hằng số tên là 'sections'
window.addEventListener("scroll", function () {
  // Trải thiên la địa võng lên toàn bộ khung kính hiển thị 'window', bất kỳ hành động cuộn chuột nào chạm lưới cũng phải báo cáo
  var navLinks = document.querySelectorAll('.custom-nav-item a[href^="#"]'); // Gom một mảng mới: Chỉ chộp lấy các thẻ <a> là menu điều hướng trên thanh Navbar (phòng ngừa chộp nhầm thẻ link bậy bạ chỗ khác)

  let currentSection = ""; // Khởi tạo một vỏ bọc rỗng tuếch mang tên currentSection, lát nữa dùng để chứa cái id của phân vùng mà người dùng đang lướt tới
  sections.forEach(function (section) {
    // Tung vòng lặp, bay lượn qua đầu từng cái <section> đã nhốt lúc nãy
    var sectionTop = section.offsetTop - 100; // Đo đạc khoảng cách từ chóp đỉnh của trang web đến nóc nhà của section hiện tại. Trừ hao bớt 100 pixel để bù trừ cho độ dày của thanh Menu Navbar dính trên trần (chống che khuất tầm nhìn)
    if (window.scrollY >= sectionTop) {
      // Đo đạc cao độ hiển tại của cửa sổ (scrollY). Nếu cao độ cuộn đã lớn hơn hoặc bằng cao độ nóc nhà section (tức là màn hình đã trôi lọt vào trong lãnh địa của nó)...
      currentSection = section.getAttribute("id"); // Lập tức khắc tên (lấy id) của section đó nhét vào cái vỏ bọc rỗng 'currentSection' ban nãy
    } // Đóng lệnh so sánh cao độ
  }); // Đóng vòng lặp dò tìm khu vực

  navLinks.forEach(function (link) {
    // Xách mảng các thẻ link trên menu ra, soi từng thẻ một
    link.style.color = "#555"; // Bạt tai một cái, ép toàn bộ chữ trên menu quay về màu xám đen xỉn (#555) để dọn dẹp hiện trường
    if (link.getAttribute("href") === "#" + currentSection) {
      // Đối chiếu chéo: Nếu chữ trong href của link (ví dụ '#info') TRÙNG KHỚP với chữ '#'+cái ID khu vực mà ta vừa tìm được ở trên...
      link.style.color = "#1ba0e2"; // Ngòi nổ kích hoạt: Nhuộm sáng đường link đó thành màu xanh lam chói lọi rực rỡ, báo cho người dùng biết "Ngươi đang ở chỗ này!"
    } // Đóng điều kiện trùng khớp
  }); // Đóng vòng lặp tô màu link
}); // Đóng toàn bộ cơ chế lắng nghe sự kiện lăn chuột

// Ẩn thông tin cá nhân // (Chú thích gốc)
// Khai báo biến // (Chú thích gốc)
const emailInput = document.getElementById("email-input"); // Lấy cái móc câu móc thẳng vào cuống họng của ô nhập text, lôi thẻ input đó nhét vào biến 'emailInput'
const submitBtn = document.getElementById("submit-btn"); // Tương tự, móc bắt chiếc nút bấm màu xanh và tống nó vào biến 'submitBtn'
const emailError = document.getElementById("email-error"); // Tóm lấy cái thẻ đoạn văn <p> chuyên làm chân sai vặt in lỗi đỏ chót, giam vào 'emailError'
const emailForm = document.getElementById("email-form"); // Nhấc bổng nguyên một mảng kiến trúc chứa form nhập liệu đưa vào 'emailForm'
const personalInfo = document.getElementById("personal-info"); // Lôi cái bảng chứa toàn bộ thông tin ngày tháng năm sinh (đang bị ẩn) lưu vào 'personalInfo'

// Khai báo regex kiểm tra xem email đúng định dạng không // (Chú thích gốc)
const regex = // Khởi tạo một pháp trận kiểm duyệt tinh vi mang tên Regex
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Khuôn mẫu trận pháp: Bắt buộc chuỗi phải có cấu trúc [chuỗi ký tự chữ/số] + dấu @ + [chuỗi tên miền] + dấu chấm . + [đuôi domain như com, vn]. Khác một ly là chém!

// Gắn nút submit với hàm // (Chú thích gốc)
submitBtn.addEventListener("click", function () {
  // Trói buộc nút Submit, hễ có kẻ nào nhấp chuột trái vào là kích hoạt nội công ngay lập tức
  const emailValue = emailInput.value; // Rút cạn phần linh khí (giá trị đoạn text) mà người dùng vừa gõ vào ô input
  const isEmailValid = regex.test(emailValue); // Ném đoạn linh khí đó vào lò luyện (phương thức test) của trận pháp Regex. Nó sẽ nhả ra 1 viên đan dược: True (Email xịn) hoặc False (Email giả cầy)
  if (isEmailValid === true) {
    // Cầm viên đan dược lên soi, nếu là True (Email hợp lệ rành rành)
    emailError.textContent = ""; // Phát lệnh xóa sổ, tẩy trắng mọi dòng máu báo lỗi nhảm nhí trên thẻ in lỗi (nếu trước đó có báo sai)
    personalInfo.classList.remove("hide"); // Tung chiêu xé nát tấm rèm tàng hình mang class 'hide' đang bao phủ khối thông tin cá nhân, ép nó phải lù lù hiện ra ánh sáng
    emailForm.classList.add("hide"); // Tiện tay vớ lấy tấm rèm 'hide' đó quăng ụp lên đầu nguyên cái khu vực form nhập email, giấu biến nó đi khỏi thế gian để đỡ chật chỗ
  } else {
    // Còn nếu soi ra False (Kẻ dùng đang lươn lẹo gõ tào lao)
    emailError.textContent = "Vui lòng nhập đúng định dạng email"; // Giáng một chưởng lên màn hình: nhét thẳng câu mắng mỏ "Vui lòng nhập đúng định dạng..." vào trong lòng của cái thẻ báo lỗi
  } // Đóng ngã rẽ đúng/sai của hàm IF
}); // Đóng cửa hàm xử lý click nút Submit

// 1. khai báo biến tất cả cái nút view more // (Chú thích gốc)
const viewMoreBtns = document.querySelectorAll(".view-more-btn"); // Lại đem bảo bối querySelectorAll ra quét, hốt trọn ổ mọi chiếc nút bấm mang class 'view-more-btn' đang rải rác trên bản đồ vào lưới

// 2. Dùng vòng lặp forEach để căn dặn từng cái nút một // (Chú thích gốc)
viewMoreBtns.forEach(function (btn) {
  // Triệu hồi vòng lặp forEach, xách tai từng cái nút bấm trong mảng ra mà dạy dỗ
  // Gắn cảm biến click cho nút // (Chú thích gốc)
  btn.addEventListener("click", function () {
    // Cấy sinh mệnh (Event Click) vào từng cái nút một, đụng vào là giật
    // BÍ KÍP DOM TRAVERSE (LEO TRÈO) // (Chú thích gốc)
    // - this: chính là cái nút đang bị click // (Chú thích gốc)
    // - closest('.cv-box'): Lệnh này bảo cái nút "Hãy leo ngược lên trên, tìm cái thẻ nào bọc ngoài cùng có class là cv-box" // (Chú thích gốc)
    const parentBox = this.closest(".cv-box"); // Dùng bí kíp 'closest' trên bản thân cái nút 'this', leo trèo ngược lên cây phả hệ tìm đúng vị Tổ tông gần nhất sở hữu danh hiệu (class) là '.cv-box'. Bắt lấy nó bỏ vào túi 'parentBox'

    // Sau khi tìm được cái rương (parentBox), bắt đầu nhìn xuống dưới tìm đúng cái phần nội dung bị giấu (.job-content) // (Chú thích gốc)
    const jobContent = parentBox.querySelector(".job-content"); // Đứng từ trên nóc của Tổ tông 'parentBox', chĩa mũi nhọn querySelector cắm thẳng xuống đất, bới tìm chính xác thẻ HTML nội dung mang class '.job-content' đang lẩn trốn bên trong lãnh địa đó

    // 3. Mở/Đóng rương // (Chú thích gốc)
    // Hàm toggle() rất thông minh: Nếu thẻ đang có class 'hide' thì nó xóa đi (hiện ra), nếu chưa có thì nó thêm vào (giấu đi). // (Chú thích gốc)
    jobContent.classList.toggle("hide"); // Niệm chú pháp bảo hai chiều 'toggle': Class 'hide' ở thẻ nội dung nếu đang đắp thì sẽ lột ra (hiển thị mượt mà), còn nếu đang cởi trần thì sẽ đắp rèm lên (bay màu tàng hình)!

    // 4. Đổi chữ trên công tắc // (Chú thích gốc)
    // Kiểm tra xem phần nội dung đang bị giấu (chứa class hide) hay đang hiện // (Chú thích gốc)
    if (jobContent.classList.contains("hide")) {
      // Dùng nhãn thuật 'contains' để check xem trên mình cái thẻ nội dung hiện tại CÓ ĐANG dính class 'hide' hay không
      this.textContent = "View More"; // Nếu đang dính (tức là đã bị giấu kín), ép cái chữ hiển thị trên bề mặt cục nút bấm 'this' trở lại thành nguyên trạng "View More" để câu khách bấm tiếp
    } else {
      // Còn nếu check ra là KHÔNG dính 'hide' (tức là phần thân chữ đang bung bét phơi bày ra hết rồi)
      this.textContent = "View Less"; // Thì dán cái nhãn "View Less" đè lên nút bấm để khuyên người dùng nên thu gọn rương lại cho bớt bừa bộn
    } // Đóng vòng IF ELSE kiểm tra trạng thái áo tàng hình
  }); // Đóng nghi thức hiến tế sự kiện click cho từng cái nút
}); // Đóng đại luân hồi forEach duyệt nút bấm
