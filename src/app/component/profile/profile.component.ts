import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/model/appUser';
import { UserProfile } from 'src/app/model/user-profile';
import { StorageService } from 'src/app/service/storage.service';
import { UserprofileService } from 'src/app/service/userProfile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userDetails: UserProfile[] = [];

  user: AppUser;
  constructor(
    private userProfileService: UserprofileService,
    private storageService: StorageService
  ) {
    this.user = storageService.getLoggedInUser();
  }

  ngOnInit(): void {
    this.userProfileService.getUserById(this.user?.id).subscribe({
      next: (userProfile: any) => {
        let userDetail: UserProfile[] = userProfile.data;
        console.log(userProfile);
        // console.log(this.user.id);
        this.userDetails = userDetail;
      },

      error: (err) => console.log('error', err),
      complete: () => console.log('completed'),
    });
  }
}
