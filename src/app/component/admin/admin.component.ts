import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  options: AnimationOptions;

  constructor() {
    this.options = {
      path: '/assets/adminpage.json',
    };
  }
}
