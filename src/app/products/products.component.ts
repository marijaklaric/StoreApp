import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Products } from './models/products.model';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products: Products[];

  constructor(
    private productsService: ProductsService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productsService.getProducts()
      .subscribe(products => this.products = products);
  }

  openDialog(product: any): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '700px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
