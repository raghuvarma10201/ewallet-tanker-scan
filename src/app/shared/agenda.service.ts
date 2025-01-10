import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private http: HttpClient) { }
  getAgendaList(body:any)
  {
    return this.http.post(environment.apiUrl + "getAgendaList", body).pipe(catchError(this.handleError));
  }
  
  addtoMyAgenda(body:any)
  {
    return this.http.post(environment.apiUrl + "addtoMyAgenda", body).pipe(catchError(this.handleError));
  }
  insertLike(body:any){
    return this.http.post(environment.apiUrl + "insertLikes", body).pipe(catchError(this.handleError));
  }
  getLikesCount(body:any){
    return this.http.post(environment.apiUrl + "getLikesCount", body).pipe(catchError(this.handleError));

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
