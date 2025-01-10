import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { LoaderService } from 'src/app/shared/loader.service';
import { LoginService } from 'src/app/shared/login.service';
import { SharedService } from 'src/app/shared/shared.service';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
  forgotForm: FormGroup;
  submitted=false
  errorMsg = '';
 
   constructor(
    private fb: FormBuilder,
    public router: Router, 
    private loaderService: LoaderService,
    private toastService: ToastService,
    private loginService: LoginService,
    ) { 
      const PAT_EMAIL = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$";
    this.forgotForm = this.fb.group({
      email: [null,  [Validators.required, Validators.pattern(PAT_EMAIL)]],
    });
    }
 
   
 
   ngOnInit() {
   }
   get form() { return this.forgotForm.controls; }

  async onSubmit() {
    console.log(this.forgotForm.value);
    this.submitted = true;
    await this.loaderService.loadingPresent();
    if (this.forgotForm.errors || this.forgotForm.invalid) {
       this.loaderService.loadingDismiss();
      return 
    }
   
    this.loginService.forgotPassword(this.forgotForm.value).pipe(finalize(() => {
      this.loaderService.loadingDismiss();
     })).subscribe((res: any) => {
      console.log("Res", res);
      if(res.statusCode===200 && res.status!=="error"){
        this.toastService.showSuccess(res.data, 'Success');
        this.forgotForm.reset()
        this.router.navigate(["/login"]);
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


}
