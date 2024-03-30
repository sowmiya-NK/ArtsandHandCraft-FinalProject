import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AdminOrderComponent } from './admin-order.component';


describe('AdminOrderComponent', () => {
  let component: AdminOrderComponent;
  let fixture: ComponentFixture<AdminOrderComponent>;
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOrderComponent],
      imports:[HttpClientModule]
    });
    fixture = TestBed.createComponent(AdminOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('AdminOrderComponent should created', () => {
    expect(component).toBeTruthy();
  });
});