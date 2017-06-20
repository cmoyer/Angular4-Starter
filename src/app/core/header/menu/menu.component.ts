import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuService } from '../../menu.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(private menuService: MenuService) { }

  ngOnInit() {

  }

  closeMenu() {
    this.menuService.toggleMenu();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
