
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule,FormsModule  }    from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpErrorHandler } from './services/http-error-handler.service';
import { MessageService } from './services/message.service';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { BackendLayoutComponent } from './layouts/backend-layout/backend-layout.component';
import { httpInterceptorProviders } from './http-interceptors';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ExportService } from './services/export.service';
import {DpDatePickerModule} from 'ng2-date-picker';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    BackendLayoutComponent,
  ],
  imports: [
  SweetAlert2Module,
    BrowserModule,
	ReactiveFormsModule,
	FormsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    NgbModule,
	DlDateTimeDateModule,  // <--- Determines the data type of the model
    DlDateTimePickerModule,
	Ng2SearchPipeModule,
	BrowserAnimationsModule,
	DpDatePickerModule,
	NgxSkeletonLoaderModule,
	ToastrModule.forRoot()
  ],
  providers: [
    HttpErrorHandler,
    MessageService,
    httpInterceptorProviders,
	ExportService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
