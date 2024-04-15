import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AdminOrderComponent } from './admin-order.component';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { urlEndpoint } from 'src/app/utils/constant';
import { of } from 'rxjs';
import { Orderstatus } from 'src/app/model/orderstatus';

describe('AdminOrderComponent', () => {
  let component: AdminOrderComponent;
  let fixture: ComponentFixture<AdminOrderComponent>;
  let orderService: OrderService;
  let httpMock: HttpTestingController;
  let dummyOrder: Order[] = [
    {
      id: 77,
      orderedArtWorkList: [
        {
          id: 1,
          title: 'Canvas Painting Wall Art',
          price: 2499,
          count: 1,
        },
      ],
      orderStatus: 'out of delivery',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOrderComponent],
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [OrderService],
    });
    fixture = TestBed.createComponent(AdminOrderComponent);
    component = fixture.componentInstance;
    orderService = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  });

  it('AdminOrderComponent should created', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve  allorders from order service', () => {
    orderService.getAllOrderDetails().subscribe((orders) => {
      expect(orders).toEqual(dummyOrder);
    });
    component.ngOnInit();
  });

  it('should check get all orders through get method', () => {
    let req = httpMock.expectOne(`${urlEndpoint.baseUrl}/admin/order/all`);
    expect(req).toBeTruthy();
    expect(req.request.method).toEqual('GET');
    // expect(req.request.body).toEqual(dummyOrder);
  });

  it('should change order status', () => {
    let dummyOrderStatusChange: Orderstatus[] = [
      {
        orderId: 77,
        statusId: 3,
        status: 'out of delivery',
      },
    ];

    orderService
      .changeOrderStatus(77, 'out of delivery')
      .subscribe((status) => {
        expect(status).toEqual(dummyOrderStatusChange);
      });

    component.onStatusChange(dummyOrder[0]);
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
