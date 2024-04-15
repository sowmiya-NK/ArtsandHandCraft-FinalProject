import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { AppUser } from 'src/app/model/appUser';
import { Cart } from 'src/app/model/cart';
import { StorageService } from 'src/app/service/storage.service';
import { Product } from 'src/app/model/product';
import { ActivatedRoute, Route, Router } from '@angular/router';
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
  productId: number = 0;
  singleProductDetails: Product[] = [];

  constructor(
    private cartService: CartService,
    private storageService: StorageService,
    private productService: ProductService,
    private router: ActivatedRoute
  ) {
    this.user = storageService.getLoggedInUser();
  }

  ngOnInit(): void {
    this.router.queryParams.subscribe((param) => {
      let id = param['id'];
      this.productId = id;
      console.log(this.productId);

      this.productService.fetchdata().subscribe({
        next: (products: any) => {
          let productDetails: Product[] = products.data;
          this.productDetails = productDetails;
        },
      });

      this.productService.findProductById(this.productId).subscribe({
        next: (products: any) => {
          this.singleProductDetails = products.data;
        },
      });
    });
  }
}
