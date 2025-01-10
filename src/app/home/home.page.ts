import { Component, ChangeDetectorRef } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';
import { LoaderService } from '../shared/loader.service';
import { finalize } from 'rxjs';
import { ToastService } from '../shared/toast.service';
import { environment } from 'src/environments/environment';
import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  imgBasepath:any=environment.imgUrl;
  menuData:any=[];
  constructor(
    private sharedService: SharedService, 
    private router: Router,
    private loaderService: LoaderService,
    private toastService: ToastService,
    private loginService: LoginService,
    private cref: ChangeDetectorRef,

    ) {}
  ngOnInit() {
  
    this.getMainMenuData();
    // this.loginService.logout();
    // this.cref.detectChanges();
  }

  // getMainMenuData() {
  //   this.menuSerices.getMainmenu().then((menuData: any) => {
  //     console.log(menuData)
  //     this.menuData = menuData.data;
  //   })
  // }

  async getMainMenuData(){
       //await this.loaderService.loadingPresent();
      
    }

  cardAction(menu:any){
    localStorage.setItem('token',"QKLFI4cliChi1110IC69bVhYDmAVftCgynZaaYIhVgkyL1kbPnNyVLpROSD1");
    localStorage.setItem("userData",JSON.stringify({"id":"189","first_name":"Tester","last_name":"one","email_id":"testone@landscape.com","mobile_no":"6326622322","api_token":"0t3pIjtCOk2oaKCfW8xSxLizFzRNyMito3t61ZVPIE9QHclsQruwJK42bqfv","role_name":"Technician","user_type":"8","avatar":null,"last_check_in":"2024-10-21 09:31:40.000","last_action":"1"}));
    
    this.router.navigate(['/ticket']);
    
  }

  doRefresh(event: any) {
    // Add your refresh logic here
    // For example, make an API call to fetch updated data
    this.getMainMenuData();
    // When the refresh action is complete, call the complete() method on the event
    // to close the refresher
    setTimeout(() => {
      // Update your data or perform any other necessary operations
 
      event.target.complete();
    }, 1000);
  }

}
