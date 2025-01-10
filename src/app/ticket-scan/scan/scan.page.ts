import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';
import { ModalController } from '@ionic/angular';
import { finalize } from 'rxjs';
import { LoaderService } from 'src/app/shared/loader.service';
import { ScannerServiceService } from 'src/app/shared/scanner.service.service';
import { TicketDetailsPage } from '../ticket-details/ticket-details.page';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
  scanActive: boolean = false;
  details: any = '';
  moduleId: any = '';
  attendenceResult: any;
  userId: any = '';
  constructor(
    private activatedRouteSer: ActivatedRoute,
    public modalCtrl: ModalController,
    private renderer: Renderer2,
    private scannerservice: ScannerServiceService,
    private loaderServ: LoaderService
  ) {
    this.activatedRouteSer.params.subscribe((params: Params) => {
      console.log('params', params);
      this.details = params["details"]
    });
    console.log(this.details);
  }

  ngOnInit() {
    let userInfo: any = localStorage.getItem('userData');
    let userData = JSON.parse(userInfo);
    this.userId = userData.id;
    this.startScanner();
    //BarcodeScanner.prepare();
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
  activateScanner() {
    this.renderer.addClass(document.body, 'scanner-active');
  }

  deactivateScanner() {
    this.renderer.removeClass(document.body, 'scanner-active');
  }
  async startScanner() {
    const allowed = await this.checkPermission();

    if (allowed) {
      this.scanActive = true;
      await BarcodeScanner.hideBackground();
      this.activateScanner();
      try {
        const result = await BarcodeScanner.startScan({ targetedFormats: [SupportedFormat.QR_CODE] });
        // Handle result here
        console.log('Scanner', result);
        if (result.hasContent) {
          this.scanActive = false;
          console.log(result.content)
          const modal = await this.modalCtrl.create({
            component: TicketDetailsPage,
            componentProps: {
              data: result.content,  // Pass dynamic data
            },
            cssClass: 'custom-height-modal',
            backdropDismiss: true,
            mode: 'ios'
          });
          modal.onDidDismiss().then((modalData) => {
            // When the modal is dismissed, make an API call
            this.activateScanner();
            this.startScanner(); // Pass the returned data from the modal if needed
          });
          return await modal.present();
        } else {
          alert('NO DATA FOUND!');
        }
      } catch (error) {
        console.error('Scan error:', error);
      }

    } else {
      alert('NOT ALLOWED!');
    }
  }

  stopScanner() {
    this.deactivateScanner();
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

  ionViewWillLeave() {
    this.deactivateScanner();
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

  async checkattendence(data: any) {
    let payload = {
      "conference_id": this.moduleId,
      "user_code": data,
      "for_type": this.details,
      "user_id": this.userId
    }
    await this.loaderServ.loadingPresent();
    if (this.details == 'for_stall') {
      this.scannerservice.GetScannedUserSatllAttendence(payload).pipe(finalize(() => {
        this.loaderServ.loadingDismiss();
      })).subscribe((resp: any) => {
        console.log("this is the call backmessage", resp.data)
        alert(resp.data.msg)
        this.attendenceResult = resp.data
        return resp.data
      })
    }
    else {
      this.scannerservice.GetScannedUserAttendence(payload).pipe(finalize(() => {
        this.loaderServ.loadingDismiss();
      })).subscribe((resp: any) => {
        console.log("this is the call backmessage", resp.data)
        alert(resp.data.msg)
        this.attendenceResult = resp.data
        return resp.data
      })
    }



  }

}
