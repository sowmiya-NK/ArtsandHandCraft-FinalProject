import { Component } from '@angular/core';
import { AddressService } from 'src/app/service/address.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {
  name:string='';
  username:string='';
  street:string='';
  city:string='';
  state:string='';
  Zipcode:string=''
  constructor(private addressService:AddressService,private storageService:StorageService){}
  onSubmit(details:{
    name:string;
    username:string;
    street:string
    city:string;
    state:string;
    zipcode:string
  }){
    console.log(details);
    this.addressService.postAddress(details,this.storageService.getLoggedInUser().id).subscribe((response) => console.log(response));
    
  }

}
