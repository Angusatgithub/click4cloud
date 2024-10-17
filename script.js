import CloudManager from './cloudManager.js';

const pixelArtContainer = document.getElementById("pixel-art-container");
const cloudManager = new CloudManager(pixelArtContainer);

cloudManager.start();

//create clouds on click
pixelArtContainer.addEventListener('click', (event) => {
    const rect = pixelArtContainer.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    cloudManager.createCloudAtPosition(x, y);
});

// weather description based on number of clouds lol
function updateWeather() {
    const cloudCount = cloudManager.getTotalCloudCount();
    const weatherSpan = document.getElementById('weather');
    let weatherDescription;

    if (cloudCount <= 5) {
        weatherDescription = 'Clear';
    } else if (cloudCount <= 12) {
        weatherDescription = 'Partly Cloudy';
    } else if (cloudCount <= 24) {
        weatherDescription = 'Mostly Cloudy';
    } else if (cloudCount <= 36) {
        weatherDescription = 'Overcast';
    } else {
        weatherDescription = 'Stormy';
    }

    weatherSpan.textContent = weatherDescription;
}

// Updates weather description every second probably could do this better
setInterval(updateWeather, 1000);

// Initial weather update
updateWeather();
