import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMarqueeModule } from 'ng-marquee';
import { CaptchaJavaComponent } from './captcha-java/captcha-java.component';
import { BotDetectCaptchaModule } from 'angular-captcha';

@NgModule({
  declarations: [
    AppComponent,
    CaptchaJavaComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RecaptchaModule,
    MaterialModule,
    BrowserAnimationsModule,
    BotDetectCaptchaModule,
    NgMarqueeModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
