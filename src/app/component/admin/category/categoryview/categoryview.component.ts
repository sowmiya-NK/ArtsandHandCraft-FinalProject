import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-categoryview',
  templateUrl: './categoryview.component.html',
  styleUrls: ['./categoryview.component.css'],
})
export class CategoryviewComponent  {
  @Input() categories: Category[] = [];

  @Output() editEmitter = new EventEmitter<Category>();
  @Output() deleteEmitter = new EventEmitter<number | undefined>();

  onEdit(category: Category) {
    // this.editEmitter.emit(category);
    let newObject = { id: category.id, title: category.title };
    this.editEmitter.emit(newObject);
  }

  onDelete(id: number | undefined) {
    this.deleteEmitter.emit(id);
  }
}
