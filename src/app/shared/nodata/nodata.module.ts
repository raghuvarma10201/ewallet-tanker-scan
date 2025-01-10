import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NodataRoutingModule } from './nodata-routing.module';
import{NodataComponent} from './nodata.component'

@NgModule({
  declarations: [NodataComponent],
  imports: [
    CommonModule,
    IonicModule,
    NodataRoutingModule,   
  ],
  exports:[NodataComponent]
})
export class NodataModule { }
