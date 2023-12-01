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
  showIcons: boolean = false;
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
  }

  addToCart(productId: number): void {
    console.log(productId);

    this.cartService
      .addToCart(this.stoargeService.getLoggedInUser()?.id, productId)
      .subscribe((Response) => console.log(Response));
    error: () => console.log('product not added in cart');
  }
  viewProducts(id: number) {
    this.router.navigate(['/sproduct'], {
      queryParams: { id: id },
    });
  }
}
