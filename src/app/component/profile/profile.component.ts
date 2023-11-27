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
  // userDetails: UserProfile = null;
  userprofile: UserProfile = {
    id: 0,
    username: '',
    name: '',
    addressList: [
      {
        street: '',
        city: '',
        zipcode: '',
      },
    ],
  };

  user: AppUser;
  constructor(
    private userProfileService: UserprofileService,
    private storageService: StorageService
  ) {
    this.user = storageService.getLoggedInUser();
  }

  ngOnInit(): void {
    this.userProfileService.getUserById(this.user?.id).subscribe({
      next: (response: any) => {
        this.userprofile = response.data;
        console.log(response);
        console.log(this.userprofile.id);
      },

      error: (err) => console.log('error', err),
      complete: () => console.log('completed'),
    });
  }
}
