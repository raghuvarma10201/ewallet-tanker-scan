import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SponsorsService {

  constructor(private http: HttpClient) { }

  getSponsers(body:any)
  {
    return this.http.post(environment.apiUrl + "getSponsors", body).pipe(catchError(this.handleError));
  }

  getBankDetails(body:any):Observable<any>{
    return this.http.post(environment.apiUrl+ "getBankDetails", body).pipe(catchError(this.handleError))
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
