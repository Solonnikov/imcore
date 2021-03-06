import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/Item';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-dragable',
  templateUrl: './dragable.component.html',
  styleUrls: ['./dragable.component.css']
})
export class DragableComponent implements OnInit {
  item: Item;
  items: Item[];
  items2: Item[] = [];
  returnedItems: any;
  droppedItems = false;
  p; p1; p2 = 1;

  // Alowed Drop Place
  val = 500;
  isDropAllowed = (dragData: any) => {
    return dragData > this.val;
  }

  // Drop Item Event
  onItemDrop(e: any) {
    // Get the dropped data here
    this.items2.push(e.dragData);
    console.log('User2 Total dropped and pending items ' + this.items2.length);

    // Splice specific dragged Item
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].accetId === e.dragData.accetId) {
        this.items.splice(i, 1);
        break;
      }
    }

    console.log('User1 left pending items ' + this.items.length);
  }

  constructor(
    public itemsService: ItemsService
  ) { }

  ngOnInit() {
    // Get User 1 Items
    this.itemsService.getItems().subscribe(items => {
      this.items = items;
      console.log('User1 current items');
      console.log(this.items.length);
    });
    // Get User 2 Items
    this.itemsService.getItems2().subscribe(items2 => {
      this.items2 = items2;
      console.log('User2 current items');
      console.log(this.items2.length);
    });
  }

  onAddSubmit() {
    // Add User 2 Item
    this.itemsService.addItem(this.items2).subscribe();
    // Update User 1 Item
    this.itemsService.changeItem(this.items).subscribe();
    this.droppedItems = true;
  }

  // Return User1 Items
  returnItems() {
    this.itemsService.returnItems().subscribe(returnedItems =>
      this.returnedItems = returnedItems
    );
  }
}
