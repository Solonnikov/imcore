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
  item2: Item;
  items2: Item[] = [];
  returnedItems: any;
  droppedItems = false;
  noItems = false;
  p = 1;
  p1 = 1;
  p2 = 1;

  // Alowed Drop Place
  val = 500;
  isDropAllowed = (dragData: any) => {
    return dragData > this.val;
  }

  // Drop Item Event
  onItemDrop(e: any) {
    // Get the dropped data here
    this.items2.push({
      accetId: e.dragData.accetId,
      itemName: e.dragData.itemName,
      imageUrl: e.dragData.imageUrl,
      marketHashName: e.dragData.marketHashName,
      itemType: e.dragData.itemType,
      price: e.dragData.price,
      status: e.dragData.status
    });
    console.log('User2 Total dropped and pending items ' + this.items2.length);

    this.items.splice(e.dragData, 1);
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
      this.noItems = true;
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
