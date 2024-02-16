import {Component, Input, Output, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';

import { TaskListRow } from '../../../assets/models/relationship';
import { Task } from '../../../assets/models/Task';
import { List } from '../../../assets/models/List';

import {ListService} from '../../services/list.service';
import {TaskService} from '../../services/task.service';


@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, RouterLink,
    MatCardModule,MatButtonModule,MatIconModule, MatDividerModule,MatMenuModule,MatListModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  constructor(
    private taskService: TaskService,
    private listService: ListService
  ){}
  
  currentListId:number = 0;
  
  @Input() public task?:Task;
  @Input() public otherLists:List[] = [];
  @Input() public button_style: string = '';
  @Input() public text_decoration: string = '';

  @Output() public toggledComplete = new EventEmitter();
  @Output() public taskLeftList = new EventEmitter<Task>()

  toggleComplete(task:Task){
    this.taskService.toggleTaskComplete(task)
    .subscribe(() => this.toggledComplete.emit())
  }

  move(list_id:number,task_id:number){
    const row: TaskListRow = {
      task_id: task_id,
      list_id: list_id
    }
    this.taskService.moveTaskToList(this.currentListId,row)
    .subscribe(() => {
      this.taskLeftList.emit(this.task)
    })
  }

  deleteTask(){
    this.taskService.deleteTask(this.task?.id!)
    .subscribe(() =>
    {
      this.taskLeftList.emit(this.task)
    })
  }

  ngOnInit(){
    this.listService.listId
    .subscribe((response) => 
    {
      this.currentListId = response;
    })

  }




}
