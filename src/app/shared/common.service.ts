import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }


  getLocations(): Observable<any> {
    return this.http.post<any>(environment.apiUrl + "v1/get-locations",'').pipe(catchError(this.handleError));
  }

  GetTrips(body: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + "v1/trips-list", body).pipe(catchError(this.handleError));
  }

  GetTicketDetails(body: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + "get-ticket-details", body).pipe(catchError(this.handleError));
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
