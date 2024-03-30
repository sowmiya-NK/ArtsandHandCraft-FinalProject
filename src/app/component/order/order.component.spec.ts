import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { OrderComponent } from './order.component';



describe('OrderComponent', () => {
  let component:OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderComponent],
      imports:[HttpClientModule]
    });
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('OrderComponent should created', () => {
    expect(component).toBeTruthy();
  });
});