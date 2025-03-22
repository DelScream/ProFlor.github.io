document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded, initializing filters...');

    // Навешиваем обработчик на кнопки фильтра
    document.querySelectorAll('.filter-button').forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            console.log('Filter button clicked:', category);

            // Убираем активный класс у всех кнопок
            document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс к текущей кнопке
            button.classList.add('active');

            // Прокручиваем страницу до выбранной категории
            scrollToCategory(category);
        });
    });

    // Навешиваем обработчик на карточки товаров
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', () => {
            openProductModal(card);
        });
    });
});

// Функция для прокрутки до выбранной категории
function scrollToCategory(category) {
    const categoryElement = document.getElementById(`category-${category}`);
    if (categoryElement) {
        // Прокручиваем страницу до элемента с плавной анимацией
        categoryElement.scrollIntoView({
            behavior: 'smooth', // Плавная прокрутка
            block: 'start'      // Прокрутка до верхней границы элемента
        });
    } else {
        console.error(`Category element not found: ${category}`);
    }
}

// Функция для открытия модального окна с информацией о товаре
function openProductModal(product) {
    const modal = document.getElementById('product-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalFeatures = document.getElementById('modal-features');
    const modalPrice = document.getElementById('modal-price');
    const modalStock = document.getElementById('modal-stock');

    // Заполняем модальное окно данными о товаре
    modalImage.src = product.querySelector('img').src;
    modalTitle.textContent = product.querySelector('h3').textContent;
    modalDescription.textContent = product.querySelector('.product-details p').textContent;

    // Очищаем список характеристик
    modalFeatures.innerHTML = '';

    // Добавляем характеристики
    const features = product.querySelectorAll('.product-details ul li');
    features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature.textContent;
        modalFeatures.appendChild(li);
    });

    // Добавляем цену и наличие
    modalPrice.textContent = product.querySelector('p').textContent;
    modalStock.textContent = product.querySelector('.product-details p:last-child').textContent;

    // Показываем модальное окно
    modal.style.display = 'block';
}

// Функция для закрытия модального окна
function closeProductModal() {
    const modal = document.getElementById('product-modal');
    modal.style.display = 'none';
}

// Обработчик клика на кнопку закрытия модального окна
document.querySelector('.close-modal').addEventListener('click', closeProductModal);

// Закрытие модального окна при клике вне его области
window.addEventListener('click', (event) => {
    const modal = document.getElementById('product-modal');
    if (event.target === modal) {
        closeProductModal();
    }
});

// Кнопка "Наверх"
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// Показываем кнопку, когда пользователь прокрутил страницу вниз
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// Плавная прокрутка наверх при клике на кнопку
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});