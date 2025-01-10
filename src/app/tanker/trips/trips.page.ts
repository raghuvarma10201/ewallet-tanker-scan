import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { LoaderService } from 'src/app/shared/loader.service';
import { ToastService } from 'src/app/shared/toast.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { CommonService } from 'src/app/shared/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
})
export class TripsPage implements OnInit {

  imgBasepath: any = environment.imgUrl;
  tripsData: any = [];
  locationData: any = [];
  moduleId: any = '';
  numTimesLeft = 5;
  pageno: number = 1;
  query: any = '';
  filteredTrips: any;
  userId: any;
  tripData: any;
  intervalId: any;
  isHasData: boolean = true;
  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private toastService: ToastService,
    private commonService: CommonService
  ) { }
  ionViewWillEnter() {
    let userInfo: any = localStorage.getItem('userData');
    let locationInfo: any = localStorage.getItem('selectedLocation');
    this.locationData = JSON.parse(locationInfo);
    if (!locationInfo) {
      Swal.fire({
        heightAuto: false,
        title: "Please select Location",
        icon: "error"
      });
      this.router.navigate(['/locations']);
    }
    console.log(this.locationData);
    let userData = JSON.parse(userInfo);
    this.tripData = JSON.parse(locationInfo);

    this.userId = userData.id;
    this.getTrips(this.pageno);
  }
  ngOnInit() {
    let userInfo: any = localStorage.getItem('userData');
    let locationInfo: any = localStorage.getItem('selectedLocation');
    this.locationData = JSON.parse(locationInfo);
    if (!locationInfo) {
      Swal.fire({
        heightAuto: false,
        title: "Please select Location",
        icon: "error"
      });
      this.router.navigate(['/locations']);
    }
    
  }

  async getTrips(pageno: any) {
    let payLoad = {
      "columns": [
        "tbl_trips.trip_id",
        "tbl_trips.trip_number",
        "tbl_trips.trip_amount",
        "tbl_trips.tanker_number",
        "tbl_trips.created_on",
        "tbl_trips.status",
        "tbl_trips.trip_date",
        "tbl_trips.vehicle_entry",
        "tbl_trips.vehicle_exit",
        "tbl_trips.trip_date",
        "tbl_trips.updated_on"
      ],
      "order_by": {
        "tbl_trips.plate_region": "asc",
        "tbl_trips.created_on": "asc"
      },
      "filters": {
        "tbl_trips.truck_number": "",
        "tbl_tanker_types.id": 1,
        "tbl_trips.created_on": "",
        "tbl_trips.location_id": this.locationData.id,
        "tbl_trips.status": "",
        "tbl_trips.trip_id": "",
        "tbl_trips.created_by": ""
      },
      "pagination": {
        "limit": "10",
        "page": pageno
      }
    }
    await this.loaderService.loadingPresent();
    this.commonService.GetTrips(payLoad).pipe(finalize(() => {
     
    })).subscribe((res: any) => {
      this.loaderService.loadingDismiss();
      console.log("Res", res);
      if (res.status == 200 && res.data.length > 0) {
        this.loaderService.loadingDismiss();
        if (res.data.length == 0) {
          alert();
          this.isHasData = false;
        }
        res.data.map((eachItem: any) => {
          eachItem.pending = eachItem.total_trips - eachItem.attended;
          this.tripsData.push(eachItem);
        })

        this.tripsData.sort((a: any, b: any) => b.trip_id - a.trip_id);
      } else {
        this.loaderService.loadingDismiss();
      }
    })
  }

  onIonInfinite(ev: any) {
    if (this.isHasData) {
      this.pageno++;
      this.getTrips(this.pageno);
      setTimeout(() => {
        (ev as InfiniteScrollCustomEvent).target.complete();
      }, 500);
    }

  }

  async handleInput(trip: any) {
    this.query = trip.target.value.toLowerCase();
    console.log("query", this.query);
    console.log("query length", this.query.length);
    let payLoad = {
      "trip_id": this.tripData.id,
      "searchName": this.query,
      "pageno": this.pageno,
    }
    if (this.query.length > 3) {
      await this.loaderService.loadingPresent();
      this.commonService.GetTrips(payLoad).pipe(finalize(() => {
        this.loaderService.loadingDismiss();
      })).subscribe((res: any) => {
        console.log("Res", res);
        if (res.status == 200) {
          this.tripsData = res.data;
        }
      })
    } else {
      this.pageno = 0;
      this.tripsData = [];
      this.getTrips(this.pageno);
    }

  }
  isSameDate(startDate: any, endDate: any): boolean {
    return new Date(startDate).toDateString() === new Date(endDate).toDateString();
  }
  doRefresh(trip: any) {
    this.pageno = 0;
    this.tripsData = [];
    this.getTrips(this.pageno);
    setTimeout(() => {
      trip.target.complete();
    }, 1000);
  }

  async viewTrip(trip: any) {
    console.log(trip);
    localStorage.setItem('selectedTrip', JSON.stringify(trip));
    this.router.navigate(['/trip/trip-detail', trip.id]);
  }
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  // async handleInput(trip:any) {
  //   this.query = trip.target.value.toLowerCase();
  //   console.log("query", this.query);
  //   console.log("query length", this.query.length);
  //   let payLoad = {
  //     "conference_id": this.moduleId,
  //     "searchName":this.query

  //   }
  //   let filteredData = this.filteredTrips.filter(
  //     (trip : any) =>
  //       (trip.personName && trip.personName.toLowerCase().includes(this.query.toLowerCase())) ||
  //       (trip.tripNo && trip.tripNo.toLowerCase().includes(this.query.toLowerCase())) ||
  //       (trip.email && trip.email.toLowerCase().includes(this.query.toLowerCase())) ||
  //       (trip.phone_number && trip.phone_number.toLowerCase().includes(this.query.toLowerCase()))
  //   );
  // }

}
