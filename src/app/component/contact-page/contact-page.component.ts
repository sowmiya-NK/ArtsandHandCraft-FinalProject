import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'],
})
export class ContactPageComponent {
  onSubmit() {
    alert('Your feedback has been submited successfuly!!!\uD83D\uDE05');
  }
}
