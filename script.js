document.addEventListener('DOMContentLoaded', () => {
    const diamondsContainer = document.createElement('div');
    diamondsContainer.className = 'diamonds-container';
    document.body.appendChild(diamondsContainer);

    const startButton = document.getElementById('start-button');

    // Show the button after 5 seconds
    setTimeout(() => {
        startButton.classList.add('show-button');
    }, 5000);

    // Navigate to the landing page on button click
    startButton.addEventListener('click', () => {
        window.location.href = 'landing.html';
    });

    // Countdown timer for the welcome screen
    const targetDate = new Date('June 7, 2025 14:00:00').getTime();
    function updateWelcomeCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('welcome-days').innerText = days;
        document.getElementById('welcome-hours').innerText = hours;
        document.getElementById('welcome-minutes').innerText = minutes;
        document.getElementById('welcome-seconds').innerText = seconds;

        if (distance < 0) {
            clearInterval(welcomeInterval);
            document.getElementById('welcome-countdown').innerText = 'The event has started!';
        }
    }

    const welcomeInterval = setInterval(updateWelcomeCountdown, 1000);
    updateWelcomeCountdown();
});
