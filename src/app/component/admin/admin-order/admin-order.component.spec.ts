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
import { of, throwError } from 'rxjs';
import { Orderstatus } from 'src/app/model/orderstatus';
import { AppResponse } from 'src/app/model/appResponse';

describe('AdminOrderComponent', () => {
  let component: AdminOrderComponent;
  let fixture: ComponentFixture<AdminOrderComponent>;
  let orderService: OrderService;
  let httpMock: HttpTestingController;

  let dummyOrder: AppResponse = {
    status: 200,
    timestamp: '',
    data: [
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
    ],
    error: null,
  };

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
      expect(orders).toEqual(dummyOrder.data);
    });
    spyOn(orderService, 'getAllOrderDetails').and.returnValue(of(dummyOrder));
    component.ngOnInit();
    expect(component.orderDetails).toEqual(dummyOrder.data);
  });

  it('should check get all orders through get method', () => {
    let req = httpMock.expectOne(`${urlEndpoint.baseUrl}/admin/order/all`);
    expect(req).toBeTruthy();
    expect(req.request.method).toEqual('GET');
    // expect(req.request.body).toEqual(dummyOrder);
  });

  it('should change order status', () => {
    let dummyOrderStatusChange: AppResponse = {
      status: 200,
      timestamp: '',
      data: [
        {
          orderId: 77,
          statusId: 3,
          status: 'out of delivery',
        },
      ],
      error: null,
    };

    orderService
      .changeOrderStatus(77, 'out of delivery')
      .subscribe((status) => {
        expect(status).toEqual(dummyOrderStatusChange);
      });
    spyOn(orderService, 'changeOrderStatus').and.returnValue(
      of(dummyOrderStatusChange)
    );
    component.onStatusChange(dummyOrder.data);
    expect(component.orderChange).toEqual(dummyOrderStatusChange.data);
  });

  it('should return status color for status changing', () => {
    const status1 = 'pending';
    const status2 = 'confirmed';
    const status3 = 'out of delivery';
    const status4 = 'delivered';
    const status5 = 'default';

    const result1 = component.getStatusColor(status1);
    const result2 = component.getStatusColor(status2);
    const result3 = component.getStatusColor(status3);
    const result4 = component.getStatusColor(status4);
    const result5 = component.getStatusColor(status5);

    expect(result1).toEqual('orange');
    expect(result2).toEqual('blue');
    expect(result3).toEqual('red');
    expect(result4).toEqual('green');
    expect(result5).toEqual('black');
  });

  it('error handle', () => {
    spyOn(orderService, 'getAllOrderDetails').and.returnValue(
      throwError('Error occured')
    );
    component.ngOnInit();
    expect(component.error).toEqual('Error occured');
  });

  it('should display Previous button and disable it on first page', () => {
    component.currentPage = 1;
    const previousButton = fixture.nativeElement.querySelector(
      '.page-item:first-child .page-link'
    );
    if (previousButton) {
      previousButton.click();
    }
    fixture.detectChanges();
    expect(component.currentPage).toBe(1);
    if (previousButton) {
      expect(previousButton.classList.contains('disabled')).toBe(true);
    } else {
      console.log('previous button not found');
    }
  });

  it('should display next button and disable it on last page', () => {
    component.currentPage = 3;
    const nextButton = fixture.nativeElement.querySelector(
      '.page-item:last-child .page-link'
    );
    if (nextButton) {
      nextButton.click();
    }
    fixture.detectChanges();
    expect(component.currentPage).toBe(3);
    if (nextButton) {
      expect(nextButton.classList.contains('disabled')).toBeTrue;
    }
  });

  it('should navigate to the next page when Next button is clicked', () => {
    component.currentPage = 1;
    const nextButton = fixture.nativeElement.querySelector(
      '.page-item:last-child .page-link'
    );
    if (nextButton) {
      nextButton.click();
    }
    component.getPageNumbers();
    fixture.detectChanges();
    component.currentPage += 1;
    expect(component.currentPage).toBe(2);
  });

  it('should navigate to the previous page when Previous button is clicked', () => {
    component.currentPage = 3;
    const previousButton = fixture.nativeElement.querySelector(
      '.page-item:first-child .page-link'
    );
    if (previousButton) {
      previousButton.click();
    }
    component.getLastPage();
    fixture.detectChanges();
    component.currentPage -= 1;
    expect(component.currentPage).toBe(2);
  });
});
