import secrets
from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    # Mối quan hệ bổ sung để kết nối với các bảng mới
    led_teams = relationship("Team", back_populates="leader", cascade="all, delete-orphan")
    team_memberships = relationship("TeamMember", back_populates="user", cascade="all, delete-orphan")


class Team(Base):
    __tablename__ = "teams"

    id = Column(Integer, primary_key=True, index=True)
    team_name = Column(String, unique=True, index=True, nullable=False)
    
    # ID của tài khoản tạo đội - mặc định là Trưởng nhóm
    leader_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    
    # Mã code ngẫu nhiên để thành viên khác nhập khi muốn vào nhóm
    invite_code = Column(String, unique=True, nullable=False)

    # Các mối quan hệ (Relationships)
    leader = relationship("User", back_populates="led_teams")
    members = relationship("TeamMember", back_populates="team", cascade="all, delete-orphan")
    submissions = relationship("Submission", back_populates="team", cascade="all, delete-orphan")

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # Tự động sinh mã code ngẫu nhiên gồm 6 ký tự viết hoa khi tạo đội
        if not self.invite_code:
            self.invite_code = secrets.token_hex(3).upper()

    @property
    def approved_members_count(self):
        # Hàm tiện ích giúp đếm nhanh số thành viên đã được duyệt chính thức trong nhóm
        # +1 ở đây chính là tính thêm cả tài khoản Đội trưởng (Leader)
        return sum(1 for member in self.members if member.is_approved) + 1


class TeamMember(Base):
    __tablename__ = "team_members"

    id = Column(Integer, primary_key=True, index=True)
    team_id = Column(Integer, ForeignKey("teams.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    
    # Trạng thái phê duyệt: False = Chờ duyệt, True = Đã là thành viên chính thức
    is_approved = Column(Boolean, default=False, nullable=False)

    team = relationship("Team", back_populates="members")
    user = relationship("User", back_populates="team_memberships")

    
class Submission(Base):
    __tablename__ = "submissions"

    id = Column(Integer, primary_key=True, index=True)
    
    # unique=True đảm bảo một đội chỉ có duy nhất 1 dòng bài nộp để phục vụ logic nộp đè
    team_id = Column(Integer, ForeignKey("teams.id", ondelete="CASCADE"), unique=True, nullable=False)
    submitted_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    repo_url = Column(String, nullable=False)
    
    # Tự động ghi nhận thời gian khi nộp mới hoặc nộp đè
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    team = relationship("Team", back_populates="submissions")