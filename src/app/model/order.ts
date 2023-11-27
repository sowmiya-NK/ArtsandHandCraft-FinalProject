export interface Order {
  id: number;
  total: number;
  username: String;
  createdAt?: Date;
  orderedArtWorkList: {
    id?: number;
    title: String;
    description?: string;
    price: number;
    count?: number;
  }[];
}
