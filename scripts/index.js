console.log('Script loaded');

let currentSection = 0;
const sections = document.querySelectorAll('.fullscreen-section');
let isThrottled = false;
const throttleDelay = 500;

// Функция для плавной прокрутки к секции
function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return;
    sections[index].scrollIntoView({ behavior: 'smooth' });
    currentSection = index;
    updateNavigation();
}

// Обработчик клавиш (для десктопов)
window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
        event.preventDefault();
        scrollToSection(currentSection + 1);
    } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        scrollToSection(currentSection - 1);
    }
});

// Обработчик колеса мыши (для десктопов)
window.addEventListener('wheel', (event) => {
    if (isThrottled) return;
    isThrottled = true;

    if (event.deltaY > 0) {
        scrollToSection(currentSection + 1);
    } else {
        scrollToSection(currentSection - 1);
    }

    setTimeout(() => {
        isThrottled = false;
    }, throttleDelay);
}, { passive: false });

// Обработчик свайпов (для мобильных устройств)
let startY = 0;

window.addEventListener('touchstart', (event) => {
    startY = event.touches[0].clientY;
});

window.addEventListener('touchend', (event) => {
    if (isThrottled) return;
    isThrottled = true;

    const endY = event.changedTouches[0].clientY;
    const deltaY = endY - startY;

    if (deltaY > 50) {
        scrollToSection(currentSection - 1);
    } else if (deltaY < -50) {
        scrollToSection(currentSection + 1);
    }

    setTimeout(() => {
        isThrottled = false;
    }, throttleDelay);
});

// Функция для обновления навигации
function updateNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach((link, index) => {
        if (index === currentSection) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Функция для проверки видимости секций
function checkVisibility() {
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8 && rect.bottom >= 0) {
            section.classList.add('visible');
            currentSection = index;
            updateNavigation();
        }
    });
}

// Инициализация
window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);

// Обработчик для мобильного меню
document.querySelector('.menu-toggle').addEventListener('click', (event) => {
    event.stopPropagation(); // Останавливаем всплытие события
    const nav = document.querySelector('nav');
    nav.classList.toggle('active'); // Переключаем класс active
});

// Закрытие меню при клике вне его области
document.addEventListener('click', (event) => {
    const nav = document.querySelector('nav');
    const menuToggle = document.querySelector('.menu-toggle');
    if (nav.classList.contains('active') && !nav.contains(event.target) && !menuToggle.contains(event.target)) {
        nav.classList.remove('active'); // Скрываем меню
    }
});