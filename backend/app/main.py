from fastapi import FastAPI
from .database import engine, Base
from .routes import teams

Base.metadata.create_all(bind=engine)

app = FastAPI(title="SEAL Hackathon Management API")

app.include_router(teams.router)

@app.get("/")
def read_root():
    return {"message": "Chào mừng bạn đến với Hệ thống quản lý cuộc thi SEAL Hackathon!"}