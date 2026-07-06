# Plan Project — SEAL Hackathon Management System

## Project Overview

SEAL Hackathon Management System is a web-based platform developed to support hackathon activities, including participant registration, team management, project submission, mentoring, judging and evaluation.

---

## Git Repository Management

* Repository: SEAL-Hackathon-Management
* Main Branch: `main`
* Development Branch: `develop`

### Feature Branch Naming

Format:

N4SHM-[issue-number]-[short-description]

Examples:

* N4SHM-23-documents
* N4SHM-15-authentication-api
* N4SHM-29-sequence-diagram

### Commit Message Format

Format:

N4SHM-[issue-number] [type]: [description]

Types:

* feat: add new feature
* fix: fix bug
* docs: documentation update
* chore: maintenance task

Examples:

* N4SHM-21 fix: login issue
* N4SHM-23 docs: add project planning documents
* N4SHM-29 docs: add sequence diagram

### Pull Request Workflow

1. Create feature branch from develop
2. Complete assigned task
3. Push branch to GitHub
4. Create Pull Request
5. Request review from team member
6. Merge into develop
7. Merge develop into main after sprint completion

---

## Jira Project Management

Project Name: Nhóm 4 - SEAL Hackathon Management

Project Key: N4SHM

Management Rules:

* All project tasks are managed through Jira.
* Tasks are assigned to team members.
* Progress is updated regularly.
* Each completed task must be moved to Done.
* Sprint planning and tracking are managed through Jira Boards.

Note:

* Sensitive configuration information must not be committed to GitHub.

---

## Technology Stack

### Backend

* Python
* FastAPI
* Uvicorn
* SQLite
* Pydantic
* Jinja2

### Authentication

* JWT Token
* Passlib (bcrypt)

### Frontend

* HTML
* CSS
* JavaScript

### Development Tools

* GitHub
* Jira
* Ngrok

---

## Repository Structure

```text
SEAL-Hackathon-Management/
├── backend/
│   ├── app/
│   │   ├── static/
│   │   ├── models/
│   │   ├── routes/
│   │   └── main.py
│   ├── requirements.txt
│   └── seal_hackathon.db
├── docs/
├── report-latex/
├── README.md
├── plan_project.md
├── ERD.md
└── check-list.md
```

---

## Development Plan

### Sprint 1

* Project Setup
* Requirement Analysis
* Use Case Diagram
* Context Diagram

### Sprint 2

* Database Design
* ERD
* Authentication Module

### Sprint 3

* Team Management Module
* Submission Module

### Sprint 4

* Evaluation Module
* Testing
* Documentation

---

## Running Project

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Application URL:

http://localhost:8000
