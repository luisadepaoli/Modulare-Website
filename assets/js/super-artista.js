const canvas = document.getElementById("artCanvas");
const ctx = canvas.getContext("2d");
const finishBtn = document.getElementById("finishBtn");
const resultZone = document.getElementById("secret-word-zone");

let pintando = false;
let haPintado = false; // Neue Variable: Hat das Kind schon gemalt?

// Am Anfang ist der Button gesperrt
finishBtn.disabled = true;

canvas.addEventListener("mousedown", () => pintando = true);
canvas.addEventListener("mouseup", () => {
    pintando = false;
    ctx.beginPath();
});
canvas.addEventListener("mousemove", dibujar);

function dibujar(e) {
    if (!pintando) return;

    // Sobald gemalt wird, aktivieren wir den Button
    if (!haPintado) {
        haPintado = true;
        finishBtn.disabled = false;
    }

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = document.getElementById("brushSize").value;
    ctx.lineCap = "round";
    ctx.strokeStyle = document.getElementById("colorPicker").value;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Beim Löschen setzen wir alles zurück
document.getElementById("clearBtn").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    haPintado = false;
    finishBtn.disabled = true; // Button wieder sperren
    resultZone.style.display = "none";
});

finishBtn.addEventListener("click", () => {
    if (haPintado) {
        resultZone.style.display = "block";
        resultZone.className = "quiz-result-message result-success";
        resultZone.innerHTML = '<h3>¡Qué obra tan fantástica!</h3><p>Tu letra secreta es: <span class="letter-badge">O</span></p>';
    }
});