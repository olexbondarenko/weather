import { Component, OnDestroy } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { Subscription, combineLatest } from 'rxjs';
import { CurrentWeather, ForecastWeather } from 'src/app/interfaces/weather';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnDestroy {
  public subscription: Subscription = new Subscription;
  public errorMessage: string = "";
  public currentUnits: string = "";
  public currentCity: string = "";
  public currentWeather: CurrentWeather = {
    dt: 0,
    temp: 0,
    feels_like: 0,
    humidity: 0,
    pressure: 0,
    wind_gust: 0,
    wind_speed: 0,
    sunrise: 0,
    sunset: 0,
    weather: []
  };
  public forecastWeather: ForecastWeather[] = [];

  constructor(private weatherService: WeatherService) {
    this.subscription = combineLatest([
      this.weatherService.currentLocation,
      this.weatherService.currentUnits,
      this.weatherService.errorMessage
    ]).subscribe(([currentLocation, currentUnits, errorMessage]) => {
      this.currentCity = currentLocation.city || currentLocation.name;
      this.currentUnits = currentUnits;
      this.errorMessage = errorMessage;

      this.weatherService.getCurrentWeather().subscribe(
        (response) => {
          this.currentWeather = response.current;
          this.forecastWeather = Object.values(response.daily).slice(1);
        },
        (error) => {
          this.weatherService.setError(error.statusText);
          this.subscription.unsubscribe();
        }
      )
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
