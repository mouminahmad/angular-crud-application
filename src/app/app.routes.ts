import { Routes } from '@angular/router';
import { UserComponent } from './component/user/user.component';
import { DisplayComponent } from './component/display/display.component';


export const routes: Routes = [

    {
        path : '',
        redirectTo : 'display',
        pathMatch : 'full'
    },
    
    {
       path : 'display',
       component : DisplayComponent 
    },


    {
        path : 'user',
        component : UserComponent 
     },

     { path: 'user/:id', component: UserComponent }, // For editing a user
]
