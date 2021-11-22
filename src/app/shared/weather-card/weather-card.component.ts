import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})

export class WeatherCardComponent {
  @Input() weather: any = {};
  @Input() currentUnits: string = "";

  getTimesOfDay() {
    let date = new Date();
    let hours = date.getHours();
    let timesOfDay = "";

    if (hours >= 6 && hours <= 12) {
      timesOfDay = "morn"
    }
    else if (hours >= 12 && hours <= 18) {
      timesOfDay = "day"
    }
    else if (hours > 18 && hours <= 24) {
      timesOfDay = "eve"
    }
    else if (hours >= 0 && hours <= 6) {
      timesOfDay = "night"
    }
    return timesOfDay;
  }


}
