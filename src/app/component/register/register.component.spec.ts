import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/service/register.service';
import { of } from 'rxjs';
import { AppResponse } from 'src/app/model/appResponse';
import { Register } from 'src/app/model/register';
import { LottieModule, ɵLOTTIE_OPTIONS } from 'ngx-lottie';
import player from 'lottie-web';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { urlEndpoint } from 'src/app/utils/constant';

// Mock player factory function
export function playerFactory() {
  return player;
}

// Mock Lottie options
const mockLottieOptions = {
  player: playerFactory,
};

const formValue: Register = {
  id: 1,
  username: 'testuser',
  password: 'testpassword',
  name: 'John Doe',
  confirmpassword: 'testpassword',
};

const responseData: AppResponse = {
  status: 200,
  timestamp: Date.now(),
  data: 'mockResponseData',
  error: null,
};

const mockNgForm = { value: formValue } as NgForm;

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router;
  let registerService: jasmine.SpyObj<RegisterService>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    const registerServiceSpy = jasmine.createSpyObj('RegisterService', [
      'register',
    ]);

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        FormsModule,
        LottieModule.forRoot({ player: playerFactory }),
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
        { provide: RegisterService, useValue: registerServiceSpy },
        { provide: ɵLOTTIE_OPTIONS, useValue: mockLottieOptions },
      ],
    }).compileComponents();

    router = TestBed.inject(Router) as Router;
    registerService = TestBed.inject(
      RegisterService
    ) as jasmine.SpyObj<RegisterService>;
    httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call registerService.register and navigate to login on form submission', fakeAsync(() => {
    registerService.register.and.returnValue(of(responseData));
    component.onSubmit(mockNgForm);
    tick();
    expect(registerService.register).toHaveBeenCalledWith(formValue);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  }));

  // it('should check post method', fakeAsync(() => {
    
  //   registerService.register.and.returnValue(of(responseData));
  //   component.onSubmit(mockNgForm);
  //   tick(); 

  //   expect(registerService.register).toHaveBeenCalledWith(formValue);
  //   expect(httpMock.expectOne(`${urlEndpoint.baseUrl}/auth/register`).request.method).toBe('POST');
  // }));
});
