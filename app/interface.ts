//commonly used interfaces

export interface CatToRender {
  men: boolean;
  women: boolean;
  featured: boolean;
}

export interface Product {
  _id: string;
  imageUrl: string;
  price: number;
  slug: string;
  categoryName: string;
  subcategoryName: string;
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
  _id: string;
}

export interface ImageList {
  images: any;
}

export interface CatLinkProps {
  linkTitle: string;
  handleDropDownOpen: () => void;
  handleDropDownExit: (status: boolean) => void;
  linkRef: string;
}

export interface CartDetailsProduct {
  name: string;
  description: string;
  id: string;
  price: number;
  currency: string;
  image: string;
  price_id: string;
  docID: string;
  quantity: number;
  value: number;
  price_data: any;
  product_data: any;
  formattedValue: string;
  formattedPrice: string;
}

export interface incrementAction {
  type: 'increment';
  product: { docID: string; quantity: number };
}

export interface quantityAction {
  type: 'quantity';
  product: { docID: string };
}

export interface CustomerDetails {
  name: string;
  email: string;
  last4: string;
  card_brand: string;
  amount_paid: string;
  shipping_type: string;
  shipping_cost: string;
  tax_collected: string;
  amount_subtotal: string;
}

export interface CheckoutItem {
  docID: string;
  quantity: number;
}

export interface FeauturedProduct {
  _id: string;
  categoryName: string;
  imageUrl: string;
  name: string;
  price: number;
  slug: string;
}

export interface DropdownLinks {
  currentCat: string;
  handleDropdownExit: (state: boolean) => void;
  isDropDownVisible: boolean;
}
