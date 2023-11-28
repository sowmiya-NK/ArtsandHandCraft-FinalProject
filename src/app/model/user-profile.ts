export interface UserProfile {
  id?: number;
  username: String;
  name: String;
  addressList: 
    [{
      street: String;
      city: String;
      zipcode: String;
    }];
}
