import { Component, OnDestroy, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MenuService } from '../../shared/menu.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  menuStatus: string;

  constructor(private menuService: MenuService, private authService: AuthService) { }

  ngOnInit() {
    this.menuStatus = this.menuService.getMenuStatus();
    this.subscription = this.menuService.menuStatusChanged.subscribe(
      (menuStatus: string) => {
        this.menuStatus = menuStatus;
      }
    );
  }

  toggleMenu() {
    this.menuService.toggleMenu();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
