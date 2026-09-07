// === МУЗЫКА И АВТОЗАПУСК ===
const music = document.getElementById('bg-music');
const musicBtn = document.querySelector('.music-btn-circular');
const musicIcon = document.querySelector('.music-icon');
let isPlaying = false;

// Включение/выключение музыки по нажатию на кнопку
if (musicBtn) {
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            music.pause();
            musicIcon.textContent = '🔇'; // Значок выключенного звука
            isPlaying = false;
        } else {
            music.play();
            musicIcon.textContent = '🔊'; // Значок включенного звука
            isPlaying = true;
        }
    });
}

// Хитрый автозапуск при первом касании экрана (для телефонов и строгих браузеров)
document.body.addEventListener('click', function startAudio() {
    if (music && music.paused && !isPlaying) {
        music.play().then(() => {
            isPlaying = true;
            if (musicIcon) musicIcon.textContent = '🔊';
        }).catch(err => console.log("Браузер ждет клика"));
    }
    // Удаляем событие после первого клика, чтобы не перегружать страницу
    document.body.removeEventListener('click', startAudio);
}, { once: true });


// === ТАЙМЕР ОТСЧЕТА ===
// Замени дату на нужную (Год-Месяц-ДеньTЧасы:Минуты:Секунды)
const targetDate = new Date('2026-09-15T18:00:00').getTime();

function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) return; // Если время вышло, таймер остановится

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distanceСкопируй этот готовый код и вставь его в свой файл **`script.js`**, брат. Этот скрипт сделает так, что музыка попытается включиться сама, а если телефон заблокирует звук — он включится при первом же касании экрана или скролле.

```javascript
document.addEventListener("DOMContentLoaded", function() {
    const music = document.getElementById("bg-music");
    const musicBtn = document.getElementById("music-btn");

    function playAudio() {
        if (music && music.paused) {
            let playPromise = music.play();
            if (playPromise !== undefined) {
                playPromise.catch(function(error) {
                    console.log("Браузер заблокировал автоплей. Ждем клика.");
                });
            }
        }
    }

    // Запуск при клике в любом месте страницы
    document.body.addEventListener("click", function() {
        playAudio();
    }, { once: true });

    // Запуск при касании экрана (для телефонов)
    document.addEventListener("touchstart", function() {
        playAudio();
    }, { once: true });

    // Работа самой кнопки (включить/выключить)
    if (musicBtn) {
        musicBtn.addEventListener("click", function(e) {
            e.stopPropagation(); 
            if (music.paused) {
                music.play();
            } else {
                music.pause();
            }
        });
    }
});
