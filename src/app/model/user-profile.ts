export interface UserProfile {
  id?: number;
  username: string;
  name:string;
  createdAt:Date;
  addressList: 
    [{
      id?:number;
      street: string;
      city: string;
      state?:string;
      zipcode: string;
    }];
}
