import { DebugElement } from '@angular/core';
import { CartComponent } from './cart.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { CartService } from 'src/app/service/cart.service';
import { of } from 'rxjs';
import { Cart } from 'src/app/model/cart';

describe('CartComponent', () => {
  let component: CartComponent;
  let debug: DebugElement;
  let fixture: ComponentFixture<CartComponent>;
  // let cartServiceStub: Partial<CartService>;

  beforeEach(() => {
    // cartServiceStub = {
    //   fetchdata: jasmine
    //     .createSpy('fetchdata')
    //     .and.returnValue(of([] as Cart[])),
    // };
    TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [HttpClientModule],
      // providers: [{provide: CartService, useValue: cartServiceStub }],
    }).compileComponents();
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
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

  // it('should remove item from cart when remove button is clicked',()=>{
  //   const deleteItemId=148;
  //   const productId=24;
  //   spyOn(component,'onDelete')
  //   const deleteButton=debug.query(By.css('.deleteItem'));
  //   deleteButton.triggerEventHandler('click',{});
  //   expect(component.onDelete).toHaveBeenCalledWith(deleteItemId,productId)
  // })
//   it('should display empty cart message when there are no items in the cart', () => {
//     // spyOn(cartServiceStub, 'fetchdata').and.returnValue(of([]));
//     // fixture.detectChanges();
//     const emptyCartMessage = debug.query(By.css('.cart-empty'));
//     // console.log(emptyCartMessage,'emptymessage');
//     expect(emptyCartMessage).toBeTruthy();
//     expect(emptyCartMessage.nativeElement.textContent.trim()).toEqual('Oops! Your cart is Empty!');
// });

});
