import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Item } from '../models/Item';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class ItemsService {
  apiUrlUser1 = 'assets/data/user1.json';
  apiUrlUser2 = 'assets/data/user2.json';

  constructor(private http: Http) { }

  // Get User 1 Items
  getItems(): Observable<Item[]> {
    return this.http.get(this.apiUrlUser1)
      .map(res => res.json() as Item[]);
  }

  // Get User 2 Items
  getItems2(): Observable<Item[]> {
    return this.http.get(this.apiUrlUser2)
      .map(res => res.json() as Item[]);
  }

  // Add Item User 2
  addItem(item: any): Observable<Item> {
    return this.http.post('http://localhost:8080/add', item)
      .map(res => item as Item);
  }

  // Update Item User 1
  changeItem(item: any): Observable<Item> {
    return this.http.post('http://localhost:8080/change', item)
      .map(res => item as Item);
  }

  // Return User 1 Items
  returnItems(): Observable<Item[]> {
    return this.http.get('http://localhost:8080/return')
      .map(res => res.json() as Item[]);
  }
}
