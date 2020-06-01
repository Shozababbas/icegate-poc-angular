import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { CaptchServiceService, } from "../captch-java/captch-service.service";
import { Captcha, GenericResponse } from './model/captcha';
import { DomSanitizer } from '@angular/platform-browser';
import { CaptchaComponent } from 'angular-captcha';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router'
import { AlertsService } from 'angular-alert-module';
import {MatSnackBar} from '@angular/material/snack-bar';
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
  flag:boolean=false

  constructor(private _snackBar: MatSnackBar,private alerts: AlertsService,private router:Router ,private fb: FormBuilder, private captchaservice: CaptchServiceService, private sanitizer: DomSanitizer) {
   
   }

  ngOnInit(): void {
    this.alerts.setConfig('warn','icon','warning');
    this.alerts.setMessage('All the fields are required','error');
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
      captchaId: captchaId,
      loginId: this.form.get('loginId').value,
      password: this.form.get('password').value,
    };
    this.captchaservice.validateBotDetectCaptcha(postData)
      .subscribe(
        response => {
          if (response.success == false) {
            // debugger;
            console.log(response);
            this.flag=false;
            this.openSnackBar()
            this.captchaComponent.reloadImage();
           
          } else {
            console.log("Success")
            this.flag=true
            this.openSnackBar()
          }
        });
  }

  reset()
  {
      window.location.reload();
  }

  openSnackBar() {
    if(this.flag==true){
      this._snackBar.open("Registration successful", "", {
        duration: 4000,
        panelClass: ['blue-snackbar']
      });
      this.reset();
    }
    else{
      this._snackBar.open("captcha does not match", "", {
        duration: 4000,
      });
    }
    }
    
  }
