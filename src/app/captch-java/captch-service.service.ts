import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {GenericResponse} from '../captcha-java/model/captcha';

@Injectable({
  providedIn: 'root'
})
export class CaptchServiceService {

  constructor(private httpClient:HttpClient) { 
  
  }

  url= "http://localhost:8080/user/register";
  check(data): Observable<GenericResponse>{
    return this.httpClient.post<GenericResponse>(this.url, data);
  }

  getCaptcha(): Observable<any>{
    return this.httpClient.get('http://localhost:8080/captcha-servlet',{responseType: 'blob'});
    
  }

  validateBotDetectCaptcha(data: Object): Observable<any>{
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'})
    };
    return this.httpClient.post(
      this.url, 
      data, options);
  }
}
