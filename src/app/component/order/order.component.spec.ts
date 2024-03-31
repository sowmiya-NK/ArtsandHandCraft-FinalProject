import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { OrderComponent } from './order.component';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { of } from 'rxjs';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let orderService: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderComponent],
      imports: [HttpClientModule],
      providers: [OrderService],
    });
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    orderService = TestBed.inject(OrderService);
    fixture.detectChanges();
  });

  it('OrderComponent should be created', () => {
    expect(component).toBeTruthy();
  });

  // it('should fetch order details from OrderService', async () => {
  //   const userId = 1;
  //   const testOrderData: Order[] = [
  //     {
  //       id: 79,
  //       total: 2499,
  //       username: 'user',
  //       orderedArtWorkList: [
  //         {
  //           id: 72,
  //           title: 'Canvas Painting Wall Art',
  //           description:
  //             'ArtX Bird Canvas Painting Wall Art Oil Painting For Bedroom and Living Room With Frame',
  //           price: 2499,
  //           count: 1,
  //         },
  //       ],
  //     },
  //   ];

  //   spyOn(orderService, 'fetchdata')
  //     .withArgs(userId)
  //     .and.returnValue(of(testOrderData));

  //   orderService.fetchdata(userId).subscribe(() => {
  //     expect(orderService.fetchdata).toHaveBeenCalledWith(userId);
  //     expect(component.orderDetails).toEqual(testOrderData);
  //   });
  // });

  
});
