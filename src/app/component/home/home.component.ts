import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from 'src/app/service/home.service';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/service/cart.service';
import { AppUser } from 'src/app/model/appUser';
import { StorageService } from 'src/app/service/storage.service';
import { Cart } from 'src/app/model/cart';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  productDetails: Product[] = [];

  constructor(
    private homeService: HomeService,
    private productService: ProductService,
    private cartService: CartService,
    private stoargeService: StorageService
  ) {}

  ngOnInit(): void {
    this.homeService.getAllBooks();
    this.productService.fetchdata().subscribe({
      next: (products: any) => {
        let productDetails: Product[] = products.data;
        console.log(products);

        this.productDetails = productDetails;
        // this.productDetail = productDetails[0];
      },

      error: (err) => console.log('error', err),
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
}
