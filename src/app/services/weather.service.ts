import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Weather } from '../interfaces/weather';
import { Units } from '../interfaces/units';
import { Geolocation } from '../interfaces/geolocation';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  // Api settings
  private api = {
    key: environment.config.apiKey,
    url: "https://api.openweathermap.org/data/2.5",
    urlGeo: "http://api.openweathermap.org/geo/1.0",
    points: {
      current: "/onecall",
      historical: "/onecall/timemachine",
      geo: "/direct"
    }
  }

  // Units variables
  public currentUnits: BehaviorSubject<string> = new BehaviorSubject("metric");
  public units: BehaviorSubject<Units[]> = new BehaviorSubject([
    {
      name: "metric",
      icon: "celsius",
      isActive: true
    },
    {
      name: "imperial",
      icon: "fahrenheit",
      isActive: false
    }
  ]);

  // Geolocation variables
  public currentCity: BehaviorSubject<string> = new BehaviorSubject("");
  public currentLocation: BehaviorSubject<Geolocation> = new BehaviorSubject<Geolocation>({
    lat: 0,
    lon: 0,
    city: "",
    name: "",
    regionName: "",
  });

  // Error variables
  public errorMessage: BehaviorSubject<string> = new BehaviorSubject("");

  constructor(private http: HttpClient) { }


  // Set errors if has bad request
  setError(message: string): void {
    this.errorMessage.next(message);
  }

  // Changes active units also set current
  setUnits(units: any, currentUnits: string): void {
    this.units.next(units);
    this.currentUnits.next(currentUnits);
  }

  // Set current location
  setCurrentLocation(currentLocation: Geolocation): void {
    this.currentLocation.next(currentLocation);
    this.currentCity.next(currentLocation.city);
    this.currentCity.next(currentLocation.name);
  }

  // Set city name
  setCurrentCity(currentCity: string): void {
    this.currentCity.next(currentCity)
  }

  // Returns timestamp from current date
  getTimestamp(daysBefore: number): number {
    let date: Date = new Date();
    date.setDate(date.getDate() - daysBefore);
    return Date.parse(date.toString()) / 1000;
  }

  // Get coordinates by city name and set current location
  getCityGeolocation(currentCity: string): Observable<Geolocation[]> {
    let params = {
      q: currentCity,
      appid: this.api.key,
    }
    return this.http.get<Geolocation[]>(this.api.urlGeo + this.api.points.geo, { params })
  }

  // Gets current weather data and also for 5 next days
  getCurrentWeather(): Observable<Weather> {
    let params = {
      lat: this.currentLocation.getValue().lat,
      lon: this.currentLocation.getValue().lon,
      exclude: "minutely,hourly,alerts",
      units: this.currentUnits.getValue(),
      appid: this.api.key,
    };
    return this.http.get<Weather>(this.api.url + this.api.points.current, { params });
  }

  // Gets historical weather data for 5 previous days
  getHistoricalWeather(day: number): Observable<Weather> {
    let params = {
      lat: this.currentLocation.getValue().lat,
      lon: this.currentLocation.getValue().lon,
      units: this.currentUnits.getValue(),
      appid: this.api.key,
      dt: this.getTimestamp(day),
    };
    return this.http.get<Weather>(this.api.url + this.api.points.historical, { params });
  }
}