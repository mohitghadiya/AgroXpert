  "use client"

  import { useEffect, useState } from "react"
  import axios from "axios"
  import { toast } from "react-toastify"

  const WeatherForecast = () => {
    const [location, setLocation] = useState("Amreli")
    const [weatherData, setWeatherData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const API_KEY = "9b6985e1b7ff2fa30f16105e9c24406f"

    const fetchWeather = async () => {
      if (!location.trim()) {
        toast.warning("Please enter a city name")
        return
      }
      
      setIsLoading(true)
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`,
        )
        setWeatherData(res.data)
        toast.success(`Weather loaded for ${location}`)
      } catch (err) {
        console.error(err)
        toast.error("Failed to load weather data. Please check the city name.")
      } finally {
        setIsLoading(false)
      }
    }

    const groupForecastByDate = (list) => {
      const groups = {}
      list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0]
        if (!groups[date]) groups[date] = []
        groups[date].push(item)
      })
      return groups
    }

    useEffect(() => {
      fetchWeather()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 py-8 px-4 sm:px-6 lg:px-8 transition-all duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 border border-gray-100 relative overflow-hidden transition-all duration-300">
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-200 rounded-full opacity-20"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-sky-200 rounded-full opacity-10"></div>
            
            <h3 className="text-3xl font-bold text-sky-900 mb-6 md:mb-8 flex items-center gap-2 animate-pulse">
              <span className="inline-block animate-bounce">☁</span>
              <span>5-Day Weather Forecast</span>
            </h3>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="flex-1 transition-all duration-300">
                <input
                  type="text"
                  className="w-full border border-sky-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-300 px-4 py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md text-gray-800 text-lg"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
                  placeholder="Enter City"
                />
              </div>
              <div className="transition-all duration-300">
                <button
                  onClick={fetchWeather}
                  disabled={isLoading}
                  className={`w-full sm:w-auto ${isLoading ? 'bg-sky-400' : 'bg-sky-600'} text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-sky-700 transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                      </svg>
                      Refresh Forecast
                    </>
                  )}
                </button>
              </div>
            </div>

            {weatherData ? (
              <div className="transition-all duration-300">
                <div className="font-medium text-xl mb-6 text-sky-800 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {weatherData.city.name}, {weatherData.city.country}
                </div>

                <div className="space-y-8">
                  {Object.entries(groupForecastByDate(weatherData.list))
                    .slice(0, 5)
                    .map(([date, forecasts]) => (
                      <div 
                        key={date} 
                        className="mb-8 last:mb-0 bg-sky-50/50 p-4 sm:p-6 rounded-xl border border-sky-100 transition-all duration-300 hover:shadow-md"
                      >
                        <h4 className="text-lg font-semibold mb-4 text-sky-700 flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:pl-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          {new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                          {forecasts.map((item, idx) => (
                            <div
                              key={idx}
                              className="bg-white p-4 rounded-xl shadow-sm border border-sky-100 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
                            >
                              <div className="font-semibold text-sky-800 mb-2 flex items-center gap-2">
                                🕒
                                {new Date(item.dt_txt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </div>
                              <div className="flex items-center gap-2 text-gray-700 text-base mb-1">
                                <span className="text-xl">🌡️</span>
                                Temp: {Math.round(item.main.temp)}°C
                              </div>
                              <div className="flex items-center gap-2 text-gray-700 text-base mb-1">
                                <WeatherIcon code={item.weather[0].icon} />
                                {item.weather[0].description}
                              </div>
                              <div className="flex items-center gap-2 text-gray-700 text-base">
                                <span className="text-xl">💨</span>
                                Wind: {item.wind.speed} m/s
                              </div>
                              <div className="flex items-center gap-2 text-gray-700 text-base mt-1">
                                <span className="text-xl">💧</span>
                                Humidity: {item.main.humidity}%
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <svg className="animate-spin h-12 w-12 text-sky-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <p className="text-gray-600 text-lg animate-pulse">
                  Loading weather forecast...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  const WeatherIcon = ({ code }) => {
    const iconMap = {
      '01d': '☀️',  // clear sky (day)
      '01n': '🌙',  // clear sky (night)
      '02d': '⛅',  // few clouds (day)
      '02n': '⛅',  // few clouds (night)
      '03d': '☁️',  // scattered clouds
      '03n': '☁️',
      '04d': '☁️',  // broken clouds
      '04n': '☁️',
      '09d': '🌧️',  // shower rain
      '09n': '🌧️',
      '10d': '🌦️',  // rain (day)
      '10n': '🌦️',  // rain (night)
      '11d': '⛈️',  // thunderstorm
      '11n': '⛈️',
      '13d': '❄️',  // snow
      '13n': '❄️',
      '50d': '🌫️',  // mist
      '50n': '🌫️'
    }

    return (
      <span className="inline-block animate-pulse">
        {iconMap[code] || '🌤️'}
      </span>
    )
  }

  export default WeatherForecast