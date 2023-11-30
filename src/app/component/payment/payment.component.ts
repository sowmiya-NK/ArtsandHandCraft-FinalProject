import { Component } from '@angular/core';
import { FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from 'src/app/model/cart';
import { Order } from 'src/app/model/order';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  cartDetails: Cart[] = [];
  constructor(
    private storageService: StorageService,
    private cartService: CartService
  ) {}
  ngOnInit() {
    this.cartService
      .fetchdata(this.storageService.getLoggedInUser().id)
      .subscribe({
        next: (response: any) => {
          this.cartService = response.data;
        },
      });
  }
}
