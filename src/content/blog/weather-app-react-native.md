---
title: "Building a Weather App with React Native"
description: "Create a cross-platform weather application using React Native and OpenWeather API"
pubDate: 2024-03-28
category: "Projects"
author: "Dev Elevate Team"
tags: ["mobile", "react-native", "typescript"]
---

# Building a Weather App with React Native

Let's create a beautiful weather application using React Native that shows current weather conditions and forecasts for multiple locations.

## Project Overview

- **Tech Stack**: React Native, TypeScript, OpenWeather API
- **Difficulty**: Intermediate
- **Time**: 4-6 hours

## Features

1. Current weather display
2. 5-day forecast
3. Location search
4. Weather animations
5. Offline support
6. Dark/Light theme

## Implementation

### 1. Weather Service

```typescript
// src/services/weather.ts
import axios from 'axios';
import { WeatherData, ForecastData } from '../types';

const API_KEY = 'your_api_key';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export class WeatherService {
  static async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    try {
      const response = await axios.get(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching weather:', error);
      throw error;
    }
  }

  static async getForecast(lat: number, lon: number): Promise<ForecastData> {
    try {
      const response = await axios.get(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw error;
    }
  }
}
```

### 2. Weather Screen

```typescript
// src/screens/WeatherScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ActivityIndicator
} from 'react-native';
import { WeatherService } from '../services/weather';
import { WeatherIcon } from '../components/WeatherIcon';
import { ForecastList } from '../components/ForecastList';
import { useLocation } from '../hooks/useLocation';
import { useTheme } from '../hooks/useTheme';

export const WeatherScreen: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const { location, loading: locationLoading } = useLocation();
  const { theme } = useTheme();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    if (location) {
      fetchWeatherData();
    }
  }, [location]);

  const fetchWeatherData = async () => {
    try {
      const [weatherData, forecastData] = await Promise.all([
        WeatherService.getCurrentWeather(
          location.latitude,
          location.longitude
        ),
        WeatherService.getForecast(
          location.latitude,
          location.longitude
        )
      ]);

      setWeather(weatherData);
      setForecast(forecastData);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }).start();
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  if (locationLoading || !weather) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: theme.background, opacity: fadeAnim }
      ]}
    >
      <View style={styles.currentWeather}>
        <Text style={[styles.temperature, { color: theme.text }]}>
          {Math.round(weather.main.temp)}°C
        </Text>
        <WeatherIcon
          condition={weather.weather[0].main}
          size={100}
        />
        <Text style={[styles.description, { color: theme.text }]}>
          {weather.weather[0].description}
        </Text>
      </View>

      <View style={styles.details}>
        <WeatherDetail
          label="Humidity"
          value={`${weather.main.humidity}%`}
          icon="water"
        />
        <WeatherDetail
          label="Wind"
          value={`${weather.wind.speed} m/s`}
          icon="wind"
        />
        <WeatherDetail
          label="Pressure"
          value={`${weather.main.pressure} hPa`}
          icon="gauge"
        />
      </View>

      {forecast && (
        <ForecastList
          data={forecast.list}
          theme={theme}
        />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  loadingContainer: {
    flex: 1,
    justifyContent:  ```typescript
    justifyContent: 'center',
    alignItems: 'center'
  },
  currentWeather: {
    alignItems: 'center',
    marginBottom: 30
  },
  temperature: {
    fontSize: 72,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 24,
    marginTop: 10
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30
  }
});
```

### 3. Weather Icon Component

```typescript
// src/components/WeatherIcon.tsx
import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  condition: string;
  size: number;
}

export const WeatherIcon: React.FC<Props> = ({ condition, size }) => {
  const getIconName = () => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return 'sunny';
      case 'clouds':
        return 'cloudy';
      case 'rain':
        return 'rainy';
      case 'snow':
        return 'snow';
      case 'thunderstorm':
        return 'thunderstorm';
      default:
        return 'help-circle';
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons
        name={getIconName()}
        size={size}
        color="#000"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  }
});
```

### 4. Forecast List Component

```typescript
// src/components/ForecastList.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';
import { WeatherIcon } from './WeatherIcon';
import { Theme } from '../types';

interface Props {
  data: any[];
  theme: Theme;
}

export const ForecastList: React.FC<Props> = ({ data, theme }) => {
  const groupByDay = (list: any[]) => {
    return list.reduce((acc, item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
  };

  const groupedData = groupByDay(data);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>
        5-Day Forecast
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Object.entries(groupedData).map(([date, items]: [string, any[]]) => (
          <View
            key={date}
            style={[styles.dayContainer, { backgroundColor: theme.cardBackground }]}
          >
            <Text style={[styles.date, { color: theme.text }]}>
              {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
            </Text>
            <WeatherIcon
              condition={items[0].weather[0].main}
              size={40}
            />
            <Text style={[styles.temp, { color: theme.text }]}>
              {Math.round(items[0].main.temp)}°C
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  dayContainer: {
    padding: 15,
    marginRight: 10,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 100
  },
  date: {
    marginBottom: 5
  },
  temp: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5
  }
});
```

### 5. Location Hook

```typescript
// src/hooks/useLocation.ts
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export const useLocation = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permission to access location was denied');
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { location, loading, error };
};
```

## Project Structure

```
src/
  components/
    WeatherIcon.tsx
    ForecastList.tsx
    WeatherDetail.tsx
  screens/
    WeatherScreen.tsx
  services/
    weather.ts
  hooks/
    useLocation.ts
    useTheme.ts
  types/
    index.ts
  utils/
    storage.ts
  App.tsx
```

## Key Learning Points

1. React Native development
2. API integration
3. Location services
4. Animations
5. Custom hooks
6. TypeScript with React Native
7. Theme implementation

## Next Steps

1. Add multiple locations
2. Implement weather alerts
3. Add weather maps
4. Create widgets
5. Add push notifications
6. Implement weather sharing

Remember to handle edge cases and implement proper error boundaries throughout the application!