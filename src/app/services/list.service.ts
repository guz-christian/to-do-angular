import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { List, ListCreate } from '../../assets/models/List';;

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private listIdSource = new BehaviorSubject(0);
  listId = this.listIdSource.asObservable();

  private upToDateSource = new BehaviorSubject(true);
  upToDate = this.upToDateSource.asObservable();

  changeListId(id:number){
    this.listIdSource.next(id)
  }

  changeUpToDate(value:boolean){
    this.upToDateSource.next(value)
  }
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

  postList(newList:ListCreate):Observable<List>{
    const url = this.user_id + '/';
    const apiCall = this.rootUrl + url;
    return this.http.post<List>(apiCall,newList)
  }

  editList(list_id:number, list:ListCreate):Observable<List>{
    const apiCall = this.rootUrl + list_id + '/'
    return this.http.put<List>(apiCall,list)
  }

  deleteList(list_id:number):Observable<any>{
    const url = 'delete/' + list_id + '/';
    const apiCall = this.rootUrl + url;
    return this.http.delete(apiCall)
  }
}
