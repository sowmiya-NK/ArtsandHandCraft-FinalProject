export interface Order {
  id: number;
  date: Date;
  title: string; 
  Total: number;
  username: string;
  orderedArtWorkList: {
    id: number;
    title: string;
    description: string;
    price: number;
    count: number;
   
  }[];
}
