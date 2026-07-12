from pydantic import BaseModel, HttpUrl
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from app.database import get_db
from app.models import Team, TeamMember, Submission, User
from app.auth import get_current_user


router = APIRouter(
    prefix="/submissions",
    tags=["Submissions"]
)


class SubmissionRequest(BaseModel):
    repo_url: HttpUrl


@router.post("/submit")
def submit_project(
    request: SubmissionRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        # Tìm đội mà người dùng là trưởng đội
        team = db.query(Team).filter(
            Team.leader_id == current_user.id
        ).first()

        # Nếu không phải trưởng đội, kiểm tra tư cách thành viên
        if not team:
            membership = db.query(TeamMember).filter(
                TeamMember.user_id == current_user.id,
                TeamMember.is_approved.is_(True)
            ).first()

            if not membership:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Bạn chưa thuộc đội nào hoặc chưa được phê duyệt."
                )

            team = db.query(Team).filter(
                Team.id == membership.team_id
            ).first()

        if not team:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Không tìm thấy thông tin đội."
            )

        # Chuyển HttpUrl thành chuỗi trước khi lưu vào SQLite
        repo_url = str(request.repo_url)

        # Tìm bài nộp hiện tại của đội
        submission = db.query(Submission).filter(
            Submission.team_id == team.id
        ).first()

        # Chưa có bài nộp thì tạo mới
        if submission is None:
            submission = Submission(
                team_id=team.id,
                submitted_by=current_user.id,
                repo_url=repo_url
            )

            db.add(submission)
            db.commit()
            db.refresh(submission)

            return {
                "message": "Nộp bài thành công!",
                "team_id": team.id,
                "repo_url": submission.repo_url
            }

        # Đã có bài nộp thì cập nhật
        submission.repo_url = repo_url
        submission.submitted_by = current_user.id

        db.commit()
        db.refresh(submission)

        return {
            "message": "Cập nhật bài nộp thành công!",
            "team_id": team.id,
            "repo_url": submission.repo_url
        }

    except HTTPException:
        raise

    except SQLAlchemyError as error:
        db.rollback()
        print("SUBMISSION DATABASE ERROR:", repr(error))

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Không thể lưu bài nộp vào cơ sở dữ liệu."
        )

    except Exception as error:
        db.rollback()
        print("SUBMISSION ERROR:", repr(error))

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Lỗi hệ thống khi nộp bài: {str(error)}"
        )