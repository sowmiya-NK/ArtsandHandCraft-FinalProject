import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  error: string = '';
  INITIAL_CATEGORY: Category = { id: 0, title: '' };

  categories: Category[] = [];
  categoryModel: Category = this.INITIAL_CATEGORY;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response.data;
      },
    });
  }

  onSubmit(form: any) {
    if (this.categoryModel.id === 0) {
      this.categoryService
        .postCategory({ title: this.categoryModel.title })
        .subscribe({
          next: (response: any) => {
            this.categories = response.data;
            this.categoryModel = this.INITIAL_CATEGORY;
          },
        });
    } else {
      this.categoryService.putCategory(this.categoryModel).subscribe({
        next: (response: any) => {
          this.categories = response.data;
          this.categoryModel = this.INITIAL_CATEGORY;
        },
        error: (err) => {
          console.log(err?.error?.error?.message);
        },
      });
    }
  }

  getCategory(category: Category) {
    this.categoryModel = category;
  }

  onDelete(id: number | undefined) {
    if (id !== undefined) {
      this.categoryService.deleteCategory(id).subscribe({
        next: (response: any) => {
          this.categories = response.data;
        },
        error: (err) => {
          console.log(err?.error?.error?.message);
        },
      });
    }
  }
}
