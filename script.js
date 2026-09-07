document.addEventListener("DOMContentLoaded", function() {
    const music = document.getElementById("bg-music");
    
    // Если у тебя кнопка имеет класс, используем querySelector
    // Если используешь id="music-btn", поменяй на getElementById("music-btn")
    const musicBtn = document.querySelector(".music-btn-circular") || document.getElementById("music-btn");
    const musicIcon = document.querySelector(".music-icon");
    let isPlaying = false;

    function playAudio() {
        if (music && music.paused && !isPlaying) {
            let playPromise = music.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isPlaying = true;
                    if (musicIcon) musicIcon.textContent = '🔊';
                }).catch(function(error) {
                    console.log("Браузер ждет первого клика пользователя");
                });
            }
        }
    }

    // Автозапуск при первом касании экрана (для телефонов) или клике
    document.body.addEventListener("click", playAudio, { once: true });
    document.addEventListener("touchstart", playAudio, { once: true });

    // Работа самой кнопки (включить/выключить звук вручную)
    if (musicBtn) {
        musicBtn.addEventListener("click", function(e) {
            e.stopPropagation(); // Чтобы клик по кнопке не путался с кликом по фону
            if (isPlaying) {
                music.pause();
                if (musicIcon) musicIcon.textContent = '🔇';
                isPlaying = false;
            } else {
                music.play();
                if (musicIcon) musicIcon.textContent = '🔊';
                isPlaying = true;
            }
        });
    }
});
