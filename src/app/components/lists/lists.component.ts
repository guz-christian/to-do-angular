import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { RouterOutlet } from '@angular/router';

import {MatTabChangeEvent, MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';;
import { MatMenuModule } from '@angular/material/menu';

import { ListComponent } from '../list/list.component';
import { NewListComponent } from '../new-list/new-list.component';
import { ListService } from '../../services/list.service';

import { List } from '../../models/List';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [MatTabsModule,MatToolbarModule,MatButtonModule,MatIconModule,
    ListComponent,NewListComponent,
    CommonModule,RouterLink,MatMenuModule,
    RouterOutlet],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent {

  constructor(private listService:ListService){}

  currentListId = 0;
  lists:List[] = [];
  needs_refreshment:boolean = false;

  activeLink = '/new-list';

  get_link(list_id:number){
    this.currentListId = list_id;
    return "/list/" + list_id
  }


  get_lists(){
    this.listService.getLists().subscribe((response) => {this.lists = response})
  }

  addList(){
    this.listService.postList()
    .subscribe((response) =>
    {
      this.lists.push(response);
    })
  }

  // set_current_list_id(tab_index:number){
  //   if(this.lists.length > 0){
  //     this.current_list_id = this.lists[tab_index].id;
  //     this.listService.current_list_id = this.current_list_id

  //   }
  // }

  // tabChanged(tabChangeEvent: MatTabChangeEvent):void{
  //   if(this.needs_refreshment == true){
  //     this.needs_refreshment = false;
  //     this.get_lists()
  //   }
  //   this.set_current_list_id(tabChangeEvent.index);
  // }

  // refresh_list(event:any){
  //   this.needs_refreshment = true;
  // }
  
  deleteList(){
    this.listService.deleteList(this.currentListId)
    .subscribe(() => {
      this.listService.getLists()
      .subscribe((response) => {this.lists = response})})
    
  }
  
  // collect_other_lists(list_exception:List){
  //   let modified_lists = [];
  //   for(let i = 0; i < this.lists.length; i++)
  //   {
  //     const current_list = this.lists[i];
  //     if(list_exception != current_list)
  //     {
  //       modified_lists.push(current_list)
  //     }
  //   }
    
  //   return modified_lists
    
  // }
  
  
  ngOnInit():void{
    this.listService.getLists().subscribe((response) => {this.lists = response});

  }

}
