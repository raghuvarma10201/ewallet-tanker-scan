import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { LoaderService } from 'src/app/shared/loader.service';
import { LoginService } from 'src/app/shared/login.service';
import { SharedService } from 'src/app/shared/shared.service';
import { ToastService } from 'src/app/shared/toast.service';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  changePasswordForm: FormGroup;
  submitted = false;
  errorMsg = '';
  userId:any='';
  isClicked:boolean=true;
  isNewClicked:boolean=true;
  isConfirmClicked:boolean=true;
  initailType="password";
  newType="password";
  confirmType="password";
  constructor(
    private fb: FormBuilder,
    public router: Router, 
    private loaderService: LoaderService,
    private toastService: ToastService,
    private loginService: LoginService,
  ) {
    const PAT_PASSWORD = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}";
    this.changePasswordForm = this.fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required, Validators.pattern(PAT_PASSWORD)]],
      retypePassword: [null, [Validators.required]],
    }, );
    
   }

  ngOnInit() {
    let userInfo: any = localStorage.getItem('userData');
    let userData = JSON.parse(userInfo);
    this.userId = userData.id;
  }

  comparePassword() {
    let data = this.changePasswordForm.value;
    if (data.newPassword !== data.retypePassword) {
      return false;
    }
    return true;
  }
  
  get form() { return this.changePasswordForm .controls; }

  async onSubmit() {
    this.submitted=true
    await this.loaderService.loadingPresent();
    let compare=this.comparePassword()
    
   if (this.changePasswordForm.invalid){
    this.loaderService.loadingDismiss();
    return;
   }
   if(!compare){
    this.loaderService.loadingDismiss();
    
    return;
   }
    console.log(this.changePasswordForm .value);
    this.submitted = true;
    let payload ={
      "user_id" : this.userId,
      "old_pwd" : this.changePasswordForm.value.oldPassword,
      "new_pwd" : this.changePasswordForm.value.newPassword
  } 
  console.log(payload)
  
    this.loginService.changePassword(payload).pipe(finalize(() => {
      this.loaderService.loadingDismiss();
     })).subscribe((res: any) => {
      console.log("Res", res);
      if(res.statusCode===200 && res.status!=="error"){
        this.toastService.showSuccess(res.data, 'Success');
        this.router.navigate(["/login"]);
        this.changePasswordForm.reset() 
      }
      else{     
        this.loaderService.loadingDismiss();
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
  showOrHideNew(){
    if(this.isNewClicked===true){
      this.isNewClicked=false
      this.newType="test"
    }
    else if (this.isNewClicked===false){
      this.isNewClicked=true
      this.newType="password"
    }
  }
  showOrHideConfirm(){
    if(this.isConfirmClicked===true){
      this.isConfirmClicked=false
      this.confirmType="test"
    }
    else if (this.isConfirmClicked===false){
      this.isConfirmClicked=true
      this.confirmType="password"
    }
  }
  
}
