import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PaymentComponent } from './payment.component';
import { FormsModule } from '@angular/forms';



describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentComponent],
      imports:[FormsModule,HttpClientModule]
    });
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('PaymentComponent should created', () => {
    expect(component).toBeTruthy();
  });
});