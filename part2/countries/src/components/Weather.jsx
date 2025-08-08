const Weather = ({ weather }) => {
    if (weather === null) {
        return
    }
    const urlIcon = `https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`
    return (
        <div>
            <h2>Weather in {weather.capital}</h2>
            <p>Temperature {weather.temp} celsius</p>
            <img src={urlIcon} />
            <p>Wind {weather.current.wind_speed} m/s</p>
        </div>
    )
}

export default Weather