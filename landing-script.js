document.addEventListener('DOMContentLoaded', () => {
    const targetDate = new Date('June 7, 2025 14:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('landing-days').innerText = days;
        document.getElementById('landing-hours').innerText = hours;
        document.getElementById('landing-minutes').innerText = minutes;
        document.getElementById('landing-seconds').innerText = seconds;

        if (distance < 0) {
            clearInterval(interval);
            document.getElementById('landing-countdown').innerText = 'The event has started!';
        }
    }

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();

    // Navigate to the info page on Info button click
    const infoButton = document.getElementById('info-button');
    infoButton.addEventListener('click', () => {
        window.location.href = 'info.html';
    });

    // Navigate to the collage page on Collage button click
    const collageButton = document.getElementById('collage-button');
    collageButton.addEventListener('click', () => {
        window.location.href = 'collage.html';
    });
});
