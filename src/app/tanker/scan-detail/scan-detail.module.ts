import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanDetailPageRoutingModule } from './scan-detail-routing.module';

import { ScanDetailPage } from './scan-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanDetailPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ScanDetailPage]
})
export class ScanDetailPageModule {}
