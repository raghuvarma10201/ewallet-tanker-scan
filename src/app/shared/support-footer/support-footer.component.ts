import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-support-footer',
  templateUrl: './support-footer.component.html',
  styleUrls: ['./support-footer.component.scss'],
})
export class SupportFooterComponent  implements OnInit {
  userId: any='';

  constructor() { }

  ngOnInit() {
    let userInfo: any = localStorage.getItem('userData');
    let userData = JSON.parse(userInfo);
    if(userData){
      this.userId = userData.id;
    }
  }

}
