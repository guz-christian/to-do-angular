import { Routes } from '@angular/router';

import { ListsComponent } from './components/lists/lists.component';
import { NewListComponent } from './components/new-list/new-list.component';
import { NewTaskComponent } from './components/new-task/new-task.component';

import { ListComponent } from './components/list/list.component';

export const routes: Routes = [
    {path:'new-list', component: NewListComponent},
    {path: 'new-task', component: NewTaskComponent},
    {path: 'list/:id', component: ListComponent}
];
