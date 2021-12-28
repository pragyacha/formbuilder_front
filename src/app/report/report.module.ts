import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ReactiveFormsModule,FormsModule  }    from '@angular/forms';
import { ReportRoutingModule } from './report-routing.module';
import { RecordEntryComponent } from './record-entry/record-entry.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
@NgModule({
  declarations: [RecordEntryComponent],
  imports: [
  SweetAlert2Module,
  ReactiveFormsModule,
  FormsModule,
  ReportRoutingModule,
  CommonModule,
  NgxPaginationModule,
  Ng2SearchPipeModule,
  NgxSkeletonLoaderModule
  ]
})
export class ReportModule { }
