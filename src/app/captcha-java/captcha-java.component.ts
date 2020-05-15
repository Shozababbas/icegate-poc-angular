import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { CaptchServiceService, } from "../captch-java/captch-service.service";
import { Captcha, GenericResponse } from './model/captcha';
import { DomSanitizer } from '@angular/platform-browser';
import { CaptchaComponent } from 'angular-captcha';

@Component({
  selector: 'app-captcha-java',
  templateUrl: './captcha-java.component.html',
  styleUrls: ['./captcha-java.component.css']
})
export class CaptchaJavaComponent implements OnInit {
  @ViewChild(CaptchaComponent, { static: true }) captchaComponent: CaptchaComponent;

  errorMessage: string;
  successMessage: string;
  form: FormGroup;
  token: String = '';
  captcha: any;

  constructor(private fb: FormBuilder, private captchaservice: CaptchServiceService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.captchaComponent.captchaEndpoint = 
      'http://localhost:8080/simple-captcha-endpoint';
    this.form = this.fb.group({
      loginId: ['', Validators.required],
      company: [''],
      contact: [''],
      first_name: [''],
      last_name: [''],
      password: ['', Validators.required],
      captchaResponse: ['', Validators.required],
    })
    // this.getCaptcha();
  }
  getCaptcha() {
    this.captchaservice.getCaptcha().subscribe((response : any) => {
      let objectURL = URL.createObjectURL(response);
      this.captcha = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      
    });
  }
  captchaCheck() {
    this.errorMessage = null;
    this.successMessage = null;
    this.captchaservice.check(this.form.value).subscribe(
      (response) => {
        let responseJson = JSON.stringify(response);
        const JSONobject = JSON.parse(responseJson);
        console.log("JSONobject: ", JSONobject);
        this.successMessage = response.message;
        console.log("Message: ", this.successMessage)
      },
      (errorResponse) => this.errorMessage = errorResponse.error.message,
    )
  }
  resolved(captchaResponse: string) {
    this.token = captchaResponse;
    this.form.controls['captchaResponse'].setValue(captchaResponse);
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }

  validate(){
    let userEnteredCaptchaCode = this.captchaComponent.userEnteredCaptchaCode;
    let captchaId = this.captchaComponent.captchaId;
    const postData = {
      userEnteredCaptchaCode: userEnteredCaptchaCode,
      captchaId: captchaId
    };
    this.captchaservice.validateBotDetectCaptcha(postData)
      .subscribe(
        response => {
          if (response.success == false) {
            debugger;
            console.log(response);
            this.captchaComponent.reloadImage();
          } else {
            // TODO: captcha validation succeeded; proceed with the workflow
          }
        });
  }
}

