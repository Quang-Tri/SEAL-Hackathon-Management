from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(
    prefix="/judge",
    tags=["Judge"]
)

# Khai báo cấu trúc dữ liệu để nhận từ Form chấm điểm (judge.html)
class GradeInput(BaseModel):
    submission_id: int
    score: float
    comment: Optional[str] = None

# API 1: Lấy danh sách các bài dự thi để hiển thị lên bảng bên trái
@router.get("/submissions")
async def get_submissions():
    # Đây là dữ liệu mẫu để giao diện của bạn hiển thị ngay lập tức.
    # Khi nào có Database, bạn chỉ cần thay đoạn này bằng câu lệnh truy vấn DB.
    return [
        {
            "id": 1,
            "team_id": 101,
            "description": "Hệ thống quản lý bãi xe thông minh sử dụng AI nhận diện biển số.",
            "github_url": "https://github.com/vi-du/bai-xe-thong-minh"
        },
        {
            "id": 2,
            "team_id": 102,
            "description": "Ứng dụng nhúng giám sát hành trình và kiểm soát lực kéo TCS cho ô tô.",
            "github_url": "https://github.com/vi-du/tcs-system"
        }
    ]

# API 2: Xử lý nhận điểm số và nhận xét từ Form chấm điểm bên phải
@router.post("/grade")
async def grade_submission(data: GradeInput):
    # Kiểm tra điều kiện điểm số hợp lệ
    if data.score < 0 or data.score > 10:
        raise HTTPException(
            status_code=400, 
            detail="Điểm số không hợp lệ! Thang điểm phải từ 0 đến 10."
        )
    
    # Bạn có thể thêm logic lưu điểm vào database tại đây...
    
    return {
        "status": "success",
        "message": f"Đã chấm thành công bài thi #{data.submission_id} với {data.score} điểm!"
    }