from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models

router = APIRouter(prefix="/teams", tags=["Teams"])

@router.post("/register")
def register_team(name: str, leader_name: str, project_name: str = None, db: Session = Depends(get_db)):
    db_team = db.query(models.Team).filter(models.Team.name == name).first()
    if db_team:
        raise HTTPException(status_code=400, detail="Tên đã tồn tại")
    
    new_team = models.Team(name=name, leader_name=leader_name, project_name=project_name)
    db.add(new_team)
    db.commit()
    db.refresh(new_team)
    return {"status": "Thành công", "team_id": new_team.id, "message": f"Đội {name} đã đăng ký thành công!"}

@router.get("/all")
def get_all_teams(db: Session = Depends(get_db)):
    teams = db.query(models.Team).all()
    return teams