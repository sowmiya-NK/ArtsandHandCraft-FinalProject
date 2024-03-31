import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login.component';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AuthService } from 'src/app/service/auth.service';
import { of } from 'rxjs';
import { AppResponse } from 'src/app/model/appResponse';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let debug: DebugElement;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientModule, FormsModule],
      providers: [AuthService],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('LoginComponent should created', () => {
    expect(component).toBeTruthy();
  });

  it('should check username input field with dummy data', () => {
    const username = fixture.debugElement.query(By.css('#username'));
    const userInputElement: HTMLInputElement = username.nativeElement;

    const dummtUsername = 'user';
    userInputElement.value = dummtUsername;
    userInputElement.dispatchEvent(new Event('input'));

    const ngModel = username.injector.get(NgModel);
    expect(ngModel.valid).toBeTruthy();
    expect(userInputElement.value).toEqual(dummtUsername);
  });

  it('should check password input field with dummy data', () => {
    const password = fixture.debugElement.query(By.css('#password'));
    const passwordInputElement = password.nativeElement;

    const dummyPassword = 'user';
    passwordInputElement.value = dummyPassword;
    passwordInputElement.dispatchEvent(new Event('input'));

    const ngModel = password.injector.get(NgModel);
    expect(ngModel.valid).toBeTruthy();
    expect(passwordInputElement.value).toEqual(dummyPassword);
  });

  it('should check login button', () => {
    const loginForm = {
      value: {
        username: 'user',
        password: 'user',
      },
    } as NgForm;

    const mockResponse: AppResponse = {
      status: 200,
      timestamp: Date.now(),
      data: {},
      error: null,
    };
    const authServiceSpy = spyOn(authService, 'login').and.returnValue(
      of(mockResponse)
    );
    component.login(loginForm);

    expect(authServiceSpy).toHaveBeenCalledWith(loginForm.value);
  });
});
