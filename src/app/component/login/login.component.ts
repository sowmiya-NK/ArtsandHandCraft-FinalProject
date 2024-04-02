import { Component } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { Login } from 'src/app/model/login';
import { AppUser } from 'src/app/model/appUser';
import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  options: AnimationOptions = {
    path: '/assets/craft.json',
  };

  username: String = '';
  password: String = '';
  error: String = '';

  constructor(private authService: AuthService) {}

  login(_loginForm: NgForm): void {
    console.log(_loginForm.value);
    this.authService.login(_loginForm.value).subscribe({
      next: (response: AppResponse) => {
        this.authService.setLoggedIn(response.data);
      },
    });
  }
}
