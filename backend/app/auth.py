from datetime import datetime, timedelta
from typing import Optional
import bcrypt  # Đã chuyển sang dùng trực tiếp thư viện bcrypt để sửa lỗi xung đột hệ thống
from jose import JWTError, jwt

# Cấu hình JWT Token 
SECRET_KEY = "SEAL_HACKATHON_SUPER_SECRET_KEY_DONT_TELL_ANYONE"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# ============================================================
# CÁC HÀM MÃ HÓA MẬT KHẨU (Đã sửa lỗi)
# ============================================================

def hash_password(password: str) -> str:
    # Chuyển chuỗi mật khẩu sang dạng bytes và băm bảo mật bằng bcrypt thuần
    pwd_bytes = str(password)[:72].encode('utf-8')
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(pwd_bytes, salt).decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    # So sánh mật khẩu text thô với chuỗi mật khẩu đã hash trong cơ sở dữ liệu
    try:
        return bcrypt.checkpw(
            str(plain_password)[:72].encode('utf-8'),
            str(hashed_password).encode('utf-8')
        )
    except Exception:
        return False

# ============================================================
# CÁC HÀM QUẢN LÝ JWT TOKEN VÀ XÁC THỰC
# ============================================================

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from .database import get_db
from .models import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Không thể xác thực thông tin đăng nhập.",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.id == int(user_id)).first()
    if user is None:
        raise credentials_exception
    return user