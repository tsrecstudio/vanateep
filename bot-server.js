const express = require('express');
const app = express();

// Ваш токен бота
const BOT_TOKEN = '6934597934:AAEybnkFd_2qmMqyzJcx7_xmwGvqYP4uuPU';
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

app.use(express.json());

// Функция отправки сообщения в Telegram
async function sendTelegramMessage(chatId, text) {
    try {
        const response = await fetch(`${TELEGRAM_API}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
                parse_mode: 'HTML'
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Ошибка отправки сообщения:', error);
    }
}

// Обработка webhook от Telegram
app.post('/webhook', async (req, res) => {
    const { message, web_app_data } = req.body;
    
    // Обработка обычных сообщений
    if (message) {
        const chatId = message.chat.id;
        const text = message.text;
        
        if (text === '/start') {
            await sendTelegramMessage(chatId, 
                '🌍 Добро пожаловать в RentWorld!\n\n' +
                'Здесь вы можете арендовать:\n' +
                '🏍️ Мотоциклы\n' +
                '🚗 Автомобили\n' +
                '🏠 Квартиры\n\n' +
                'Нажмите кнопку меню внизу, чтобы открыть каталог!'
            );
        }
    }
    
    // Обработка данных от Web App
    if (web_app_data) {
        const chatId = web_app_data.chat.id;
        const data = JSON.parse(web_app_data.data);
        
        if (data.type === 'order') {
            // Отправляем заказ пользователю
            await sendTelegramMessage(chatId, 
                `✅ <b>Заказ принят!</b>\n\n` +
                `📋 <b>Ваш заказ:</b>\n${data.orderText}\n\n` +
                `💬 Мы скоро с вами свяжемся для подтверждения деталей аренды.`
            );
            
            // Можно также отправить админу (замените на ваш chat_id)
            // await sendTelegramMessage('YOUR_ADMIN_CHAT_ID', 
            //     `🔔 <b>НОВЫЙ ЗАКАЗ!</b>\n\n${data.orderText}`
            // );
        }
    }
    
    res.sendStatus(200);
});

// Главная страница
app.get('/', (req, res) => {
    res.send(`
        <h1>🤖 RentWorld Bot Server</h1>
        <p>Бот работает! Webhook URL: <code>${req.get('host')}/webhook</code></p>
        <p>Настройте webhook командой:</p>
        <code>curl -X POST "https://api.telegram.org/bot${BOT_TOKEN}/setWebhook" -d "url=https://${req.get('host')}/webhook"</code>
    `);
});

// Установка webhook (вызвать один раз)
app.get('/set-webhook', async (req, res) => {
    const webhookUrl = `https://${req.get('host')}/webhook`;
    
    try {
        const response = await fetch(`${TELEGRAM_API}/setWebhook`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: webhookUrl })
        });
        
        const result = await response.json();
        res.json({
            success: result.ok,
            message: result.description,
            webhook_url: webhookUrl
        });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на порту ${PORT}`);
});

module.exports = app;
