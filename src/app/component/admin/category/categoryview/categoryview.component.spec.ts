import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CategoryviewComponent } from './categoryview.component';



describe('CategoryViewComponent', () => {
  let component: CategoryviewComponent;
  let fixture: ComponentFixture<CategoryviewComponent>;
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryviewComponent],
      imports:[HttpClientModule]
    });
    fixture = TestBed.createComponent(CategoryviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('CategoryViewComponent should created', () => {
    expect(component).toBeTruthy();
  });
});