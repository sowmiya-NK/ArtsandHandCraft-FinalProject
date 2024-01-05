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
  itemsPerPage:number=5;
  currentPage:number=1;

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

  //returns total no of pages based on total no of items
 getPageNumbers(): number[] {
  const pageCount = Math.ceil(this.orderDetails.length / this.itemsPerPage);
  return Array.from({ length: pageCount }, (_, index) => index + 1);
}

 //returns last page
getLastPage(): number {
  return this.getPageNumbers().slice(-1)[0] || 1;
}
}
