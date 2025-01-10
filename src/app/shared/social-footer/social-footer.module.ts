import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialFooterRoutingModule } from './social-footer-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import{SocialFooterComponent}from './social-footer.component';

@NgModule({
  declarations: [SocialFooterComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocialFooterRoutingModule, 
  ],
  exports:[SocialFooterComponent]
})
export class SocialFooterModule { }
