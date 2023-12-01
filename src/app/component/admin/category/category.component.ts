import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  category_name: string = '';
  editId: number = 0;
  constructor(
    private categoryService: CategoryService,
    private router: ActivatedRoute
  ) {}

  addCategory(categories: NgForm) {
    let mappedCategory: Category = {
      id: this.editId,
      title: categories.value.category_name,
    };

    this.categoryService
      .addCategory(mappedCategory, this.editId)
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
          this.category_name= response.data.title;
          // console.log('category name',this.categoryName);
        },
      });
    });
  }
}
