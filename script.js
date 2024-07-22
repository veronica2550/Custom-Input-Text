document.addEventListener('DOMContentLoaded', () => {
    const forbiddenWords = ['badword1', 'badword2', 'badword3'];
    const warningWords = ['warnword1', 'warnword2', 'warnword3'];
    const inputText = document.getElementById('inputText');
    const hiddenText = document.getElementById('hiddenText');

    function updatePlaceholder() {
        if (inputText.innerText.trim() === '') {
            inputText.classList.remove('not-empty');
        } else {
            inputText.classList.add('not-empty');
        }
    }

    inputText.addEventListener('input', () => {
        let text = inputText.innerText;

        // Highlight forbidden words
        forbiddenWords.forEach(word => {
            const regex = new RegExp(`(${word})`, 'gi');
            text = text.replace(regex, '<span class="highlight">$1</span>');
        });

        // Highlight warning words
        warningWords.forEach(word => {
            const regex = new RegExp(`(${word})`, 'gi');
            text = text.replace(regex, '<span class="warning">$1</span>');
        });

        hiddenText.innerHTML = text;
        updatePlaceholder();
    });

    inputText.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();  // Prevent newline on Enter
        }
    });

    // Initialize placeholder
    updatePlaceholder();
});
