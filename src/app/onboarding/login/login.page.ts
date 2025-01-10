import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { LoaderService } from 'src/app/shared/loader.service';
import { LoginService } from 'src/app/shared/login.service';
import { SharedService } from 'src/app/shared/shared.service';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  errorMsg = '';
  isClicked:boolean=true
  initailType="password"
  constructor(
    private fb: FormBuilder,
    public router: Router, 
    private loaderService: LoaderService,
    private toastService: ToastService,
    private loginService: LoginService,
    private sharedService: SharedService,
    
  ) {
    const PAT_EMAIL = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$";
    this.loginForm = this.fb.group({
      email_id: [null,  [Validators.required, Validators.pattern(PAT_EMAIL)]],
      password: [null, [Validators.required]]
    });

   }

  ngOnInit() {
    
  }

  get form() { return this.loginForm.controls; }
  async onSubmit() {
    console.log(this.loginForm.value);
    this.submitted = true;
    //localStorage.setItem("userData",JSON.stringify({"id":27,"name":"Raghuvarma","titlename":"","designation":"Developer","organization":"RPWeb","email":"raghuvarma@rpwebapps.com","number":"8686865707","location":"dasdas","profile_img":"","usertype_code":"THIT255056","role":"Delegate","bearer":"uX4zG8tP","usertype_code_thit":"THIT255057","idcard_path":"uploads/idcard-designs-2023/IPSC_IDcard_Delegate.jpg","isUserloggedIn":true}))
    //this.router.navigate(["ticket"]);
    await this.loaderService.loadingPresent();
    this.loginService.validateUser(this.loginForm.value).pipe(finalize(() => {
      this.loaderService.loadingDismiss();
     })).subscribe((res: any) => {
      console.log("Res", res);
      if(res.status == 200 && res.success ==true){
        this.toastService.showSuccess('Successfully Login', 'Success');
        res.data['isUserloggedIn']=true;
        this.loginService.setUserInLocalStorage(res.data[0]);
        this.loginForm.reset();
        localStorage.setItem('token', res.data[0].api_token);
        this.router.navigate(["tanker/locations"]);
        // this.sharedService.isUserLogin.next({isUserLoggedIn:true});
        
      }
      else{     
        this.loaderService.loadingDismiss();
        // this.toastr.showError(result.message, "Error");
        // throw new Error("Data not Found");
        this.toastService.showError(res.data, "Error");
      }
    }, error => {   
      this.loaderService.loadingDismiss();
        console.log(error.message);
          this.errorMsg = error;
        this.toastService.showError(this.errorMsg, "Error");
     })

  }
  showOrHidePassword(){
    if(this.isClicked===true){
      this.isClicked=false
      this.initailType="test"
    }
    else if (this.isClicked===false){
      this.isClicked=true
      this.initailType="password"
    }
  }
   

}
