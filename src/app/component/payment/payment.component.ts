import { Component } from '@angular/core';
import { FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  // paymentForm!: FormGroup;

  // constructor(private fb: FormGroup) {
  //   // this.createForm();
  // }

  // // createForm() {
  // //   this.paymentForm = this.fb.group({
  // //     cardNumber: ['', [Validators.required, Validators.pattern('[0-9]{16}')]],
  // //     cardHolder: ['', [Validators.required]],
  // //     expirationDate: ['', [Validators.required, Validators.pattern('(0[1-9]|1[0-2])/(1[9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])')]],
  // //     cvv: ['', [Validators.required, Validators.pattern('[0-9]{3,4}')]],
  // //   });
  // }

  // onSubmit() {
  //   if (this.paymentForm.valid) {
  //     console.log('Form submitted:', this.paymentForm.value);
  //     // Perform the payment processing logic here
  //   } else {
  //     console.log('Form is invalid. Please check the fields.');
  //   }
  // }
  
  
}
