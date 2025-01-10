import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { SharedService } from './shared/shared.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  menuType:any='';
  constructor(private menu: MenuController, private sharedService: SharedService) {}

  ngOnInit() {
    this.checkPermission();
    this.sharedService.posts.subscribe((obj:any)=>{
      console.log("obj meny type appCompo", obj);
     this.menuType=obj.menuType;
    });
  }
  closeMenu() {
    this.menu.close();
  }
  async checkPermission() {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        BarcodeScanner.openAppSettings();
        resolve(false);
      }
    });
  }
}
