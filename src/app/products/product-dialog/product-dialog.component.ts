import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Products } from '../models/products.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {
  public product: Products;
  public form: FormGroup;
  public editMode: boolean;
  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Products,
    public productsService: ProductsService) { }

  ngOnInit(): void {
    this.editMode = false;
    this.productForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onEdit(formValue: FormGroup) {
    this.productsService.putProduct(this.data.id, formValue.value).subscribe(product => this.data = product)
  }

  productForm() {
    this.form = new FormGroup({
      id: new FormControl(this.data.id),
      title: new FormControl(this.data.title),
      price: new FormControl(this.data.price),
      description: new FormControl(this.data.description),
      category: new FormControl(this.data.category),
      rate: new FormControl(this.data.rating.rate),
      count: new FormControl(this.data.rating.count)
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }
}
