import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { LoaderService } from 'src/app/shared/loader.service';

import { ToastService } from 'src/app/shared/toast.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
})
export class LocationsPage implements OnInit {

  imgBasepath: any = environment.imgUrl;
  locationsData: any = [];
  moduleId: any = '';
  numTimesLeft = 5;
  pageno: number = 0;
  query: any = '';
  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private toastService: ToastService,
    private commonService: CommonService
  ) { }
  ionViewWillEnter() {
    this.loaderService.loadingDismiss();
    this.locationsData = [];
    this.getLocations();
  }
  ngOnInit() {
    this.loaderService.loadingDismiss();
    let moduleData: any = localStorage.getItem('moduleType');
    let moduleType = JSON.parse(moduleData);
    
  }

  async getLocations() {
    await this.loaderService.loadingPresent();
    this.commonService.getLocations().pipe(
      finalize(() => {
        this.loaderService.loadingDismiss();
      })
    ).subscribe({
      next: (res: any) => {
        this.loaderService.loadingDismiss();
        console.log("Res", res);
        if (res.status == 200) {
          res.data.map((eachItem: any) => {
            this.locationsData.push(eachItem);
            console.log(this.locationsData);
          });
        }
      },
      error: (err: any) => {
        this.loaderService.loadingDismiss();
        console.error("Error fetching locations:", err);
        // Handle the error (e.g., show an alert or message)
        this.toastService.showError("Failed to fetch locations. Please try again later.", "Error");
      }
    });

  }
  isSameDate(startDate: any, endDate: any): boolean {
    return new Date(startDate).toDateString() === new Date(endDate).toDateString();
  }
  async selectLocation(location: any) {
    localStorage.setItem('selectedLocation', JSON.stringify(location));
    this.router.navigateByUrl("/tanker/trips");
  }
}
