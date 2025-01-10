import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HotelslistPage } from './hotelslist.page';

const routes: Routes = [
  {
    path: '',
    component: HotelslistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotelslistPageRoutingModule {}
