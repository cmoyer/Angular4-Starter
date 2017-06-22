import { Component, OnInit } from '@angular/core';
import { FakeTimesheet } from './fakedata.model';
import { FakeService } from './fakedata.service';
import { ColumnSetting } from '../core/table-layout/layout.model';

@Component({
  selector: 'app-my-timesheets',
  templateUrl: './my-timesheets.component.html',
  styleUrls: ['./my-timesheets.component.css']
})
export class MyTimesheetsComponent implements OnInit {
  timesheets: FakeTimesheet[];

  timesheetSettings: ColumnSetting[] = [
    {
      primaryKey: 'name',
      header: 'Name'
    },
    {
      primaryKey: 'hours',
      header: 'Hours',
      // format: 'currency',
      // width: '10%'
    },
    {
      primaryKey: 'status',
      header: 'Status'
    },
    {
      primaryKey: 'comments',
      header: 'Comments',
      alternativeKeys: ['comment']
    }
  ];
  constructor(private fakedataService: FakeService) { }

  ngOnInit() {
    this.timesheets = this.fakedataService.getTimesheets();
  }

}
