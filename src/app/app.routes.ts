import { Routes } from '@angular/router';
import { ModelSetupComponent } from './model-setup/model-setup.component';
import { ConfigSetupComponent } from './config-setup/config-setup.component';
import { SummaryViewComponent } from './summary-view/summary-view.component';
import { ActivateCheck } from './services/car-customization.service';

export const routes: Routes = [
    { 
        path: 'model', 
        component: ModelSetupComponent
    },
    { 
        path: 'configuration', 
        component: ConfigSetupComponent,
        canActivate: [ActivateCheck]
    },
    { 
        path: 'summary', 
        component: SummaryViewComponent,
        canActivate: [ActivateCheck]
    },
    { 
        path: '', 
        redirectTo: 'model', 
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'model'
    }
];
