export interface UserProfile {
  id?: number;
  username: String;
  name: String;
  addressList: 
    [{
      id?:number;
      street: String;
      city: String;
      state?:string;
      zipcode: String;
    }];
}
