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
export class AddProductComponent implements OnInit {
  public productId: number;
  public product: Products;
  public form: FormGroup;
  public categories: [string];
  isLoaded: boolean = false;
  isEditMode: boolean = false;
  public loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private categoriesService: ProductCategoriesService,
    private dialog: MatDialog,
    private modalService: NgbModal) {
  }

  ngOnInit() {
    this.loading = true;
    this.isEditMode = false;
    this.addNew();
  }

  addNew() {
    this.product = new Products();
    this.getProductCategories();
    this.isLoaded = true;
    if (this.isLoaded == true) {
      this.productForm();
      this.form.enable();
    }
    this.loading = false;
  }

  productForm() {
    this.form = new FormGroup({
      id: new FormControl(this.product.id),
      title: new FormControl(this.product.title),
      price: new FormControl(this.product.price),
      description: new FormControl(this.product.description),
      category: new FormControl(this.product.category),
      rate: new FormControl(this.product.rate),
      count: new FormControl(this.product.count),
      image: new FormControl(this.product.image),
    });
  }

  getProductCategories() {
    this.categoriesService.getProductCategories()
      .subscribe(productCategories => this.categories = productCategories);
  }

  onSubmit(formValue: FormGroup) {
    this.productsService.postProduct(formValue.value).subscribe(product => {
      this.product = product;
      alert("Product is successfully added.")
      this.router.navigateByUrl('/products');
    });
    console.log(this.product, "after save")
  }

  onBack(): void {
    this.router.navigateByUrl('/products');
  }

  toggleEditMode() {
    if (this.form.disabled) {
      this.form.enable();
    }
    else if (this.form.enabled) {
      this.form.disable();
    }
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

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.product.image = reader.result as string;

        this.form.patchValue({
          //image: reader.result
          image: file.name //save name bacouse can't create url
        });
      };

    }
  }
}
