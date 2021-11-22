import { Component, HostBinding, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],

})
export class SearchComponent implements OnDestroy {
  @HostBinding('class') class = "search";

  public subscription: Subscription = new Subscription;
  public currentCity: string = "";

  constructor(private weatherService: WeatherService) {
    this.subscription = this.weatherService.currentLocation.subscribe((currentLocation) => {
      this.currentCity = currentLocation.city || currentLocation.name;
    });
  }

  setCurrentCity() {
    if (this.currentCity.length) {
      this.weatherService.setCurrentCity(this.currentCity);
      this.weatherService.getCityGeolocation(this.currentCity).subscribe(
        (res) => {
          if (res.length) {
            this.weatherService.setCurrentLocation(res[0]);
            this.weatherService.setError("");
          }
          else {
            this.weatherService.setError("City not found");
          }
        },
        (err) => {
          this.weatherService.setError(err.error.message)
        }
      )
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
