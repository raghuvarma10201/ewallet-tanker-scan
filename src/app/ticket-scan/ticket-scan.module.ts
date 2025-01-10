import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TicketScanRoutingModule } from './ticket-scan-routing.module';
import { TicketScanPage } from './ticket-scan.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketScanRoutingModule,
  ],
  providers :[],
  declarations: [TicketScanPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class TicketScanModule { }
