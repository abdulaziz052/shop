const baseUrl = 'http://95.130.227.52:3001'; 

async function login() {
    // Получаем данные из формы
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Проверяем, что данные введены
    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }

    // Формируем объект данных для запроса
    const loginData = {
        login: email, 
        password: password 
    };

    try {
        // Отображаем состояние загрузки
        document.getElementById('loginStatus').textContent = 'Logging in...';

        // Выполняем POST запрос
        const response = await fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        // Проверяем успешность ответа
        if (response.ok) {
            const result = await response.json();
            
            // Проверьте, действительно ли токен возвращается
            console.log('Login result:', result);
            if (result.token) {
                // Сохраняем токен в localStorage
                localStorage.setItem('token', result.token);
                // Перенаправляем пользователя
                window.location.replace('/');
            } else {
                // Если токен не получен, показываем сообщение
                alert('Login failed: Token not received');
            }
        } else {
            // Обрабатываем ошибку ответа сервера
            const errorData = await response.json();
            alert(`Login failed: ${errorData.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while logging in');
    } finally {
        // Скрываем состояние загрузки
        document.getElementById('loginStatus').textContent = '';
    }
}
