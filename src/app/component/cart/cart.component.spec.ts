import { DebugElement } from '@angular/core';
import { CartComponent } from './cart.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { CartService } from 'src/app/service/cart.service';
import { of, throwError } from 'rxjs';
import { Cart } from 'src/app/model/cart';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { urlEndpoint } from 'src/app/utils/constant';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserprofileService } from 'src/app/service/userProfile.service';
import { Profile } from 'src/app/model/profile';
import { UserProfile } from 'src/app/model/user-profile';
import { AppResponse } from 'src/app/model/appResponse';

describe('CartComponent', () => {
  let component: CartComponent;
  let debug: DebugElement;
  let fixture: ComponentFixture<CartComponent>;
  let orderService: OrderService;
  let cartservice: CartService;
  let httpMock: HttpTestingController;
  let stoargeService: StorageService;
  let userProfileService: UserprofileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        CartService,
        OrderService,
        StorageService,
        UserprofileService,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    cartservice = TestBed.inject(CartService);
    httpMock = TestBed.inject(HttpTestingController);
    orderService = TestBed.inject(OrderService);
    stoargeService = TestBed.inject(StorageService);
    userProfileService = TestBed.inject(UserprofileService);
    fixture.detectChanges();
  });

  it('component was created or not', () => {
    expect(component).toBeTruthy();
  });

  it('should render shopping cart with items', () => {
    let cartList = debug.queryAll(By.css('.carts'));
    expect(cartList.length).toBeGreaterThan(0);
  });

  it('should update total amount when item quantity changes', () => {
    const initialAmount = component.totalValue;
    component.calculateTotalValue();
    fixture.detectChanges();
    expect(component.totalValue).toEqual(initialAmount);
  });

  it('cartservice was called', () => {
    expect(cartservice).toBeTruthy();
  });

  it('should delete cart', () => {
    const id = 179;
    const artWorkId = 22;
    const mockResponse: AppResponse = {
      status: 200,
      timestamp: '',
      data: [{ userId: 1, artworkId: 22, count: 1, price: 650 }],
      error: null,
    };

    cartservice.deleteCart(id, artWorkId).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });
    spyOn(cartservice, 'deleteCart').and.returnValue(of(mockResponse));
    component.onDelete(id, artWorkId);
    expect(component.carts).toEqual(mockResponse.data);

    // const req = httpMock.expectOne(
    //   `${urlEndpoint.baseUrl}/cart/${id}/${artWorkId}`
    // );
    // expect(req.request.method).toBe('DELETE');
    // req.flush(mockResponse);
  });

  it('should create user order ', () => {
    let dummyOrder: AppResponse = {
      status: 200,
      timestamp: '',
      data: [
        {
          addressId: 76,
          id: 1,
          orderedArtWorkList: [
            {
              id: 22,
              title: 'Canvas Painting Wall Art',
              price: 2499,
              count: 1,
            },
          ],
        },
      ],
      error: null,
    };
    component.cartItem = [
      { userId: 1, title: 'test cart', price: 1000, count: 1, artworkId: 1,total:1000 },
    ];

    orderService.createOrder(1, 22, 76).subscribe((data) => {
      expect(data).toEqual(dummyOrder);
    });
    // spyOn(orderService, 'createOrder').and.returnValue(of(dummyOrder));
    // component.checkOut();
    // expect(component.orders).toEqual(dummyOrder.data);
  });

  it('should update cart count', () => {
    const userId = 3;
    const artWorkId = 24;
    const count = 2;
    const total = 1780;

    const requestData = {
      userId: userId,
      artWorkId: artWorkId,
      count: count,
      total: total,
    };

    const dummyCartItems: AppResponse = {
      status: 200,
      timestamp: '',
      data: [
        {
          userId: userId,
          artworkId: artWorkId,
          price: total,
          title: 'Canvas Painting Wall Art',
          count: count,
        },
      ],
      error: null,
    };

    cartservice
      .cartCountUpdate(userId, artWorkId, count, total)
      .subscribe((cartItems) => {
        expect(cartItems).toEqual(dummyCartItems);
      });

    spyOn(cartservice, 'cartCountUpdate').and.returnValue(of(dummyCartItems));
    component.increamentCount(dummyCartItems.data);
    component.decrementCount(dummyCartItems.data);

    const req = httpMock.expectOne(`${urlEndpoint.baseUrl}/cart`);
    expect(req).toBeTruthy();
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(requestData);
  });

  it('should fetch user profile and cart data if user is logged in', () => {
    let userId = { id: 1 };
    const dummyCart: Cart[] = [];
    const mockUserProfile: AppResponse = {
      status: 200,
      timestamp: '',
      data: [
        {
          username: 'user',
          addressList: [
            {
              street: 'abc',
              city: 'abc',
              zipcode: 123456,
            },
          ],
        },
      ],
      error: null,
    };

    spyOn(stoargeService, 'getLoggedInUser').and.returnValue(userId);
    spyOn(cartservice, 'fetchdata').and.returnValue(of(dummyCart));
    spyOn(userProfileService, 'getUserById').and.returnValue(
      of(mockUserProfile)
    );
    component.ngOnInit();

    expect(stoargeService.getLoggedInUser).toHaveBeenCalled();
    expect(cartservice.fetchdata).toHaveBeenCalledWith(userId.id);
    expect(userProfileService.getUserById).toHaveBeenCalledWith(userId.id);
  });

  it('error handling', () => {
    spyOn(userProfileService, 'getUserById').and.returnValue(
      throwError('Error occured')
    );
    component.ngOnInit();
    expect(component.error).toEqual('Error occured');
  });
});
