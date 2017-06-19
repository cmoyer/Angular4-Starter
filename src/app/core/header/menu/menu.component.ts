import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuService } from '../../../shared/menu.service';
import { AuthService } from '../../../auth/auth.service';
import { Employee } from '../../../shared/employee.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  user: Employee;
  subscription: Subscription;

  constructor(private menuService: MenuService, private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getCurrUser();
    this.subscription = this.authService.userChanged
      .subscribe(
        (user: Employee) => {
          this.user = user;
        }
      );
  }

  closeMenu() {
    this.menuService.toggleMenu();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
