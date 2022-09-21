import React, {useState} from 'react';
import './App.css';
import {weatherAPI} from "../../services/WeatherService";
import {locationAPI} from "../../services/LocationServices";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {setLocation} from "../../store/reducers/location.slice";

function App() {
    const {lat, lon} = useAppSelector(state => state.locationReducer);
    const dispatch = useAppDispatch();

    const [inputText, setInputText] = useState<string>('');
    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.currentTarget.value);
    }

    const {data: currentLocation, error: locationError, isLoading: locationIsLoading} = locationAPI.useGetLocationQuery(inputText);
    const {data: currentWeather, error: weatherError, isLoading: weatherIsLoading} = weatherAPI.useGetWeatherQuery({lat,lon});

    console.log(currentLocation);

    return (
        <div className="App">
            <span>Текущий город: {weatherIsLoading ? '--/--' : currentWeather && currentWeather.name}</span>
            <div>
                <input value={inputText} onChange={inputChangeHandler} type="text"/>
                <button>Найти</button>
                <div>
                    {inputText && currentLocation && currentLocation.map(item => (
                        <div>
                            <span onClick={() => {dispatch(setLocation({lat: item.lat, lon: item.lon}))}}>{item.name} ({item.country})</span>
                        </div>
                    ))}
                </div>
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
