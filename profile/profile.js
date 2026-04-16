const user = JSON.parse(localStorage.getItem("user"))

if (!user) {
    window.location.href = "../login/login.html"
}

const userName = document.querySelector("#userName")
const userEmail = document.querySelector("#userEmail")
const userPhone = document.querySelector("#userPhone")
const userPassword = document.querySelector("#userPassword")
const moneyAmount = document.querySelector("#moneyAmount")
const sendMoneyBtn = document.querySelector("#sendMoney")
const userBalance = document.querySelector("#userBalance")

userName.textContent = "Username: " + user.username
userEmail.textContent = "Email: " + user.email
userPhone.textContent = "Telefon raqam: " + user.phone
userPassword.textContent = "Parol: " + user.password
userBalance.textContent = "Balans: " + user.balance

sendMoneyBtn.addEventListener("click", async () => {
    const amount = moneyAmount.value.trim()

    if (!amount) {
        alert("Summani kiriting!")
        return
    }

    try {
        const req = await fetch("https://omadli-son-backend-production.up.railway.app/api/v1/add-money", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user._id, amount: Number(amount) })
        })

        const res = await req.json()

        if (req.ok) {
            alert("Muvaffaqiyatli tushirildi!")
            moneyAmount.value = ""
        } else {
            alert(res.message || "Xatolik!")
        }
    } catch (error) {
        alert("Server bilan bog'lanib bo'lmadi!")
    }
})