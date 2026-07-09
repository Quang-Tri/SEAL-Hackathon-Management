import traceback

from fastapi import APIRouter, Depends, HTTPException, status, Form
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.database import get_db
from app import models
from app import auth

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


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
    try:
        print("\n" + "=" * 60)
        print("REGISTER REQUEST")
        print("Username :", username)
        print("Email    :", email)
        print("Password :", password)
        print("=" * 60)

        # Kiểm tra username/email đã tồn tại chưa
        user_exists = db.query(models.User).filter(
            (models.User.username == username) |
            (models.User.email == email)
        ).first()

        if user_exists:
            print("User hoặc Email đã tồn tại.")
            raise HTTPException(
                status_code=400,
                detail="Username hoặc Email đã được sử dụng!"
            )

        # bcrypt chỉ hỗ trợ tối đa 72 bytes
        if len(password.encode("utf-8")) > 72:
            raise HTTPException(
                status_code=400,
                detail="Mật khẩu tối đa 72 bytes."
            )

        print("Đang hash password...")

        hashed_pwd = auth.hash_password(password)

        print("Hash OK:")
        print(hashed_pwd)

        new_user = models.User(
            username=username,
            email=email,
            hashed_password=hashed_pwd
        )

        print("Đang lưu Database...")

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        print("Đăng ký thành công!")

        return {
            "status": "success",
            "message": "Đăng ký thành công.",
            "username": username
        }

    except HTTPException:
        raise

    except Exception as e:
        db.rollback()

        print("\n")
        print("=" * 80)
        print("REGISTER ERROR")
        traceback.print_exc()
        print("=" * 80)
        print("\n")

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# ============================================================
# LOGIN
# ============================================================

@router.post("/login")
def login_user(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    try:

        print("\n" + "=" * 60)
        print("LOGIN REQUEST")
        print("Username :", form_data.username)
        print("Password :", form_data.password)
        print("=" * 60)

        user = db.query(models.User).filter(
            models.User.username == form_data.username
        ).first()

        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Tài khoản không tồn tại!",
                headers={"WWW-Authenticate": "Bearer"},
            )

        password_ok = auth.verify_password(
            form_data.password,
            user.hashed_password
        )

        if not password_ok:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Mật khẩu không chính xác!",
                headers={"WWW-Authenticate": "Bearer"},
            )

        access_token = auth.create_access_token(
            data={"sub": str(user.id)}
        )

        print("LOGIN SUCCESS")

        return {
            "access_token": access_token,
            "token_type": "bearer"
        }

    except HTTPException:
        raise

    except Exception as e:
        print("\n")
        print("=" * 80)
        print("LOGIN ERROR")
        traceback.print_exc()
        print("=" * 80)
        print("\n")

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )