from fastapi import APIRouter, Depends, HTTPException, status, Form
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

# Chuyển đổi sang Import tuyệt đối để tránh lỗi sập Uvicorn
from app.database import get_db
from app import models
from app import auth 

router = APIRouter(prefix="/auth", tags=["Authentication"])

# 1. API ĐĂNG KÝ TÀI KHOẢN
@router.post("/register")
def register_user(
    username: str = Form(...), 
    email: str = Form(...), 
    password: str = Form(...), 
    db: Session = Depends(get_db)
):
    # Kiểm tra tài khoản hoặc email trùng lặp
    user_exists = db.query(models.User).filter(
        (models.User.username == username) | (models.User.email == email)
    ).first()
    
    if user_exists:
        raise HTTPException(status_code=400, detail="Username hoặc Email đã được sử dụng!")
    
    # Ép chuỗi mật khẩu thô để loại bỏ xung đột UTF-8 của bcrypt trên Windows
    safe_password = str(password)
    hashed_pwd = auth.hash_password(safe_password)
    
    # Lưu người dùng mới vào DB
    new_user = models.User(username=username, email=email, hashed_password=hashed_pwd)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {"status": "Thành công", "message": f"Tài khoản '{username}' đã được khởi tạo thành công!"}

# 2. API ĐĂNG NHẬP
@router.post("/login")
def login_user(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == form_data.username).first()
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Tài khoản hoặc mật khẩu không chính xác!",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = auth.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}