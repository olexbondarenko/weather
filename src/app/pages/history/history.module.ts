import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HistoryRoutingModule } from './history-routing.module';

import { HistoryComponent } from './history.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    HistoryComponent,
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class HistoryModule { }
