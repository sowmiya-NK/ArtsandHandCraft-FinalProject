export interface Cart {
  id?: number;
  title?: String;
  image?: File;
  price: number;
  count: number;
  total?: number;
  artworkId: number;
  userId: number;
}
