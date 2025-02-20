// Модальное окно "Подробнее"
document.getElementById("learnMore").addEventListener("click", function () {
    document.getElementById("modal").style.display = "block";
});

document.querySelector(".close").addEventListener("click", function () {
    document.getElementById("modal").style.display = "none";
});

window.onclick = function (event) {
    if (event.target === document.getElementById("modal")) {
        document.getElementById("modal").style.display = "none";
    }
};

// Форма обратной связи
document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    if (name && email && message) {
        document.getElementById("formMessage").textContent = "Спасибо! Мы свяжемся с вами.";
        document.getElementById("contactForm").reset();
    } else {
        document.getElementById("formMessage").textContent = "Пожалуйста, заполните все поля.";
    }
});
