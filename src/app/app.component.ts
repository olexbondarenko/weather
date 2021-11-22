import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GeolocationService } from './services/geolocation.service';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy {
  public subscription = new Subscription;

  constructor(private geolocation: GeolocationService, private weatherService: WeatherService) {
    this.subscription = this.geolocation.getCurrentLocation().subscribe(
      (response) => {
        this.weatherService.setCurrentLocation(response);
      },
      (error) => {
        this.weatherService.setError(error.statusText);
        this.subscription.unsubscribe();
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
