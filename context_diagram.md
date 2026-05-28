graph TD
    classDef system fill:#2b7a78,stroke:#17252a,stroke-width:2px,color:#fff;
    classDef actor fill:#def2f1,stroke:#3aafa9,stroke-width:2px,color:#000;
    classDef external fill:#f7f9fa,stroke:#a8b2b7,stroke-width:1px,stroke-dasharray: 5 5,color:#555;

    SYS((HỆ THỐNG QUẢN LÝ<br>CUỘC THI SEAL HACKATHON)):::system

    TS[Thí sinh / Đội thi]:::actor
    BGK[Ban giám khảo]:::actor
    BTC[Ban tổ chức / Admin]:::actor
    EMAIL[Hệ thống Email bên ngoài]:::external

    TS -- "1. Thông tin đăng ký tài khoản, Đăng ký Team" --> SYS
    TS -- "2. Yêu cầu tham gia cuộc thi, Nộp bài dự thi" --> SYS
    SYS -- "3. Phản hồi kết quả Đăng ký/Nộp bài, Kết quả cuộc thi" --> SYS
    SYS -.-> |Hiển thị lịch trình, bảng xếp hạng| TS

    SYS -- "4. Danh sách bài thi gán cho GK, Tiêu chí chấm điểm" --> BGK
    BGK -- "5. Gửi điểm số, Nhận xét/Đánh giá bài thi" --> SYS

    BTC -- "6. Cấu hình cuộc thi (Đề bài, Thể lệ, Thời gian)" --> SYS
    BTC -- "7. Quản lý tài khoản (Duyệt Đội thi, Duyệt Giám khảo)" --> SYS
    SYS -- "8. Báo cáo thống kê, Danh sách đội & Kết quả chung cuộc" --> BTC

    SYS -- "9. Yêu cầu gửi mail (Mã OTP, Thông báo lịch, Kết quả)" --> EMAIL```mermaid
graph TD
    classDef system fill:#2b7a78,stroke:#17252a,stroke-width:2px,color:#fff;
    classDef actor fill:#def2f1,stroke:#3aafa9,stroke-width:2px,color:#000;
    classDef external fill:#f7f9fa,stroke:#a8b2b7,stroke-width:1px,stroke-dasharray: 5 5,color:#555;

    SYS((HỆ THỐNG QUẢN LÝ<br>CUỘC THI SEAL HACKATHON)):::system

    TS[Thí sinh / Đội thi]:::actor
    BGK[Ban giám khảo]:::actor
    BTC[Ban tổ chức / Admin]:::actor
    EMAIL[Hệ thống Email bên ngoài]:::external

    TS -- "1. Thông tin đăng ký tài khoản, Đăng ký Team" --> SYS
    TS -- "2. Yêu cầu tham gia cuộc thi, Nộp bài dự thi" --> SYS
    SYS -- "3. Phản hồi kết quả Đăng ký/Nộp bài, Kết quả cuộc thi" --> SYS
    SYS -.-> |Hiển thị lịch trình, bảng xếp hạng| TS

    SYS -- "4. Danh sách bài thi gán cho GK, Tiêu chí chấm điểm" --> BGK
    BGK -- "5. Gửi điểm số, Nhận xét/Đánh giá bài thi" --> SYS

    BTC -- "6. Cấu hình cuộc thi (Đề bài, Thể lệ, Thời gian)" --> SYS
    BTC -- "7. Quản lý tài khoản (Duyệt Đội thi, Duyệt Giám khảo)" --> SYS
    SYS -- "8. Báo cáo thống kê, Danh sách đội & Kết quả chung cuộc" --> BTC

    SYS -- "9. Yêu cầu gửi mail (Mã OTP, Thông báo lịch, Kết quả)" --> EMAIL
