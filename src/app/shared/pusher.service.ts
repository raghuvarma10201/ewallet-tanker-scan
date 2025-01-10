import { Injectable } from '@angular/core';
// import Pusher from 'pusher-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  // private pusher: Pusher;

  constructor() {
    // this.pusher = new Pusher(environment.pusher.key, {
    //   cluster: environment.pusher.cluster,
    // });
  }

  getPusherInstance() {
    // return this.pusher;
  }
}
