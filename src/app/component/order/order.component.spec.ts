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

  it('should fetch order details from OrderService', async () => {
    let userId = 1;
    const testOrderData: Order[] = [
      {
        id: 79,
        total: 2499,

        orderedArtWorkList: [
          {
            id: 72,
            title: 'Canvas Painting Wall Art',
            description:
              'ArtX Bird Canvas Painting Wall Art Oil Painting For Bedroom and Living Room With Frame',
            price: 2499,
            count: 1,
          },
        ],
      },
    ];
    component.user.id = userId;

    spyOn(orderService, 'fetchdata')
      .withArgs(userId)
      .and.returnValue(of(testOrderData));

    component.ngOnInit();
    expect(orderService.fetchdata).toHaveBeenCalledWith(userId);
  });

  it('should return status color for status changing', () => {
    const status1 = 'pending';
    const status2 = 'confirmed';
    const status3 = 'out of delivery';
    const status4 = 'delivered';

    const result1 = component.getStatusColor(status1);
    const result2 = component.getStatusColor(status2);
    const result3 = component.getStatusColor(status3);
    const result4 = component.getStatusColor(status4);

    expect(result1).toEqual('orange');
    expect(result2).toEqual('blue');
    expect(result3).toEqual('red');
    expect(result4).toEqual('green');
  });
});
