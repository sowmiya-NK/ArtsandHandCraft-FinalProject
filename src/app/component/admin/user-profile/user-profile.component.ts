import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/model/profile';
import { UserprofileService } from 'src/app/service/userprofile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  profile: Profile[] = [];

  constructor(private userProfileService:UserprofileService) {}
  ngOnInit(): void {
    this.userProfileService.fetchdata().subscribe({
      

    });
  }
}
