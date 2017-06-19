import { Subject } from 'rxjs/Subject';


export class MenuService {
  menuStatusChanged = new Subject<string>();
  private menuStatus = 'out';

   toggleMenu() {
    this.menuStatus = this.menuStatus === 'out' ? 'in' : 'out';
    this.menuStatusChanged.next(this.menuStatus.slice());
   }

   getMenuStatus() {
     return this.menuStatus.slice();
   }
}
