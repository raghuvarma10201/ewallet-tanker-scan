import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PscService {
  apiUrl:string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getPsc(body:any):Observable<any>{
    return this.http.post(environment.apiUrl + "getPatientSafetyContent", body).pipe(catchError(this.handleError))
  }

  getStories(body:any):Observable<any>{
    return this.http.post(environment.apiUrl+ "getSuccessStories", body).pipe(catchError(this.handleError))
  }

  getPscCommon(body:any):Observable<any>{
    return this.http.post(environment.apiUrl+ "managePDFs", body).pipe(catchError(this.handleError))
  }

  getEvents(body:any):Observable<any>{
    return this.http.post(environment.apiUrl+ "getUpcomingEvents", body).pipe(catchError(this.handleError))
  }

  getPscMembership(body:any):Observable<any>{
    return this.http.post(environment.apiUrl+ "getPSCMembershipcharges", body).pipe(catchError(this.handleError))
  }
  getpscmenbershipRegistration(body:any):Observable<any>{
    return this.http.post(environment.apiUrl+ "pscmembershipregistration", body).pipe(catchError(this.handleError))
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
