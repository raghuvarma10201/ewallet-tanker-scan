import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './shared/interceptors/http.interceptor';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { IonicSelectableComponent } from 'ionic-selectable';
import { LocationsPipe } from './locations.pipe';
import { TankerPipe } from './tanker.pipe';
const config: SocketIoConfig = { url: 'http://mgantry.com', options: {} };

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [AppComponent, LocationsPipe, TankerPipe],
  imports: [BrowserModule,  
    HttpClientModule, 
    SocketIoModule.forRoot(config),
    IonicModule.forRoot(), 
    AppRoutingModule,
    IonicSelectableComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true, // Allow multiple interceptors
  },{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],  
})
export class AppModule {}
