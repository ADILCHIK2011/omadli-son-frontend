let usernameInput = document.querySelector("#usernameInput")
let emailInput = document.querySelector("#emailInput")
let phoneInput = document.querySelector("#phoneInput")
let passwordInput = document.querySelector("#passwordInput")
let registerBtn = document.querySelector("#registerBtn")

registerBtn.addEventListener("click", async () => {
    try {
        const req = await fetch("https://omadli-son-backend-production.up.railway.app/api/v1/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: usernameInput.value,
                password: passwordInput.value,
                email: emailInput.value,
                phone: phoneInput.value
            })
        });
        
        const res = await req.json();

        if (req.ok) {
            Toastify({
                text: "Muvaffaqiyatli ro'yxatdan o'tdingiz!",
                duration: 3000,
                gravity: "top", 
                position: "right", 
                style: { background: "linear-gradient(to right, #00b09b, #96c93d)" }
            }).showToast();
            localStorage.setItem("user", JSON.stringify(res.yangiUser))
            window.location.href = "../dashboard/dashboard.html"
            usernameInput.value = "";
            passwordInput.value = "";
            phoneInput.value = "";
            emailInput.value = "";
        } else {
            Toastify({
                text: res.message || "Xatolik yuz berdi!",
                duration: 3000,
                style: { background: "#ff5f6d" }
            }).showToast();
        }
    } catch (error) {
        Toastify({
            text: "Server bilan bog'lanib bo'lmadi!",
            duration: 3000,
            style: { background: "#cc3300" }
        }).showToast();
    }
});