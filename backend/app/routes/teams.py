from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from ..database import get_db
from .. import models
from ..auth import get_current_user

router = APIRouter(prefix="/teams", tags=["Teams"])


# ============================================================
# SCHEMAS
# ============================================================

class TeamCreateRequest(BaseModel):
    team_name: str

class TeamJoinRequest(BaseModel):
    invite_code: str

class TeamApproveRequest(BaseModel):
    user_id: int
    action: str  # "approve" hoặc "reject"


# ============================================================
# API CŨ - GIỮ NGUYÊN
# ============================================================

@router.post("/register")
def register_team(name: str, leader_name: str, project_name: str = None, db: Session = Depends(get_db)):
    db_team = db.query(models.Team).filter(models.Team.team_name == name).first()
    if db_team:
        raise HTTPException(status_code=400, detail="Tên đã tồn tại")

    new_team = models.Team(team_name=name, leader_id=1, invite_code="")
    db.add(new_team)
    db.commit()
    db.refresh(new_team)
    return {"status": "Thành công", "team_id": new_team.id, "message": f"Đội {name} đã đăng ký thành công!"}

@router.get("/all")
def get_all_teams(db: Session = Depends(get_db)):
    teams = db.query(models.Team).all()
    return teams


# ============================================================
# BE-01: Tạo đội (POST /teams/create)
# ============================================================

@router.post("/create")
def create_team(
    request: TeamCreateRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    # Kiểm tra user đã là leader của đội nào chưa
    existing_leader = db.query(models.Team).filter(
        models.Team.leader_id == current_user.id
    ).first()
    if existing_leader:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bạn đã là trưởng đội của một nhóm. Không thể tạo đội mới."
        )

    # Kiểm tra user đã là thành viên được duyệt của đội nào chưa
    existing_member = db.query(models.TeamMember).filter(
        models.TeamMember.user_id == current_user.id,
        models.TeamMember.is_approved == True
    ).first()
    if existing_member:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bạn đã là thành viên của một đội. Không thể tạo đội mới."
        )

    # Tạo đội mới - invite_code tự sinh trong __init__ của model
    new_team = models.Team(
        team_name=request.team_name,
        leader_id=current_user.id,
        invite_code=""  # sẽ bị ghi đè bởi __init__
    )
    db.add(new_team)
    db.commit()
    db.refresh(new_team)

    return {
        "message": "Tạo đội thành công!",
        "team_id": new_team.id,
        "team_name": new_team.team_name,
        "invite_code": new_team.invite_code
    }


# ============================================================
# BE-02: Xin gia nhập đội (POST /teams/join)
# ============================================================

@router.post("/join")
def join_team(
    request: TeamJoinRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    # Tìm đội theo invite_code
    team = db.query(models.Team).filter(
        models.Team.invite_code == request.invite_code
    ).first()
    if not team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Mã mời không hợp lệ."
        )

    # Không cho leader tự join vào đội của mình
    if team.leader_id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bạn là trưởng đội này, không cần tham gia."
        )

    # Kiểm tra user đã gửi yêu cầu hoặc đã trong đội này chưa
    already_in = db.query(models.TeamMember).filter(
        models.TeamMember.team_id == team.id,
        models.TeamMember.user_id == current_user.id
    ).first()
    if already_in:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bạn đã gửi yêu cầu hoặc đã là thành viên của đội này."
        )

    # Kiểm tra giới hạn: approved + đang chờ >= 7 thì từ chối
    # approved_members_count đã +1 cho leader, nên total = approved_count + pending
    pending_count = sum(1 for m in team.members if not m.is_approved)
    total = team.approved_members_count + pending_count
    if total >= 7:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Đội đã đầy slot chờ (tối đa 7 người)."
        )

    # Tạo yêu cầu tham gia với is_approved = False
    new_member = models.TeamMember(
        team_id=team.id,
        user_id=current_user.id,
        is_approved=False
    )
    db.add(new_member)
    db.commit()

    return {
        "message": f"Đã gửi yêu cầu gia nhập đội '{team.team_name}'. Vui lòng chờ trưởng đội duyệt."
    }


# ============================================================
# BE-03: Phê duyệt thành viên (PUT /teams/approve)
# ============================================================

@router.put("/approve")
def approve_member(
    request: TeamApproveRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    # Tìm đội mà current_user là leader
    team = db.query(models.Team).filter(
        models.Team.leader_id == current_user.id
    ).first()
    if not team:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Bạn không phải trưởng đội. Không có quyền phê duyệt."
        )

    # Tìm dòng TeamMember cần xử lý
    member_record = db.query(models.TeamMember).filter(
        models.TeamMember.team_id == team.id,
        models.TeamMember.user_id == request.user_id,
        models.TeamMember.is_approved == False
    ).first()
    if not member_record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Không tìm thấy yêu cầu gia nhập này."
        )

    if request.action == "approve":
        # Kiểm tra lại đội đã đủ 7 thành viên chính thức chưa
        if team.approved_members_count >= 7:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Đội đã đủ 7 thành viên chính thức. Không thể duyệt thêm."
            )
        member_record.is_approved = True
        db.commit()
        return {"message": "Đã duyệt thành viên thành công."}

    elif request.action == "reject":
        db.delete(member_record)
        db.commit()
        return {"message": "Đã từ chối yêu cầu gia nhập."}

    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Hành động không hợp lệ. Chỉ chấp nhận 'approve' hoặc 'reject'."
        )
    
# ============================================================
# BE-04: Lấy thông tin đội của tài khoản hiện tại
# ============================================================

@router.get("/me")
def get_my_team(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    team = db.query(models.Team).filter(
        models.Team.leader_id == current_user.id
    ).first()

    role = "leader"

    if not team:
        membership = db.query(models.TeamMember).filter(
            models.TeamMember.user_id == current_user.id,
            models.TeamMember.is_approved == True
        ).first()

        if membership:
            team = db.query(models.Team).filter(
                models.Team.id == membership.team_id
            ).first()
            role = "member"

    if not team:
        return {
            "has_team": False
        }

    return {
        "has_team": True,
        "role": role,
        "team": {
            "id": team.id,
            "team_name": team.team_name,
            "invite_code": team.invite_code,
            "leader_id": team.leader_id,
            "approved_members": team.approved_members_count
        }
    }


# ============================================================
# BE-05: Danh sách thành viên chính thức
# ============================================================

@router.get("/members")
def get_members(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    team = db.query(models.Team).filter(
        models.Team.leader_id == current_user.id
    ).first()

    if not team:
        membership = db.query(models.TeamMember).filter(
            models.TeamMember.user_id == current_user.id,
            models.TeamMember.is_approved == True
        ).first()

        if not membership:
            raise HTTPException(404, "Bạn chưa thuộc đội nào.")

        team = db.query(models.Team).filter(
            models.Team.id == membership.team_id
        ).first()

    members = []

    leader = db.query(models.User).filter(
        models.User.id == team.leader_id
    ).first()

    members.append({
        "id": leader.id,
        "username": leader.username,
        "email": leader.email,
        "role": "Leader"
    })

    approved = db.query(models.TeamMember).filter(
        models.TeamMember.team_id == team.id,
        models.TeamMember.is_approved == True
    ).all()

    for m in approved:
        user = db.query(models.User).filter(
            models.User.id == m.user_id
        ).first()

        members.append({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": "Member"
        })

    return members


# ============================================================
# BE-06: Danh sách yêu cầu chờ duyệt
# ============================================================

@router.get("/pending")
def get_pending_members(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    team = db.query(models.Team).filter(
        models.Team.leader_id == current_user.id
    ).first()

    if not team:
        raise HTTPException(
            status_code=403,
            detail="Chỉ trưởng nhóm mới được xem."
        )

    pending = db.query(models.TeamMember).filter(
        models.TeamMember.team_id == team.id,
        models.TeamMember.is_approved == False
    ).all()

    result = []

    for member in pending:
        user = db.query(models.User).filter(
            models.User.id == member.user_id
        ).first()

        result.append({
            "id": user.id,
            "username": user.username,
            "email": user.email
        })

    return result
# ============================================================
# BE-07: Giải tán đội
# DELETE /teams/disband
# ============================================================

@router.delete("/disband")
def disband_team(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    team = db.query(models.Team).filter(
        models.Team.leader_id == current_user.id
    ).first()

    if not team:
        raise HTTPException(
            status_code=403,
            detail="Bạn không phải trưởng đội."
        )

    db.delete(team)
    db.commit()

    return {
        "message": "Đội đã được giải tán thành công."
    }
# ============================================================
# BE-08: Thành viên rời đội
# DELETE /teams/leave
# ============================================================

@router.delete("/leave")
def leave_team(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    membership = db.query(models.TeamMember).filter(
        models.TeamMember.user_id == current_user.id,
        models.TeamMember.is_approved == True
    ).first()

    if not membership:
        raise HTTPException(
            status_code=400,
            detail="Bạn chưa tham gia đội nào."
        )

    db.delete(membership)
    db.commit()

    return {
        "message": "Bạn đã rời khỏi đội thành công."
    }