import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScannerServiceService {
  apiUrl:string = environment.apiUrl;
  constructor(private http: HttpClient) { }


  getTankerDetails(body:any):Observable<any>{
    return this.http.post(environment.apiUrl+ "v1/scan-qrcode", body).pipe(catchError(this.handleError))
  }
  createTrip(body:any):Observable<any>{
    return this.http.post(environment.apiUrl+ "v1/create-trip", body).pipe(catchError(this.handleError))
  }
  // https://rpalhamra.com/clients/apollo/api/userAttendance

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
