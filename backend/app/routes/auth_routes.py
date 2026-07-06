from fastapi import APIRouter, Depends, HTTPException, status, Form
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.database import get_db
from app import models
from app import auth

router = APIRouter(prefix="/auth", tags=["Authentication"])


# ============================================================
# REGISTER
# ============================================================

@router.post("/register")
def register_user(
    username: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db)
):
    user_exists = db.query(models.User).filter(
        (models.User.username == username) |
        (models.User.email == email)
    ).first()

    if user_exists:
        raise HTTPException(
            status_code=400,
            detail="Username hoặc Email đã được sử dụng!"
        )

    # bcrypt giới hạn 72 bytes
    if len(password.encode("utf-8")) > 72:
        raise HTTPException(
            status_code=400,
            detail="Mật khẩu tối đa 72 bytes."
        )

    hashed_pwd = auth.hash_password(password)

    new_user = models.User(
        username=username,
        email=email,
        hashed_password=hashed_pwd
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
<<<<<<< HEAD

    return {
        "status": "Thành công",
        "message": f"Tài khoản '{username}' đã được khởi tạo thành công!"
    }


# ============================================================
# LOGIN
# ============================================================

=======
    
    return {"status": "Thành công", "message": f"Tài khoản '{username}' đã được khởi tạo thành công!"}
# 2. API ĐĂNG NHẬP
>>>>>>> 214eaa3c4cad450c33d21daa5ab7ff0b5825c194
@router.post("/login")
def login_user(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
<<<<<<< HEAD
    print("=" * 50)
    print("USERNAME =", repr(form_data.username))
    print("PASSWORD =", repr(form_data.password))
    print("PASSWORD LENGTH =", len(form_data.password.encode("utf-8")))
    print("=" * 50)

=======
>>>>>>> 214eaa3c4cad450c33d21daa5ab7ff0b5825c194
    user = db.query(models.User).filter(
        models.User.username == form_data.username
    ).first()

<<<<<<< HEAD
    if not user:
=======
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
>>>>>>> 214eaa3c4cad450c33d21daa5ab7ff0b5825c194
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Tài khoản không tồn tại!",
            headers={"WWW-Authenticate": "Bearer"},
        )

<<<<<<< HEAD
    try:
        password_ok = auth.verify_password(
            form_data.password[:72],
            user.hashed_password
        )
    except Exception as e:
        print("VERIFY ERROR =", str(e))
        raise HTTPException(
            status_code=500,
            detail=f"Lỗi verify password: {str(e)}"
        )

    if not password_ok:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Mật khẩu không chính xác!",
            headers={"WWW-Authenticate": "Bearer"},
        )

=======
>>>>>>> 214eaa3c4cad450c33d21daa5ab7ff0b5825c194
    access_token = auth.create_access_token(
        data={"sub": str(user.id)}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
<<<<<<< HEAD
    }
=======
    }
>>>>>>> 214eaa3c4cad450c33d21daa5ab7ff0b5825c194
