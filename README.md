# SEAL Hackathon - Quản lý cuộc thi

Ứng dụng web React với Tailwind CSS để thiết kế giao diện (UI/UX Mockup) cho hệ thống Quản lý cuộc thi SEAL Hackathon.

## 📱 3 Màn hình chính

### 1. Dashboard Thí Sinh (Candidate Dashboard)
- Thanh Sidebar hiện tên đội: "Team 4 - Phạm Minh Tâm"
- Thanh đếm ngược thời gian (Countdown Timer) chạy thời gian thực
- Khu vực tải đề bài với nút tải xuống PDF
- Khu vực nộp bài với Drag & Drop zone và nhập link GitHub
- Bảng lịch sử nộp bài với trạng thái (Thành công / Đang chấm)

### 2. Màn Hình Chấm Điểm (Jury Screen)
- Cột bên trái: Danh sách các đội thi với tag trạng thái màu
- Khu vực trung tâm: Chi tiết bài nộp của đội được chọn
- Form nhập điểm với 4 tiêu chí (Tính năng 40%, UI/UX 20%, Kỹ thuật 20%, Thuyết trình 20%)
- Điểm tổng kết tự động tính theo công thức
- Ô nhập nhận xét với nút Lưu tạm và Hoàn tất chấm điểm

### 3. Bảng Xếp Hạng Kết Quả (Leaderboard)
- Bục danh dự Top 3 đội cao điểm nhất (Hạng 1 ở giữa cao nhất)
- Bảng dữ liệu hiển thị tất cả các đội xếp từ cao xuống thấp
- Tìm kiếm nhanh tên đội thi

## 🚀 Cách chạy ứng dụng

### Cài đặt dependencies
```bash
npm install
```

### Chạy development server
```bash
npm run dev
```

### Build cho production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

## 🛠️ Công nghệ sử dụng

- **React 18** - Frontend framework
- **Vite** - Build tool và dev server
- **Tailwind CSS** - CSS framework cho giao diện hiện đại
- **Lucide React** - Icon library

## 📁 Cấu trúc dự án

```
seal-hackathon-ui/
├── src/
│   ├── components/
│   │   ├── CandidateDashboard.jsx    # Màn hình 1: Dashboard Thí Sinh
│   │   ├── JuryScreen.jsx            # Màn hình 2: Màn Hình Chấm Điểm
│   │   └── Leaderboard.jsx           # Màn hình 3: Bảng Xếp Hạng
│   ├── App.jsx                       # Component chính với navigation
│   ├── main.jsx                      # Entry point
│   └── index.css                     # Global styles với Tailwind
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── postcss.config.js
```

## 🎨 Tính năng UI/UX

- **Giao diện hiện đại**: Sử dụng gradient colors, shadows, rounded corners
- **Responsive**: Hỗ trợ cả desktop và mobile
- **Navigation**: Thanh menu điều hướng để chuyển đổi giữa các màn hình
- **Interactive**: Countdown timer, drag & drop, form validation, search
- **Color scheme**: Primary (indigo), Secondary (purple), Accent (cyan)

## 📝 Export sang Figma

Giao diện được thiết kế với cấu trúc sạch sẽ, sử dụng Tailwind CSS classes chuẩn để dễ dàng export sang Figma bằng plugin.
