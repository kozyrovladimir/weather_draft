import React, {useState} from 'react';
import './App.css';
import {weatherAPI} from "../../services/WeatherService";
import {locationAPI} from "../../services/LocationServices";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {setLocation} from "../../store/reducers/location.slice";
import {useDebounce} from "../../hooks/useDebounce";

function App() {
    const {lat, lon} = useAppSelector(state => state.locationReducer);
    const dispatch = useAppDispatch();

    const [value, setValue] = useState<string>('');
    const debouncedValue = useDebounce(value, 1000);

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    }

    const {data: currentLocation, error: locationError, isLoading: locationIsLoading} = locationAPI.useGetLocationQuery(debouncedValue);
    const {data: currentWeather, error: weatherError, isLoading: weatherIsLoading} = weatherAPI.useGetWeatherQuery({lat,lon});

    console.log(currentLocation);

    return (
        <div className="App">
            <span>Текущий город: {weatherIsLoading ? '--/--' : currentWeather && currentWeather.name}</span>
            <div>
                <input value={value} onChange={inputChangeHandler} type="text"/>
                <button>Найти</button>
                <div>
                    {debouncedValue && currentLocation && currentLocation.map(item => (
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
