import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {RouterOutlet} from '@angular/router';

import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';;
import {MatMenuModule} from '@angular/material/menu';

import { List } from '../../../assets/models/List';

import {BottomPanelComponent} from '../bottom-panel/bottom-panel.component';

import {ListService} from '../../services/list.service';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [
    CommonModule, RouterLink, RouterOutlet,
    MatTabsModule, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule,
    BottomPanelComponent],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent {

  constructor(
    private listService:ListService
    ){}

  lists:List[] = [];
  currentListId?:number;
  activeLink?:string;
  safeListRoute?:string;

  getLists(list_deleted:boolean = false){
    this.listService.getLists()
    .subscribe((response) => 
    {
      this.lists = response;
      if(list_deleted == true)
      {
        this.listService.changeListId(this.lists[0].id)
      }     
    })
  }

  selectSafeList(current_list_id:number){
    for(let i=0; i< this.lists.length; i++)
    {
      if(this.lists[i].id != current_list_id)
      {
        return this.lists[i]
      }
    }
    return null
  }
  
  ngOnInit():void{
    this.listService.getLists()
    .subscribe((response) =>
    {
      this.lists = response;
    });

    this.listService.upToDate
    .subscribe((response) =>
    {
      if(response == false)
      {
        this.getLists();
        this.listService.changeUpToDate(true);
      }
    });

    this.listService.listId
    .subscribe((id) =>
    {
      setTimeout(() => 
      {
        this.activeLink = '/list/' + id;
        this.currentListId = id;
        this.safeListRoute = '/list/' + this.selectSafeList(id)?.id
      },0)
    });

  }
}
