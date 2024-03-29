import { DebugElement } from '@angular/core';
import { CartComponent } from './cart.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('CartComponent', () => {
  let component: CartComponent;
  let debug: DebugElement;
  let fixture:ComponentFixture<CartComponent>
  beforeEach(() => {
    TestBed.configureTestingModule({});
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create',()=>{
    expect(component).toBeFalsy();
  })
});
