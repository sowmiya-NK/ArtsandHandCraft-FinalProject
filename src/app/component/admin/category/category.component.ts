import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  categoryName: string = '';
  editId: number = 0;
  constructor(
    private categoryService: CategoryService,
    private router: ActivatedRoute
  ) {}
  addCategory(categories: { category_name: string }) {
    console.log(categories);
    let mappedCategory: Category = {
      id: this.editId,
      title: categories.category_name,
    };
    this.categoryService
      .addCategory(mappedCategory,this.editId)
      .subscribe((response) => console.log(response));
  }
  ngOnInit(): void {
    this.router.queryParams.subscribe((param) => {
      let id = param['id'];
      // console.log(id);
      this.editId = id;
      this.categoryService.findCategoryById(id).subscribe({
        next: (response: any) => {
          console.log(response);
          this.categoryName = response.data.title;
        },
      });
    });
  }
}
