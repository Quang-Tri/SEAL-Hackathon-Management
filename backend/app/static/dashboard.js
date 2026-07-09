const token = localStorage.getItem("access_token");

if (!token) {
    window.location.href = "/static/login.html";
}

const authHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
};

async function apiFetch(url, options = {}) {
    const res = await fetch(url, {
        ...options,
        headers: {
            ...authHeaders,
            ...(options.headers || {})
        }
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        alert(data.detail || data.message || "Có lỗi xảy ra!");
        throw new Error(data.detail || "API error");
    }

    return data;
}

function setText(selector, value) {
    const el = document.querySelector(selector);
    if (el) el.textContent = value;
}

function getTeamCards() {
    return {
        createCard: document.querySelector(".team-grid .card:nth-child(1)"),
        joinCard: document.querySelector(".team-grid .card:nth-child(2)")
    };
}

function showNoTeamView() {
    setText(".user-name", "Chưa có đội");
    setText(".avatar", "?");

    const { createCard, joinCard } = getTeamCards();

    if (createCard) {
        createCard.style.display = "block";
        createCard.querySelector(".card-header h3").textContent = "Tạo đội mới";
        createCard.querySelector(".card-body").innerHTML = `
            <div class="form-group">
                <label for="team-name">Tên đội</label>
                <input type="text" id="team-name" placeholder="Nhập tên đội của bạn">
            </div>
            <button class="btn btn-primary" id="create-team-btn">Tạo đội</button>
        `;
    }

    if (joinCard) {
        joinCard.style.display = "block";
        joinCard.querySelector(".card-header h3").textContent = "Tham gia đội";
        joinCard.querySelector(".card-body").innerHTML = `
            <div class="form-group">
                <label for="join-code">Mã code tham gia</label>
                <input type="text" id="join-code" placeholder="Nhập mã code đội">
            </div>
            <button class="btn btn-secondary" id="join-team-btn">Tham gia đội</button>
        `;
    }

    const pendingCount = document.getElementById("pending-count");
    if (pendingCount) pendingCount.textContent = "0 chờ duyệt";

    const membersBody = document.getElementById("members-table-body");
    if (membersBody) membersBody.innerHTML = "";

    const pendingBody = document.getElementById("pending-table-body");
    if (pendingBody) pendingBody.innerHTML = "";

    bindButtons();
}

function showTeamView(teamName, inviteCode, role) {
    setText(".user-name", teamName);
    setText(".avatar", teamName.substring(0, 2).toUpperCase());

    const { createCard, joinCard } = getTeamCards();

    if (joinCard) {
        joinCard.style.display = "none";
    }

    if (createCard) {
        createCard.style.display = "block";

        createCard.querySelector(".card-header h3").textContent =
            role === "leader" ? "Thông tin đội" : "Đội của tôi";

        createCard.querySelector(".card-body").innerHTML = `
            <p><strong>Tên đội:</strong> ${teamName}</p>
            <p><strong>Mã mời:</strong> ${inviteCode || "Không có"}</p>
            <p><strong>Vai trò:</strong> ${role === "leader" ? "Trưởng đội" : "Thành viên"}</p>
            <br>
            ${
                role === "leader"
                    ? `<button class="btn btn-reject" id="disband-team-btn">Giải tán đội</button>`
                    : `<button class="btn btn-reject" id="leave-team-btn">Thoát đội</button>`
            }
        `;
    }

    bindButtons();
}

async function loadDashboard() {
    try {
        const me = await apiFetch("/teams/me");

        if (!me.has_team) {
            showNoTeamView();
            return;
        }

        showTeamView(me.team.team_name, me.team.invite_code, me.role);

        await loadMembers();

        if (me.role === "leader") {
            await loadPending();
        } else {
            const pendingCount = document.getElementById("pending-count");
            if (pendingCount) pendingCount.textContent = "0 chờ duyệt";

            const pendingBody = document.getElementById("pending-table-body");
            if (pendingBody) pendingBody.innerHTML = "";
        }

    } catch (err) {
        console.error(err);
    }
}

async function loadMembers() {
    const members = await apiFetch("/teams/members");

    const tbody = document.getElementById("members-table-body");
    if (!tbody) return;

    tbody.innerHTML = "";

    members.forEach((m, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${m.username}</td>
                <td>
                    <span class="badge ${m.role === "Leader" ? "badge-leader" : "badge-member"}">
                        ${m.role === "Leader" ? "Trưởng đội" : "Thành viên"}
                    </span>
                </td>
                <td>Hiện tại</td>
            </tr>
        `;
    });
}

async function loadPending() {
    const pending = await apiFetch("/teams/pending");

    const pendingCount = document.getElementById("pending-count");
    if (pendingCount) {
        pendingCount.textContent = `${pending.length} chờ duyệt`;
    }

    const tbody = document.getElementById("pending-table-body");
    if (!tbody) return;

    tbody.innerHTML = "";

    pending.forEach((m, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${m.username}</td>
                <td>Đang chờ</td>
                <td class="action-cell">
                    <button class="btn-sm btn-approve" onclick="approveMember(${m.id})">Đồng ý</button>
                    <button class="btn-sm btn-reject" onclick="rejectMember(${m.id})">Từ chối</button>
                </td>
            </tr>
        `;
    });
}

async function createTeam() {
    const input = document.getElementById("team-name");
    const teamName = input.value.trim();

    if (!teamName) {
        alert("Vui lòng nhập tên đội.");
        return;
    }

    const data = await apiFetch("/teams/create", {
        method: "POST",
        body: JSON.stringify({ team_name: teamName })
    });

    alert(data.message || "Tạo đội thành công!");
    await loadDashboard();
}

async function joinTeam() {
    const input = document.getElementById("join-code");
    const code = input.value.trim();

    if (!code) {
        alert("Vui lòng nhập mã đội.");
        return;
    }

    const data = await apiFetch("/teams/join", {
        method: "POST",
        body: JSON.stringify({ invite_code: code })
    });

    alert(data.message || "Đã gửi yêu cầu tham gia đội!");
    await loadDashboard();
}

async function approveMember(userId) {
    const data = await apiFetch("/teams/approve", {
        method: "PUT",
        body: JSON.stringify({
            user_id: userId,
            action: "approve"
        })
    });

    alert(data.message || "Đã duyệt thành viên!");
    await loadMembers();
    await loadPending();
}

async function rejectMember(userId) {
    const data = await apiFetch("/teams/approve", {
        method: "PUT",
        body: JSON.stringify({
            user_id: userId,
            action: "reject"
        })
    });

    alert(data.message || "Đã từ chối!");
    await loadPending();
}

async function disbandTeam() {
    if (!confirm("Bạn chắc chắn muốn giải tán đội? Hành động này không thể hoàn tác.")) {
        return;
    }

    const data = await apiFetch("/teams/disband", {
        method: "DELETE"
    });

    alert(data.message || "Đã giải tán đội.");
    await loadDashboard();
}

async function leaveTeam() {
    if (!confirm("Bạn chắc chắn muốn thoát khỏi đội?")) {
        return;
    }

    const data = await apiFetch("/teams/leave", {
        method: "DELETE"
    });

    alert(data.message || "Đã thoát đội.");
    await loadDashboard();
}

async function submitRepo() {
    const input = document.getElementById("github-link");
    const repoUrl = input.value.trim();

    if (!repoUrl) {
        alert("Vui lòng nhập link GitHub.");
        return;
    }

    const data = await apiFetch("/submissions/submit", {
        method: "POST",
        body: JSON.stringify({ repo_url: repoUrl })
    });

    alert(data.message || "Nộp bài thành công!");
}

function logout() {
    localStorage.removeItem("access_token");
    window.location.href = "/static/login.html";
}

function bindButtons() {
    const createBtn = document.getElementById("create-team-btn") || document.querySelector(".btn-primary");
    const joinBtn = document.getElementById("join-team-btn") || document.querySelector(".btn-secondary");
    const submitBtn = document.querySelector(".btn-submit");
    const disbandBtn = document.getElementById("disband-team-btn");
    const leaveBtn = document.getElementById("leave-team-btn");
    const logoutBtn = document.getElementById("logout-btn");
    

    if (createBtn) createBtn.onclick = createTeam;
    if (joinBtn) joinBtn.onclick = joinTeam;
    if (submitBtn) submitBtn.onclick = submitRepo;
    if (disbandBtn) disbandBtn.onclick = disbandTeam;
    if (leaveBtn) leaveBtn.onclick = leaveTeam;
    if (logoutBtn) logoutBtn.onclick = logout;
   
}

document.addEventListener("DOMContentLoaded", () => {
    bindButtons();
    loadDashboard();
});