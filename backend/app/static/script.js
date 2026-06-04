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
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Chặn không cho form tự load lại trang thô JSON

        // Thu thập dữ liệu từ các ô nhập liệu trong Form
        const formData = new FormData(loginForm);

        try {
            // Gửi yêu cầu POST ẩn đến API Backend của bạn
            const response = await fetch("/auth/login", {
                method: "POST",
                body: formData // Truyền trực tiếp formData để khớp OAuth2 Backend
            });

            if (response.ok) {
                const data = await response.json();
                
                // Lưu token đăng nhập vào trình duyệt để dùng cho các tính năng sau
                localStorage.setItem("access_token", data.access_token);
                
            
                
                // LỆNH THẦN THÁNH: Tự động nhảy thẳng sang trang chủ mượt mà
                window.location.href = "/static/home.html";
            } else {
                const errorData = await response.json();
                alert("Đăng nhập thất bại: " + (errorData.detail || "Sai tài khoản hoặc mật khẩu!"));
            }
        } catch (error) {
            console.error("Lỗi kết nối:", error);
            alert("Không thể kết nối đến máy chủ Backend!");
        }
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
document.getElementById("register-form-element").addEventListener("submit", async function(e) {
    e.preventDefault(); // Chặn không cho trình duyệt load lại trang thô

    const formData = new FormData(this);

    try {
        const response = await fetch("/auth/register", {
            method: "POST",
            body: formData
        });

       if (response.ok) {
            // Khi đăng ký thành công, lập tức tải lại trang login 
            // Trình duyệt sẽ tự động quay về màn hình Đăng nhập sạch sẽ ban đầu
            window.location.reload();
        } else {
            const errorData = await response.json();
            alert("Đăng ký thất bại: " + (errorData.detail || "Vui lòng kiểm tra lại thông tin!"));
        }
    } catch (error) {
        console.error("Lỗi kết nối hệ thống:", error);
    }
});

const loginBox = document.getElementById("login-box");
const registerBox = document.getElementById("register-form");

// 1. Khi đang ở Đăng nhập, ấn "Sign Up" -> Ẩn Login, Hiện Register
document.getElementById("show-register").addEventListener("click", function(e) {
    e.preventDefault(); // Chặn không cho trang nhảy link thô
    loginBox.classList.add("hidden");       // Thêm class ẩn khối Đăng nhập
    registerBox.classList.remove("hidden"); // Gỡ class ẩn để hiện khối Đăng ký
});

// 2. Khi đang ở Đăng ký, ấn "Login here" -> Ẩn Register, Hiện Login
document.getElementById("show-login").addEventListener("click", function(e) {
    e.preventDefault(); // Chặn không cho trang nhảy link thô
    registerBox.classList.add("hidden");    // Thêm class ẩn khối Đăng ký
    loginBox.classList.remove("hidden");    // Gỡ class ẩn để hiện khối Đăng nhập
});