import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{SocialFooterComponent}from './social-footer.component';

const routes: Routes = [
  {
    path:'',
    component:SocialFooterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialFooterRoutingModule { }
