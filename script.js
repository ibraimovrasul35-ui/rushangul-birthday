document.addEventListener("DOMContentLoaded", function() {
    // === 1. АНИМАЦИЯ ПОЯВЛЕНИЯ ТЕКСТА ===
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // === 2. МУЗЫКА И АВТОЗАПУСК (ФИКС ДЛЯ ТЕЛЕФОНОВ) ===
    const audio = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicToggle');
    const musicIcon = musicBtn ? musicBtn.querySelector('.music-icon') : null;
    let isPlaying = false;

    function playAudio() {
        if (audio && audio.paused && !isPlaying) {
            let playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isPlaying = true;
                    if (musicIcon) musicIcon.innerText = '❚❚';
                }).catch(err => console.log("Браузер ждет касания экрана"));
            }
        }
    }

    // Автозапуск при любом касании или скролле страницы
    document.body.addEventListener("click", playAudio, { once: true });
    document.addEventListener("touchstart", playAudio, { once: true });

    if (musicBtn) {
        musicBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Блокируем конфликт кликов
            if (isPlaying) {
                audio.pause();
                if (musicIcon) musicIcon.innerText = '♪'; 
                isPlaying = false;
            } else {
                audio.play();
                if (musicIcon) musicIcon.innerText = '❚❚'; 
                isPlaying = true;
            }
        });
    }
});

// === 3. КОНФЕТТИ ПРИ ЗАГРУЗКЕ ===
window.addEventListener('load', function() {
    var duration = 3000;
    var end = Date.now() + duration;

    (function frame() {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#B88E83', '#E8E0D5', '#9E7469'] });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#B88E83', '#E8E0D5', '#9E7469'] });
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
});

// === 4. ТАЙМЕР ===
const countDownDate = new Date("Sep 21, 2026 19:00:00").getTime();
const timerInterval = setInterval(function() {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    if (distance < 0) {
        clearInterval(timerInterval);
        const countdownEl = document.getElementById("countdown");
        if (countdownEl) countdownEl.innerHTML = "<h3 style='color: #B88E83;'>Праздник уже начался!</h3>";
        return;
    }

    document.getElementById("days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
    document.getElementById("hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById("mins").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById("secs").innerText = Math.floor((distance % (1000 * 60)) / 1000);
}, 1000);

// === 5. ЛОГИКА ОТПРАВКИ В TELEGRAM ===
const submitBtn = document.getElementById("submitBtn");
if (submitBtn) {
    submitBtn.addEventListener("click", function() {
        const nameInput = document.getElementById("guestName");
        const name = nameInput.value.trim();
        const attendanceEl = document.querySelector('input[name="attendance"]:checked');
        
        if (name === "") {
            alert("Пожалуйста, введите ваше Имя и Фамилию.");
            return;
        }

        const attendance = attendanceEl ? attendanceEl.value : "";
        const BOT_TOKEN = "8949574194:AAFGbc9jW-P827sGLEErAFNtb0exKRD-Ahg";
        const CHAT_ID = "569215127";

        // Обработка всех трех вариантов ответа
        let statusText = "";
        if (attendance === "приду") statusText = "✅ С удовольствием придет!";
        else if (attendance === "с_парой") statusText = "👫 С удовольствием придет с парой!";
        else statusText = "❌ К сожалению, не сможет присутствовать.";

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
                if (attendance === "приду" || attendance === "с_парой") {
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
}
