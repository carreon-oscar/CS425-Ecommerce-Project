//commonly used interfaces

export interface Product {
  _id: string;
  imageUrl: string;
  price: number;
  slug: string;
  categoryName: string;
  name: string;
}

export interface CompleteProduct {
  _id: string;
  images: string;
  price: number;
  slug: string;
  categoryName: string;
  name: string;
  description: string;
  price_id: string;
}

export interface ProductStripe {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: any;
  price_id: string;
}

export interface ImageList {
  images: any;
}
