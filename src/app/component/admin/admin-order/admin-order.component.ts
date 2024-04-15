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
  itemsPerPage: number = 5;
  currentPage: number = 1;
  orderChange: Orderstatus[] = [];

  constructor(private orderService: OrderService) {}
  ngOnInit(): void {
    this.orderService.getAllOrderDetails().subscribe({
      next: (order: any) => {
        let orderDetail: Order[] = order.data;
        this.orderDetails = orderDetail;
        // this.productDetail = productDetails[0];
      },

      error: () => console.log('error'),
    });
  }

  onStatusChange(order: Order) {
    this.orderService
      .changeOrderStatus(order.id, order.orderStatus!)
      .subscribe({
        next: (response: any) => (this.orderChange = response.data),
      });
  }


  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.orderDetails.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  
  getLastPage(): number {
    return this.getPageNumbers().slice(-1)[0] || 1;
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'pending':
        return 'orange';
      case 'confirmed':
        return 'blue';
      case 'out of delivery':
        return 'red';
      case 'delivered':
        return 'green';
      default:
        return 'black';
    }
  }
}
