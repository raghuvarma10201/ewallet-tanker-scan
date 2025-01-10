import { Component, OnInit } from '@angular/core';
import { IonicSlides, MenuController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs';

import { IonLoaderService } from 'src/app/shared/ion-loader.service';
import { LoaderService } from 'src/app/shared/loader.service';
@Component({
  selector: 'app-ticket-scan',
  templateUrl: './ticket-scan.page.html',
  styleUrls: ['./ticket-scan.page.scss'],
})
export class TicketScanPage  implements OnInit {
  swiperModules = [IonicSlides];
  moduleId:any
  bannerImg:any
  baseimg=environment.imgUrl
  userDetails: any='';
  userType: any='';
  receivedMessage: boolean = false;
  constructor(private menu: MenuController,
    private loaderService: LoaderService,) { }

  ngOnInit() {
    
   
  }

  receiveMessage(message:any) {
    this.receivedMessage = message;
    console.log("receivedMessage---------", this.receivedMessage);
  }


}
