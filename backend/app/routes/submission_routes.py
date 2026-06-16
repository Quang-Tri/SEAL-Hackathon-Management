from pydantic import BaseModel, HttpUrl
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Team, TeamMember, Submission
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
    current_user=Depends(get_current_user)
):

    # Tìm team của user

    team = db.query(Team).filter(
        Team.leader_id == current_user.id
    ).first()

    # Nếu không phải leader thì kiểm tra TeamMember

    if not team:

        membership = db.query(TeamMember).filter(
            TeamMember.user_id == current_user.id,
            TeamMember.is_approved == True
        ).first()

        if not membership:
            raise HTTPException(
                status_code=403,
                detail="Bạn không thuộc đội nào hoặc chưa được phê duyệt."
            )

        team = db.query(Team).filter(
            Team.id == membership.team_id
        ).first()

    # Tìm bài nộp hiện tại

    submission = db.query(Submission).filter(
        Submission.team_id == team.id
    ).first()

    # Chưa nộp bài

    if not submission:

        submission = Submission(
            team_id=team.id,
            submitted_by=current_user.id,
            repo_url=request.repo_url
        )

        db.add(submission)
        db.commit()
        db.refresh(submission)

        return {
            "message": "Nộp bài thành công",
            "team_id": team.id,
            "repo_url": submission.repo_url,
            "updated_at": submission.updated_at
        }

    # Đã nộp → cập nhật

    submission.repo_url = request.repo_url
    submission.submitted_by = current_user.id

    db.commit()
    db.refresh(submission)

    return {
        "message": "Cập nhật bài nộp thành công",
        "team_id": team.id,
        "repo_url": submission.repo_url,
        "updated_at": submission.updated_at
    }