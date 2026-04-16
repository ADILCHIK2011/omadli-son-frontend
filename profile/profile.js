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

function updateUI(userData) {
    userName.textContent = userData.username
    userEmail.textContent = userData.email
    userPhone.textContent = userData.phone
    userPassword.textContent = "••••••••" 
    userBalance.textContent = userData.balance.toLocaleString('uz-UZ') + " so'm"
}

updateUI(user)

sendMoneyBtn.addEventListener("click", async () => {
    const amount = moneyAmount.value.trim()

    if (!amount || amount <= 0) {
        alert("Iltimos, to'g'ri summani kiriting!")
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
            
            user.balance = res.newBalance || (user.balance + Number(amount))
            
            localStorage.setItem("user", JSON.stringify(user))
            
            updateUI(user)
            
            moneyAmount.value = ""
            
            alert("Pul muvaffaqiyatli tushirildi! ✅")
        } else {
            alert(res.message || "Xatolik yuz berdi!")
        }
    } catch (error) {
        console.error(error)
        alert("Server bilan bog'lanib bo'lmadi! ❌")
    }
})