import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute} from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { TaskService } from '../../services/task.service';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [
    RouterLink,CommonModule,
    MatFormFieldModule,MatInputModule,FormsModule,MatButtonModule
  ],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  constructor(private taskService:TaskService, 
              private listService:ListService,
              private route: ActivatedRoute
    ){}

  new_task = {
    name:'',
    description:''
  }
  currentListId?: number;
  currentListRoute?: string;
  list_title: string = '';

  save(){
    this.taskService.postTask(this.new_task,this.currentListId!).subscribe()
  }

  ngOnInit(){
    this.listService.listId
    .subscribe((response) =>
    {
      this.currentListId = response;
      this.currentListRoute = "/list/" + response;
    })
  }

}
