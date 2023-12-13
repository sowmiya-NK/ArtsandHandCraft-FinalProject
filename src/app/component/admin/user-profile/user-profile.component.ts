import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/model/profile';
import { UserProfile } from 'src/app/model/user-profile';
import { UserprofileService } from 'src/app/service/userProfile.service';
// import { UserprofileService } from 'src/app/service/userprofile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [DatePipe],
})
export class UserProfileComponent implements OnInit {
  profiles: UserProfile[] = [];
  // createdAtFromDB: string = '2023-11-29T12:58:43.725448';
  createdAt: Date;

  formattedDate: string;

  error: string = '';

  constructor(
    private userProfileService: UserprofileService,
    private dataPipe: DatePipe
  ) {
    // Convert the string from the database to a Date object
    this.createdAt = new Date();

    // Format the Date object using DatePipe
    this.formattedDate = dataPipe.transform(this.createdAt, 'yyyy-MM-dd ')!;
  }
  ngOnInit(): void {
    this.userProfileService.fetchdata().subscribe({
      next: (response: any) => {
        let userDetails: UserProfile[] = response.data;
        console.log(response);

        this.profiles = userDetails;
      },

      error: (err) => console.log('error', err),
      complete: () => console.log('completed'),
    });
  }
}
