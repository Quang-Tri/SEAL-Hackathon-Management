# CHƯƠNG 4: CHI TIẾT THIẾT KẾ KỸ THUẬT (DETAILED DESIGN)

## 4.1. Thiết kế API (API Design)
Hệ thống sử dụng kiến trúc RESTful API, trao đổi dữ liệu qua định dạng JSON.

### 4.1.1. Authentication & User Module
*   **POST /api/v1/auth/login** (Đăng nhập hệ thống)
    *   *Request Body:* 
        ```json
        {
          "email": "user@fpt.edu.vn",
          "password": "secure_password"
        }
        ```
    *   *Response (200 OK):* 
        ```json
        {
          "token": "JWT_TOKEN_STRING",
          "role": "judge"
        }
        ```

### 4.1.2. Submission Module (Dành cho Đội thi)
*   **POST /api/v1/submissions** (Nộp bài thi vòng hiện tại)
    *   *Request Body:*
        ```json
        {
          "teamId": 12,
          "roundId": 2,
          "githubUrl": "[https://github.com/Quang-Tri/](https://github.com/Quang-Tri/)...",
          "descriptionPdfUrl": "[https://storage.seal](https://storage.seal)...",
          "videoUrl": "[https://youtube.com/](https://youtube.com/)..."
        }
        ```
    *   *Response (201 Created):* 
        ```json
        {
          "submissionId": 101,
          "status": "Submitted",
          "submittedAt": "2026-07-12T21:00:00Z"
        }
        ```

### 4.1.3. Scoring Module (Dành cho Giám khảo)
*   **POST /api/v1/scoring/submit** (Chấm điểm bài thi chính thức)
    *   *Request Body:*
        ```json
        {
          "judgeId": 5,
          "submissionId": 101,
          "scores": [
            { "criteriaId": 1, "value": 80, "comment": "Good architecture" },
            { "criteriaId": 2, "value": 90, "comment": "Highly innovative" }
          ]
        }
        ```
    *   *Response (200 OK):* `{"status": "Success", "message": "Score recorded and Audit Log generated."}`

---

## 4.2. Biểu đồ tuần tự (Sequence Diagram)
*GitHub sẽ tự động render đoạn mã dưới đây thành một biểu đồ hình vẽ trực quan.*

```mermaid
sequenceDiagram
    autonumber
    actor Judge as Giám khảo (UI)
    participant BE as Backend Controller
    participant DB as Database
    participant Audit as AuditLog Service

    Judge->>BE: POST /api/v1/scoring/submit (Scores, SubmissionId)
    activate BE
    Note over BE: Check Calibration Done?<br/>Check Conflict of Interest?
    alt Không hợp lệ (Vi phạm rule)
        BE-->>Judge: 400 Bad Request / 403 Forbidden
    else Hợp lệ
        BE->>DB: INSERT/UPDATE scores into Score Table
        activate DB
        DB-->>BE: Save Success
        deactivate DB
        
        BE->>Audit: Trigger Log (Actor, Action, New_Value)
        activate Audit
        Audit-->>BE: Log Saved
        deactivate Audit
        
        BE-->>Judge: 200 OK (Success Message)
    end
    deactivate BE
