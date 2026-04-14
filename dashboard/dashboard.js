const user = JSON.parse(localStorage.getItem("user"))

if (!user) {
    window.location.href = "../login/login.html"
}

const getNumberBtn = document.querySelector("#getNumberBtn")
const randomNumberDiv = document.querySelector("#randomNumber")

getNumberBtn.addEventListener("click", async () => {
    try {
        const req = await fetch("https://omadli-son-backend-production.up.railway.app/api/v1/random-raqam", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: user._id })
        })

        const res = await req.json()

        if (req.ok) {
            randomNumberDiv.textContent = res.number
        } else {
            alert(res.message || "Xatolik!")
        }
    } catch (error) {
        alert("Server bilan bog'lanib bo'lmadi!")
    }
})