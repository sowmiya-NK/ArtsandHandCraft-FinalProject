import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  options: AnimationOptions = {
    path: '/assets/arts.json',
  };
  error: string = '';
  constructor(
    private storage: StorageService,
    private authService: AuthService,
    private router: Router
  ) {}
  onSubmit(registerForm: NgForm) {
    const value = registerForm.value;
    this.storage.setLoggedInUser(value);
    if (this.authService.isValidUser(value)) {
      this.router.navigate(['/login'], { replaceUrl: true });
    }else{
      this.error="Invalid User!!";
    }
  }
}
