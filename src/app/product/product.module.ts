
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductRoutingModule } from './product-routing.module';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FileUploadComponent } from './file-upload/file-upload.component';

@NgModule({
  declarations: [CreateProductComponent, ProductListComponent, FileUploadComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductRoutingModule,
	NgxPaginationModule
  ]
})
export class ProductModule { }

