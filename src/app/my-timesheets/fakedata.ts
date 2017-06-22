import { FakeTimesheet } from './fakedata.model';
export const TIMESHEETS: FakeTimesheet[] = [
  {
    id: 1,
    name: 'Chad Moyer',
    hours: 40,
    status: 'Approved',
    comments: 'Test comments'
  },
  {
    id: 2,
    name: 'Jane Doe',
    hours: 45,
    status: 'Submitted',
    comments: 'Test comments 2'
  },
  {
    id: 3,
    name: 'John Doe',
    hours: 42,
    status: 'New'
  }

];
