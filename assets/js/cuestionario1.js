document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('.question');
    const checkBtn = document.getElementById('check-quiz-btn');
    const resultDiv = document.getElementById('quiz-result');

    // Klick-Logik für Optionen
    questions.forEach(question => {
        const options = question.querySelectorAll('.option');
        options.forEach(option => {
            option.addEventListener('click', () => {
                // Auswahl innerhalb der Frage umschalten
                question.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                option.classList.add('selected');
            });
        });
    });

    // Prüf-Logik
    checkBtn.addEventListener('click', () => {
        let allCorrect = true;
        let answeredCount = 0;

        questions.forEach(question => {
            const selected = question.querySelector('.option.selected');
            const correctValue = question.dataset.answer;

            if (selected) {
                answeredCount++;
                const isCorrect = selected.dataset.choice === correctValue;

                // Optisches Feedback geben
                selected.classList.add(isCorrect ? 'correct' : 'wrong');
                selected.querySelector('.mark').classList.add('show');

                if (!isCorrect) allCorrect = false;
            } else {
                allCorrect = false;
            }
        });

        resultDiv.style.display = 'block';

        if (answeredCount < questions.length) {
            resultDiv.className = 'quiz-result-message result-error';
            resultDiv.innerHTML = '¡Por favor, responde a todas las preguntas!';
        } else if (allCorrect) {
            resultDiv.className = 'quiz-result-message result-success';
            resultDiv.innerHTML = '<h3>¡Bravo Artista!</h3><p>Has descubierto la letra secreta: <span class="letter-badge">O</span></p>';
        } else {
            resultDiv.className = 'quiz-result-message result-error';
            resultDiv.innerHTML = '¡Oh no! Algunas respuestas no son correctas. Vuelve a leer la historia de Pablo e inténtalo de nuevo.';
        }
    });
});