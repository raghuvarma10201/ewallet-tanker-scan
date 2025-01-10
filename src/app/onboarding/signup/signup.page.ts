import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicSelectableComponent } from 'ionic-selectable';
import { finalize } from 'rxjs';
import { CommonService } from 'src/app/shared/common.service';
import { LoaderService } from 'src/app/shared/loader.service';
import { LoginService } from 'src/app/shared/login.service';
import { SharedService } from 'src/app/shared/shared.service';
import { ToastService } from 'src/app/shared/toast.service';

class Country {
  public id: number;
  public name: string;
  public phonecode : number;
  public sortname : string;
}

class Port {
  public id: number;
  public name: string;
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  @ViewChild('portComponent') portComponent: IonicSelectableComponent;
  signUpForm: FormGroup;
  submitted = false;
  errorMsg:any='';
  countryMaster:Country[]=[];
  country:Country;
  ports: Port[];
  port: Port;
  isSearch:boolean=true;
  filteredList: any =[];
  filteredCountrys: any = [];
  isClicked:boolean=true;
  initailType="password";
id: string;
name: string;
phonecode:any='';
  constructor(
    private fb: FormBuilder,
    public router: Router, 
    private loaderService: LoaderService,
    private toastService: ToastService,
    private commonService: CommonService,
    private loginService: LoginService,
    private sharedService: SharedService,
  ) {

   
    const PAT_EMAIL = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$";
    const PAT_PHONE = "^((\\+91-?)|0)?[0-9]{10}$";
    const PAT_PASSWORD = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}";
    // At least 8 characters in length
    // Lowercase letters
    // Uppercase letters
    // Numbers
    // Special characters

    this.signUpForm = this.fb.group({
      titlename: [null],
      name: [null, [Validators.required]],
      organization: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.pattern(PAT_PASSWORD)]],
      email: [null, [Validators.required, Validators.pattern(PAT_EMAIL)]],
      number: [null, [Validators.required, Validators.pattern(PAT_PHONE)]],
      designation: [null, [Validators.required]],
      location: [null, [Validators.required]],
      country_id: [null, [Validators.required]]
    
    });


   }

   
  ngOnInit() {
    this.getcountriesMaster();
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
  }
  get form() { return this.signUpForm.controls; }

  async getcountriesMaster(){
   
      // await this.loaderService.loadingPresent();
    

    }
  

   
  async onSubmit() {
    this.signUpForm.value['id']=0;
    this.submitted = true;
    await this.loaderService.loadingPresent();
    if (this.signUpForm.invalid) {
      this.loaderService.loadingDismiss();
      return;
    }
    this.signUpForm.value['country_id']=this.country.id;


  }
  // {
  //   component: IonicSelectableComponent,
  //   value: any
  // }

  actionChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
    this.phonecode=event.value.phonecode
   
   
  }

  // portChange(event: {
  //   component: IonicSelectableComponent,
  //   value: any
  // }) {
  //   console.log('port:', event.value);
  // }
  

  itemSearch(event:any){
    let val=event.target.value
    console.log(val)
    if(val.length>1){
      this.filteredList = this.countryMaster.filter((country: any) =>
        country.name.toLowerCase().includes(val.toLowerCase())
      );
      console.log("filteredList", this.filteredList);
      this.filteredCountrys=this.filteredList
    }
    else{
      this.filteredCountrys=[]
    }
  }

  async inlineLogin(payload:any) {
    await this.loaderService.loadingPresent();
   this.loginService.validateUser(payload).pipe(finalize(() => {
      this.loaderService.loadingDismiss();
     })).subscribe((res: any) => {
      console.log("Res", res); 
      if(res.statusCode===200){
        this.toastService.showSuccess('Successfully Login', 'Success');
        res.data['isIpscloggedIn']=true;
        // this.loginService.setUserInLocalStorage(res.data,'ipsc');
        this.router.navigate(["ipsc"]);
        this.sharedService.isUserLogin.next({isIpscUserLoggedIn:true});
      }
      else{     
        this.loaderService.loadingDismiss();
        // this.toastr.showError(result.message, "Error");
      }
    }, error => {   
      this.loaderService.loadingDismiss();
          this.errorMsg = error;
        this.toastService.showError(this.errorMsg, "Error");
     })

  }

  showOrHidePassword(){
    if(this.isClicked===true){
      this.isClicked=false;
      this.initailType="test";
    }
    else if (this.isClicked===false){
      this.isClicked=true;
      this.initailType="password";
    }
  }
  

  
}
