// import { TestBed, ComponentFixture } from '@angular/core/testing';
// import { FormsModule } from '@angular/forms';
// import { ActivatedRoute, convertToParamMap } from '@angular/router';
// import { of } from 'rxjs';
// import { CategoryComponent } from './category.component';
// import { CategoryService } from 'src/app/service/category.service';

// describe('CategoryComponent', () => {
//   let component: CategoryComponent;
//   let fixture: ComponentFixture<CategoryComponent>;
//   let categoryServiceSpy: jasmine.SpyObj<CategoryService>;

//   beforeEach(() => {
//     const spy = jasmine.createSpyObj('CategoryService', ['findCategoryById']);
//     TestBed.configureTestingModule({
//       declarations: [CategoryComponent],
//       imports: [FormsModule],
//       providers: [
//         {
//           provide: ActivatedRoute,
//           useValue: { snapshot: { paramMap: convertToParamMap({ id: '128' }) } },
//         },
//         { provide: CategoryService, useValue: spy },
//       ],
//     });
//     fixture = TestBed.createComponent(CategoryComponent);
//     component = fixture.componentInstance;
//     categoryServiceSpy = TestBed.inject(
//       CategoryService
//     ) as jasmine.SpyObj<CategoryService>;
//   });

//   // it('should fetch category and set editId and category_name on ngOnInit', () => {
//   //   const mockCategory = { id: 128, title: 'Test Category' };
//   //   categoryServiceSpy.findCategoryById.and.returnValue(of(mockCategory));

//   //   component.ngOnInit();

//   //   expect(component.editId).toBe(mockCategory.id);
//   //   expect(component.category_name).toBe(mockCategory.title);
//   // });

// });
