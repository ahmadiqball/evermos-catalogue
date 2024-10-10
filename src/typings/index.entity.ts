export interface Review {
  rating: number;
  comment: string;
  date: string; // ISO 8601 format
  reviewerName: string;
  reviewerEmail: string;
}

export interface Product {
  id: string;
  price: number;
  updatedAt: string; // ISO 8601 format
  category: string;
  description: string;
  discountPercentage: number;
  images: Array<string>;
  rating: number;
  stock: number;
  reviews: Array<Review>;
  title: string;
}
