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
const time = document.querySelector(".time")
const cloud = document.querySelector('.cloud-value')
const windSpeed = document.querySelector(".wind-speed-value")
const humidity = document.querySelector(".humidity-value")
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location =  input.value

    fetch(`/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        console.log(data);
        if(data.error){
        response.send(document.querySelector('.message-box').textContent = data.error)
        }else{
            
            currentSummary.textContent = data.currentSummary
            dailySummary.textContent = data.dailySummary
            precipProbability.textContent = `${data.precipProbability}% `
            precipProbabilityType.textContent = ` chances of ${data.precipType}`
            temperatureFeels.innerHTML = `Feels like: ${data.temperature}&#176`
            temperature.innerHTML = `${data.temperature}&#176`
            temperatureHigh.innerHTML = `High: ${data.tempHigh}&#176`
            temperatureLow.innerHTML = `Low: ${data.tempLow}&#176`
            lat.textContent = `Latitude: ${data.lat}`
            long.textContent  =`Longitude: ${data.long}`
            time.textContent  = data.time
            windSpeed.textContent  = `wind: ${data.windSpeed}`
            humidity.textContent = `Humidity: ${data.humidity}`
            cloud.textContent = `Cloud: ${data.cloudCover}`
        }
    })
})
})
