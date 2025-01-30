import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { finalize } from 'rxjs';
import { LoaderService } from 'src/app/shared/loader.service';
import { ScannerServiceService } from 'src/app/shared/scanner.service.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-scan-detail',
  templateUrl: './scan-detail.page.html',
  styleUrls: ['./scan-detail.page.scss'],
})
export class ScanDetailPage implements OnInit {
  tripDetails: any;
  locationData: any;
  userId: any;
  submitted = false;
  QuantityForm: FormGroup;
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private loaderService: LoaderService,
    private fb: FormBuilder,
    public router: Router,
    private scannerservice: ScannerServiceService,
    public modalCtrl: ModalController,
    private renderer: Renderer2,
    private loaderServ: LoaderService
  ) { 
    const PAT_QUANTITY = /^[0-9]$/;

    this.QuantityForm = this.fb.group({
      quantity: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    let userInfo: any = localStorage.getItem('userData');
    let locationInfo: any = localStorage.getItem('selectedLocation');
    let userData = JSON.parse(userInfo);
    this.locationData = JSON.parse(locationInfo);
    this.userId = userData.user_id;
    this.tripDetails = JSON.parse(JSON.stringify(this.navParams.get('data')));
    console.log(this.userId);
    
  }
  get form() { return this.QuantityForm.controls; }

  dismissModal() {
    this.modalController.dismiss();
  }

  isSameDate(startDate: any, endDate: any): boolean {
    return new Date(startDate).toDateString() === new Date(endDate).toDateString();
  }

  async approveEntry(id: any) {
    const formValue = this.QuantityForm.value;
    await this.loaderService.loadingPresent();
    this.submitted = true;
    if (this.QuantityForm.invalid) {
      this.loaderService.loadingDismiss();
      return;
    }
    let payload = {
      "location_id": this.locationData.id,
      "customer_id": this.tripDetails.customer_id,
      "tanker_id": this.tripDetails.tanker_id,
      "tanker_number": this.tripDetails.tanker_number,
      "plate_region": this.tripDetails.plate_region_id,
      "trip_amount": this.tripDetails.trip_final_amount,
      "wallet_amount": this.tripDetails.wallet_amount,
      "wallet_unique_id": this.tripDetails.wallet_unique_id,
      "quantity": formValue.quantity,
      "created_by": this.userId  //Login user id
    }
    await this.loaderServ.loadingPresent();
    this.scannerservice.createTrip(payload).pipe(finalize(() => {
      this.loaderServ.loadingDismiss();
    })).subscribe(async (resp: any) => {
      console.log("this is the call backmessage", resp.data)
      if (resp.status == 200) {
        
        Swal.fire({
          heightAuto: false,
          title: resp.message,
          icon: "success"
        }).then((result) => {
          this.loaderServ.loadingDismiss();
          this.modalController.dismiss();
          this.router.navigate(["tanker/trips"]);
        });
      } else{
        await this.loaderServ.loadingDismiss();
        Swal.fire({
          heightAuto: false,
          title: resp.message,
          icon: "error"
        }).then((result) => {
          this.loaderServ.loadingDismiss();
          this.modalController.dismiss();
          this.router.navigate(["tanker/trips"]);
        });
      }
    })
  }
}
