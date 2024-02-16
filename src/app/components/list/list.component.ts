import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';

import { TaskComponent } from '../task/task.component';

import { Task } from '../../../assets/models/Task';
import { List } from '../../../assets/models/List';

import { TaskService } from '../../services/task.service';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    MatListModule, MatButtonModule, MatIconModule, MatDividerModule, MatMenuModule, MatExpansionModule,
    TaskComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {  
  constructor(
    private taskService:TaskService,
    private listService: ListService,
    private route: ActivatedRoute
    ){}

  allTasks: Task[] = [];
  completedTasks: Task[] = [];
  activeTasks: Task[] = [];
  otherLists: List[] = [];

  loadTasks(list_id:number){
    this.completedTasks = [];
    this.activeTasks = [];
    this.getOtherLists(list_id);

    this.taskService.getTasks(list_id)
    .subscribe((response) => {
      this.allTasks = response;
      this.seperateTasks();
    })
  }

  seperateTasks(){
    this.activeTasks = [];
    this.completedTasks = [];
    for(let i = 0; i < this.allTasks.length; i++)
    {
      const task = this.allTasks[i];
      if(task.complete == true)
      {
        this.completedTasks.push(task)
      }
      if(task.complete == false)
      {
        this.activeTasks.push(task)
      }
    }
  }

  getOtherLists(id:number){
    this.otherLists = [];
    this.listService.getLists()
    .subscribe((response) => {
      for(let i=0; i< response.length; i++)
      {
        const current_list = response[i];
        if(current_list.id != id)
        {
          this.otherLists.push(current_list)
        }
      }
    })
  }

  removeTask(task:Task){
    if(task.complete == true)
    {
      const index: number = this.completedTasks.indexOf(task);
      this.completedTasks.splice(index,1)
    }
    if(task.complete == false)
    {
      const index: number = this.activeTasks.indexOf(task);
      this.activeTasks.splice(index,1)
    }
  }
  
  ngOnInit():void{
    this.route.params
    .subscribe((params) => {
      this.loadTasks(Number(params['id']));
      this.listService.changeListId(Number(params['id']))
    })
  }


}
