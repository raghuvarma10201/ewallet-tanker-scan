import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SpeakersService {

  constructor(private http: HttpClient) { }
  getSpeakerByConference(body:any)
  {
    return this.http.post(environment.apiUrl + "getSpeakerByConference", body).pipe(catchError(this.handleError));
  }
  getSpeakerById(body:any)
  {
    return this.http.post(environment.apiUrl + "getSpeakerByConferenceWithSpeaker", body).pipe(catchError(this.handleError));
  }
  getSpeakerByParam(body:any)
  {
    return this.http.post(environment.apiUrl + "getSpeakerByParam", body).pipe(catchError(this.handleError));
  }

  getworkshops(body:any)
  {
    return this.http.post(environment.apiUrl + "getPreconferenceWorkshops", body).pipe(catchError(this.handleError));
  }

  getWebinars(body:any)
  {
    return this.http.post(environment.apiUrl + "getWebinars", body).pipe(catchError(this.handleError));
  }

  getSocialLinks(body:any)
  {
    return this.http.post(environment.apiUrl + "getConferenceSocialLinks", body).pipe(catchError(this.handleError));
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
