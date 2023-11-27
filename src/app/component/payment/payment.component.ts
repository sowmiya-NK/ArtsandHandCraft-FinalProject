import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  constructor(private router: Router) {
    console.log("Cons");
    
  }

  proceedToPay() {
    console.log('not navigated');

    this.router.navigate(['/receipt']);
    console.log('navigated');
  }
}
