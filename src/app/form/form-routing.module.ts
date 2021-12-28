
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ShareComponent } from './share/share.component';
import { SettingsComponent } from './settings/settings.component';
import { BuilderComponent } from './builder/builder.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: BuilderComponent
      },
	  {
        path: ':formslug/builder',
        component: BuilderComponent
      },
      {
        path: ':formslug/settings',
        component: SettingsComponent
      },
      {
        path: ':formslug/share',
        component: ShareComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }

