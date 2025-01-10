import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { LoaderService } from 'src/app/shared/loader.service';
import { SpeakersService } from '../speakers.service';
// import { ManiDashboardService } from '../mani-dashboard.service';
import { ToastService } from 'src/app/shared/toast.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-social-footer',
  templateUrl: './social-footer.component.html',
  styleUrls: ['./social-footer.component.scss'],
})
export class SocialFooterComponent  implements OnInit {
  // webinarsListData:any=[];
  conferenceSocialList:any=[];
  moduleId:any='';
  moduleType:any='';
  imgBasepath:any=environment.imgUrl;
  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private toastService: ToastService,
    private speakersService: SpeakersService
  ) { }

  ngOnInit() {
    let moduleData:any = localStorage.getItem('moduleType');
    let moduleType = JSON.parse(moduleData);
    this.moduleId = moduleType.id;
    this.moduleType = moduleType.type;
    console.log("moduleId", this.moduleId);
    this.getSocialLinksData();
  }

  async getSocialLinksData(){

    let payload = {
      "conference_type" : "" 
    }   
    if(this.moduleType==='ticket'){
      payload.conference_type=this.moduleType
    }else if(this.moduleId==='it'){
      payload.conference_type=this.moduleType
    }else{
      payload.conference_type=this.moduleType
    }
   this.speakersService.getSocialLinks(payload).pipe(finalize(() => {    
    })).subscribe((res: any) => {
      if(res.statusCode===200){    
      this.conferenceSocialList= res.data;
      console.log("conferenceSocialList", this.conferenceSocialList);
 
     }
   })
 }



}
