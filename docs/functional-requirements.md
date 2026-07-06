# TÀI LIỆU YÊU CẦU CHỨC NĂNG (FUNCTIONAL REQUIREMENT QUALITY - FRQ)

## HỆ THỐNG QUẢN LÝ CUỘC THI SEAL HACKATHON

---

## 1. Quản lý Tài khoản & Xác thực (Authentication & Authorization)

### FR-01.1: Đăng ký tài khoản

**Mô tả:** Hệ thống cho phép người dùng đăng ký tài khoản bằng email và mật khẩu. Khi đăng ký, người dùng phải khai báo là sinh viên FPT hoặc sinh viên ngoài trường.

**Tiêu chí kiểm thử:**

* Email không được trùng với tài khoản đã tồn tại.
* Thông tin đăng ký được lưu thành công.
* Tài khoản ở trạng thái "Chờ phê duyệt" cho đến khi được Ban tổ chức xác nhận.

### FR-01.2: Đăng nhập hệ thống

**Mô tả:** Người dùng có thể đăng nhập bằng email và mật khẩu sau khi tài khoản được phê duyệt.

**Tiêu chí kiểm thử:**

* Đăng nhập thành công sẽ chuyển đến giao diện tương ứng với vai trò người dùng.
* Hiển thị thông báo lỗi khi nhập sai thông tin đăng nhập.

### FR-01.3: Phân quyền người dùng

**Mô tả:** Hệ thống phân quyền theo các vai trò Team Member, Team Leader, Mentor, Judge và Event Coordinator.

**Tiêu chí kiểm thử:**

* Người dùng chỉ được truy cập các chức năng thuộc quyền hạn của mình.
* Không thể truy cập trực tiếp vào chức năng của vai trò khác.

---

## 2. Quản lý Đội thi (Team Management)

### FR-02.1: Tạo đội thi

**Mô tả:** Team Leader có thể tạo đội thi mới để tham gia sự kiện.

**Tiêu chí kiểm thử:**

* Tên đội được lưu thành công.
* Đội được tạo với Team Leader là người quản lý.

### FR-02.2: Tham gia đội thi

**Mô tả:** Sinh viên có thể tham gia đội thi thông qua lời mời hoặc mã tham gia.

**Tiêu chí kiểm thử:**

* Thành viên được thêm vào danh sách đội.
* Một đội có từ 3 đến 5 thành viên.

### FR-02.3: Đăng ký hạng mục thi

**Mô tả:** Team Leader đăng ký đội vào một hạng mục (Track) của sự kiện.

**Tiêu chí kiểm thử:**

* Mỗi đội chỉ được đăng ký một hạng mục trong cùng một sự kiện.
* Thông tin đăng ký được lưu thành công.

---

## 3. Quản lý Bài nộp (Submission Management)

### FR-03.1: Nộp bài theo vòng thi

**Mô tả:** Team Leader nộp bài cho từng vòng thi bằng cách cung cấp đường dẫn repository, demo và slide báo cáo.

**Tiêu chí kiểm thử:**

* Hệ thống lưu thành công thông tin bài nộp.
* Chỉ cho phép nộp bài trước thời hạn quy định.

### FR-03.2: Xem trạng thái bài nộp

**Mô tả:** Thành viên đội có thể theo dõi trạng thái bài nộp của đội mình.

**Tiêu chí kiểm thử:**

* Hiển thị đúng thời gian nộp bài.
* Hiển thị trạng thái bài nộp tương ứng.

---

## 4. Quản lý Chấm điểm (Evaluation Management)

### FR-04.1: Xem danh sách bài cần chấm

**Mô tả:** Judge có thể xem danh sách bài nộp được phân công.

**Tiêu chí kiểm thử:**

* Chỉ hiển thị các bài thuộc vòng thi mà Judge được phân công.

### FR-04.2: Chấm điểm theo tiêu chí

**Mô tả:** Judge thực hiện chấm điểm dựa trên các tiêu chí của sự kiện.

**Tiêu chí kiểm thử:**

* Điểm số được nhập theo từng tiêu chí.
* Hệ thống lưu riêng điểm của từng Judge.

### FR-04.3: Nhập nhận xét

**Mô tả:** Judge có thể nhập nhận xét cho bài thi.

**Tiêu chí kiểm thử:**

* Nhận xét được lưu cùng với kết quả chấm điểm.
* Judge có thể cập nhật nhận xét trước khi hoàn tất chấm điểm.

---

## 5. Quản lý Mentor

### FR-05.1: Theo dõi đội thi

**Mô tả:** Mentor có thể xem danh sách các đội thuộc hạng mục được phân công.

**Tiêu chí kiểm thử:**

* Hiển thị đúng danh sách đội trong hạng mục.

### FR-05.2: Gửi góp ý

**Mô tả:** Mentor có thể gửi nhận xét hoặc hướng dẫn cho đội thi.

**Tiêu chí kiểm thử:**

* Nội dung góp ý được lưu và hiển thị cho đội thi.

---

## 6. Quản lý Sự kiện (Event Management)

### FR-06.1: Tạo sự kiện Hackathon

**Mô tả:** Event Coordinator có thể tạo mới sự kiện hackathon.

**Tiêu chí kiểm thử:**

* Thông tin sự kiện được lưu thành công.
* Sự kiện xuất hiện trong danh sách quản lý.

### FR-06.2: Quản lý vòng thi

**Mô tả:** Event Coordinator cấu hình các vòng thi trong mỗi sự kiện.

**Tiêu chí kiểm thử:**

* Có thể tạo, cập nhật hoặc đóng vòng thi.
* Thiết lập được thời hạn nộp bài.

### FR-06.3: Phân công Judge và Mentor

**Mô tả:** Event Coordinator phân công Judge và Mentor cho từng hạng mục hoặc vòng thi.

**Tiêu chí kiểm thử:**

* Thông tin phân công được lưu thành công.
* Judge và Mentor chỉ nhìn thấy các phần được phân công.

---

## 7. Quản lý Kết quả & Xếp hạng

### FR-07.1: Tính điểm tổng

**Mô tả:** Hệ thống tự động tính điểm tổng dựa trên điểm của các Judge.

**Tiêu chí kiểm thử:**

* Điểm tổng được cập nhật khi có thay đổi điểm thành phần.

### FR-07.2: Xếp hạng đội thi

**Mô tả:** Hệ thống tự động sắp xếp thứ hạng các đội theo điểm số.

**Tiêu chí kiểm thử:**

* Đội có điểm cao hơn được xếp hạng cao hơn.
* Bảng xếp hạng được cập nhật tự động.

### FR-07.3: Xác định đội thăng vòng

**Mô tả:** Hệ thống xác định các đội đủ điều kiện vào vòng tiếp theo dựa trên quy tắc đã thiết lập.

**Tiêu chí kiểm thử:**

* Chỉ các đội đạt điều kiện mới được thăng vòng.
* Kết quả thăng vòng được hiển thị chính xác.

---

## 8. Báo cáo & Nhật ký hệ thống

### FR-08.1: Xuất báo cáo

**Mô tả:** Event Coordinator có thể xuất kết quả và bảng xếp hạng dưới dạng CSV hoặc Excel.

**Tiêu chí kiểm thử:**

* File xuất ra chứa đầy đủ dữ liệu.
* File có thể mở và sử dụng bình thường.

### FR-08.2: Audit Log

**Mô tả:** Hệ thống ghi nhận các hành động quan trọng như chấm điểm, sửa điểm hoặc loại đội.

**Tiêu chí kiểm thử:**

* Mỗi bản ghi chứa người thực hiện, thời gian và hành động tương ứng.
* Có thể tra cứu lịch sử hoạt động khi cần thiết.
