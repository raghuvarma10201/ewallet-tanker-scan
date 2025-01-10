// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Http, HttpResponse } from '@capacitor-community/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Toast } from '@capacitor/toast';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManiDashboardService {
  apiUrl:string=environment.apiUrl;
   httpOptions = {
    headers: new HttpHeaders({
        // 'Access-Control-Allow-Origin': ['localhost','rpalhamra.com'],
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8'
    })
};
  constructor(private http: HttpClient) { }

  getIpscMenu(body:any)
  {
    

    return this.http.post(environment.apiUrl + "getAppMenu", body, this.httpOptions).pipe(catchError(this.handleError));
  //   return this.http.post("http://rpalhamra.com:8087/loginValidation/", {
  //     "email": "inspectortwo@gmail.com",
  //     "password": "IfVUQfll0Ew/SmvDxpx7NA==",
  //     "captchavalue":"Ve7Cx"
  // },
  //  this.httpOptions).pipe(catchError(this.handleError));
  }
  getMainmenu(){
    return this.http.get(environment.apiUrl + "getMainMenu").pipe(catchError(this.handleError));
  }
  getAboutConference(body:any):Observable<any>{
    return this.http.post<any>(environment.apiUrl +"getAboutConference",body).pipe(catchError(this.handleError));
  }

  getConferenceContent(body:any):Observable<any>{
    return this.http.post<any>(environment.apiUrl +"getConferenceContent",body).pipe(catchError(this.handleError));

  }


  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;

    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;

    }
    return throwError(msg);
  }

}
