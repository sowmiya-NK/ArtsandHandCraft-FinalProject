import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/model/cart';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  carts: Cart[] = [];
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartService.fetchdata().subscribe({
      next: (carts: any) => {
        let cartDetails: Cart[] = carts.data;
        console.log(carts);

        this.carts = cartDetails;
      },

      error: () => console.log('error'),
      complete: () => console.log('completed'),
    });
  }
}
