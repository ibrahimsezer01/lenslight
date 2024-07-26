const form = document.querySelector("form")
const sendMessage = document.querySelector("#sendMessage")

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const header = form.header.value
    const message = form.message.value

    console.log(header, message);

    try {
        const res = await fetch("/contact", {
            method: "POST",
            body: JSON.stringify({ header, message }),
            headers: {"Content-Type": "application/json"}
        })

        console.log(res);

        const data = await res.json()

        console.log(data);

        if (data.succeded) {
            sendMessage.textContent = "Your Message Received Succesfully"
            sendMessage.style.display = "block"

            setTimeout(() => {
                sendMessage.style.display = "none"
                form.header.value = ""
                form.message.value = ""
            }, 5000);
        }

    } catch (error) {
        console.log("Errorumuz " + error);
    }
})