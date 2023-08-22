import {
  ProductData,
  ProductId,
  ProductBundleItem,
  PriceItem,
  Year,
  Price,
  ProductItem,
  OfferItem,
  Offer,
} from "../store/model";
import { UnknownProductError } from "./errors";

export function getMatchingBundles(db: ProductData, requestedProducts: ProductId[]): ProductBundleItem[] {
  return db.productBundles.filter((bundle) =>
    bundle.products.every((bundleProduct) => requestedProducts.includes(bundleProduct))
  );
}

function getPriceForYear(prices: PriceItem[], year: Year): Price {
  return prices.find((price) => price.year === year || price.year === null)?.price || 0;
}

export function getProductById(db: ProductData, productId: ProductId): ProductItem {
  const product = db.products.find((product) => product.id === productId);
  if (!product) {
    throw new UnknownProductError(productId);
  }

  return product;
}

function getBasePriceForProducts(requestedProducts: ProductItem[], selectedYear: Year): Price {
  return requestedProducts.reduce(
    (sumPrice, requestedProduct) => sumPrice + getPriceForYear(requestedProduct.prices, selectedYear),
    0
  );
}

function getUnbundledProducts(requestedProducts: ProductId[], productBundle: ProductBundleItem): ProductId[] {
  const productsIncludedInBundle = productBundle.products.concat(productBundle.freeProducts || []);
  return requestedProducts.filter((product) => !productsIncludedInBundle.includes(product));
}

export function getMissingRequiredProducts(product: ProductItem, requestedProducts: ProductId[]): ProductId[] {
  return product.requiredProducts?.filter((requiredProduct) => !requestedProducts.includes(requiredProduct)) || [];
}

export function getProductNames(db: ProductData, productIds: ProductId[]) {
  return productIds.map((productId) => getProductById(db, productId).name);
}

function convertBundleToOfferItem(bundle: ProductBundleItem, price: Price): OfferItem {
  return { id: bundle.id, name: bundle.name, isBundle: true, price };
}

function convertProductToOfferItem(product: ProductItem, price: Price): OfferItem {
  return { id: product.id, name: product.name, isBundle: false, price };
}

function prepareOffer(productData: ProductData, selectedProducts: ProductId[], year: Year): Offer {
  const regularOfferItems = selectedProducts.map((productId) => {
    const product = getProductById(productData, productId);
    return convertProductToOfferItem(product, getPriceForYear(product.prices, year));
  });

  const regularPrice = regularOfferItems.reduce((sum, item) => (sum += item.price), 0);

  const bundles = getMatchingBundles(productData, selectedProducts);

  if (bundles.length > 0) {
    const bundleVariants = bundles.map((bundle) => {
      const unbundledProducts = getUnbundledProducts(selectedProducts, bundle).map((product) =>
        getProductById(productData, product)
      );
      const bundlePrice = getPriceForYear(bundle.prices, year);

      const offerItems = [
        convertBundleToOfferItem(bundle, bundlePrice),
        ...unbundledProducts.map((p) => convertProductToOfferItem(p, getPriceForYear(p.prices, year))),
      ];
      const bundleVariantPrice = offerItems.reduce((sum, item) => (sum += item.price), 0);
      return { offerItems, bundleVariantPrice };
    });

    const cheapestBundleVariant = bundleVariants.reduce((previous, current) => {
      return current.bundleVariantPrice < previous.bundleVariantPrice ? current : previous;
    });

    return {
      items: cheapestBundleVariant.offerItems,
      totalPrice: cheapestBundleVariant.bundleVariantPrice,
      regularPrice,
    };
  }

  return {
    items: regularOfferItems,
    totalPrice: regularPrice,
    regularPrice,
  };
}

export { prepareOffer };
