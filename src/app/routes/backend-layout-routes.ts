
import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

export const BACKEND_LAYOUT: Routes = [
    {
        path: '',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule),
        canLoad: [AuthGuard]
    },
    {
        path: 'product',
        loadChildren: () => import('../product/product.module').then(m => m.ProductModule),
        canLoad: [AuthGuard]
    },
	{
        path: 'form',
        loadChildren: () => import('../form/form.module').then(m => m.FormModule),
        canLoad: [AuthGuard]
    },
	{
        path: 'report',
        loadChildren: () => import('../report/report.module').then(m => m.ReportModule),
        canLoad: [AuthGuard]
    }
]
