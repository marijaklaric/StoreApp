import { Component, OnInit } from '@angular/core';
import { ProductCategoriesService } from './services/productCategories.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.scss']
})
export class AppSidebarComponent implements OnInit {
  public productCategories: [string];
  public activeRoute: any
  public sidebarOpen = true;
  constructor(public productCategoriesService: ProductCategoriesService)
  { }

  ngOnInit(): void {
    this.getProductCategories();
  }

  getProductCategories(){
    this.productCategoriesService.getProductCategories()
      .subscribe(productCategories => this.productCategories = productCategories);
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
