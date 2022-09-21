import React, {useState} from 'react';
import './App.css';
import {weatherAPI} from "../../services/WeatherService";
import {locationAPI} from "../../services/LocationServices";

function App() {
    const {data: currentWeather, error: weatherError, isLoading: weatherIsLoading} = weatherAPI.useGetWeatherQuery({lat: 16.9690004,lon: 7.950976});
    const {data: currentLocation, error: locationError, isLoading: locationIsLoading} = locationAPI.useGetLocationQuery('Эйгерды');

    console.log(currentLocation);

    const [inputText, setInputText] = useState<string>('');
    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.currentTarget.value);
    }



    return (
        <div className="App">
            <span>Текущий город: {weatherIsLoading ? '--/--' : currentWeather && currentWeather.name}</span>
            <div>
                <input value={inputText} onChange={inputChangeHandler} type="text"/>
                <button>Найти</button>
            </div>
            <div>
                <span>Результаты поиска:</span>
            </div>
            {currentWeather && <img src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`} alt="weather_icon"/>}
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
