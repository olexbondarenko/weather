export interface Weather {
    current: CurrentWeather;
    daily: ForecastWeather;
}

export interface CurrentWeather extends DefaultFields {
    temp: number;
    feels_like: number;
    weather: WeatherFields[];
}

export interface ForecastWeather extends DefaultFields {
    temp: TempFields;
    feels_like: FeelsLikeFields;
    weather: WeatherFields[];
}

export interface DefaultFields {
    dt: number;
    humidity: number;
    pressure: number;
    wind_gust: number;
    wind_speed: number;
    sunrise: number;
    sunset: number;
}

export interface TempFields {
    day: number;
    eve: number;
    max: number;
    min: number;
    morn: number;
    night: number;
}

export interface FeelsLikeFields {
    day: number;
    eve: number;
    morn: number;
    night: number;
}

export interface WeatherFields {
    icon: string;
    description: string;
    main: string;
}