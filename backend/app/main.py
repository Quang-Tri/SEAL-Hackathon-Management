from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from .database import engine, Base
from .routes import teams
from .routes import auth_routes
from .routes import submission_routes

# Khởi tạo database tự động
Base.metadata.create_all(bind=engine)

app = FastAPI(title="SEAL Hackathon Management API")

# Cấu hình mount thư mục static
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# Nhúng các tuyến đường API
app.include_router(teams.router)
app.include_router(auth_routes.router)
app.include_router(submission_routes.router)

@app.get("/")
def read_root():
    return {"message": "Chào mừng bạn đến với Hệ thống quản lý cuộc thi SEAL Hackathon!"}