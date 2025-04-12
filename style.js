const chatMessages = document.getElementById("chatMessages");

async function sendMessage() {
    const input = document.getElementById("userInput");
    const userText = input.value.trim();
    if (!userText) return;

    appendMessage("user", userText);
    input.value = "";

    try {
        const response = await fetch("https://yakubo-ae60b024-cbc3-48df-a3fc.ahumain.cranecloud.io/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: userText, max_length: 50 }), // fixed here
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
