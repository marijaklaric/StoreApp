import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductsService } from './products/services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductDialogComponent } from './products/product-dialog/product-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { AppSidebarComponent } from './app-sidebar/app-sidebar.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './products/product/product.component';
import { ConfirmationDialogComponent } from './products/confirmation-dialog/confirmation-dialog.component';
import { AddProductComponent } from './products/product/add-product.component';
import { UsersComponent } from './users/users.component';
import { UsersService } from './users/services/users.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    AppHeaderComponent,
    AppFooterComponent,
    ProductDialogComponent,
    AppSidebarComponent,
    HomeComponent,
    ProductComponent,
    ConfirmationDialogComponent,
    AddProductComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    NgbCollapseModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    ProductsService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
