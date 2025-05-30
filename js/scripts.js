// Header Scroll
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация масок для телефонов
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        IMask(input, {
            mask: '+{7} (000) 000-00-00',
            lazy: false,
            placeholderChar: '_'
        });
    });

    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    window.toggleMobileMenu = function() {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu.classList.contains('translate-x-full')) {
            mobileMenu.classList.remove('translate-x-full');
            mobileMenu.classList.add('translate-x-0');
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.remove('translate-x-0');
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        }
    };
});

// Hero Slider
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        slides[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);
});

// Modal Controls
document.addEventListener('DOMContentLoaded', function() {
    window.openModal = function(modalId, productName = '') {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            if (modalId === 'orderModal' && productName) {
                document.getElementById('orderProduct').value = productName;
                
                // Находим информацию о товаре в каталоге
                const catalogItems = document.querySelectorAll('.catalog-item');
                catalogItems.forEach(item => {
                    if (item.querySelector('h3').textContent === productName) {
                        // Обновляем основное изображение
                        const image = item.querySelector('img').src;
                        document.getElementById('orderProductImage').src = image;
                        document.getElementById('orderProductImage').alt = productName;
                        
                        // Обновляем описание
                        const description = item.querySelector('p').textContent;
                        document.getElementById('orderProductDescription').textContent = description;
                        
                        // Обновляем характеристики
                        const featuresList = document.getElementById('orderProductFeatures');
                        featuresList.innerHTML = '';
                        const features = item.querySelector('.features').innerHTML;
                        featuresList.innerHTML = features;
                        
                        // Обновляем цену
                        const price = item.querySelector('.text-2xl').textContent;
                        document.getElementById('orderProductPrice').textContent = price;
                    }
                });
            }
        }
    };
    
    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close modal when pressing Escape key
    window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const activeModals = document.querySelectorAll('.modal.active');
            activeModals.forEach(modal => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    });
});

// Form Handling
document.addEventListener('DOMContentLoaded', function() {
    // Обработка всех форм
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formId = form.id;
            let message = '';
            
            switch(formId) {
                case 'heroForm':
                    message = `
🎯 Новая заявка с главной страницы!
👤 Имя: ${form.querySelector('#heroName').value}
📱 Телефон: ${form.querySelector('#heroPhone').value}
⏰ Время: ${new Date().toLocaleString()}
                    `;
                    break;
                    
                case 'simpleOrderForm':
                    message = `
🎯 Новая заявка на простой заказ!
👤 Имя: ${form.querySelector('#simpleOrderName').value}
📱 Телефон: ${form.querySelector('#simpleOrderPhone').value}
💬 Комментарий: ${form.querySelector('#simpleOrderComment').value}
⏰ Время: ${new Date().toLocaleString()}
                    `;
                    break;
                    
                case 'quizForm':
                    const purpose = form.querySelector('input[name="purpose"]:checked')?.value;
                    const size = form.querySelector('input[name="size"]:checked')?.value;
                    const features = Array.from(form.querySelectorAll('input[name="features"]:checked')).map(f => f.value);
                    const design = form.querySelector('input[name="design"]:checked')?.value;
                    
                    message = `
🎯 Новая заявка из квиза!
👤 Имя: ${form.querySelector('#quizName').value}
📱 Телефон: ${form.querySelector('#quizPhone').value}
🎯 Цель: ${purpose}
📏 Размер: ${size}
🔧 Функции: ${features.join(', ')}
🎨 Дизайн: ${design}
💬 Комментарий: ${form.querySelector('#quizComment').value}
⏰ Время: ${new Date().toLocaleString()}
                    `;
                    break;
                    
                case 'discountForm':
                    message = `
🎯 Новая заявка на скидку!
👤 Имя: ${form.querySelector('#discountName').value}
📱 Телефон: ${form.querySelector('#discountPhone').value}
⏰ Время: ${new Date().toLocaleString()}
                    `;
                    break;
                    
                case 'orderForm':
                    message = `
🎯 Новая заявка на заказ товара!
👤 Имя: ${form.querySelector('#orderName').value}
📱 Телефон: ${form.querySelector('#orderPhone').value}
🎯 Товар: ${form.querySelector('#orderProduct').value}
⏰ Время: ${new Date().toLocaleString()}
                    `;
                    break;
                    
                case 'contactForm':
                    message = `
🎯 Новое сообщение из формы контактов!
👤 Имя: ${form.querySelector('#contactName').value}
📱 Телефон: ${form.querySelector('#contactPhone').value}
💬 Сообщение: ${form.querySelector('#contactMessage').value}
⏰ Время: ${new Date().toLocaleString()}
                    `;
                    break;
            }
            
            if (message) {
                try {
                    await fetch('/telegram_proxy.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ message: message })
                    });
                    
                    window.location.href = '/thank-you.html';
                } catch (error) {
                    console.error('Error:', error);
                    alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
                }
            }
        });
    });
});

// Quiz Functions
function initQuiz() {
    // Инициализация радио-кнопок
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            // Убираем активный класс у всех чекбоксов в группе
            this.closest('.quiz-step').querySelectorAll('.radio-checked').forEach(check => {
                check.classList.add('hidden');
            });
            // Показываем активный класс у выбранного чекбокса
            this.parentElement.querySelector('.radio-checked').classList.remove('hidden');
        });
    });

    // Инициализация чекбоксов
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkmark = this.parentElement.querySelector('.checkbox-checked');
            if (this.checked) {
                checkmark.classList.remove('hidden');
            } else {
                checkmark.classList.add('hidden');
            }
        });
    });

    // Инициализация первого шага
    document.querySelector('.quiz-step[data-step="1"]').querySelector('.radio-checked').classList.remove('hidden');
}

function nextQuizStep(currentStep, nextStep) {
    const currentStepElement = document.querySelector(`.quiz-step[data-step="${currentStep}"]`);
    const nextStepElement = document.querySelector(`.quiz-step[data-step="${nextStep}"]`);
    
    // Проверяем, что все обязательные поля заполнены
    const requiredInputs = currentStepElement.querySelectorAll('input[required]');
    let isValid = true;
    
    requiredInputs.forEach(input => {
        if (input.type === 'radio' && !currentStepElement.querySelector(`input[name="${input.name}"]:checked`)) {
            isValid = false;
            showError(input.name, 'Пожалуйста, выберите один из вариантов');
        } else if (input.type === 'checkbox' && !currentStepElement.querySelector(`input[name="${input.name}"]:checked`)) {
            isValid = false;
            showError(input.name, 'Пожалуйста, выберите хотя бы один вариант');
        }
    });
    
    if (!isValid) return;
    
    // Скрываем текущий шаг и показываем следующий
    currentStepElement.classList.remove('active');
    nextStepElement.classList.add('active');
    
    // Обновляем прогресс-бар
    const progress = (nextStep / 5) * 100;
    document.getElementById('quizProgress').style.width = `${progress}%`;
}

function prevQuizStep(currentStep, prevStep) {
    const currentStepElement = document.querySelector(`.quiz-step[data-step="${currentStep}"]`);
    const prevStepElement = document.querySelector(`.quiz-step[data-step="${prevStep}"]`);
    
    currentStepElement.classList.remove('active');
    prevStepElement.classList.add('active');
    
    // Обновляем прогресс-бар
    const progress = (prevStep / 5) * 100;
    document.getElementById('quizProgress').style.width = `${progress}%`;
}

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initQuiz();
});

// Product Modal Functions
function openProductModal(product) {
    const modal = document.getElementById('productModal');
    const modalTitle = modal.querySelector('.text-2xl');
    const modalImage = modal.querySelector('img');
    const modalDescription = modal.querySelector('.text-gray-400');
    const modalFeatures = modal.querySelector('.space-y-2');
    const modalPrice = modal.querySelector('.text-3xl');
    const modalForm = modal.querySelector('form');
    
    // Update modal content
    modalTitle.textContent = product.title;
    modalImage.src = product.image;
    modalImage.alt = product.title;
    modalDescription.textContent = product.description;
    modalPrice.textContent = product.price;
    
    // Update features list
    modalFeatures.innerHTML = product.features.map(feature => 
        `<li class="flex items-center">
            <svg class="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            ${feature}
        </li>`
    ).join('');
    
    // Update form action
    modalForm.dataset.product = product.title;
    
    // Show modal
    openModal('productModal');
}

// Add event listeners for product modal
document.addEventListener('DOMContentLoaded', function() {
    const productForm = document.querySelector('#productModal form');
    if (productForm) {
        productForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm('product')) {
                const data = {
                    name: document.getElementById('productName').value,
                    phone: document.getElementById('productPhone').value,
                    product: this.dataset.product
                };
                
                let message = `<b>🔥 Новая заявка с сайта</b>\n`;
                message += `<b>Форма:</b> Заказ товара\n\n`;
                message += `<b>Товар:</b> ${data.product}\n`;
                message += `<b>Имя:</b> ${data.name}\n`;
                message += `<b>Телефон:</b> ${data.phone}\n`;
                message += `\n<b>Дата:</b> ${new Date().toLocaleString('ru-RU')}\n`;
                
                fetch('/telegram_proxy.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: message
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        window.location.href = '/thank-you.html';
                    } else {
                        throw new Error('Failed to send message');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
                });
            }
        });
    }
});

// Обработка загрузки изображений
function handleImageUpload(input, index) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const container = input.parentElement;
            const placeholder = container.querySelector('.bg-gray-800');
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'w-full h-24 object-cover rounded-lg cursor-pointer';
            img.onclick = function() { openPhotoViewer(this.src); };
            placeholder.replaceWith(img);
            
            // Добавляем возможность удаления изображения
            const deleteButton = document.createElement('button');
            deleteButton.className = 'absolute top-1 right-1 w-6 h-6 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity';
            deleteButton.innerHTML = '<i class="ri-close-line"></i>';
            deleteButton.onclick = function(e) {
                e.stopPropagation();
                img.replaceWith(placeholder);
                input.value = '';
            };
            container.appendChild(deleteButton);
        };
        reader.readAsDataURL(file);
    }
}

// Функция просмотра фото
function openPhotoViewer(imageSrc) {
    const modal = document.getElementById('photoViewerModal');
    const image = document.getElementById('photoViewerImage');
    
    if (modal && image) {
        image.src = imageSrc;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Функция для открытия фото в полном размере
function openFullImage(src) {
    const modal = document.getElementById('fullImageModal');
    const fullImage = document.getElementById('fullImage');
    fullImage.src = src;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Обработка отправки формы квиза
document.getElementById('quizForm').addEventListener('submit', function(e) {
    e.preventDefault();
    window.location.href = '/thank-you.html';
});

// Функция валидации формы квиза
function validateQuizForm(data) {
    let isValid = true;
    
    // Проверяем имя
    if (!data.name.trim()) {
        showError('quizName', 'Пожалуйста, введите ваше имя');
        isValid = false;
    }
    
    // Проверяем телефон
    const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
    if (!phoneRegex.test(data.phone)) {
        showError('quizPhone', 'Пожалуйста, введите корректный номер телефона');
        isValid = false;
    }
    
    return isValid;
}

// Функция отправки данных в Telegram
async function sendToTelegram(data) {
    const BOT_TOKEN = 'YOUR_BOT_TOKEN'; // Замените на ваш токен бота
    const CHAT_ID = 'YOUR_CHAT_ID'; // Замените на ваш chat_id
    
    // Формируем сообщение
    const message = `
🎯 Новая заявка на подбор мангала:

👤 Имя: ${data.name}
📱 Телефон: ${data.phone}

🎯 Цель: ${data.purpose}
📏 Размер: ${data.size}
🎨 Дизайн: ${data.design}
✨ Дополнительные функции: ${data.features.join(', ')}

💬 Комментарий: ${data.comment || 'Не указан'}
    `;
    
    // Отправляем запрос к API Telegram
    return fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'HTML'
        })
    });
}

// Функция отображения ошибок
function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// Функция скрытия ошибок
function hideError(fieldId) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

// Добавляем обработчики для скрытия ошибок при вводе
document.getElementById('quizName').addEventListener('input', () => hideError('quizName'));
document.getElementById('quizPhone').addEventListener('input', () => hideError('quizPhone')); 