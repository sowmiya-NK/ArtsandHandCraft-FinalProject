import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { Orderstatus } from 'src/app/model/orderstatus';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css'],
})
export class AdminOrderComponent implements OnInit {
  orderDetails: Order[] = [];
  selectedStatus: string = '';

  constructor(private orderService: OrderService) {}
  ngOnInit(): void {
    this.orderService.getAllOrderDetails().subscribe({
      next: (order: any) => {
        let orderDetail: Order[] = order.data;
        console.log(order);

        this.orderDetails = orderDetail;
        // this.productDetail = productDetails[0];
      },

      error: () => console.log('error'),
      complete: () => console.log('completed'),
    });
  }

  onStatusChange(order: Order) {
    console.log(order.orderStatus);
    this.orderService.changeOrderStatus(order.id, order.orderStatus!).subscribe({
      next: (response: any) => console.log(response.data),
    });
  }
}
