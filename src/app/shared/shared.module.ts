import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchComponent } from './search/search.component';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import { ErrorComponent } from '../error/error.component';

@NgModule({
  declarations: [
    SearchComponent,
    WeatherCardComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SearchComponent,
    WeatherCardComponent,
    ErrorComponent
  ]
})
export class SharedModule { }
