
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule  }    from '@angular/forms';
import { FormRoutingModule } from './form-routing.module';
import { ShareComponent } from './share/share.component';
import { SettingsComponent } from './settings/settings.component';
import { BuilderComponent } from './builder/builder.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DndModule } from 'ngx-drag-drop';
import {BuilderHeaderComponent} from './builder-header/builder-header.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [ShareComponent, SettingsComponent, BuilderComponent,BuilderHeaderComponent],
  imports: [
    SweetAlert2Module,
    CommonModule,
    ReactiveFormsModule,
	FormsModule,
    FormRoutingModule,
	DndModule,
	NgxQRCodeModule,
	NgxSkeletonLoaderModule
  ]
})
export class FormModule { }

