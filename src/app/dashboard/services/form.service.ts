
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

  private apiUrl = `${environment.apiUrl}forms`;
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

savenewforms(datas) {
    return this.http.post(`${this.apiUrl}/savenewform`, datas)
    .pipe(
      catchError(this.handleError('savenewforms', null))
    )
  }

getFormInfo(slug)
{
	return this.http.get(`${this.apiUrl}/getforminfo/${slug}`)
    .pipe(
      catchError(this.handleError('getFormInfo', null))
    )
}

 getAllForms(offset: number, limit: number) {
    return this.http.get(`${this.apiUrl}/getallformdata/${offset}/${limit}`)
    .pipe(
      catchError(this.handleError('getAllForms', null))
    )
  }
  saveBuilderForms(datas) {
    return this.http.post(`${this.apiUrl}/savebuilderforms`, datas)
    .pipe(
      catchError(this.handleError('saveBuilderForms', null))
    )
  }

 deleteBuilderFormsField(id: number) {
    return this.http.delete(`${this.apiUrl}/deleteformfield/${id}`)
    .pipe(
      catchError(this.handleError('deleteBuilderFormsField', null))
    )
  }
  
editFormFieldInfo(id: number)
{
	return this.http.get(`${this.apiUrl}/getformfieldinfo/${id}`)
    .pipe(
      catchError(this.handleError('editFormFieldInfo', null))
    )
}
saveEditBuilderFormsField(datas)
{
return this.http.post(`${this.apiUrl}/savebuilderformsfield/`, datas)
    .pipe(
      catchError(this.handleError('saveEditBuilderFormsField', null))
    )	
}
  updateMainForms(datas)
  {
	return this.http.post(`${this.apiUrl}/updatemainform/`, datas)
    .pipe(
      catchError(this.handleError('updateMainForms', null))
    )  
  }
  updateSettingForms(datas)
  {
	return this.http.post(`${this.apiUrl}/updatesettingform/`, datas)
    .pipe(
      catchError(this.handleError('updateSettingForms', null))
    )  
  }
  
  deleteForms(id: number)
  {
	return this.http.delete(`${this.apiUrl}/deleteform/${id}`)
    .pipe(
      catchError(this.handleError('deleteForms', null))
    )  
  }
  
  getFormSubmittedDetails(slug, offset: number, limit: number,search_date)
  {
	return this.http.get(`${this.apiUrl}/getformsubmitteddetails/${slug}/${offset}/${limit}/${search_date}`)
    .pipe(
      catchError(this.handleError('getFormSubmittedDetails', null))
    )  
  }
  
  getFormRecordInfo(slug)
{
	return this.http.get(`${this.apiUrl}/getformrecordlisting/${slug}`)
    .pipe(
      catchError(this.handleError('getFormRecordInfo', null))
    )
}
deleteUserSubmittedRecords(id: number)
{
 return this.http.delete(`${this.apiUrl}/deleteusersubmittedrecords/${id}`)
    .pipe(
      catchError(this.handleError('deleteUserSubmittedRecords', null))
    )	
}

}

