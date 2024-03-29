import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { DebugElement, NgModule } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let debugElement: DebugElement;
 
 

  beforeEach(() => {
    TestBed.configureTestingModule({  
      declarations: [ HomeComponent, FooterComponent ],
      imports: [ HttpClientModule,FormsModule ],
    }).compileComponents(); 
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('component was created or not',()=>{
    expect(component).toBeTruthy();
  })
 
  // it('should trigger addToCart button', async () => {
  //   fixture.detectChanges(); 
  //   await fixture.whenStable(); 
    
  //   let btn = debugElement.query(By.css('#addToCartButton'));
  //   spyOn(component, 'addToCart');
  //   btn.triggerEventHandler('click', null);
    
  //   expect(component.addToCart).toHaveBeenCalled();
  // });

  it('should render  product listing',()=>{
    let productList=debugElement.queryAll(By.css('.product'))
    expect(productList.length).toBeGreaterThan(0);
  })
  
});
