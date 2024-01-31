import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivatedRoute} from '@angular/router';
import { RouterLink } from '@angular/router';

import { Task } from '../../models/Task';
import { List } from '../../models/List';
import { TaskService } from '../../services/task.service';

import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatButtonModule,RouterLink,
    MatIconModule, MatDividerModule,MatMenuModule,MatListModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ){}

  
  @Input() public otherLists:List[] = [];
  @Input() public task?:Task;
  @Input() public currentListId:number = 0;

  @Input() public button_style: string = 'check_box_outline_blank';
  @Input() public text_decoration: string = '';

  @Output() public madeChanges = new EventEmitter<Task>();
  // @Output() public moved_to_list = new EventEmitter<any>();
  // @Output() public task_deleted = new EventEmitter<Task>();
  

  toggle_complete(task:Task){
    this.taskService.toggleTaskComplete(task)
    .subscribe(() => this.madeChanges.emit())
  }

  // delete_task(task:Task){
  //   this.taskService.deleteTask(task.id)
  //   .subscribe(() => {
  //     this.task_deleted.emit(task)
  //   })

  // }

  move(list_id:number,task_id:number){
    const row = {
      task_id: task_id,
      list_id: list_id
    }
    this.taskService.moveTaskToList(this.currentListId,row)
    .subscribe(() => {
      this.madeChanges.emit()
    })
  }



  ngOnInit(){

  }




}
