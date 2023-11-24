import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/model/appUser';
import { Cart } from 'src/app/model/cart';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  carts: Cart[] = [];
  user: AppUser;

  itemCount: number = 1;
  constructor(
    private cartService: CartService,
    private stoargeService: StorageService
  ) {
    this.user = this.stoargeService.getLoggedInUser();
  }

  ngOnInit(): void {
    this.cartService.fetchdata(this.user?.id).subscribe({
      next: (carts: any) => {
        let cartDetails: Cart[] = carts.data;
        console.log(carts);

        this.carts = cartDetails;
      },

      error: () => console.log('error'),
      complete: () => console.log('completed'),
    });
  }

  onDelete(deleteid: any, productId: any): void {
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
        .cartCountUpdate(this.user.id, cart.artworkId, cart.count)
        .subscribe((response) => console.log(response));
    }
  }
  decrementCount(cart: Cart) {
    if (cart.count != 1) {
      cart.count -= 1;
      this.cartService
        .cartCountUpdate(this.user.id, cart.artworkId, cart.count)
        .subscribe((response) => console.log(response));
    }
  }
}
