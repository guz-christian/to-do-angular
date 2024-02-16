import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-bottom-panel',
  standalone: true,
  imports: [MatIconModule,MatButtonModule,MatMenuModule,RouterLink,CommonModule],
  templateUrl: './bottom-panel.component.html',
  styleUrl: './bottom-panel.component.css'
})
export class BottomPanelComponent {
  constructor(
    private listService: ListService
  ){}
  
  currentListId?: number;
  @Input() public safeListRoute?: string;
  @Output() public removedList = new EventEmitter<number>();

  deleteList(){
    this.listService.deleteList(this.currentListId!)
    .subscribe(() =>
    {
      this.removedList.emit()
    })
  }

  ngOnInit():any{
    this.listService.listId
    .subscribe((response) =>
    {
      this.currentListId = response;
    })
  }


}
