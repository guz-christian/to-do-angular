import { Routes } from '@angular/router';

import { ListsComponent } from './components/lists/lists.component';
import { NewListComponent } from './components/new-list/new-list.component';
import { NewTaskComponent } from './components/new-task/new-task.component';

export const routes: Routes = [
    {path:'', component: ListsComponent},
    {path:'new-list', component: NewListComponent},
    {path: 'new-task', component: NewTaskComponent},
    {path: 'edit-task/:id', component:NewTaskComponent}
];
