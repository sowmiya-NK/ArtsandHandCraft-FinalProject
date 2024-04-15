export interface Order {
  id: number;
  total?: number;
  username?: String;
  createdAt?: Date;
  addressId?: number;
  orderedArtWorkList: {
    id?: number | undefined;
    title?: String;
    description?: string | undefined;
    price: number;
    count: number;
   
  }[];
  orderStatus?: string | undefined;
}