from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext

# Cấu hình mã hóa mật khẩu
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Cấu hình JWT Token (Thay đổi SECRET_KEY bảo mật của bạn tại đây)
SECRET_KEY = "SEAL_HACKATHON_SUPER_SECRET_KEY_DONT_TELL_ANYONE"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# Hàm băm mật khẩu thành chuỗi bảo mật
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# Hàm kiểm tra mật khẩu nhập vào với mật khẩu đã băm trong DB
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# Hàm tạo mã Token Đăng nhập (JWT Access Token)
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt