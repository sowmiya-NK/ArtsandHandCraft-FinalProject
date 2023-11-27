import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statsu-cheking',
  templateUrl: './statsu-cheking.component.html',
  styleUrls: ['./statsu-cheking.component.css'],
})
export class StatsuChekingComponent {
  constructor(private router: Router) {}
  proceedToPayment(): void {
    this.router.navigate(['/payment']);
  }
}
