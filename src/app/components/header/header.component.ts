import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnDestroy {
  public subscription: Subscription = new Subscription;
  public currentUnits: string = "";
  public units: any = [];
  
  constructor(private weatherService: WeatherService) { 
    this.subscription = this.weatherService.units.subscribe((units: any) => {
      this.units = units;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  changeUnit(index: number) {
    this.units.forEach((unit: any, currentIndex: number) => {
      if (index !== currentIndex) {
        unit.isActive = false;
      }
      else {
        unit.isActive = true;
        this.currentUnits = unit.name;
      }
    })
    this.weatherService.setUnits(this.units, this.currentUnits);
  }
}
