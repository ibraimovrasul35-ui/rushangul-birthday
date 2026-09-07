document.addEventListener("DOMContentLoaded", function() {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
});

const musicBtn = document.getElementById('musicToggle');
const audio = document.getElementById('bgMusic');
const musicIcon = musicBtn.querySelector('.music-icon');
let isPlaying = false;

musicBtn.addEventListener('click', function() {
    if (isPlaying) {
        audio.pause();
        musicIcon.innerText = '♪'; 
    } else {
        audio.play();
        musicIcon.innerText = '❚❚'; 
    }
    isPlaying = !isPlaying;
});

window.addEventListener('load', function() {
    var duration = 3000;
    var end = Date.now() + duration;

    (function frame() {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#B88E83', '#E8E0D5', '#9E7469'] });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#B88E83', '#E8E0D5', '#9E7469'] });
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
});

const countDownDate = new Date("Sep 21, 2026 19:00:00").getTime();
const timerInterval = setInterval(function() {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    if (distance < 0) {
        clearInterval(timerInterval);
        document.getElementById("countdown").innerHTML = "<h3 style='color: #B88E83;'>Праздник уже начался!</h3>";
        return;
    }

    document.getElementById("days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
    document.getElementById("hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById("mins").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById("secs").innerText = Math.floor((distance % (1000 * 60)) / 1000);
}, 1000);

// ЛОГИКА ОТПРАВКИ В TELEGRAM
document.getElementById("submitBtn").addEventListener("click", function() {
    const nameInput = document.getElementById("guestName");
    const name = nameInput.value.trim();
    const attendance = document.querySelector('input[name="attendance"]:checked').value;
    
    if (name === "") {
        alert("Пожалуйста, введите ваше Имя и Фамилию.");
        return;
    }

    // Твои настройки бота
    const BOT_TOKEN = "8949574194:AAFGbc9jW-P827sGLEErAFNtb0exKRD-Ahg";
    const CHAT_ID = "569215127";

    const statusText = (attendance === "приду") ? "✅ С удовольствием придет!" : "❌ К сожалению, не сможет присутствовать.";
    const message = `💌 Новый ответ на приглашение!\n\n👤 Имя: ${name}\n📌 Статус: ${statusText}`;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message
        })
    })
    .then(response => {
        if (response.ok) {
            if (attendance === "приду") {
                alert("Ответ сохранен! Очень ждем вас, " + name + "!");
                confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#B88E83', '#E8E0D5', '#9E7469'] });
            } else {
                alert("Очень жаль, " + name + ", что вы не сможете прийти. Ответ сохранен.");
            }
            nameInput.value = ""; 
        } else {
            alert("Ошибка при отправке. Попробуйте еще раз.");
        }
    })
    .catch(error => {
        console.error("Ошибка:", error);
        alert("Ошибка соединения с сервером.");
    });
});
