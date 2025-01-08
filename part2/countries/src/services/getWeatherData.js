import { fetchWeatherApi } from 'openmeteo';

const getWeatherData = async (latitude, longitude) => {
    const params = {
        latitude,
        longitude,
        "current": ["temperature_2m", "cloud_cover", "wind_speed_10m"],
        "wind_speed_unit": "ms",
        "timezone": "auto"
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);
    
    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];
    
    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    
    const current = response.current();
    
    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature2m: [current.variables(0).value(), '°C'],
            cloudCover: [current.variables(1).value(),'%'],
            windSpeed10m: [current.variables(2).value(), 'm/s']
        }
    };

    // `weatherData` now contains a simple structure with arrays for datetime and weather data
    return weatherData

}

export default getWeatherData
