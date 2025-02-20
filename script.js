// Форма обратной связи
document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let formMessage = document.getElementById("formMessage");

    // Проверяем заполненность полей
    if (!name || !email || !message) {
        formMessage.textContent = "Пожалуйста, заполните все поля.";
        return;
    }

    // Отправляем данные на сервер
    fetch("send_mail.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            name: name,
            email: email,
            message: message
        })
    })
    .then(response => response.text())
    .then(data => {
        if (data === "OK") {
            // Если в PHP-скрипте возвращаем "OK" — значит письмо отправлено
            formMessage.textContent = "Спасибо! Мы свяжемся с вами.";
            document.getElementById("contactForm").reset(); // сбрасываем поля формы
        } else {
            // Показываем ошибку, вернувшуюся из PHP
            formMessage.textContent = data;
        }
    })
    .catch(error => {
        // Если произошла сетевая ошибка или ещё что-то
        formMessage.textContent = "Ошибка при отправке запроса: " + error;
    });
});