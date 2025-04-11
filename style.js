const chatMessages = document.getElementById("chatMessages");

async function sendMessage() {
    const input = document.getElementById("userInput");
    const userText = input.value.trim();
    if (!userText) return;

    appendMessage("user", userText);
    input.value = "";

    try {
        const response = await fetch("https://iguide-f04b608b-20f2-48b1-a7ef.ahumain.cranecloud.io/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: userText, maxlength :50}),
        });

        const data = await response.json();
        const botReply = data.response || "Sorry, I couldn't get that.";
        appendMessage("bot", botReply);
    } catch (error) {
        console.error("Error fetching from Crane endpoint:", error);
        appendMessage("bot", "Sorry, I'm having trouble reaching the server.");
    }
}

function appendMessage(sender, text) {
    const msg = document.createElement("div");
    msg.className = `chat-message ${sender}`;
    msg.innerText = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
