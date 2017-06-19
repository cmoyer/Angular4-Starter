import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { MenuComponent } from './core/header/menu/menu.component';
import { TableLayoutComponent } from './core/table-layout/table-layout.component';
import { FormatCellPipe } from './core/table-layout/format-cell.pipe';
import { StyleCellDirective } from './core/table-layout/style-cell.directive';
import { ColumnWidthDirective } from './core/table-layout/column-width.directive';
import { HideColumnDirective } from './core/table-layout/hide-column.directive';
import { ModalComponent } from './core/modal/modal.component';
import { MenuService } from './core/menu.service';
import { CurrencyPipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    TableLayoutComponent,
    FormatCellPipe,
    StyleCellDirective,
    ColumnWidthDirective,
    HideColumnDirective,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [MenuService, CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
