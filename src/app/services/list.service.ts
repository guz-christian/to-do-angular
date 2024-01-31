import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { List, ListCreate } from '../models/List';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  public listEdit:ListCreate = {name:''};

  constructor(private http:HttpClient) { }

  private rootUrl = 'http://127.0.0.1:8000/lists/';
  private user_id = 1;
  public current_list_id = 0;

  getLists():Observable<List[]>{
    const url = this.user_id + '/';
    const apiCall = this.rootUrl+url;
    return this.http.get<List[]>(apiCall)
  }

  getSingleList():Observable<List>{
    const url = 'single/' + this.current_list_id + '/';
    const apiCall = this.rootUrl + url;

    return this.http.get<List>(apiCall)
  }

  postList():Observable<List>{
    const url = this.user_id + '/';
    const apiCall = this.rootUrl + url;
    return this.http.post<List>(apiCall,this.listEdit)
  }

  deleteList(list_id:number):Observable<any>{
    const url = 'delete/' + list_id + '/';
    const apiCall = this.rootUrl + url;
    return this.http.delete(apiCall)
  }
}
