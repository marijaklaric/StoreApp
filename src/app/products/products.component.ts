import { Component, OnInit } from '@angular/core';
import { Products } from './models/products.model';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products: Products[];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
    console.log(this.products, "all products")
  }

  getProducts(){
    this.productsService.getProducts()
      .subscribe(products => this.products = products);
  }
}
