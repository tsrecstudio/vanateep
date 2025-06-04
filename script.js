// Инициализация Telegram WebApp
let tg = window.Telegram?.WebApp || {
    // Fallback для обычного браузера
    expand: () => {},
    close: () => {},
    showAlert: null,
    sendData: null,
    HapticFeedback: null,
    MainButton: {
        text: "",
        show: () => {},
        hide: () => {},
        onClick: () => {}
    },
    colorScheme: 'light'
};

// Расширяем приложение только если это реальный Telegram
if (window.Telegram?.WebApp) {
    tg.expand();
}

// Данные для приложения
const data = {
    moscow: {
        motorcycles: [
            { id: 1, name: "Yamaha R1", price: 3000, location: "Центр Москвы", emoji: "🏍️" },
            { id: 2, name: "Honda CBR", price: 2500, location: "Красная площадь", emoji: "🏍️" },
            { id: 3, name: "Kawasaki Ninja", price: 3500, location: "Парк Горького", emoji: "🏍️" }
        ],
        cars: [
            { id: 4, name: "BMW X5", price: 8000, location: "Арбат", emoji: "🚗" },
            { id: 5, name: "Mercedes C-Class", price: 7000, location: "Тверская", emoji: "🚗" },
            { id: 6, name: "Audi A4", price: 6500, location: "Кремль", emoji: "🚗" }
        ],
        apartments: [
            { id: 7, name: "2-комн квартира", price: 5000, location: "Центр, у метро", emoji: "🏠" },
            { id: 8, name: "Студия", price: 3000, location: "Красные ворота", emoji: "🏠" },
            { id: 9, name: "3-комн квартира", price: 8000, location: "Парк Культуры", emoji: "🏠" }
        ]
    },
    spb: {
        motorcycles: [
            { id: 10, name: "Ducati Monster", price: 4000, location: "Невский проспект", emoji: "🏍️" },
            { id: 11, name: "Harley Davidson", price: 5000, location: "Дворцовая площадь", emoji: "🏍️" }
        ],
        cars: [
            { id: 12, name: "Tesla Model 3", price: 9000, location: "Эрмитаж", emoji: "🚗" },
            { id: 13, name: "Volvo XC90", price: 7500, location: "Петропавловка", emoji: "🚗" }
        ],
        apartments: [
            { id: 14, name: "Лофт", price: 6000, location: "Васильевский остров", emoji: "🏠" },
            { id: 15, name: "Пентхаус", price: 12000, location: "Центр СПб", emoji: "🏠" }
        ]
    },
    paris: {
        motorcycles: [
            { id: 16, name: "Vespa Primavera", price: 2000, location: "Champs-Élysées", emoji: "🏍️" },
            { id: 17, name: "BMW R1250", price: 4500, location: "Louvre", emoji: "🏍️" }
        ],
        cars: [
            { id: 18, name: "Peugeot 508", price: 5500, location: "Eiffel Tower", emoji: "🚗" },
            { id: 19, name: "Renault Megane", price: 4000, location: "Notre-Dame", emoji: "🚗" }
        ],
        apartments: [
            { id: 20, name: "Appartement 2 chambres", price: 8000, location: "Montmartre", emoji: "🏠" },
            { id: 21, name: "Studio Parisien", price: 5000, location: "Le Marais", emoji: "🏠" }
        ]
    },
    london: {
        motorcycles: [
            { id: 22, name: "Triumph Street", price: 3500, location: "Big Ben", emoji: "🏍️" },
            { id: 23, name: "Royal Enfield", price: 2800, location: "Tower Bridge", emoji: "🏍️" }
        ],
        cars: [
            { id: 24, name: "Mini Cooper", price: 4500, location: "Oxford Street", emoji: "🚗" },
            { id: 25, name: "Jaguar F-Type", price: 12000, location: "Buckingham Palace", emoji: "🚗" }
        ],
        apartments: [
            { id: 26, name: "London Flat", price: 10000, location: "Camden", emoji: "🏠" },
            { id: 27, name: "Cozy Studio", price: 6000, location: "Covent Garden", emoji: "🏠" }
        ]
    },
    tokyo: {
        motorcycles: [
            { id: 28, name: "Honda Grom", price: 2200, location: "Shibuya", emoji: "🏍️" },
            { id: 29, name: "Suzuki GSX", price: 3800, location: "Akihabara", emoji: "🏍️" }
        ],
        cars: [
            { id: 30, name: "Toyota Prius", price: 4000, location: "Ginza", emoji: "🚗" },
            { id: 31, name: "Nissan GT-R", price: 15000, location: "Harajuku", emoji: "🚗" }
        ],
        apartments: [
            { id: 32, name: "Tokyo Apartment", price: 7000, location: "Shinjuku", emoji: "🏠" },
            { id: 33, name: "Capsule Home", price: 3500, location: "Roppongi", emoji: "🏠" }
        ]
    },
    nyc: {
        motorcycles: [
            { id: 34, name: "Indian Scout", price: 4200, location: "Times Square", emoji: "🏍️" },
            { id: 35, name: "Zero SR/F", price: 3700, location: "Central Park", emoji: "🏍️" }
        ],
        cars: [
            { id: 36, name: "Ford Mustang", price: 8500, location: "Manhattan", emoji: "🚗" },
            { id: 37, name: "Chevrolet Camaro", price: 9000, location: "Brooklyn", emoji: "🚗" }
        ],
        apartments: [
            { id: 38, name: "NYC Loft", price: 15000, location: "SoHo", emoji: "🏠" },
            { id: 39, name: "Studio Manhattan", price: 8000, location: "Upper East Side", emoji: "🏠" }
        ]
    }
};

let currentCategory = 'motorcycles';
let cart = [];

// Переключение категории
function switchCategory(category) {
    currentCategory = category;
    
    // Обновляем активную вкладку
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    loadItems();
}

// Загрузка элементов
function loadItems() {
    const city = document.getElementById('city').value;
    const grid = document.getElementById('items-grid');
    
    if (!city) {
        grid.innerHTML = '<div class="placeholder">Выберите город для просмотра доступных вариантов</div>';
        return;
    }
    
    const items = data[city][currentCategory];
    
    grid.innerHTML = items.map(item => `
        <div class="item-card">
            <div class="item-image">${item.emoji}</div>
            <div class="item-title">${item.name}</div>
            <div class="item-price">${item.price} ₽/день</div>
            <div class="item-location">📍 ${item.location}</div>
            <button class="add-btn" onclick="addToCart(${item.id})">Добавить в корзину</button>
        </div>
    `).join('');
}

// Добавление в корзину
function addToCart(itemId) {
    const city = document.getElementById('city').value;
    let item = null;
    
    // Поиск товара во всех категориях
    for (const category in data[city]) {
        const found = data[city][category].find(i => i.id === itemId);
        if (found) {
            item = found;
            break;
        }
    }
    
    if (item && !cart.find(i => i.id === itemId)) {
        cart.push(item);
        updateCart();
        
        // Вибрация при добавлении
        if (tg.HapticFeedback) {
            tg.HapticFeedback.impactOccurred('medium');
        }
    }
}

// Удаление из корзины
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCart();
}

// Обновление корзины
function updateCart() {
    const cartElement = document.getElementById('cart');
    const cartItems = document.getElementById('cart-items');
    const total = document.getElementById('total');
    
    if (cart.length === 0) {
        cartElement.classList.add('hidden');
        return;
    }
    
    cartElement.classList.remove('hidden');
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <div>${item.emoji} ${item.name}</div>
                <div style="font-size: 12px; color: #666;">${item.location}</div>
            </div>
            <div style="text-align: right;">
                <div>${item.price} ₽</div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Удалить</button>
            </div>
        </div>
    `).join('');
    
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    total.textContent = totalPrice;
}

// Обработка аренды
function processRent() {
    if (cart.length === 0) return;
    
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    const itemsList = cart.map(item => `${item.emoji} ${item.name} (${item.price}₽)`).join('\n');
    
    // Формируем сообщение для отправки
    const orderText = `🎉 НОВЫЙ ЗАКАЗ!\n\n📋 Заказ:\n${itemsList}\n\n💰 Итого: ${totalPrice} ₽\n\n👤 От: @${tg.initDataUnsafe?.user?.username || 'Пользователь'}\n⏰ Время: ${new Date().toLocaleString('ru-RU')}`;
    
    // Отправка данных боту (работает только в Telegram)
    if (window.Telegram?.WebApp?.sendData) {
        tg.sendData(JSON.stringify({
            type: 'order',
            cart: cart,
            total: totalPrice,
            user: tg.initDataUnsafe?.user,
            timestamp: new Date().toISOString(),
            orderText: orderText
        }));
        
        // Уведомление в приложении
        tg.showAlert('✅ Заказ отправлен! Скоро с вами свяжутся.');
        
        // Закрываем приложение через 2 секунды
        setTimeout(() => {
            tg.close();
        }, 2000);
        
    } else {
        // Fallback для браузера
        const message = `🎉 Заказ оформлен!\n\n📋 Ваш заказ:\n${itemsList}\n\n💰 Итого: ${totalPrice} ₽\n\n📞 Мы свяжемся с вами для подтверждения!`;
        alert(message);
        console.log('📱 Заказ оформлен:', {
            cart: cart,
            total: totalPrice,
            timestamp: new Date().toISOString()
        });
    }
    
    // Очищаем корзину
    cart = [];
    updateCart();
    
    // Вибрация успеха
    if (tg.HapticFeedback) {
        tg.HapticFeedback.notificationOccurred('success');
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, запущено ли в Telegram
    const isInTelegram = window.Telegram?.WebApp;
    
    if (isInTelegram) {
        // Настройка темы Telegram
        if (tg.colorScheme === 'dark') {
            document.body.style.background = '#17212b';
            document.body.style.color = '#ffffff';
        }
        
        // Настройка главной кнопки
        tg.MainButton.text = "Закрыть";
        tg.MainButton.show();
        tg.MainButton.onClick(() => tg.close());
        
        console.log('✅ Telegram WebApp инициализирован');
    } else {
        console.log('🌐 Приложение запущено в обычном браузере');
    }
});
