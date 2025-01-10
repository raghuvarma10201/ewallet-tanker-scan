import { Component, Input, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ManiDashboardService } from '../main-dashboard.service';
// import { finalize } from 'rxjs';
import { IonLoaderService } from '../ion-loader.service';
import { LoaderService } from '../loader.service';
import { SharedService } from '../shared.service';
import { finalize } from 'rxjs';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  @Input() menuType:any;
  menuList:any=[];
  isUserLoggedIn:boolean=false;
  user:any='';
  isIpscHeader:boolean=false;
  isThitHeader:boolean=false;
  isPscHeader:boolean=false;
  moduleId:any='';
  configuremenu:any=[];
  isPrivilegedUser:boolean = false;
  isThitPrivilegedUser:boolean=false;
  type:any
  abc:any='123';
  constructor( 
    private menu: MenuController, 
    private ipscMenuservice: ManiDashboardService,
    private loaderService: LoaderService,
    private sharedService: SharedService,
    private loginService: LoginService,
    
    ) { }

  ngOnInit() {
    let moduleData:any = localStorage.getItem('moduleType');
    let moduleType = JSON.parse(moduleData);
     if(this.menuType!==''){
    this.moduleId = moduleType.id;
    this.type=moduleType.type

    
    this.getIpscMenuData();
   }
   this.checkUserdataExit()

   this.sharedService.posts.subscribe((resp:any)=>{
    console.log("menu result", resp);
    this.menuType=resp.menuType;
    console.log("menuType", this.menuType);
    if(this.menuType==='ipsc'){
      this.isIpscHeader=true;
      this.isThitHeader=false;
      this.isPscHeader=false;

      let moduleData:any = localStorage.getItem('moduleType');
      let moduleType = JSON.parse(moduleData);
      // this.moduleId = moduleType.id;

      let payLoad={
        "conference_id": moduleType.id
      }
      console.log("ipsc payload for option menu : ", payLoad)
      this.getConferenceSettingsData(payLoad);
    }else if(this.menuType==='it'){
      this.isIpscHeader=false;
      this.isThitHeader=true;
      this.isPscHeader=false;
      let moduleData:any = localStorage.getItem('moduleType');
      let moduleType = JSON.parse(moduleData);
      let payLoad={
        "conference_id": moduleType.id
      }
      console.log("IT payload for option menu : ", payLoad)
      this.getConferenceSettingsData(payLoad);
    }else{
      this.isIpscHeader=false;
      this.isThitHeader=false;
      this.isPscHeader=true
    }
    this.getIpscMenuData();
   });

  }
  closeMenu() {
    this.menu.close();
  }

  checkUserdataExit(){
    let checkuserData:any = localStorage.getItem("userData");
    if(checkuserData!==null){
        this.isUserLoggedIn=true
        let userData:any = localStorage.getItem("userData");
        let data = JSON.parse(userData);
        if(data!==null){
          this.user = data;
          console.log("this.user",  this.user);
        }

     }
     else{
      this.isUserLoggedIn=false
       this.sharedService.isUserLogin.subscribe((result:any)=>{

        this.isUserLoggedIn=result.isUserLoggedIn;
        let userData:any = localStorage.getItem("userData");
        let data = JSON.parse(userData);
        if(data!==null){
          this.user = data;
          console.log("this.user",  this.user);
        }
       });
  
     }
  }


 async getIpscMenuData(){
  
    await this.loaderService.loadingPresent();
    let payLoad={
      "conferene_type": this.menuType
    }
 
    this.ipscMenuservice.getIpscMenu(payLoad).pipe(finalize(() => {
      // this.spinner.hide();
      this.loaderService.loadingDismiss();
    
    })).subscribe((res: any) => {
      
      if(res.statusCode===200){
        this.menuList=res.data;
        console.log("Menu List", this.menuList);
      
      }
    })
  }


  getConferenceSettingsData(payload:any){
      // this.loaderService.loadingPresent();
    
      this.loginService.getConferenceSettings(payload).pipe(finalize(() => {
        // this.spinner.hide();
        // this.loaderService.loadingDismiss();
       })).subscribe((res: any) => {
        
        if(res.statusCode===200){
          console.log("previlageeee",this.isPrivilegedUser)
            
            console.log("usertype_code-----", this.user.usertype_code);
            if(this.menuType==='ipsc'){
              if(this.user.usertype_code!=null){
                this.configuremenu=res.data;
                console.log("getConferenceSettingsData", this.configuremenu);
                this.isPrivilegedUser=true;
                console.log("previlageeeeLoggedin------",this.isPrivilegedUser)
               }

            }
            else if(this.menuType==="it"){
              console.log("thitttttttttttttttttttttttttttttttttttttttttttttttt")
              if(this.user.usertype_code_thit!=""){
                this.configuremenu=res.data;
                console.log("getConferenceSettingsData", this.configuremenu);
                this.isThitPrivilegedUser =true;
                console.log("previlageeeeLoggedin------",this.isPrivilegedUser)
               }

            }
            //  if(this.user.usertype_code!=null){
            //   this.configuremenu=res.data;
            //   console.log("getConferenceSettingsData", this.configuremenu);
            //   this.isPrivilegedUser=true;
            //   console.log("previlageeeeLoggedin------",this.isPrivilegedUser)
            //  }
             else{
              this.isPrivilegedUser=false
              this.isThitPrivilegedUser =false
             }
        }
      })
    }

  logout(){
    this.isPrivilegedUser=false
    this.isThitPrivilegedUser =false
    this.loginService.logout();
    this.checkUserdataExit()
    
  }

  ngOnDestroy() {
    this.checkUserdataExit()
  }




}
