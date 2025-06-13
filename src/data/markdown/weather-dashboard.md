# Weather Dashboard

A modern, responsive weather dashboard that provides comprehensive weather information with beautiful visualizations and interactive maps.

## Overview

This weather dashboard delivers real-time weather data, forecasts, and interactive visualizations in a clean, user-friendly interface. Built with React and modern web technologies for optimal performance and user experience.

## Key Features

### Weather Information
- **Current Conditions**: Real-time weather data with detailed metrics
- **7-Day Forecast**: Extended weather predictions with hourly breakdowns
- **Weather Maps**: Interactive radar and satellite imagery
- **Weather Alerts**: Severe weather warnings and notifications
- **Historical Data**: Past weather trends and comparisons
- **Multiple Locations**: Track weather for multiple cities

### Visualizations
- **Interactive Charts**: Temperature, precipitation, and wind patterns
- **Weather Maps**: Radar, satellite, and temperature overlays
- **Trend Analysis**: Historical weather pattern visualization
- **Responsive Design**: Optimized for all screen sizes

## Technology Stack

### Frontend Implementation
```jsx
// Main Dashboard Component
import React, { useState, useEffect } from 'react';
import { WeatherAPI } from '../services/weatherAPI';
import WeatherCard from '../components/WeatherCard';
import ForecastChart from '../components/ForecastChart';
import WeatherMap from '../components/WeatherMap';

const WeatherDashboard = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('New York');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeatherData(selectedLocation);
  }, [selectedLocation]);

  const fetchWeatherData = async (location) => {
    setLoading(true);
    try {
      const [current, forecastData] = await Promise.all([
        WeatherAPI.getCurrentWeather(location),
        WeatherAPI.getForecast(location, 7)
      ]);
      
      setCurrentWeather(current);
      setForecast(forecastData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="weather-dashboard">
      <header className="dashboard-header">
        <h1>Weather Dashboard</h1>
        <LocationSelector 
          value={selectedLocation}
          onChange={setSelectedLocation}
        />
      </header>

      <div className="dashboard-grid">
        <WeatherCard weather={currentWeather} />
        <ForecastChart data={forecast} />
        <WeatherMap location={selectedLocation} />
        <WeatherAlerts location={selectedLocation} />
      </div>
    </div>
  );
};

export default WeatherDashboard;
```

### Weather API Service
```javascript
// services/weatherAPI.js
class WeatherAPI {
  constructor() {
    this.apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
    this.baseURL = 'https://api.openweathermap.org/data/2.5';
  }

  async getCurrentWeather(location) {
    try {
      const response = await fetch(
        `${this.baseURL}/weather?q=${location}&appid=${this.apiKey}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not found');
      }
      
      const data = await response.json();
      return this.formatCurrentWeather(data);
    } catch (error) {
      throw new Error(`Failed to fetch current weather: ${error.message}`);
    }
  }

  async getForecast(location, days = 5) {
    try {
      const response = await fetch(
        `${this.baseURL}/forecast?q=${location}&appid=${this.apiKey}&units=metric&cnt=${days * 8}`
      );
      
      const data = await response.json();
      return this.formatForecastData(data);
    } catch (error) {
      throw new Error(`Failed to fetch forecast: ${error.message}`);
    }
  }

  formatCurrentWeather(data) {
    return {
      location: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: data.wind.speed,
      windDirection: data.wind.deg,
      visibility: data.visibility / 1000,
      uvIndex: data.uvi || 0,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      sunrise: new Date(data.sys.sunrise * 1000),
      sunset: new Date(data.sys.sunset * 1000)
    };
  }

  formatForecastData(data) {
    return data.list.map(item => ({
      date: new Date(item.dt * 1000),
      temperature: Math.round(item.main.temp),
      minTemp: Math.round(item.main.temp_min),
      maxTemp: Math.round(item.main.temp_max),
      humidity: item.main.humidity,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      windSpeed: item.wind.speed,
      precipitation: item.rain?.['3h'] || 0
    }));
  }
}

export default new WeatherAPI();
```

## Interactive Components

### Weather Card Component
```jsx
// components/WeatherCard.jsx
import React from 'react';
import { WiThermometer, WiHumidity, WiBarometer, WiStrongWind } from 'react-icons/wi';

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  return (
    <div className="weather-card">
      <div className="weather-main">
        <div className="temperature-section">
          <img 
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
            className="weather-icon"
          />
          <div className="temperature">
            <span className="temp-value">{weather.temperature}°</span>
            <span className="temp-unit">C</span>
          </div>
        </div>
        
        <div className="weather-info">
          <h2 className="location">{weather.location}, {weather.country}</h2>
          <p className="description">{weather.description}</p>
          <p className="feels-like">Feels like {weather.feelsLike}°C</p>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <WiHumidity className="detail-icon" />
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{weather.humidity}%</span>
        </div>
        
        <div className="detail-item">
          <WiBarometer className="detail-icon" />
          <span className="detail-label">Pressure</span>
          <span className="detail-value">{weather.pressure} hPa</span>
        </div>
        
        <div className="detail-item">
          <WiStrongWind className="detail-icon" />
          <span className="detail-label">Wind</span>
          <span className="detail-value">{weather.windSpeed} m/s</span>
        </div>
        
        <div className="detail-item">
          <WiThermometer className="detail-icon" />
          <span className="detail-label">Visibility</span>
          <span className="detail-value">{weather.visibility} km</span>
        </div>
      </div>

      <div className="sun-times">
        <div className="sun-time">
          <span className="sun-label">Sunrise</span>
          <span className="sun-value">{weather.sunrise.toLocaleTimeString()}</span>
        </div>
        <div className="sun-time">
          <span className="sun-label">Sunset</span>
          <span className="sun-value">{weather.sunset.toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
```

### Forecast Chart Component
```jsx
// components/ForecastChart.jsx
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const ForecastChart = ({ data }) => {
  const chartData = data.slice(0, 24).map(item => ({
    time: item.date.toLocaleTimeString('en-US', { hour: '2-digit' }),
    temperature: item.temperature,
    precipitation: item.precipitation,
    humidity: item.humidity
  }));

  return (
    <div className="forecast-chart">
      <h3>24-Hour Forecast</h3>
      
      <div className="chart-container">
        <div className="temperature-chart">
          <h4>Temperature (°C)</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value}°C`, 'Temperature']}
                labelStyle={{ color: '#333' }}
              />
              <Line 
                type="monotone" 
                dataKey="temperature" 
                stroke="#ff6b6b" 
                strokeWidth={2}
                dot={{ fill: '#ff6b6b', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="precipitation-chart">
          <h4>Precipitation (mm)</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value}mm`, 'Precipitation']}
              />
              <Bar dataKey="precipitation" fill="#4ecdc4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ForecastChart;
```

### Interactive Weather Map
```jsx
// components/WeatherMap.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const WeatherMap = ({ location }) => {
  const [mapCenter, setMapCenter] = useState([40.7128, -74.0060]); // Default to NYC
  const [weatherLayer, setWeatherLayer] = useState('temp');

  const weatherLayers = {
    temp: 'https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png',
    precipitation: 'https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png',
    clouds: 'https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png',
    wind: 'https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png'
  };

  useEffect(() => {
    // Geocode location to get coordinates
    geocodeLocation(location);
  }, [location]);

  const geocodeLocation = async (locationName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${locationName}&limit=1&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
      );
      const data = await response.json();
      
      if (data.length > 0) {
        setMapCenter([data[0].lat, data[0].lon]);
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
  };

  return (
    <div className="weather-map">
      <div className="map-controls">
        <h3>Weather Map</h3>
        <div className="layer-selector">
          {Object.keys(weatherLayers).map(layer => (
            <button
              key={layer}
              className={`layer-btn ${weatherLayer === layer ? 'active' : ''}`}
              onClick={() => setWeatherLayer(layer)}
            >
              {layer.charAt(0).toUpperCase() + layer.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="map-container">
        <MapContainer
          center={mapCenter}
          zoom={10}
          style={{ height: '400px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          <TileLayer
            url={`${weatherLayers[weatherLayer]}?appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`}
            opacity={0.6}
          />
          
          <Marker position={mapCenter}>
            <Popup>
              Current location: {location}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default WeatherMap;
```

## Styling and Responsive Design

### CSS Grid Layout
```css
/* styles/dashboard.css */
.weather-dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
  padding: 20px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.weather-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.weather-card:hover {
  transform: translateY(-5px);
}

.temperature-section {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.temperature {
  font-size: 4rem;
  font-weight: 300;
  color: #2d3436;
}

.weather-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-top: 20px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: rgba(116, 185, 255, 0.1);
  border-radius: 10px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .weather-card {
    padding: 20px;
  }
  
  .temperature {
    font-size: 3rem;
  }
  
  .weather-details {
    grid-template-columns: 1fr;
  }
}
```

## Data Management

### Local Storage for Preferences
```javascript
// utils/storage.js
export const StorageManager = {
  setFavoriteLocations(locations) {
    localStorage.setItem('favoriteLocations', JSON.stringify(locations));
  },

  getFavoriteLocations() {
    const stored = localStorage.getItem('favoriteLocations');
    return stored ? JSON.parse(stored) : [];
  },

  setTemperatureUnit(unit) {
    localStorage.setItem('temperatureUnit', unit);
  },

  getTemperatureUnit() {
    return localStorage.getItem('temperatureUnit') || 'celsius';
  },

  setTheme(theme) {
    localStorage.setItem('theme', theme);
  },

  getTheme() {
    return localStorage.getItem('theme') || 'light';
  }
};
```

### Context for Global State
```jsx
// context/WeatherContext.jsx
import React, { createContext, useContext, useReducer } from 'react';

const WeatherContext = createContext();

const weatherReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_WEATHER':
      return { ...state, currentWeather: action.payload };
    case 'SET_FORECAST':
      return { ...state, forecast: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, {
    currentWeather: null,
    forecast: [],
    loading: false,
    error: null
  });

  return (
    <WeatherContext.Provider value={{ state, dispatch }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within WeatherProvider');
  }
  return context;
};
```

## Performance Optimizations

### Memoization and Caching
```javascript
// hooks/useWeatherData.js
import { useState, useEffect, useMemo } from 'react';
import { WeatherAPI } from '../services/weatherAPI';

export const useWeatherData = (location) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cache weather data for 10 minutes
  const cacheKey = `weather_${location}`;
  const cacheTimeout = 10 * 60 * 1000; // 10 minutes

  useEffect(() => {
    const fetchData = async () => {
      // Check cache first
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const { data: cachedData, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < cacheTimeout) {
          setData(cachedData);
          setLoading(false);
          return;
        }
      }

      try {
        setLoading(true);
        const weatherData = await WeatherAPI.getCurrentWeather(location);
        
        // Cache the data
        localStorage.setItem(cacheKey, JSON.stringify({
          data: weatherData,
          timestamp: Date.now()
        }));
        
        setData(weatherData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location, cacheKey]);

  const memoizedData = useMemo(() => data, [data]);

  return { data: memoizedData, loading, error };
};
```

## Testing

### Component Testing
```javascript
// tests/WeatherCard.test.js
import { render, screen } from '@testing-library/react';
import WeatherCard from '../components/WeatherCard';

const mockWeatherData = {
  location: 'New York',
  country: 'US',
  temperature: 22,
  description: 'Clear sky',
  humidity: 65,
  windSpeed: 3.5
};

describe('WeatherCard', () => {
  test('renders weather information correctly', () => {
    render(<WeatherCard weather={mockWeatherData} />);
    
    expect(screen.getByText('New York, US')).toBeInTheDocument();
    expect(screen.getByText('22°')).toBeInTheDocument();
    expect(screen.getByText('Clear sky')).toBeInTheDocument();
    expect(screen.getByText('65%')).toBeInTheDocument();
  });

  test('handles null weather data gracefully', () => {
    render(<WeatherCard weather={null} />);
    expect(screen.queryByText('New York')).not.toBeInTheDocument();
  });
});
```

## Deployment

### Environment Configuration
```bash
# .env.production
REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
REACT_APP_MAPBOX_TOKEN=your_mapbox_token
REACT_APP_API_BASE_URL=https://api.yourweatherapp.com
```

### Build Optimization
```javascript
// webpack.config.js (if ejected)
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        charts: {
          test: /[\\/]node_modules[\\/](recharts|d3)[\\/]/,
          name: 'charts',
          chunks: 'all',
        }
      }
    }
  }
};
```

## Future Enhancements

- **Weather Notifications**: Push notifications for severe weather
- **Historical Analysis**: Long-term weather trend analysis
- **Air Quality Index**: Air pollution and quality metrics
- **Weather Widgets**: Embeddable weather widgets
- **Mobile App**: React Native mobile application
- **Voice Integration**: Voice-activated weather queries

## API Documentation

### OpenWeather API Integration
- Current weather data
- 5-day/3-hour forecast
- Weather maps and layers
- Geocoding services
- Weather alerts

## Contributing

We welcome contributions! Please read our contributing guidelines and submit pull requests for improvements.

## License

This project is licensed under the MIT License.