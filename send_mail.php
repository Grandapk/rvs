<?php
// ВАШ EMAIL — сюда будут приходить сообщения:
$to = "ВАШ_EMAIL@DOMAIN.COM";

// Тема письма
$subject = "Сообщение с сайта RVS Grupp";

// Если данные пришли в формате JSON (через fetch), используем file_get_contents:
$json = file_get_contents("php://input");
$data = json_decode($json, true); // декодируем JSON в массив

// Если вместо fetch (JSON) вы используете стандартную отправку формы методом POST (application/x-www-form-urlencoded), 
// тогда используйте просто $_POST['name'], $_POST['email'], $_POST['message'] и не нужен decode JSON. 

if (isset($data['name']) && isset($data['email']) && isset($data['message'])) {
    $name = htmlspecialchars(trim($data['name']));
    $email = htmlspecialchars(trim($data['email']));
    $messageText = htmlspecialchars(trim($data['message']));

    // Формируем тело письма
    $body = "Имя: $name\nEmail: $email\nСообщение: $messageText\n";

    // Заголовки. Обратите внимание, что "From" должен совпадать с реальным доменом, 
    // иначе многие почтовики могут заблокировать письмо
    $headers = "From: no-reply@ваш_домен.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    // Пытаемся отправить
    if (mail($to, $subject, $body, $headers)) {
        echo "OK"; // для fetch-скрипта
    } else {
        echo "Ошибка при отправке письма";
    }
} else {
    echo "Не все данные формы получены";
}
?>