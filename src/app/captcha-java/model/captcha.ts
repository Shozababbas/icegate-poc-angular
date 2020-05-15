export class Captcha {
    Name: string;
    password: string;
    message: string;
}

export interface GenericResponse {
    status : boolean;
    message: string;
    statusCode: number;
    data: any;
}

export interface User{
    userId : number;
	  loginId : string;
	  company : string;
	  contact: string;
	  first_name: string;
	  last_name: string;
	  created_date : string;
	  updated_date: string;
	  password: string;
	  country: string;
	  city: string;
	  captchaResponse: string;
}