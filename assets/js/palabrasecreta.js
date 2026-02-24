document.addEventListener("DOMContentLoaded", function() {
    const inputs = document.querySelectorAll('.puzzle-char');
    const checkBtn = document.getElementById('checkBtn');
    const messageBox = document.getElementById('resultMessage');

    // --- Funktion für das automatische Springen und Löschen ---
    inputs.forEach((input, index) => {
        input.addEventListener('keyup', (e) => {
            // Wenn eine Eingabe gemacht wurde (einzelnes Zeichen)
            if (e.key.length === 1 && input.value.length === 1) {
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus(); // Springe zum nächsten Feld
                }
            }
            // Wenn Backspace gedrückt wird
            if (e.key === 'Backspace') {
                if (input.value === '' && index > 0) {
                    inputs[index - 1].focus(); // Springe zum vorherigen Feld
                }
            }
        });
    });

    // --- Prüfen Button Logik ---
    checkBtn.addEventListener('click', function() {
        // 1. Alle Buchstaben sammeln
        let fullWord = '';
        inputs.forEach(input => {
            fullWord += input.value;
        });
        
        // Zu Großbuchstaben und Leerzeichen entfernen
        fullWord = fullWord.toUpperCase().trim();

        // 2. Nachrichten-Box vorbereiten
        messageBox.style.display = 'block';

        // 3. Prüfung (Lösung ist "ROSTRO")
        if (fullWord === 'ROSTRO') {
            // --- RICHTIG (Dunkleres Grün auf Weiß) ---
            messageBox.style.borderColor = '#1E8449'; // Dunklerer grüner Rahmen
            messageBox.style.color = '#1E8449';       // Dunkler grüne Schrift
            messageBox.innerHTML = '🎉 ¡Excelente trabajo! Ya eres un experto en el mundo del cubismo. ROSTRO significa cara o cara humana, y a Picasso le encantaba representar los rostros de formas diferentes.';
        } else {
            // --- FALSCH (Dunkleres Rot auf Weiß) ---
            messageBox.style.borderColor = '#C0392B'; // Dunkler roter Rahmen
            messageBox.style.color = '#C0392B';       // Dunkler rote Schrift
            messageBox.innerHTML = '🤔 Casi… ¡Explora un poco más y vuelve a intentarlo!';
        }
    });
});