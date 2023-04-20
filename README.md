# Weather App

A solution to theodinproject's weather app project.

> Create a weather forecast site using the weather API from the previous lesson. You should be able to search for a specific location and toggle displaying the data in Fahrenheit or Celsius.

Used the fetch api to get the current weather data using the endpoint: `/current/.json`.
The parameter `q=auto:ip` -> Calculates the location based on the ip address.

The response body of this request:

```json
{
  "location": {
    "name": "London",
    "region": "City of London, Greater London",
    "country": "United Kingdom",
    "lat": 51.52,
    "lon": -0.11,
    "tz_id": "Europe/London",
    "localtime_epoch": 1681204904,
    "localtime": "2023-04-11 10:21"
  },
  "current": {
    "last_updated_epoch": 1681204500,
    "last_updated": "2023-04-11 10:15",
    "temp_c": 10.0,
    "temp_f": 50.0,
    "is_day": 1,
    "condition": {
      "text": "Partly cloudy",
      "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
      "code": 1003
    },
    "wind_mph": 16.1,
    "wind_kph": 25.9,
    "wind_degree": 250,
    "wind_dir": "WSW",
    "pressure_mb": 1013.0,
    "pressure_in": 29.91,
    "precip_mm": 0.0,
    "precip_in": 0.0,
    "humidity": 71,
    "cloud": 25,
    "feelslike_c": 7.5,
    "feelslike_f": 45.6,
    "vis_km": 10.0,
    "vis_miles": 6.0,
    "uv": 4.0,
    "gust_mph": 13.2,
    "gust_kph": 21.2
  }
}
```
