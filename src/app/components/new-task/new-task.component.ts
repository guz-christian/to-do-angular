import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { TaskService } from '../../services/task.service';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [RouterLink,
    MatFormFieldModule,MatInputModule,
    FormsModule,MatButtonModule,CommonModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  constructor(private taskService:TaskService, 
              private listService:ListService,
              private route: ActivatedRoute
    ){}
  
  @Input()
  set id(taskId:number){
    if(taskId){
    this.taskService.getSingleTask(taskId)
    .subscribe((response) => {
      this.new_task.description = response.description;
      this.new_task.name = response.name;}
    )}
  }

  new_task = {
    name:'',
    description:''
  }

  list_title: string = '';

  save(){
    this.taskService.postTask(this.new_task).subscribe()
    // this.taskService.postTask(this.new_task)
  }

  ngOnInit(){
    this.listService.getSingleList()
    .subscribe((response) => this.list_title = response.name);
  }

}
