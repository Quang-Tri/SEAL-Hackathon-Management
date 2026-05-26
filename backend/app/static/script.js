document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. XỬ LÝ CHUYỂN ĐỔI FORM ĐĂNG NHẬP / ĐĂNG KÝ
    // ==========================================
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const showRegisterLink = document.getElementById("show-register");
    const showLoginLink = document.getElementById("show-login");
    const forgotPasswordLink = document.getElementById("forgot-password");

    if (showRegisterLink && loginForm && registerForm) {
        showRegisterLink.addEventListener("click", (e) => {
            e.preventDefault();
            loginForm.classList.add("hidden");
            registerForm.classList.remove("hidden");
        });
    }

    if (showLoginLink && loginForm && registerForm) {
        showLoginLink.addEventListener("click", (e) => {
            e.preventDefault();
            registerForm.classList.add("hidden");
            loginForm.classList.add("hidden"); // Đảm bảo ẩn sạch
            loginForm.classList.remove("hidden"); // Hiện lại form login
        });
    }

    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener("click", (e) => {
            e.preventDefault();
            alert("Hệ thống khôi phục mật khẩu tự động qua Email đang được bảo trì. Vui lòng liên hệ Admin Ban tổ chức!");
        });
    }

    // ==========================================
    // 2. HIỆU ỨNG MA TRẬN CHỮ RƠI (MATRIX RAIN)
    // ==========================================
    const canvas = document.getElementById("matrix");
    if (canvas) {
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const alphabet = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const fontSize = 16;
        const columns = canvas.width / fontSize;

        const rainDrops = [];
        for (let x = 0; x < columns; x++) {
            rainDrops[x] = 1;
        }

        const draw = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#0F0"; // Màu xanh neon ma trận
            ctx.font = fontSize + "px monospace";

            for (let i = 0; i < rainDrops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        };

        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        setInterval(draw, 30);
    }
});