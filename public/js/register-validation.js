const form = document.querySelector("form")
const emailError = document.querySelector("#emailAlert")
const passwordError = document.querySelector("#passwordAlert")
const usernameError = document.querySelector("#usernameAlert")

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    emailError.textContent = ""
    passwordError.textContent = ""
    usernameError.textContent = ""

    emailError.style.display = "none"
    passwordError.style.display = "none"
    usernameError.style.display = "none"

    const email = form.email.value
    const password = form.password.value
    const username = form.username.value

    try {
        const res = await fetch("register", {
            method: "POST",
            body: JSON.stringify({ email, password, username }),
            headers: {"Content-Type": "application/json"}
        })

        console.log(res);

        const data = await res.json()

        console.log(data);

        if (data) {
            
            if (data.username) {
                usernameError.textContent = data.username
                usernameError.style.display = "block"
            }
            
            if (data.email) {
                emailError.textContent = data.email
                emailError.style.display = "block"
            }

            if (data.password) {
                passwordError.textContent = data.password
                passwordError.style.display = "block"
            }

        }

        if (data.user) {
            location.assign("/")
        }

    } catch (error) {
        console.log("Errorumuz " + error);
    }
})