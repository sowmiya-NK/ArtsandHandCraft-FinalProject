import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-categoryview',
  templateUrl: './categoryview.component.html',
  styleUrls: ['./categoryview.component.css'],
})
export class CategoryviewComponent implements OnInit {
  categories: Category[] = [];
  error: string = '';
  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.fetchdata().subscribe({
      next: (category: any) => {
        this.categories = category.data;
      },
      error: (err) => (this.error = err),
    });
  }

  onDelete(deleteid: any): void {
    this.categoryService.deleteCategory(deleteid).subscribe({
      next: (Category: Category[]) => {
        this.categories = Category;
      },
    });
  }
  onEdit(editId: number) {
    this.router.navigate(['/admin/category'], { queryParams: { id: editId } });
  }
}
