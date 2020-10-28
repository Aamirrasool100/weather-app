const form = document.querySelector('.form')
const input =  document.querySelector('.input')
const currentSummary = document.querySelector('.current-summary')
const dailySummary = document.querySelector('.daily-summary-value')
const temperature = document.querySelector(".temperature")
const temperatureHigh = document.querySelector(".high-temp-value")
const temperatureLow = document.querySelector(".low-temp-value")
const temperatureFeels = document.querySelector(".temp-feels-value")
const precipProbability = document.querySelector(".precip-value")
const precipProbabilityType = document.querySelector(".precip-type-value")
const lat = document.querySelector(".lat-value")
const long = document.querySelector(".long-value")

const cloud = document.querySelector('.cloud-value')
const windSpeed = document.querySelector(".wind-speed-value")
const humidity = document.querySelector(".humidity-value")
const address = document.querySelector('.address')
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location =  input.value

    fetch(`/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
        response.send(document.querySelector('.message-box').textContent = data.error)
        }else{
            console.log(data)
            currentSummary.textContent = data.currentSummary
            dailySummary.textContent = data.dailySummary
            precipProbability.textContent = `${data.precipProbability}% `
            precipProbabilityType.textContent = ` chance of ${data.precipType}`
            temperatureFeels.innerHTML = `Feels like: ${data.temperature}&#176C`
            temperature.innerHTML = `${data.temperature}&#176C`
            temperatureHigh.innerHTML = `High: ${data.tempHigh}&#176C`
            temperatureLow.innerHTML = `Low: ${data.tempLow}&#176C`
            lat.textContent = `Latitude: ${Math.floor(data.lat)}`
            long.textContent  =`Longitude: ${Math.floor(data.long)}`
            windSpeed.innerHTML  = `wind: ${data.windSpeed}↙mph`
            humidity.textContent = `Humidity: ${data.humidity}%`
            cloud.textContent = `Cloud: ${data.cloudCover}`
            address.textContent = data.location
        }
    })
})
})
