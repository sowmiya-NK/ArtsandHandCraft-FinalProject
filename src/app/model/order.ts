export interface Order {
  id: number;
  date: Date;
  title: string; // Assuming this title is for the entire order
  Total: number;
  username: string;
  orderedArtWorkList: {
    id: number;
    title: string;
    description: string;
    price: number;
    count: number;
    // Add other properties as needed
  }[];
}
