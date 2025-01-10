import { Component, OnInit } from '@angular/core';
import { IonicSlides, MenuController } from '@ionic/angular';
import { finalize } from 'rxjs';
import { CommonService } from 'src/app/shared/common.service';
import { LoaderService } from 'src/app/shared/loader.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-hotelslist',
  templateUrl: './hotelslist.page.html',
  styleUrls: ['./hotelslist.page.scss'],
})
export class HotelslistPage implements OnInit {
  swiperModules = [IonicSlides]
  hotelsList: any = [];
  Imagebase = environment.imgUrl;
  moduleId: any='';
  searchTerm: any= '';
  filteredHotels: any = [];
  filteredList: any;
  isfalse: boolean = false

  constructor(
    private menu: MenuController,
    private commonServ: CommonService,
    private loaderService:LoaderService
  ) { }

  ngOnInit() {
    let moduleData:any = localStorage.getItem('moduleType');
    let moduleType = JSON.parse(moduleData);
    this.moduleId = moduleType.id;
    this.getHotels();
  
  }

  async getHotels(){
    let payloadObj = {"conference_id": this.moduleId};
    await this.loaderService.loadingPresent();
    this.commonServ.GetListofHotels(payloadObj).pipe(finalize(() => {
      this.loaderService.loadingDismiss();
     })).subscribe((resp: any)=>{
      
      this.hotelsList = resp.data
    })
  }

  search() {
    if (this.searchTerm.trim() !== '') {
      this.filteredList = this.hotelsList.filter((hotel: any) =>
        hotel.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      if (this.filteredList <= 0){
        this.isfalse = true;
      }
      else{
        this.isfalse = false;
        this.filteredHotels=this.filteredList;
      }
    } else {
      this.filteredHotels = [];
    }
  }
  
}
