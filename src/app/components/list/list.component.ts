import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { TaskComponent } from '../task/task.component';

import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';

import { Task } from '../../models/Task';
import { List } from '../../models/List';

import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule,
    MatListModule,MatButtonModule,MatIconModule,MatDividerModule,MatMenuModule,MatExpansionModule,
    RouterLink,
    TaskComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  completed_tasks: Task[] = [];
  active_tasks: Task[] = [];

  @Input() public listId:number = 0;
  @Input() public lists:List[] = [];
  @Output() public list_changed = new EventEmitter<any>();

  constructor(private taskService:TaskService){}

  get_tasks(){
    this.taskService.getTasks(this.listId)
    .subscribe((response) => {
      this.set_tasks(response)
    })
  }

  set_tasks(all_tasks:Task[]){
    this.completed_tasks = [];
    this.active_tasks = [];
    for(let i = 0; i < all_tasks.length; i++){
      const task = all_tasks[i];
      if(task.complete == true){
        this.completed_tasks.push(task)
      }
      if(task.complete == false){
        this.active_tasks.push(task)
      }
    }
  }

  
  delete_task(task:Task){
    const index = this.active_tasks.indexOf(task);
    this.active_tasks.splice(index,1)
  }
  
  toggle_complete(task:Task){
    if(task.complete == true)
    {
      const index = this.active_tasks.indexOf(task);
      this.active_tasks.splice(index,1);
      this.completed_tasks.push(task);
    }
    if(task.complete == false)
    {
      const index = this.completed_tasks.indexOf(task);
      this.completed_tasks.splice(index,1);
      this.active_tasks.push(task);
    }
    

  }

  remove_from_list(event:any){
    const index = this.active_tasks.indexOf(event.task);
    this.active_tasks.splice(index,1)
    this.list_changed.emit(event)
  }

  delete_completed_tasks(){
    for(let i=0; i < this.completed_tasks.length; i++)
    {
      const task = this.completed_tasks[i];

      this.taskService.deleteTask(task.id).subscribe()
    }
    this.completed_tasks = []
  }
  
  ngOnInit():void{
    this.taskService.getTasks(this.listId)
    .subscribe((response) => {this.set_tasks(response)})

  }


}
