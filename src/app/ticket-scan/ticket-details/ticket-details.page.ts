import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.page.html',
  styleUrls: ['./ticket-details.page.scss'],
})
export class TicketDetailsPage implements OnInit {
  ticketDetails: any;

  constructor(private modalController: ModalController,private navParams: NavParams) { }

  ngOnInit() {
    this.ticketDetails = JSON.parse(JSON.stringify(this.navParams.get('data')));
    console.log(this.ticketDetails);
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  approveEntry(id : any) {
    Swal.fire({
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      },
      heightAuto : false,
      title: "Approved",
      icon: "success"
    });
  }
}
