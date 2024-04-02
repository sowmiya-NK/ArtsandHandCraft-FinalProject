import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CategoryviewComponent } from './categoryview.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';
import { of } from 'rxjs';

describe('CategoryViewComponent', () => {
  let component: CategoryviewComponent;
  let fixture: ComponentFixture<CategoryviewComponent>;
  let router: Router;
  let categoryService: CategoryService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryviewComponent],
      imports: [HttpClientModule, RouterTestingModule.withRoutes([])],
      providers: [CategoryService],
    });
    fixture = TestBed.createComponent(CategoryviewComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    categoryService = TestBed.inject(CategoryService);
    fixture.detectChanges();
  });

  it('CategoryViewComponent should created', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to edit page when edit button is clicked', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const categoryId = 128;

    const editButton = fixture.nativeElement.querySelector('.fa-pen-to-square');

    fixture.whenStable().then(() => {
      expect(editButton).toBeTruthy();
      editButton.click();
      expect(navigateSpy).toHaveBeenCalledWith(['/admin/category'], {
        queryParams: { id: categoryId },
      });
    });
  });

  it('should delete an category', () => {
    const deleteId = 128;
    const mockResponse: Category[] = [
      {
        id: 128,
        title: 'idole',
      },
    ];
    spyOn(categoryService, 'deleteCategory').and.returnValue(of(mockResponse));
    component.onDelete(deleteId);
    expect(categoryService.deleteCategory).toHaveBeenCalledWith(deleteId);
  });
});
