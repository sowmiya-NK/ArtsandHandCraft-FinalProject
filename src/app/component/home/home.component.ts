import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from 'src/app/service/home.service';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/service/cart.service';
import { AppUser } from 'src/app/model/appUser';
import { StorageService } from 'src/app/service/storage.service';
import { Cart } from 'src/app/model/cart';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/service/order.service';
import { Order } from 'src/app/model/order';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  productDetails: Product[] = [];
  carts: Cart[] = [];
  user: AppUser;
  totalValue: number = 0;
  selectedItem: string = '';
  total: number = 0;

  itemCount: number = 1;

  constructor(
    private homeService: HomeService,
    private productService: ProductService,
    private cartService: CartService,
    private stoargeService: StorageService,
    private router: Router,
    private orderService: OrderService
  ) {
    this.user = this.stoargeService.getLoggedInUser();
  }

  ngOnInit(): void {
    this.productService.fetchdata().subscribe({
      next: (products: any) => {
        let productDetails: Product[] = products.data;
        console.log(products);
        this.productDetails = productDetails;
      },
      error: (err) => console.log('error', err),
      complete: () => console.log('productcompleted'),
    });
    console.log('started');

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

  addToCart(productId: number): void {
    console.log(productId);

    this.cartService
      .addToCart(this.stoargeService.getLoggedInUser()?.id, productId)
      .subscribe((Response) => console.log(Response));
    error: () => console.log('product not added in cart');
  }
  calculateTotalValue(): void {
    this.totalValue = this.carts.reduce(
      (acc, cart) => acc + cart.count * cart.price,
      0
    );
    // this.ngOnInit();
  }

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
    this.ngOnInit();
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

  proceedToPay() {
    this.router.navigate(['/payment']);
  }

  cartItem: Cart[] = this.stoargeService.getCart()!;
  orders: Order[] = [];

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
    }
    //console.log('order', this.orders);

    this.orderService.createOrder(this.orders).subscribe({
      next: (response: Order[]) => {
        console.log('response', response);
        this.orders = response;
      },
      complete: () => console.log('deleted'),
      error: () => console.log('error'),
    });
    this.stoargeService.setOrder(this.orders);
    return this.orders;
  }
}
