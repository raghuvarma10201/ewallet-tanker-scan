import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ModalController } from '@ionic/angular';
import { finalize } from 'rxjs';
import { LoaderService } from 'src/app/shared/loader.service';
import { ScannerServiceService } from 'src/app/shared/scanner.service.service';
import { ScanDetailPage } from 'src/app/tanker/scan-detail/scan-detail.page';
import { TicketDetailsPage } from 'src/app/ticket-scan/ticket-details/ticket-details.page';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {
  scanActive: boolean = false;
  details: any = '';
  attendenceResult: any;
  userId: any = '';
  locationData: any;
  constructor(
    private activatedRouteSer: ActivatedRoute,
    private scannerservice: ScannerServiceService,
    public modalCtrl: ModalController,
    private renderer: Renderer2,
    private loaderServ: LoaderService
  ) {

  }

  ngOnInit() {
    let userInfo: any = localStorage.getItem('userData');
    let locationInfo: any = localStorage.getItem('selectedLocation');
    let userData = JSON.parse(userInfo);
    this.locationData = JSON.parse(locationInfo);
    this.userId = userData.id;
    this.startScanner();
  }
  ionViewWillEnter() {
    this.startScanner();
  }
  activateScanner() {
    this.renderer.addClass(document.body, 'scanner-active');
  }

  deactivateScanner() {
    this.renderer.removeClass(document.body, 'scanner-active');
  }
  async checkPermission() {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        BarcodeScanner.openAppSettings();
        resolve(false);
      }
    });
  }

  async startScanner() {
    const allowed = await this.checkPermission();

    if (allowed) {
      this.scanActive = true;
      BarcodeScanner.hideBackground();
      this.activateScanner();
      const result = await BarcodeScanner.startScan();
      // Handle result here
      console.log('Scanner', result);
      if (result.hasContent) {
        this.deactivateScanner();
        this.scanActive = false;
        console.log(result.content)
        this.getTankerDetails(result.content);
      } else {
        alert('NO DATA FOUND!');
      }
    } else {
      alert('NOT ALLOWED!');
    }
  }

  stopScanner() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

  ionViewWillLeave() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }
  async getTankerDetails(data: any) {
    let payload = {
      "location_id" : parseInt(this.locationData.id),
      "tanker_number": data
    }
    await this.loaderServ.loadingPresent();
    this.scannerservice.getTankerDetails(payload).pipe(finalize(() => {
      this.loaderServ.loadingDismiss();
    })).subscribe(async (resp: any) => {
      console.log("this is the call backmessage", resp.data)
      if (resp.status == 200 && resp.success == true) {
        this.viewTicket(resp.data);
      }else {
        Swal.fire({
          heightAuto : false,
          title: resp.message,
          icon: "error"
        }).then((result) => {
          this.activateScanner();
          this.startScanner(); // Pass the returned data from the modal if needed
        });
      }
    })
  }
  async viewTicket(ticket: any) {
    const modal = await this.modalCtrl.create({
      component: ScanDetailPage,
      componentProps: {
        data: ticket,  // Pass dynamic data
      },
      cssClass: 'custom-height-modal',
      backdropDismiss: true,
      mode: 'ios'
    });
    modal.onDidDismiss().then((modalData) => {
      //this.getTicketDetail(this.ticketId);
      console.log(modalData);

    });
    return await modal.present();
  }
}
