import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// import { ListComponent } from './components/list/list.component';
import { ListsComponent } from './components/lists/lists.component';

import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import { List } from './models/List';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,
    ListsComponent,
    MatTabsModule,MatToolbarModule,MatButtonModule,MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  lists:List[] = [];
  current_list = "hello";

  constructor(){}

  ngOnInit():void{
  }
}
