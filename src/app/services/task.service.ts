import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import { Task } from '../../assets/models/Task';
import { TaskListRow } from '../../assets/models/relationship';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(
    private http:HttpClient
    ) { }

  private rootUrl = 'http://127.0.0.1:8000/tasks/';
  public currentListId?:number;

  getTasks(list_id: number):Observable<Task[]>{
    const url = list_id + '/';
    const apiCall = this.rootUrl + url;
    return this.http.get<Task[]>(apiCall)
  }

  postTask(new_task:any,list_id:number):Observable<any>{
    const url = list_id + '/';
    const apiCall = this.rootUrl + url;
    return this.http.post<any>(apiCall,new_task)
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

  deleteTask(task_id:number):Observable<any>{
    const url = task_id + '/';
    const apiCall = this.rootUrl + url;
    return this.http.delete<any>(apiCall)
  }

}
