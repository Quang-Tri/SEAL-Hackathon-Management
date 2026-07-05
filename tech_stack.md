# Mô tả công nghệ sử dụng — SEAL Hackathon Management System

## Backend

| Công nghệ | Phiên bản | Mục đích |
|-----------|-----------|---------|
| Python | 3.14 | Ngôn ngữ lập trình chính |
| FastAPI | 0.110.0 | Framework xây dựng REST API |
| Uvicorn | 0.28.0 | ASGI server chạy ứng dụng |
| SQLAlchemy | 2.0+ | ORM kết nối và thao tác database |
| SQLite | built-in | Cơ sở dữ liệu lưu trữ dữ liệu |
| Pydantic | 2.6.4 | Validation dữ liệu đầu vào |
| passlib[bcrypt] | 1.7.4 | Mã hóa mật khẩu |
| python-jose | 3.3.0 | Tạo và xác thực JWT Token |
| python-multipart | 0.0.9 | Xử lý form data |
| Jinja2 | 3.1.3 | Render file HTML template |
| pyngrok | 7.1.6 | Public server qua Ngrok |

## Frontend

| Công nghệ | Mục đích |
|-----------|---------|
| HTML5 | Cấu trúc giao diện web |
| CSS3 | Định dạng và giao diện |
| JavaScript (ES6) | Xử lý logic phía client, gọi API |

## Công cụ phát triển

| Công cụ | Mục đích |
|---------|---------|
| Git + GitHub | Quản lý source code, version control |
| Jira | Quản lý task, sprint theo Agile Scrum |
| VS Code | IDE lập trình chính |
| Postman | Test API |
| draw.io | Vẽ diagram (ERD, UC, Sequence) |
| Figma | Thiết kế UI/UX prototype |
| TeXstudio + MiKTeX | Viết báo cáo LaTeX |
| DB Browser for SQLite | Xem và quản lý database |
| Ngrok | Public server để test trên thiết bị khác |

## Kiến trúc hệ thống

```
Client (Browser)
      │
      │ HTTP Request
      ▼
FastAPI Server (Uvicorn)
      │
      ├── /auth/register, /auth/login  ← auth_routes.py
      ├── /teams/create, /join, /approve ← teams.py
      │
      ▼
SQLAlchemy ORM
      │
      ▼
SQLite Database (seal_hackathon.db)
```

## Cách chạy project

```bash
# 1. Cài thư viện
cd backend
pip install -r requirements.txt

# 2. Chạy server
python -m uvicorn app.main:app --reload

# 3. Truy cập
# Web:  http://localhost:8000/static/home.html
# Docs: http://localhost:8000/docs

# 4. Public qua Ngrok (tùy chọn)
ngrok http 8000
```
