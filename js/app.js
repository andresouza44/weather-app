const cityForm = document.querySelector(`[data-js="change-location"]`)

const cityNameContainer = document.querySelector(`[data-js="city-name"]`)
const cityWeatherContainer = document.querySelector(`[data-js="city-weather"]`)
const cityTemperatureContainer = document.querySelector(`[data-js="city-temperature"]`)

const cityCard = document.querySelector(`[data-js="city-card"]`)

let timeImg = document.querySelector(`[data-js="time"]`)

const timeImgContainer = document.querySelector(`[data-js="time-icon"]`)
const showCityCard = () =>{
    if (cityCard.classList.contains('d-none')) cityCard.classList.remove('d-none')

}


const fetchCityWeatjerInfo = async cityName => {
    const [{Key, LocalizedName}] = await getCityData(cityName)
    const [{WeatherText, Temperature, IsDayTime, WeatherIcon}] = await getCityWeather(Key)
    
    return {LocalizedName, WeatherText, Temperature, IsDayTime, WeatherIcon}
    
}

const showCityWeatherInfo = async cityName => { 
    const {LocalizedName, WeatherText, Temperature, IsDayTime, WeatherIcon}= 
        await fetchCityWeatjerInfo(cityName)
    
    const timeIcon = `<img src='./src/icons/${WeatherIcon}.svg' />`
    timeImg.src = IsDayTime ? './src/day.svg' : './src/night.svg';
    timeImgContainer.innerHTML = timeIcon  
    cityNameContainer.textContent=cityName;
    cityTemperatureContainer.textContent= await Temperature.Metric.Value;
    cityWeatherContainer.textContent=WeatherText
    
    showCityCard();
}

const saveLastCityName = cityName =>{
    localStorage.setItem('cityName', cityName )

}

const getLastCityName = () => {
    const lastCityName =  localStorage.getItem('cityName')
    cityForm.city.value = lastCityName
    showCityWeatherInfo(lastCityName)
   

}

getLastCityName()

const handCityForm =  event =>{
    event.preventDefault()
    
    const inputValue = event.target.city.value;

    saveLastCityName(inputValue)
    showCityWeatherInfo(inputValue)
    cityForm.reset()
}

cityForm.addEventListener('submit',handCityForm)