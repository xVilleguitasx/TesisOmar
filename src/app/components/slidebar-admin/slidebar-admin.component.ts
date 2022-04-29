import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/validacion-admin', title: 'Valicacion-admin',  icon:'fa fa-check-circle', class: '' },

];
@Component({
  selector: 'app-slidebar-admin',
  templateUrl: './slidebar-admin.component.html',
  styleUrls: ['./slidebar-admin.component.css']
})
export class SlidebarAdminComponent implements OnInit {

  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
