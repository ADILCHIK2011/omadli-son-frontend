const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {
  try {
    const req = await fetch("https://omadli-son-backend-production.up.railway.appp/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameInput.value,
        password: passwordInput.value,
      }),
    });

    const res = await req.json();
    console.log(res);
    if (!req.ok) {
        console.log(res.message)
    } else {
        window.location.href = "../dashboard/dashboard.html";
    }
  } catch (error) {
    console.log(error);
  }
});
