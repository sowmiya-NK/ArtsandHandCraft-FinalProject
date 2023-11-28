import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/model/appUser';
import { Order } from 'src/app/model/order';
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
  userprofile : UserProfile[] = [];
  orderDetails:Order[]=[];

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
        let  profile=response.data;
        this.userprofile = [profile];
        console.log(response);
        // console.log(this.userprofile.id);
      },

      error: (err) => console.log('error', err),
      complete: () => console.log('completed'),
    });
  }
}
