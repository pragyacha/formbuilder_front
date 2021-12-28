import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  }    from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { ViewFormComponent } from './view-form/view-form.component';
import {DpDatePickerModule} from 'ng2-date-picker';
import { PaymentsComponent } from './payments/payments.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [ViewFormComponent, PaymentsComponent, ThankYouComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
	FormsModule,
	DpDatePickerModule,
	NgxSkeletonLoaderModule
  ]
})
export class PagesModule { }
