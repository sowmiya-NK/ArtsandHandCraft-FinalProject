export interface Order {
  id: number;
  total: number;
  username: String;
  createdAt?: Date;
  addressId?:number;
  orderedArtWorkList: {
    id?: number;
    title: String;
    description?: string;
    price: number;
    count: number;
  }[];
  orderStatus?:string;
}
