import { Injectable } from '@angular/core';
import { TIMESHEETS } from './fakedata';
import { FakeTimesheet } from './fakedata.model';
@Injectable()
export class FakeService {

  getTimesheets(): FakeTimesheet[] {
    return TIMESHEETS;
  }
}
