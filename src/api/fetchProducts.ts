import productData from "../data/productData.json";
import { ProductData } from "../store/model";

function fetchProducts(): ProductData {
  return productData as ProductData;
}

export default fetchProducts;
