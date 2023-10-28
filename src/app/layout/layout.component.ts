import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  menuItems = Object.values(this.router.routesEnum);
  constructor(private router: Router) {
    console.log(this.menuItems)
  }

  navigateToUrl(url:string) {}
}
