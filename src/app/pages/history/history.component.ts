import { Component, OnDestroy } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { combineLatest, Subscription } from 'rxjs';
import { Weather } from 'src/app/interfaces/weather';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})

export class HistoryComponent implements OnDestroy {
  public subscription: Subscription = new Subscription;
  public title: string = "History";
  public errorMessage: string = "";
  public currentUnits: string = "";
  public historyDays: number = 5;
  public historicalWeather: Weather[] = [];

  constructor(private weatherService: WeatherService) {
    this.subscription = combineLatest([
      this.weatherService.currentUnits,
      this.weatherService.errorMessage
    ]).subscribe(([currentUnits, errorMessage]) => {
      this.currentUnits = currentUnits;
      this.errorMessage = errorMessage;
      this.historicalWeather = [];

      for (let day = 1; day <= this.historyDays; day++) {
        this.weatherService.getHistoricalWeather(day).subscribe(
          (response) => {
            this.historicalWeather.push(response);
          },
          (error) => {
            this.weatherService.setError(error.statusText);
            this.subscription.unsubscribe();
          }
        );
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
