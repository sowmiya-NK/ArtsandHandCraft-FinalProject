import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from 'src/app/model/appUser';
import { Cart } from 'src/app/model/cart';
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
  date: Date;
  user: AppUser;
  selectedItem: string | null = '';
  totalValue: number = 0;
  carts: Cart[] = [];

  constructor(
    private orderService: OrderService,
    private storageService: StorageService,
  ) {
    this.user = storageService.getLoggedInUser();
    this.date = new Date();
  }

  ngOnInit(): void {
    this.orderService.fetchdata(this.user?.id).subscribe({
      next: (orders: any) => {
        console.log(orders,'orderdetails');

        this.orderDetails = orders.data;
      },
      error: () => console.log('error'),
      complete: () => console.log('completed'),
    });
  }
  currentStep: string = 'address';
  completedSteps: string[] = [];

  
getStatusColor(status:string):string{
  switch(status){
    case "pending": return 'orange'; 
    case "confirmed": return 'blue';  
    case "out of delivery": return 'red';  
    case "delivered": return 'green'; 
    default: return 'black';
  }
}
  
}

