import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  // paymentForm: FormGroup;

  // constructor(private fb: FormBuilder) { }

  // ngOnInit(): void {
  //   this.paymentForm = this.fb.group({
  //     cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
  //     expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
  //     cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
  //   });
  // }

  // submitPaymentForm() {
  //   if (this.paymentForm.valid) {
  //     // Process the payment or perform other actions
  //     console.log('Payment form submitted successfully!');
  //   } else {
  //     // Handle form validation errors
  //     console.log('Invalid form. Please check the errors.');
  //   }
  // }
}
