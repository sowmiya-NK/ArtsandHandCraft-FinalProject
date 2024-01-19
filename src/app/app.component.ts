import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from './service/auth.service';
import { AnimationOptions } from 'ngx-lottie';
import { LoaderService } from './service/loader.service';
import { Cart } from './model/cart';
import { CartService } from './service/cart.service';

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
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  cartCount = 0;

  constructor(
    private authService: AuthService,
    public loaderService: LoaderService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });

    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.getCartCount();
  }

  logout(): void {
    this.authService.logout();
    window.location.reload();
  }
  getCartCount(): number {
    this.cartCount = this.cartService.getCartCount();
    return this.cartCount;
  }
}
