import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from 'src/app/model/appUser';
import { Cart } from 'src/app/model/cart';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  carts: Cart[] = [];
  user: AppUser;
  totalValue: number = 0;
  selectedItem: string = '';
  total: number = 0;

  itemCount: number = 1;

  constructor(
    private cartService: CartService,
    private stoargeService: StorageService,
    private router: Router,
    private orderService: OrderService
  ) {
    this.user = this.stoargeService.getLoggedInUser();
  }

  ngOnInit(): void {
    this.cartService.fetchdata(this.user?.id).subscribe({
      next: (carts: any) => {
        this.stoargeService.setCart(carts.data);
        let cartDetails: Cart[] = carts.data;
        console.log(carts);
        this.carts = cartDetails;
        this.calculateTotalValue();
      },

      error: () => console.log('error'),
      complete: () => console.log('completed'),
    });
  }

  calculateTotalValue(): void {
    this.totalValue = this.carts.reduce(
      (acc, cart) => acc + cart.count * cart.price,
      0
    );
  }
  //calculateParticularItemTotalValue(): void {}

  onDelete(deleteid: number, productId: number): void {
    console.log(deleteid, productId);

    this.cartService.deleteCart(deleteid, productId).subscribe({
      next: (cart: Cart[]) => {
        this.carts = cart;
        console.log(cart);
      },
      complete: () => console.log('deleted'),
      error: () => console.log('error'),
    });
  }

  increamentCount(cart: Cart) {
    //add product only 3
    if (cart.count != 3) {
      cart.count += 1;
      this.cartService
        .cartCountUpdate(this.user.id, cart.artworkId, cart.count, this.total)
        .subscribe((response) => console.log(response));
    }
  }
  decrementCount(cart: Cart) {
    if (cart.count != 1) {
      cart.count -= 1;
      this.cartService
        .cartCountUpdate(this.user.id, cart.artworkId, cart.count, this.total)
        .subscribe((response) => console.log(response));
    }
  }

  // proceedToOrder(): void {
  //   // Pass cart data to the order page using queryParams
  //   this.router.navigate(['/order'], {
  //     queryParams: {
  //       carts: JSON.stringify(this.carts),
  //       totalValue: this.totalValue,
  //     },
  //   });
  // }
}
