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

describe('CartComponent', () => {
  let component: CartComponent;
  let debug: DebugElement;
  let fixture: ComponentFixture<CartComponent>;
  // let cartServiceStub: Partial<CartService>;
  let cartservice: CartService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    // cartServiceStub = {
    //   fetchdata: jasmine
    //     .createSpy('fetchdata')
    //     .and.returnValue(of([] as Cart[])),
    // };
    TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [{ provide: CartService }],
    }).compileComponents();
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    cartservice = TestBed.inject(CartService);
    httpMock = TestBed.inject(HttpTestingController);
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
    const Id = 179;
    const artWorkId = 22;
    const mockResponse: Cart[] = [{ userId: 1, artworkId: 22, count: 1 ,price:650}];

    cartservice.deleteCart(Id, artWorkId).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${urlEndpoint.baseUrl}/cart/${Id}/${artWorkId}`
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });
});
