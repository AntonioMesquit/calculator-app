const themes = ['default', 'white', 'dark']; // Nomes das classes de temas
let currentThemeIndex = 0;

const bars = document.querySelectorAll('.bar');
const html = document.querySelector('html');

for (let i = 0; i < bars.length; i++) {
    bars[i].addEventListener('click', function () {
        const isActive = this.classList.contains('active');

        for (let j = 0; j < bars.length; j++) {
            bars[j].classList.remove('active');
        }

        if (!isActive) {
            bars[i].classList.add('active');
            html.className = themes[i];
            currentThemeIndex = i;
        }
    });
}
