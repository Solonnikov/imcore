import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2DragDropModule } from 'ng2-drag-drop';
import { RouterModule } from '@angular/router';

import { ItemsService } from './services/items.service';

import { AppComponent } from './app.component';
import { DragableComponent } from './components/dragable/dragable.component';

@NgModule({
  declarations: [
    AppComponent,
    DragableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgxPaginationModule,
    Ng2DragDropModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: DragableComponent },
    ]),
  ],
  providers: [
    ItemsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
