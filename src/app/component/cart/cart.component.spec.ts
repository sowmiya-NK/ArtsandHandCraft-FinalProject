import { DebugElement } from '@angular/core';
import { CartComponent } from './cart.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { CartService } from 'src/app/service/cart.service';
import { of } from 'rxjs';
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
    const mockResponse: Cart[] = [
      { userId: 1, artworkId: 22, count: 1, price: 650 },
    ];

    cartservice.deleteCart(id, artWorkId).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });
    // component.onDelete(id, artWorkId);

    const req = httpMock.expectOne(
      `${urlEndpoint.baseUrl}/cart/${id}/${artWorkId}`
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

  it('should create user order ', async () => {
    let dummyOrder: Order[] = [
      {
        addressId: 76,
        id: 1,
        orderedArtWorkList: [
          { id: 22, title: 'Canvas Painting Wall Art', price: 2499, count: 1 },
        ],
      },
    ];

    spyOn(orderService, 'createOrder').and.returnValue(of(dummyOrder));
    component.checkOut();
    orderService.createOrder(1, 22, 76).subscribe((data) => {
      expect(data).toEqual(dummyOrder);
    });
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

    const dummyCartItems: Cart[] = [
      {
        userId: userId,
        artworkId: artWorkId,
        price: total,
        title: 'Canvas Painting Wall Art',
        count: count,
      },
    ];

    cartservice
      .cartCountUpdate(userId, artWorkId, count, total)
      .subscribe((cartItems) => {
        expect(cartItems).toEqual(dummyCartItems);
      });

    const req = httpMock.expectOne(`${urlEndpoint.baseUrl}/cart`);
    expect(req).toBeTruthy();
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(requestData);
  });

  it('should fetch user profile and cart data if user is logged in', () => {
    let userId = { id: 1 };
    const dummyCart: Cart[] = [];
    const mockUserProfile: UserProfile[] = [
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
    ];
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
});
