import { ComponentFixture } from '@angular/core/testing';
import { ContactPageComponent } from './contact-page.component';
describe('ContactpageComponent', () => {
  let component: ContactPageComponent;
  beforeEach(() => {
    component = new ContactPageComponent();
  });
  it('contactComponent was created', () => {
    expect(component).toBeTruthy();
  });
  it('should call onsubmit method', () => {
    spyOn(window, 'alert');
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith(
      'Your feedback has been submited successfuly!!!'
    );
  });
});
