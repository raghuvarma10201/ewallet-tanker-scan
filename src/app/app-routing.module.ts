import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    // redirectTo: 'scanner',
    redirectTo: 'tanker',
    //redirectTo: 'scanner',
    pathMatch: 'full'
  },
  {
    canActivate: [AuthGuard],
    path: 'ticket',
    loadChildren: () => import('./ticket-scan/ticket-scan.module').then( m => m.TicketScanModule)
  },
  {
    canActivate: [AuthGuard],
    path: 'locations',
    loadChildren: () => import('./tanker/locations/locations.module').then( m => m.LocationsPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./onboarding/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./onboarding/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./onboarding/forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  },
  {
    path: 'changepassword',
    loadChildren: () => import('./onboarding/changepassword/changepassword.module').then( m => m.ChangepasswordPageModule)
  },

  {
    path: 'scanner',
    loadChildren: () => import('./scanner/scanner.module').then( m => m.ScannerPageModule)
  },
  {
    path: 'trips',
    loadChildren: () => import('./tanker/trips/trips.module').then( m => m.TripsPageModule)
  },
  {
    path: 'tanker',
    loadChildren: () => import('./tanker/tanker.module').then( m => m.TankerPageModule)
  },









];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
