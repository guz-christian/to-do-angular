import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';

import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-new-list',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,FormsModule,
    MatButtonModule,RouterLink],
  templateUrl: './new-list.component.html',
  styleUrl: './new-list.component.css'
})
export class NewListComponent {
  constructor(private listService:ListService){}

  new_list = {name: ""}
  save(){
    this.listService.postList(this.new_list).subscribe()
  }

}
