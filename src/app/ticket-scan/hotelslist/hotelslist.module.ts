import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HotelslistPageRoutingModule } from './hotelslist-routing.module';
import { HotelslistPage } from './hotelslist.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import{NodataModule} from 'src/app/shared/nodata/nodata.module';
import{SupportFooterModule} from 'src/app/shared/support-footer/support-footer.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HotelslistPageRoutingModule,
    NodataModule,
    SupportFooterModule
  ],
  declarations: [HotelslistPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HotelslistPageModule {}
