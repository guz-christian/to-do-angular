import { Component} from '@angular/core';
import { RouterLink } from '@angular/router';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { ListService} from '../../services/list.service';

@Component({
  selector: 'app-new-list',
  standalone: true,
  imports: [
    RouterLink,
    MatInputModule, MatFormFieldModule, FormsModule, MatButtonModule
  ],
  templateUrl: './new-list.component.html',
  styleUrl: './new-list.component.css'
})
export class NewListComponent {
  constructor(
    private listService:ListService
    ){}
  
  new_list = {name: ""}
  newListId?: number;
  previousListRoute?: string;
  newListRoute?: string;

  save(){
    this.listService.editList(this.newListId!,this.new_list)
    .subscribe(() => 
    {
      this.listService.changeUpToDate(false)
    })
  }

  cancel(){
    this.listService.deleteList(this.newListId!).subscribe()
  }

  ngOnInit(){
    this.listService.listId
    .subscribe((response) => 
    {
      this.previousListRoute = "/list/" + response;
    });
    this.listService.postList(this.new_list)
    .subscribe((response) =>
    {
      this.newListId = response.id;
      this.newListRoute = "/list/" + response.id
    });
  }

}
