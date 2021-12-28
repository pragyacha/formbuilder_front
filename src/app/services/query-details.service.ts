import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QueryDetailsService {

 
 

  private apiUrl = `${environment.apiUrl}/managequery`;
  private handleError: HandleError;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  redirectUrl: string;

  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = this.httpErrorHandler.createHandleError('QueryDetailsService')
  }

  getQueryDetailsInfo(qid) {
     return this.http.get(`${this.apiUrl}/queryinfo/${qid}`)
    .pipe(
      catchError(this.handleError('getQueryDetailsInfo', null))
    ) 
  }

 getqueryCommentsData(qid,tr_type) {
     return this.http.get(`${this.apiUrl}/querycomments/${qid}/${tr_type}`)
    .pipe(
      catchError(this.handleError('getqueryCommentsData', null))
    ) 
  }

 
    
  
}
