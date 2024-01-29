import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { ListService } from './list.service';

import { Task,TaskEdit } from '../models/Task';
import { TaskListRow } from '../models/relationship';
import { List } from '../models/List';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http:HttpClient, private listService:ListService) { }

  private rootUrl = 'http://127.0.0.1:8000/tasks/';

  getTasks(list_id: number):Observable<Task[]>{
    const url = list_id + '/';
    const apiCall = this.rootUrl + url;
    return this.http.get<Task[]>(apiCall)
  }

  getSingleTask(task_id:number):Observable<Task>{
    const url = 'single/' + task_id + '/';
    const apiCall = this.rootUrl + url;
    return this.http.get<Task>(apiCall)
  }

  postTask(new_task:any):Observable<any>{
    const url = this.listService.current_list_id + '/';
    const apiCall = this.rootUrl + url;
    return this.http.post<any>(apiCall,new_task)
  }

  deleteTask(task_id:number):Observable<any>{
    const url = task_id + '/';
    const apiCall = this.rootUrl + url;
    return this.http.delete<any>(apiCall)
  }

  editTask(task:Task,task_id:number):Observable<Task>{
    const apiCall = this.rootUrl + 'edit/' + task_id + '/';
    return this.http.put<Task>(apiCall,task)
  }

  toggleTaskComplete(task:Task):Observable<Task>{
    let edited_task = task
    const apiCall = this.rootUrl + 'edit/' + task.id + '/';

    if(task.complete == true)
    {
      edited_task.complete = false;
    }
    else
    {
      edited_task.complete = true;
    }

    return this.http.put<Task>(apiCall,task)
  }

  moveTaskToList(list_origin_id:number, task_list_row:TaskListRow):Observable<any>{
    const url = 'move/' + list_origin_id + '/';
    const apiCall = this.rootUrl + url;

    return this.http.put<any>(apiCall,task_list_row)

  }



}
