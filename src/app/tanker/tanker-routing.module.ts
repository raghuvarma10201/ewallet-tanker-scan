import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TankerPage } from './tanker.page';

const routes: Routes = [
  {
    path: '',
    component: TankerPage,
    children: [
      {
        path: 'locations',
        loadChildren: () => import('./locations/locations.module').then( m => m.LocationsPageModule)
      },
      {
        path: 'trips',
        loadChildren: () => import('./trips/trips.module').then( m => m.TripsPageModule)
      },
      {
        path: 'myaccount',
        loadChildren: () => import('./../myaccount/myaccount.module').then( m => m.MyaccountPageModule)
      },
      {
        path: 'scan',
        loadChildren: () => import('./../scanner/attendance/attendance.module').then( m => m.AttendancePageModule)
      },
      {
        path: '',
        redirectTo: 'locations',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'scan-detail',
    loadChildren: () => import('./scan-detail/scan-detail.module').then( m => m.ScanDetailPageModule)
  },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TankerPageRoutingModule { }
