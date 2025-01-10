import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScannerPage } from './scanner.page';

const routes: Routes = [
  {
    path: '',
    component: ScannerPage
  },
  {
    path: 'attendance',
    loadChildren: () => import('./attendance/attendance.module').then( m => m.AttendancePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScannerPageRoutingModule {}
