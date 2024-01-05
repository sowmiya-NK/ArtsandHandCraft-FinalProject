import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from './service/auth.service';
import { AnimationOptions } from 'ngx-lottie';
import { LoaderService } from './service/loader.service';
import { Cart } from './model/cart';
import { CartService } from './service/cart.service';
import { AppUser } from './model/appUser';
import { StorageService } from './service/storage.service';
import { Product } from './model/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/loading.json',
    rendererSettings: {
      className: 'lottie-loader',
    },
  };
  carts: Cart[] = [];
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  user: AppUser;



  constructor(
    private authService: AuthService,
    public loaderService: LoaderService,
    private cartService: CartService,
    private storageService: StorageService
  ) {
    this.user = this.storageService.getLoggedInUser();
  }

  ngOnInit(): void {
    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });

    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  logout(): void {
    this.authService.logout();
  }
  getCartCount(): number {
    return this.cartService.getCartCount();
  }

//  get filteredItems():any[]{
//     return this.products.filter(item=>item.name.toLowerCase().includes(this.searchItem.toLowerCase()));

//   }
}
