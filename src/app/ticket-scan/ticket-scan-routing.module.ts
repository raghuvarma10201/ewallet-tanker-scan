import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketScanPage } from './ticket-scan.page';



const routes: Routes = [
  {
    path: '',
    component: TicketScanPage,
    children: [
      {
        path: 'myaccount',
        loadChildren: () => import('../myaccount/myaccount.module').then( m => m.MyaccountPageModule)
      },
      {
        path: 'scan',
        loadChildren: () => import('./../scanner/attendance/attendance.module').then( m => m.AttendancePageModule)
      },
      {
        path: 'history',
        loadChildren: () => import('./history/history.module').then( m => m.HistoryPageModule)
      },
      {
        path: '',
        redirectTo: 'history',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'ticket-details',
    loadChildren: () => import('./ticket-details/ticket-details.module').then( m => m.TicketDetailsPageModule)
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketScanRoutingModule {}
