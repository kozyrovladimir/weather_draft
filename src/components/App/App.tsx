import React from 'react';
import './App.css';
import {CurrentWeather, weatherAPI} from "../../services/WeatherService";

function App() {
    const {data: currentWeather, error: weatherError, isLoading: weatherIsLoading} = weatherAPI.useGetWeatherQuery({lat: 53.6841076,lon: 23.850851});


    return (
        <div className="App">
            <span>Текущий город: {weatherIsLoading ? '--/--' : currentWeather && currentWeather.name}</span>
            <div>
                <input type="text"/>
                <button>Найти</button>
            </div>
            <div>
                <span>Результаты поиска:</span>
            </div>
            <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather_icon"/>
            <div>
                <span>Температура: {weatherIsLoading ? '--/--' : currentWeather && currentWeather.main.temp}</span>
            </div>
            <div>
                <span>Погода: {weatherIsLoading ? '--/--' : currentWeather && currentWeather.weather[0].description}</span>
            </div>
            <div>
                <span>Ветер: {weatherIsLoading ? '--/--' : currentWeather && currentWeather.wind.speed}</span>
            </div>
            <div>
                <span>Давление: {weatherIsLoading ? '--/--' : currentWeather && currentWeather.main.pressure}</span>
            </div>
            <div>
                <span>Влажность: {weatherIsLoading ? '--/--' : currentWeather && currentWeather.main.humidity}</span>
            </div>
        </div>
    );
}

export default App;
