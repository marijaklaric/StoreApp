import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  public categoryId: string;
  public loading: boolean = false;
  //public limit: number = 6;

  constructor(
    private productsService: ProductsService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.getRouteParams();
  }

  getRouteParams() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.categoryId = params['id'];
          if (this.categoryId != null && this.categoryId != "") {
            this.getCategoryProducts(this.categoryId);
          }
          else {
            this.getProducts();
          }
        }
      );
  }

  getProducts() {
    this.productsService.getProducts()
      .subscribe(products => {
        this.products = products;
        this.loading = false;
      });
  }

  getCategoryProducts(categoryId: string) {
    this.productsService.getProductsByCategory(categoryId)
      .subscribe(products => {
        this.products = products;
        this.loading = false;
      });
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

  /*   getProducts() {
      this.productsService.getLimitedProducts(this.limit).subscribe(data => {
        this.products = data;
      });
    } */

  editProduct(productId) {
    this.router.navigateByUrl("products/" + productId);
  }

  addNewProduct(): void {
    this.router.navigateByUrl('/add-products');
  }
}
