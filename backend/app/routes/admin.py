from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import or_  # <--- Thêm or_ để tối ưu query
from pydantic import BaseModel, EmailStr  # <--- Dùng EmailStr để tự validate format email
from ..database import get_db
from .. import models
from ..auth import get_current_user, hash_password

# Định nghĩa hàm check quyền Admin độc lập
def get_current_admin(current_user: models.User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Bạn không có quyền thực hiện hành động này."
        )
    return current_user

# Áp dụng get_current_admin cho TOÀN BỘ các API trong file này
router = APIRouter(
    prefix="/admin", 
    tags=["Admin"], 
    dependencies=[Depends(get_current_admin)] 
)

class CreateJudgeRequest(BaseModel):
    username: str
    email: EmailStr  # Tự động bắt lỗi nếu nhập sai định dạng email
    password: str


# ============================================================
# API Tạo tài khoản Judge
# ============================================================
@router.post("/create-judge")
def create_judge(request: CreateJudgeRequest, db: Session = Depends(get_db)):
    # Gộp 2 câu query thành 1 để tăng tốc độ DB
    existing_user = db.query(models.User).filter(
        or_(models.User.username == request.username, models.User.email == request.email)
    ).first()
    
    if existing_user:
        # Check xem trùng cụ thể cái nào để báo lỗi cho chuẩn
        if existing_user.username == request.username:
            raise HTTPException(status_code=400, detail="Username đã được sử dụng.")
        if existing_user.email == request.email:
            raise HTTPException(status_code=400, detail="Email đã được sử dụng.")

    # Tạo tài khoản Judge
    new_judge = models.User(
        username=request.username,
        email=request.email,
        hashed_password=hash_password(request.password),
        role="judge"
    )
    db.add(new_judge)
    db.commit()
    db.refresh(new_judge)

    return {
        "message": "Tạo tài khoản Judge thành công!",
        "user_id": new_judge.id,
        "username": new_judge.username,
        "email": new_judge.email,
        "role": new_judge.role
    }


# ============================================================
# API Xem danh sách Judge
# ============================================================
@router.get("/judges")
def get_all_judges(db: Session = Depends(get_db)):
    # Không cần viết lại đoạn check role admin nữa, router đã lo
    judges = db.query(models.User).filter(models.User.role == "judge").all()

    return [
        {
            "user_id": j.id,
            "username": j.username,
            "email": j.email,
            "role": j.role
        }
        for j in judges
    ]