import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductviewComponent } from './productview.component';
import { HttpClientModule } from '@angular/common/http';


describe('ProductViewComponent', () => {
  let component: ProductviewComponent;
  let fixture: ComponentFixture<ProductviewComponent>;
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductviewComponent],
      imports:[HttpClientModule]
    });
    fixture = TestBed.createComponent(ProductviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('ProductViewComponent should created', () => {
    expect(component).toBeTruthy();
  });
});