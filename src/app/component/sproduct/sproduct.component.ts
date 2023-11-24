import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { AppUser } from 'src/app/model/appUser';
import { Cart } from 'src/app/model/cart';
import { StorageService } from 'src/app/service/storage.service';
import { Product } from 'src/app/model/product';
import { ActivatedRoute, Route } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-sproduct',
  templateUrl: './sproduct.component.html',
  styleUrls: ['./sproduct.component.css'],
})
export class SproductComponent implements OnInit {
  productDetails: Product[] = [];
  quanity: number = 1;
  user: AppUser;

  constructor(
    private cartService: CartService,
    private storageService: StorageService,
    private productService: ProductService
  ) {
    this.user = storageService.getLoggedInUser();
  }

  ngOnInit(): void {
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
      .addToCart(this.user?.id, productId)
      .subscribe((Response) => console.log(Response));
    error: () => console.log('product not added in cart');
  }
}
