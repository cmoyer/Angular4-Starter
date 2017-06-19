import { Component, Input, OnChanges } from '@angular/core';
import { ColumnSetting, ColumnMap } from './layout.model';

@Component({
  selector: 'app-table-layout',
  templateUrl: './table-layout.component.html',
  styleUrls: ['./table-layout.component.css']
})
export class TableLayoutComponent implements OnChanges {
  @Input() records: any[];
  @Input() caption: string;
  @Input() settings: ColumnSetting[];
  @Input() type: string;
  @Input() statusFilter: string;
  @Input() dateRangeFilter: Object;
  columnMaps: ColumnMap[];

  ngOnChanges() {
    if (this.settings) { // when settings are provided
     this.columnMaps = this.settings
       .map( col => new ColumnMap(col));
    } else { // no settings, create column maps with defaults
      this.columnMaps = Object.keys(this.records[0])
        .map( key => {
          return new ColumnMap( { primaryKey: key });
        });
    }
  }
}
