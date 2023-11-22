import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-categoryview',
  templateUrl: './categoryview.component.html',
  styleUrls: ['./categoryview.component.css'],
})
export class CategoryviewComponent implements OnInit {
  categories: Category[] = [];
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.fetchdata().subscribe({
      next: (category: any) => {
        // categories = category;
        console.log(category);
        let categoryDetails: Category[] = category.data;
        this.categories = categoryDetails;
      },
      error: () => console.log('error'),
      complete: () => console.log('completed'),
    });
  }
}
