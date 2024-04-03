import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register.component';
import { FormsModule } from '@angular/forms';
import { LottieModule } from 'ngx-lottie';
import { LOTTIE_OPTIONS } from 'ngx-lottie/lib/symbols';



describe('registerComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports:[FormsModule,HttpClientModule,LottieModule]
    });
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('RegisterComponent should created', () => {
    expect(component).toBeTruthy();
  });
});