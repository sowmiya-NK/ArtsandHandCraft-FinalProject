import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar.component';



describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('NavbarComponent should created', () => {
    expect(component).toBeTruthy();
  });
});