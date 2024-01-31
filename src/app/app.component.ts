import { Component } from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';

import { ListsComponent } from './components/lists/lists.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule,ListsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(){}

  ngOnInit():void{
  }
}
