import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tanker',
  templateUrl: './tanker.page.html',
  styleUrls: ['./tanker.page.scss'],
})
export class TankerPage implements OnInit {
  tankerData: any;

  constructor(private router: Router) { }

  ngOnInit() {
    let tankerInfo: any = localStorage.getItem('selectedTanker');
    this.tankerData = JSON.parse(tankerInfo);
  }
  navigateToTickets() {
    let tankerInfo: any = localStorage.getItem('selectedTanker');
    this.tankerData = JSON.parse(tankerInfo);
    if(this.tankerData){
      this.router.navigate(['tanker/tickets']);
    }else{
      Swal.fire({
        heightAuto : false,
        title: "Please select tanker",
        icon: "error"
      });
    }
    
  }
}
