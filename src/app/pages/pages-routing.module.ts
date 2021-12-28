
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewFormComponent } from './view-form/view-form.component';
import { PaymentsComponent } from './payments/payments.component';
import { ThankYouComponent } from './thank-you/thank-you.component';

const routes: Routes = [
  { path: 'payment/:id/:formslug',component: PaymentsComponent },
  { path: 'thank-you/:formslug',component: ThankYouComponent },
  { path: ':formslug',component: ViewFormComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
