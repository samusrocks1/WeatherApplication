// This function uses the Open Weather Map API to get the weather information for a city and returns the information.
async function fetchWeather(location) {
    try{
        const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=b741786123029a5c915bee340b05fea6', {mode: 'cors'})
        return response;
    }
    catch (error) {
        console.log('This did not work');
    }
}

// This is the event listener for the button to submit the information and run displayWeather.
const submitLocation = document.getElementById('submitLocation');
const local = document.getElementById('location');
submitLocation.addEventListener('click', function() {displayWeather(local.value)});

// This function displays the information the fetchWeather function received.
async function displayWeather(location){
    removeDiv('weather');
    const weather = await fetchWeather(location);
    weather.json().then( function(weather){
        appendDiv('weather');
        appendH2(weather.name, 'city', 'weather');
        appendParagraph("Latitude: " + weather.coord.lat + ', Longitude: ' + weather.coord.lon, 'latlon', 'weather');
        appendParagraph('Current Weather: ' + weather.weather[0].main, 'currentWeather', 'weather');
        appendParagraph(weather.weather[0].description, 'description', 'weather');
        weatherGif(weather.weather[0].main, 'weather');
        const temp = Number((weather.main.temp - 273.15) * 1.8 +32);
        appendParagraph('Current Temperature: ' + temp.toFixed(1) + ' F', 'temp', 'weather');
        appendParagraph('Humidity: ' + weather.main.humidity + '%', 'humidity', 'weather');
        appendParagraph('Current Wind: ' + weather.wind.speed + ' ' + weather.wind.deg, 'wind', 'weather');
        changeCss(weather.weather[0].main);
   });
}

// Changes CSS based on the current weather
function changeCss(weather) {
    const currentWeather = document.getElementById('weather');
    if (weather === 'clouds' || weather === 'Clouds') {
        currentWeather.style.backgroundColor = 'light gray';
    }
    else if (weather === 'thunderstorm' || weather === 'Thunderstorm'){
        currentWeather.style.backgroundColor = '#C7C76F';
    }
    else if (weather === 'drizzle' || weather === 'Drizzle' || weather === 'Rain' || weather === 'rain') {
        currentWeather.style.backgroundColor = '#4289D1';
    }
    else if (weather === 'snow' || weather === 'Snow'){
        currentWeather.style.backgroundColor = '#F2F4F7';
    }
    else if (weather === 'clear' || weather === 'clear') {
        currentWeather.style.backgroundColor = '#FFFF05';
    }
    else {
        currentWeather.style.backgroundColor = '#FFFFFF';
    }
}

// Retreives an image to represent the weather.
async function weatherGif(weather, appendId) {
    try {
        const response = await fetch('https://api.giphy.com/v1/gifs/translate?api_key=RTU1Cd6yx4c37fWv5guexqbQ4n3PYAst&s=' + weather + ' weather', {mode: 'cors'});
              response.json().then(function(response){
                const img = document.createElement('img');
                img.src = response.data.images.original.url;
                document.getElementById(appendId).appendChild(img);  
                    
            });
    }
    catch {
        console.log('Uh-Oh! There was an error!');
    }
}

async function appendDiv(id) {
    const newDiv = document.createElement('div')
    newDiv.id = id;
    document.body.appendChild(newDiv)
}

async function appendParagraph (text, id, attachId) {
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    paragraph.id = id;
    document.getElementById(attachId).appendChild(paragraph);
}

async function appendH2 (text, id, attachId) {
    const h2 = document.createElement('h2');
    h2.textContent = text;
    h2.id = id;
    document.getElementById(attachId).appendChild(h2);
}

async function removeDiv(id) {
    document.getElementById(id).remove();
}

async function createImg(id, appendId) {
    const img = document.createElement('img');
    img.id = id;
    document.getElementById(appendId).appendChild(img);   
}