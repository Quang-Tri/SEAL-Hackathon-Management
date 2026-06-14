# TÀI LIỆU YÊU CẦU CHỨC NĂNG (FUNCTIONAL REQUIREMENT QUALITY - FRQ)
## HỆ THỐNG QUẢN LÝ CUỘC THI SEAL HACKATHON

---

## 1. Quản lý Đăng nhập & Phân quyền (Authentication & Authorization)
*   **FR-01.1: Đăng nhập hệ thống**
    *   *Mô tả:* Hệ thống cho phép Thí sinh và Ban giám khảo (BGK) đăng nhập bằng tài khoản được cấp trước hoặc qua tài khoản trường/tổ chức.
    *   *Tiêu chí kiểm thử:* Đăng nhập thành công điều hướng đúng về giao diện tương ứng (Dashboard thí sinh hoặc Màn hình chấm điểm). Nhập sai mật khẩu hiển thị thông báo lỗi "Tài khoản hoặc mật khẩu không chính xác".
*   **FR-01.2: Phân quyền người dùng**
    *   *Mô tả:* Hệ thống phải phân định rõ ràng quyền truy cập giữa các vai trò.
    *   *Tiêu chí kiểm thử:* Thí sinh không thể truy cập vào URL của màn hình chấm điểm. BGK không thể thực hiện hành động nộp bài thay thí sinh.

---

## 2. Phân hệ Thí sinh (Candidate Dashboard)
*   **FR-02.1: Hiển thị thông tin đội thi**
    *   *Mô tả:* Hệ thống hiển thị tên đội, danh sách thành viên và trạng thái hoạt động của nhóm trên Dashboard.
    *   *Tiêu chí kiểm thử:* Kiểm tra màn hình Dashboard hiển thị chính xác tên đội và danh sách thành viên khớp với cơ sở dữ liệu.
*   **FR-02.2: Đồng hồ đếm ngược (Countdown Timer)**
    *   *Mô tả:* Hệ thống hiển thị thời gian làm bài còn lại theo thời gian thực (Realtime).
    *   *Tiêu chí kiểm thử:* Thời gian tự động giảm dần từng giây. Khi đồng hồ về `00:00:00`, nút "Nộp bài" phải tự động vô hiệu hóa (Disabled).
*   **FR-02.3: Xem và tải đề bài**
    *   *Mô tả:* Hệ thống cho phép thí sinh xem tóm tắt chủ đề và bấm nút tải file đề bài chi tiết (định dạng PDF).
    *   *Tiêu chí kiểm thử:* Người dùng click vào nút "Tải đề bài", file `.pdf` được tải xuống máy cục bộ và mở đọc bình thường.
*   **FR-02.4: Nộp bài thi (Submission)**
    *   *Mô tả:* Thí sinh có thể nộp bài bằng cách kéo thả file nén (`.zip`, `.rar`) hoặc dán đường dẫn repository (GitHub/GitLab).
    *   *Tiêu chí kiểm thử:* Khi upload file hợp lệ và nhấn "Nộp bài", hệ thống hiển thị thông báo "Nộp bài thành công" và cập nhật trạng thái vào Lịch sử nộp bài.

---

## 3. Phân hệ Ban Giám Khảo (Jury / Grading Screen)
*   **FR-03.1: Hiển thị danh sách đội thi & Trạng thái**
    *   *Mô tả:* Hiển thị danh sách toàn bộ các đội thi kèm bộ lọc trạng thái: `Chưa nộp`, `Đã nộp - Chưa chấm`, `Đã chấm`.
    *   *Tiêu chí kiểm thử:* Khi chọn bộ lọc `Đã nộp - Chưa chấm`, danh sách chỉ hiển thị đúng các đội thỏa mãn điều kiện để BGK tiện theo dõi.
*   **FR-03.2: Xem chi tiết bài nộp**
    *   *Mô tả:* BGK có thể click vào một đội để xem liên kết GitHub, tải file source code hoặc file tài liệu đính kèm của đội đó.
    *   *Tiêu chí kiểm thử:* Các đường link mã nguồn mở ra tab mới chính xác, file đính kèm tải xuống thành công.
*   **FR-03.3: Chấm điểm theo tiêu chí (Grading Form)**
    *   *Mô tả:* Hệ thống cung cấp form nhập điểm số (thang điểm 0 - 100) cho 4 tiêu chí cốt lõi:
        1. Tính năng hệ thống (Trọng số 40%)
        2. UI/UX & Thiết kế (Trọng số 20%)
        3. Chất lượng mã nguồn / Kỹ thuật (Trọng số 20%)
        4. Kỹ năng thuyết trình (Trọng số 20%)
    *   *Tiêu chí kiểm thử:* Ô nhập điểm chỉ nhận giá trị số từ 0 đến 100. Hệ thống tự động tính toán Điểm tổng kết theo công thức trọng số ngay khi BGK nhập điểm thành phần.
*   **FR-03.4: Nhập nhận xét & Lưu kết quả**
    *   *Mô tả:* BGK có thể gõ nhận xét chi tiết vào ô văn bản, chọn "Lưu tạm" để chỉnh sửa sau hoặc chọn "Hoàn tất chấm điểm" để khóa điểm.
    *   *Tiêu chí kiểm thử:* Sau khi bấm "Hoàn tất chấm điểm", điểm số của đội đó được ghi nhận vào hệ thống và trạng thái chuyển sang màu xanh lá (`Đã chấm`).

---

## 4. Phân hệ Kết quả & Bảng xếp hạng (Leaderboard)
*   **FR-04.1: Vinh danh Top 3**
    *   *Mô tả:* Hệ thống tự động lọc ra 3 đội có tổng điểm cao nhất để hiển thị trực quan trên bục vinh quang (Hạng 1, Hạng 2, Hạng 3) ở đầu trang.
    *   *Tiêu chí kiểm thử:* Đội có điểm cao nhất bắt buộc phải nằm ở bục Hạng 1 (ở giữa).
*   **FR-04.2: Bảng điểm chi tiết toàn đoàn**
    *   *Mô tả:* Hiển thị danh sách tất cả các đội thi dưới dạng bảng dữ liệu, tự động sắp xếp theo thứ tự Tổng điểm giảm dần.
    *   *Tiêu chí kiểm thử:* Khi có một đội được BGK cập nhật điểm mới, Bảng xếp hạng phải tự động tính toán lại vị trí (Rank) của đội đó.
*   **FR-04.3: Tìm kiếm đội thi**
    *   *Mô tả:* Cung cấp thanh tìm kiếm nhanh theo Tên đội thi trên bảng xếp hạng.
    *   *Tiêu chí kiểm thử:* Gõ từ khóa "Nhóm 4", bảng dữ liệu ngay lập tức bộ lọc chỉ hiển thị dòng dữ liệu của Nhóm 4.