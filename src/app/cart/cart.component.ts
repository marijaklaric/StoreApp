import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from './models/cart.model';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
public carts: Cart[];
public loading: boolean = false;

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.getCartItems();
  }


  getCartItems() {
    this.cartService.getCartItems()
      .subscribe(carts => this.carts = carts);
      this.loading = false;
  }
}
