from fastapi import FastAPI

app = FastAPI(title="SEAL Hackathon Management API")

@app.get("/")
def read_root():
    return {"message": "Chào mừng bạn đến với Hệ thống quản lý cuộc thi SEAL Hackathon!"}