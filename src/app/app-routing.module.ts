import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CaptchaJavaComponent } from './captcha-java/captcha-java.component';


export const routes: Routes = [


  { path: 'captcha', component: CaptchaJavaComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
