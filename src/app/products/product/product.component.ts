import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductCategoriesService } from 'src/app/app-sidebar/services/productCategories.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Products } from '../models/products.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public productId: number;
  public product: Products;
  public form: FormGroup;
  public categories: [string];
  isLoaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private categoriesService: ProductCategoriesService,
    private dialog: MatDialog,
    private modalService: NgbModal) {
  }

  ngOnInit() {
    this.getRouteParams();
  }

  getRouteParams() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.productId = params['id'];
          if (this.productId != null) {
            this.getProduct(this.productId);
            this.getProductCategories();
          }
        }
      );
  }

  getProduct(productId: number) {
    this.productsService.getProduct(productId)
      .subscribe(product => {
        this.product = product;
        this.isLoaded = true;
        if (this.isLoaded == true) {
          this.productForm();
          this.form.disable();
        }
      });
  }

  productForm() {
    this.form = new FormGroup({
      id: new FormControl(this.product.id),
      title: new FormControl(this.product.title),
      price: new FormControl(this.product.price),
      description: new FormControl(this.product.description),
      category: new FormControl(this.product.category),
      rate: new FormControl(this.product.rating.rate),
      count: new FormControl(this.product.rating.count),
      image: new FormControl(this.product.image),
    });
  }

  getProductCategories() {
    this.categoriesService.getProductCategories()
      .subscribe(productCategories => this.categories = productCategories);
  }


  onEdit(formValue: FormGroup) {
    this.productsService.putProduct(this.product.id, formValue.value).subscribe(product => this.product = product);
    console.log(this.product, "after save")
  }


  toggleEditMode() {
    if (this.form.disabled) {
      this.form.enable();
    }
    else if (this.form.enabled) {
      this.form.disable();
    }
  }

  onBack(): void {
    this.router.navigateByUrl('/products');
  }

  onDelete(formValue: FormGroup) {
    if (confirm("Are you sure you want to delete product " + formValue.value.title + "?"))
      this.productsService.deleteProduct(formValue.value.id).subscribe(res => {
        this.router.navigateByUrl('/products');
        alert("Product deleted successfully.");
      }
      )
  }

  openConfirmationDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      message: 'Are you sure you want to delete this item?'
    };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Perform the delete action
        this.productsService.deleteProduct(this.product.id).subscribe(res => {
          this.router.navigateByUrl('/products');
          alert("Product deleted successfully.");
        }
        )
      }
    });
  }

}
