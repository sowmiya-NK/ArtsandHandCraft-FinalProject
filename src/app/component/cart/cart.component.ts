import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from 'src/app/model/appUser';
import { Cart } from 'src/app/model/cart';
import { Order } from 'src/app/model/order';
import { UserProfile } from 'src/app/model/user-profile';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserprofileService } from 'src/app/service/userProfile.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  carts: Cart[] = [];
  userprofile: UserProfile[] = [];
  user: AppUser;
  totalValue: number = 0;
  selectedItem: string = '';
  total: number = 0;
  cartItem: Cart[] = this.stoargeService.getCart()!;
  orders: Order[] = [];
  addressId: number = 0;
  itemCount: number = 1;
  cartEmptyMessage = 'Oops! Your cart is Empty!';
  error: string = '';

  constructor(
    private cartService: CartService,
    private stoargeService: StorageService,
    private router: Router,
    private orderService: OrderService,
    private userProfileService: UserprofileService
  ) {
    this.user = this.stoargeService.getLoggedInUser();
  }

  ngOnInit(): void {
    this.user = this.stoargeService.getLoggedInUser();
    if (this.user) {
      this.cartService.fetchdata(this.user.id).subscribe({
        next: (carts: any) => {
          this.stoargeService.setCart(carts.data);
          let cartDetails: Cart[] = carts.data;
          this.carts = cartDetails;
          this.calculateTotalValue();
        },
      });

      this.userProfileService.getUserById(this.user.id).subscribe({
        next: (response: any) => {
          let profile = response.data;
          this.userprofile = profile;
        },
        error: (err) => (this.error = err),
      });
    }
  }

  calculateTotalValue(): void {
    if (this.carts && this.carts.length > 0) {
      this.totalValue = this.carts.reduce(
        (acc, cart) => acc + cart.count * cart.price,
        0
      );
    } else {
      this.totalValue = 0;
    }
  }

  onDelete(deleteid: number, productId: number): void {
    this.cartService.deleteCart(deleteid, productId).subscribe({
      next: (response: any) => {
        this.carts = response.data;
      },
    });
  }

  increamentCount(cart: Cart) {
    if (cart.count != 3) {
      cart.count += 1;
      this.cartService
        .cartCountUpdate(this.user.id, cart.artworkId, cart.count, this.total)
        .subscribe((response) => console.log(response));
      this.calculateTotalValue();
    }
  }
  decrementCount(cart: Cart) {
    if (cart.count != 1) {
      cart.count -= 1;
      this.cartService
        .cartCountUpdate(this.user.id, cart.artworkId, cart.count, this.total)
        .subscribe((response) => console.log(response));
      this.calculateTotalValue();
    }
  }

  checkOut(): Order[] {
    for (let item of this.cartItem) {
      this.orders.push({
        id: 0,
        total: item.total,
        username: this.stoargeService.getLoggedInUser().username,
        orderedArtWorkList: [
          {
            id: item.artworkId,
            title: item.title,
            price: item.price,
            count: item.count,
          },
        ],
      });
      this.addressId = this.userprofile[0].addressList[0].id!;

      this.orderService
        .createOrder(item.userId, item.artworkId, this.addressId)
        .subscribe({
          next: (response: any) => {
            this.orders = response.data;
          },
        });
    }
    this.stoargeService.setOrder(this.orders);
    this.carts = [];
    return this.orders;
  }
}
