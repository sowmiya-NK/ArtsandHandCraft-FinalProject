import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { Register } from 'src/app/model/register';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  options: AnimationOptions = {
    path: '/assets/arts.json',
  };
  error: string = '';
  person: string = '';
  nameRef: string = '';
  password: string = '';
  role: string = '';

  constructor(
    private router: Router,
    private registerService: RegisterService
  ) {}

  onSubmit(registerForm: NgForm): void {
    let formValue: Register = registerForm.value;
    this.registerService.register(formValue).subscribe({
      next: (response: AppResponse) => {
        this.router.navigate(['/login']);
      },
    });
  }
}
