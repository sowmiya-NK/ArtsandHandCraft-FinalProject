import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/model/address';
import { AppUser } from 'src/app/model/appUser';
import { Order } from 'src/app/model/order';
import { UserProfile } from 'src/app/model/user-profile';
import { AddressService } from 'src/app/service/address.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserprofileService } from 'src/app/service/userProfile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  // userDetails: UserProfile = null;
  userprofile: UserProfile[] = [];
  deleteAddress1: Address[] = [];

  user: AppUser;
  constructor(
    private userProfileService: UserprofileService,
    private storageService: StorageService,
    private addressService: AddressService
  ) {
    this.user = storageService.getLoggedInUser();
  }

  ngOnInit(): void {
    this.userProfileService.getUserById(this.user?.id).subscribe({
      next: (response: any) => {
        this.userprofile = response.data;
      },
    });
  }

  deleteAddress(deleteId: number) {
    this.addressService
      .deleteAddress(deleteId)
      .subscribe((response) => (this.deleteAddress1 = response.data));
    this.ngOnInit();
  }
}
