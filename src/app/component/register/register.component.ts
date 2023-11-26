import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { Register } from 'src/app/model/register';
import { AuthService } from 'src/app/service/auth.service';
import { RegisterService } from 'src/app/service/register.service';
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
    private router: Router,
    private registerService: RegisterService
  ) {}
  onSubmit(registerForm: NgForm) {
    let formValue: Register = registerForm.value;
    console.log(formValue);
    console.log("registered");
    

    this.registerService.register(formValue).subscribe({
      next: (response: AppResponse) => {
         console.log(response.data);
        // registerForm.resetForm();
        
        this.router.navigate(['/login']);
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }
}
