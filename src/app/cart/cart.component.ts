import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from '../products/models/products.model';
import { ProductsService } from '../products/services/products.service';
import { User } from '../users/models/users.model';
import { UsersService } from '../users/services/users.service';
import { Cart, ProductData } from './models/cart.model';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public carts: Cart[];
  public product: Products;
  public user: User;
  public loading: boolean = false;
  isLoaded: boolean = false;

  constructor(
    private cartService: CartService,
    private productService: ProductsService,
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.getCartItems();
  }


  getCartItems() {
    this.cartService.getCartItems()
      .subscribe(carts => {
        this.carts = carts;
        this.isLoaded = true;
        if (this.isLoaded == true) {
          this.getProducts()
        }
        this.loading = false;
      });
  }

  getProducts() {
    this.carts.forEach(cart => {
      //get user informations
      this.userService.getUser(parseInt(cart.userId))
        .subscribe(user => {
          cart.cartUser = user;
        });

      //get product informations
      cart.cartPoducts = new Array();
      cart.products.forEach(product => {
        this.productService.getProduct(product.productId)
          .subscribe(prod => {
            var productData = new ProductData();
            productData.product = new Products;
            productData.product = prod;
            productData.quantity = product.quantity;
            cart.cartPoducts.push(productData);
          });
      });
    });
  }

  getUser(userId) {
    this.userService.getUser(userId)
      .subscribe(user => this.user = user);
  }

  getProduct(productId) {
    this.productService.getProduct(productId)
      .subscribe(product => this.product = product);
  }
}
