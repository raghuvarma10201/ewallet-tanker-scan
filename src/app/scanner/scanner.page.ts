import { Component, OnInit } from '@angular/core';
import { ScannerServiceService } from '../shared/scanner.service.service';
import { LoaderService } from '../shared/loader.service';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LoginService } from '../shared/login.service';
@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  scannerOptions:any=[]
  trimValue:any=[];
  user:any='';
  imgBasepath:any=environment.imgUrl;
  userId:any='';
  attendanceCount:any=[];
  designation: any='';
  organization: any= '';
  moduleId:any='';
  stallAttendenceCount:any=[];
  cardClass: string[]=['lightGreen ','lightBlue2' , 'lightRed'];
  constructor(private loaderServ: LoaderService ,
    private sacnnerServ: ScannerServiceService,
    private router:Router,
    private loginService: LoginService,) { }

  ngOnInit() {
    let userInfo: any = localStorage.getItem('userData');
    let userData = JSON.parse(userInfo);
    this.userId = userData.id;
    this.designation = userData.role;
    this.organization = userData.organization;
    let moduleData:any = localStorage.getItem('moduleType');
    let moduleType = JSON.parse(moduleData);
    this.moduleId = moduleType.id;
    console.log("designation", this.designation);
    this.getScannerOptions();
    
    // if(this.designation === 'stall admin'){
    //     this.getStallAttendence();
    // }
  
  }

  async getScannerOptions(){
    let payload={
      "type" : "scanner_type",
      "status" : 1,
      "user_id" : this.userId
    }


    
    // this.sacnnerServ.GetscannerOptions(payload).pipe(finalize(() => {
    //   this.loaderServ.loadingDismiss();
    //  })).subscribe((resp: any)=>{
    //     resp.data.map((item:any)=>{
    //     this.trimValue = item.value; 
    //     let stringVal = this.trimValue.replace('for_', '');
    //     item.cardValue=stringVal
    //     this.scannerOptions.push(item)
    //    console.log("trimValue", this.scannerOptions)
    //   }) 
    // });
  
  }

  async getStallAttendence(){
    let payload={
     "conference_id":this.moduleId,
      "user_id" : this.userId
    }
    await this.loaderServ.loadingPresent();
     

  }

  scanAction(data:any){
    console.log(data)
    this.router.navigate(['scanner/attendance',{details:data}]);
  }

  convertingTostring(data:any){
    let a=data.split("_")
    return a[1]
  }




  logout(){
    // this.loginService.logout();   
    localStorage.removeItem('userData');
    this.router.navigate(["login"]);

  }

  doRefresh(event: any) {
    this.scannerOptions=[]
    // Add your refresh logic here
    // For example, make an API call to fetch updated data
    this.getScannerOptions();
    // When the refresh action is complete, call the complete() method on the event
    // to close the refresher
    setTimeout(() => {
      // Update your data or perform any other necessary operations
 
      event.target.complete();
    }, 1000);
  }
}
