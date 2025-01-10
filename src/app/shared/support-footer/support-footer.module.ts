import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportFooterRoutingModule } from './support-footer-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import{SupportFooterComponent}from './support-footer.component';

@NgModule({
  declarations: [SupportFooterComponent],
  imports: [
    CommonModule,   
    FormsModule,
    IonicModule,
    SupportFooterRoutingModule
  ],
  exports:[SupportFooterComponent]
})
export class SupportFooterModule { }
