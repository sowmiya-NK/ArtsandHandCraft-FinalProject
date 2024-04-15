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
  styleUrls: ['./home.component.css'],
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
  search: string = '';
  totalProducts: Product[] = [];
  itemsPerPage: number = 8;
  currentPage: number = 1;
  error: string = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private stoargeService: StorageService,
    private router: Router
  ) {
    this.user = this.stoargeService.getLoggedInUser();
  }

  ngOnInit(): void {
    this.productService.fetchdata().subscribe({
      next: (response: any) => {
        this.productDetails = response.data;
        console.log(this.productDetails);
        
        this.totalProducts = response.data;
      },
      error: (err) => this.error = err,
      complete: () => console.log('productcompleted'),
    });
  }
  addToCart(productId: number): void {
    const userId = this.stoargeService.getLoggedInUser()?.id;
    this.cartService.addToCart(userId, productId).subscribe((response) => {
      console.log(response);
    });
  }

  viewProducts(id: number) {
    this.router.navigate(['/sproduct'], {
      queryParams: { id: id },
    });
  }
  //filter function for search feature
  filterArray() {
    this.productDetails = this.totalProducts.filter((e: any) => {
      return e.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
    });
  }

  //pagination
  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.productDetails.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  getLastPage(): number {
    return this.getPageNumbers().slice(-1)[0] || 1;
  }
}
