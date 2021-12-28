import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {QueryDetailsComponent} from '../query-details/query-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [DashboardComponent,QueryDetailsComponent],
  imports: [
    CommonModule,
	ReactiveFormsModule,
    DashboardRoutingModule,
	NgxPaginationModule,
	NgxSkeletonLoaderModule
  ]
})
export class DashboardModule { }
