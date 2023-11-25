import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/model/appUser';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  orderDetails: Order[] = [];
  user: AppUser;
  selectedItem: string | null = '';

  constructor(
    private orderService: OrderService,
    private storageService: StorageService
  ) {
    this.user = storageService.getLoggedInUser();
  }

  ngOnInit(): void {
    this.orderService.fetchdata(this.user?.id).subscribe({
      next: (orders: any) => {
        this.orderDetails = orders.data;
      },
      error: () => console.log('error'),
      complete: () => console.log('completed'),
    });
    this.selectedItem = localStorage.getItem('selectedItem');
    if (!this.selectedItem)
      alert(
        'No item selected. Please go back to the cart page and select an item.'
      );
  }
}
