
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const mainImg = document.getElementById('mainImg');
const Temperature = document.querySelector('.Temperature');
const description = document.querySelector('.description');
const wind = document.getElementById('wind');
const humi = document.getElementById('humi');
const weatherPart = document.querySelector('.weatherPart');
const notFound = document.querySelector('.notFound');


async function checkweather(city) {
    const apiKey = '5dcb52574f314b951fe312a93d407caf';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const weatherData = await fetch(`${url}`).then(res => res.json());
    
    if(weatherData.cod === '404') {
        notFound.classList.remove('hide');
        weatherPart.classList.add('hide');
        console.log('Error');
        return;
    }else {
        weatherPart.classList.remove('hide');
        notFound.classList.add('hide');
    }

    Temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)} °C`;
    description.innerHTML = `${weatherData.weather[0].description}`;
    humi.innerHTML = `${Math.round(weatherData.main.humidity)} %`;
    wind.innerHTML = `${Math.round(weatherData.wind.speed * 3.6)} Km/H`;

    switch(weatherData.weather[0].main ){
        case 'Clouds':
            mainImg.src = "img/cloud.png";
            break;
        case 'Clear':
            mainImg.src = "img/clear.png";
            break;
        case 'Rain':
            mainImg.src = "img/rain.png";
            break;
        case 'Snow':
            mainImg.src = "img/snow.png";
            break;
        case 'Mist':
            mainImg.src = "img/mist.png";
            break;
    }

}

searchBtn.addEventListener('click', ()=> {
    checkweather(searchInput.value);
});
