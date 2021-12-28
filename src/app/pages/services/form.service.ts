
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../../services/http-error-handler.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private apiUrl = `${environment.apiUrl}pages`;
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
    this.handleError = this.httpErrorHandler.createHandleError('FormService')
  }

 

getFormInfo(slug)
{
	return this.http.get(`${this.apiUrl}/getforminfo/${slug}`)
    .pipe(
      catchError(this.handleError('getFormInfo', null))
    )
}

  submitUserForm(datas)
  {
	return this.http.post(`${this.apiUrl}/submituserform/`, datas)
    .pipe(
      catchError(this.handleError('submitUserForm', null))
    )  
  }
  
  getFormOrderInfo(slug, id)
  {
	return this.http.get(`${this.apiUrl}/getformorderinfo/${slug}/${id}`)
    .pipe(
      catchError(this.handleError('getFormOrderInfo', null))
    )  
  }
  
  SavePaymentStatus(id,status)
  {
	return this.http.get(`${this.apiUrl}/savepaymentstatus/${id}/${status}`)
    .pipe(
      catchError(this.handleError('SavePaymentStatus', null))
    )  
  }

submitClickEnquiry(datas)
{
return this.http.post(`${this.apiUrl}/submitClickEnquiry/`, datas)
    .pipe(
      catchError(this.handleError('submitClickEnquiry', null))
    )	
}

}

