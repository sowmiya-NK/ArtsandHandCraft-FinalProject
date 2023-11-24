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
  constructor(private categoryService: CategoryService) {}
  addCategory(categories: { category_name: string }) {
    console.log(categories);
    let mappedCategory: Category = { title: categories.category_name };
    this.categoryService
      .addCategory(mappedCategory)
      .subscribe((response) => console.log(response));
  }
}
