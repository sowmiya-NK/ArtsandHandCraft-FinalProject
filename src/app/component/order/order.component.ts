import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  orderDetails: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.fetchdata().subscribe({
      next: (orders: any) => {
        this.orderDetails = orders.data;
      },
      error: () => console.log('error'),
      complete: () => console.log('completed'),
    });
  }
}