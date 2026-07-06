function updateUIBasedOnUserRole(user) {
    if (user.hasTeam) {
        document.getElementById('form-tao-doi').style.display = 'none';
    } else {
        document.getElementById('form-tao-doi').style.display = 'block';
    }

    if (user.role !== 'Leader') {
        document.getElementById('danh-sach-cho-duyet').style.display = 'none';
    } else {
        document.getElementById('danh-sach-cho-duyet').style.display = 'block';
    }
}

const BASE_URL = "https://api.seal-hackathon.example.com";

document.getElementById('btn-tao-doi').addEventListener('click', async (e) => {
    e.preventDefault();
    const teamName = document.getElementById('input-ten-doi').value;

    try {
        const response = await fetch(`${BASE_URL}/teams/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: teamName })
        });
        const data = await response.json();
        if (response.ok) alert('Tạo đội thành công!');
    } catch (error) {
        console.error('Lỗi tạo đội:', error);
    }
});

document.getElementById('btn-tham-gia').addEventListener('click', async (e) => {
    e.preventDefault();
    const teamCode = document.getElementById('input-ma-doi').value;

    try {
        const response = await fetch(`${BASE_URL}/teams/join`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: teamCode })
        });
        if (response.ok) alert('Gửi yêu cầu tham gia thành công!');
    } catch (error) {
        console.error('Lỗi tham gia đội:', error);
    }
});

async function duyetThanhVien(memberId, action) {
    try {
        const response = await fetch(`${BASE_URL}/teams/approve-member`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ memberId: memberId, status: action })
        });
        if (response.ok) alert('Cập nhật trạng thái thành viên thành công!');
    } catch (error) {
        console.error('Lỗi duyệt thành viên:', error);
    }
}

document.getElementById('btn-nop-bai').addEventListener('click', async (e) => {
    e.preventDefault();
    const githubLink = document.getElementById('input-github').value;
    const videoLink = document.getElementById('input-video').value;

    try {
        const response = await fetch(`${BASE_URL}/submissions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ github: githubLink, video: videoLink })
        });
        if (response.ok) alert('Nộp bài thành công!');
    } catch (error) {
        console.error('Lỗi nộp bài:', error);
    }
});
