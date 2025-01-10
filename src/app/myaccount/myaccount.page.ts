import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IonModal } from '@ionic/angular';
// import { OverlayEventDetail } from '@ionic/core/components';
import { finalize } from 'rxjs';
import { CommonService } from 'src/app/shared/common.service';
import { LoaderService } from 'src/app/shared/loader.service';
import { LoginService } from 'src/app/shared/login.service';
import { ToastService } from 'src/app/shared/toast.service';
import { environment } from 'src/environments/environment';
import { CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Plugins, PermissionState } from '@capacitor/core';
import { SharedService } from 'src/app/shared/shared.service';



@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.page.html',
  styleUrls: ['./myaccount.page.scss'],
})
export class MyaccountPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  public segment: string = "myprofile";
  isModalOpen = false;
  user: any = '';
  editProfileForm: FormGroup;
  submitted = false;
  errorMsg: any = '';
  designation: any = "";
  userId: any;
  ordersList: any = [];
  imageBase = environment.apiUrl;
  profilePic: any = '';
  menuType: any = '';
  configuremenu: any = [];
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

    this.editProfileForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern(PAT_EMAIL)]],
      number: [null, [Validators.required, Validators.pattern(PAT_PHONE)]],
      organization: [null, [Validators.required]],
      designation: [null, [Validators.required]]

    });



  }

  ngOnInit() {
    let userData: any = localStorage.getItem("userData");
    let data = JSON.parse(userData);
    console.log(data);
    this.userId = data.id;
    this.user = data;
    this.designation = this.user.designation
    if (this.user !== null) {
      this.editProfileForm.controls['name'].setValue(this.user.name);
      this.editProfileForm.controls['email'].setValue(this.user.email);
      this.editProfileForm.controls['number'].setValue(this.user.number);
      this.editProfileForm.controls['organization'].setValue(this.user.organization);
      this.editProfileForm.controls['designation'].setValue(this.user.designation);
    }
    let payload = {
      "user_id": this.userId
    }
    //this.getProfile(payload);

  }

  get form() { return this.editProfileForm.controls; }

  async canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }


  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }



  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async onSubmit() {
    // console.log(this.editProfileForm.value);
    this.submitted = true;
    this.editProfileForm.value['id'] = this.user.id;
    
  }

  async capturePhoto() {

    const { Camera } = Plugins;

    const image = await Camera['getPhoto']({
      quality: 100,
      allowEditing: false,
      //resultType: CameraResultType.Base64,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });

    console.log("image", image);
    this.startUpload(image.webPath);

  }



  async startUpload(file: any) {

    const response = await fetch(file);
    const blob = await response.blob();
    const formData = new FormData();

    formData.append('user_id', this.userId);
    formData.append('photo', blob, file.name);
  }
  logout() {
    localStorage.clear();
    this.router.navigate(["signin"]);
    this.sharedService.isUserLogin.next({isUserLoggedIn:false});
  }

}
