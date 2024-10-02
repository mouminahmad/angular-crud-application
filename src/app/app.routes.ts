import { Routes } from '@angular/router';
import { UserComponent } from './component/user/user.component';

export const routes: Routes = [

    {
        path : '',
        redirectTo : 'user',
        pathMatch : 'full'
    },
    
    {
       path : 'user',
       component : UserComponent 
    }
]
