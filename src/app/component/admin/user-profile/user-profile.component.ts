import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/model/profile';
import { UserprofileService } from 'src/app/service/userProfile.service';
// import { UserprofileService } from 'src/app/service/userprofile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  profiles: Profile[] = [];

  constructor(private userProfileService: UserprofileService) {}
  ngOnInit(): void {
    this.userProfileService.fetchdata().subscribe({
      next: (profile: any) => {
        let userDetails: Profile[] = profile.data;
        console.log(profile);

        this.profiles = userDetails;
      },

      error: (err) => console.log('error', err),
      complete: () => console.log('completed'),
    });
  }
}
