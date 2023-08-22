import { SelectOption } from "../components/ui/Select";

export type ProductId = string;
export type ProductBundleId = string;
export type Price = number;
export type Year = number | null;

export interface PriceItem {
  year: Year;
  price: Price;
}

export interface ProductItem {
  id: ProductId;
  name: string;
  prices: PriceItem[];
  requiredProducts?: ProductId[];
}

export interface ProductBundleItem extends ProductItem {
  id: ProductBundleId;
  products: ProductId[];
  freeProducts?: ProductId[];
}

export interface ProductData {
  availableYears: number[];
  products: ProductItem[];
  productBundles: ProductBundleItem[];
}

export interface OfferItem {
  id: ProductId | ProductBundleId;
  name: string;
  isBundle: boolean;
  price: Price;
}

export interface Offer {
  items: OfferItem[];
  totalPrice: Price;
  regularPrice: Price;
}

export interface CalculatorFormData {
  selectedYear?: SelectOption;
  selectedProducts: string[];
}
