let qrImage = document.getElementById("qrImage");
let qrBox = document.getElementById("qrBox");
let qrText = document.getElementById("qrText");
let timerText = document.getElementById("timer");
let message = document.getElementById("message");

let countdown;

function generateQR() {
    let text = qrText.value.trim();

    if (text === "") {
        alert("Please enter text or URL.");
        return;
    }

    clearInterval(countdown);

    qrImage.src =
        "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data="
        + encodeURIComponent(text);

    qrBox.style.display = "block";
    message.innerHTML = "";

    let timeLeft = 600; // 10 minutes = 600 seconds

    updateTimer(timeLeft);

    countdown = setInterval(() => {
        timeLeft--;
        updateTimer(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(countdown);
            qrImage.src = "";
            qrBox.style.display = "none";
            message.innerHTML = "QR Code Expired! Generate a new one.";
        }
    }, 1000);
}

function updateTimer(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = seconds % 60;

    timerText.innerHTML =
        `Valid for: ${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}