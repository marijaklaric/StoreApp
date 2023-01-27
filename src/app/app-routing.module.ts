import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard, IsLoggedInAuthGuard } from './login/services/auth.guard';
import { AddProductComponent } from './products/product/add-product.component';
import { ProductComponent } from './products/product/product.component';
import { ProductsComponent } from './products/products.component';
import { LoggedUserComponent } from './users/logged-user/logged-user.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard]},
  { path: 'products/:id', component: ProductComponent, canActivate: [AuthGuard]},
  { path: 'add-products', component: AddProductComponent, canActivate: [AuthGuard]},
  { path: 'products/category/:id', component: ProductsComponent, canActivate: [AuthGuard]},
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  { path: 'users/:id', component: UserComponent, canActivate: [AuthGuard]},
  { path: 'add-user', component: UserAddComponent, canActivate: [AuthGuard]},
  { path: 'carts', component: CartComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent, canActivate: [IsLoggedInAuthGuard]},
  { path: 'profil', component: LoggedUserComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, IsLoggedInAuthGuard]
})
export class AppRoutingModule { }
