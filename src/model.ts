
type ProductId = string;
type ProductBundleId = string;
type Price = number;
type Year = number | null;

export interface PriceItem
{
  year: Year,
  price: Price,
}

export interface ProductItem
{
  id: ProductId,
  name: string,
  prices: PriceItem[],
  requiredProducts?: ProductId[],
}

export interface ProductBundleItem extends ProductItem
{
  id: ProductBundleId,
  products: ProductId[],
  freeProducts?: ProductId[],
}

export interface Database {
  availableYears: number[],
  products: ProductItem[],
  productBundles: ProductBundleItem[],
}

const db: Database = {
  availableYears: [ 2023, 2024, 2025 ],
  products: [
    {
      id: '#internet',
      name: 'Internet',
      prices: [
        { year: 2023, price: 39 },
        { year: 2024, price: 49 },
        { year: 2025, price: 59 },
     ]
    },
    {
      id: '#tv',
      name: 'Telewizja',
      prices: [
        { year: 2023, price: 49 },
        { year: 2024, price: 49 },
        { year: 2024, price: 59 },
     ]
    },
    {
      id: '#phone',
      name: 'Abonament telefoniczny',
      prices: [
        { year: null, price: 29 }
      ]
    },
    {
      id: '#decoder',
      name: 'Dekoder 4K',
      prices: [
        { year: null, price: 29 },
      ],
      requiredProducts: [
        '#tv'
      ],
    }
  ],
  productBundles: [
    {
      id: '#internet+tv',
      name:'Internet + Telewizja',
      products: [
        '#internet',
        '#tv'
      ],
      freeProducts: [
        '#decoder'
      ],
      prices: [
        { year: 2023, price: 79 },
        { year: 2024, price: 89 },
        { year: 2025, price: 99 },
      ]
    },
    {
      id: '#internet+phone',
      name: 'Internet + Abonament telefoniczny',
      products: [
        '#internet',
        '#phone',
      ],
      prices: [
        { year: null, price: 64 },
      ]
    }
  ]
}

export function getMatchingBundles(db: Database, requestedProducts: ProductId[]): ProductBundleItem[]{
  return db.productBundles.filter((bundle) =>
    bundle.products.every((bundleProduct) => requestedProducts.includes(bundleProduct))
  );
}

class UnknownProductError extends Error {
  constructor(productId: ProductId) {
    super(`Unknown product: ${productId}`);
  }
};

class MissingRequiredProductError extends Error {
  constructor(productId: ProductId, requiredProductNames: string[]) {
    super(`Product: ${productId} cannot be selected without: ${requiredProductNames.join(', ')}.`);
  }
};

function getPriceForYear(prices: PriceItem[], year: Year): Price {
  return prices.find(price => price.year === year || price.year === null)?.price || 0;
}

function getProductById(db: Database, productId: ProductId): ProductItem {
  const product = db.products.find(product => product.id === productId);
  if (!product) {
    throw new UnknownProductError(productId);
  }

  return product;
}

function getBasePriceForProducts(requestedProducts: ProductItem[], selectedYear: Year): Price {
  return requestedProducts.reduce((sumPrice, requestedProduct) =>
    sumPrice + getPriceForYear(requestedProduct.prices, selectedYear)
  , 0);
}

function getUnbundledProducts(requestedProducts: ProductId[], productBundle: ProductBundleItem): ProductId[] {
  const productsIncludedInBundle = productBundle.products.concat(productBundle.freeProducts || []);
  return requestedProducts.filter(product => !productsIncludedInBundle.includes(product));

function getMissingRequiredProducts(product: ProductItem, requestedProducts: ProductId[]): ProductId[] {
  return product.requiredProducts?.filter(requiredProduct => !requestedProducts.includes(requiredProduct)) || [];
}

function getProductNames(db: Database, productIds: ProductId[]) {
  return productIds.map(productId => getProductById(db, productId).name);
}

interface ProductValidationResult {
  productId: ProductId;
  success: boolean,
  message?: string;
}

interface ProductsValidationResult {
  [productId: ProductId]: ProductValidationResult;
}

function validateRequestedProduct(db: Database, requestedProducts: ProductId[]): ProductsValidationResult{
  const validationResult: ProductsValidationResult = {};

  for (const productId of requestedProducts) {
    try{
      const requestedProduct = getProductById(db, productId);
      const missingRequiredProduct = getMissingRequiredProducts(requestedProduct, requestedProducts);

      if (missingRequiredProduct.length > 0) {
        throw new MissingRequiredProductError(requestedProduct.id, getProductNames(db, missingRequiredProduct));
      }

      validationResult[productId] = { productId, success: true };
    }
    catch (error) {
      const errorMessage = error instanceof UnknownProductError || error instanceof MissingRequiredProductError
        ? error.message : 'Product is not valid.';

      validationResult[productId] = { productId, success: false, message: errorMessage };
    }
  }

  return validationResult;
}

interface OfferItem {
  id: ProductId | ProductBundleId;
  name: string;
  isBundle: boolean;
  price: Price;
}

interface Offer {
  items: OfferItem[];
  totalPrice: Price;
}


function convertBundleToOfferItem(bundle: ProductBundleItem, price: Price): OfferItem {
  return { id: bundle.id, name: bundle.name, isBundle: true, price };
}

function convertProductToOfferItem(product: ProductItem, price: Price): OfferItem {
  return { id: product.id, name: product.name, isBundle: false, price };
}

function prepareOffer(selectedProducts: ProductId[], year: Year): Offer {
  const bundles = getMatchingBundles(db, selectedProducts);

  if (bundles.length > 0) {
    const bundleVariants = bundles.map(bundle => {
      const unbundledProducts = getUnbundledProducts(selectedProducts, bundle).map(product => getProductById(db, product));
      const bundlePrice = getPriceForYear(bundle.prices, year);

      const offerItems = [
        convertBundleToOfferItem(bundle, bundlePrice),
        ...unbundledProducts.map(p => convertProductToOfferItem(p, getPriceForYear(p.prices, year))),
      ]
      const bundleVariantPrice = offerItems.reduce((sum, item) => sum += item.price, 0);
      return { offerItems, bundleVariantPrice };
    });

    const cheapestBundleVariant = bundleVariants.reduce((previous, current) => {
      return current.bundleVariantPrice < previous.bundleVariantPrice ? current : previous;
    });

    return {
      items: cheapestBundleVariant.offerItems,
      totalPrice: cheapestBundleVariant.bundleVariantPrice,
    }
  } else {
    const offerItems = selectedProducts.map(productId => {
       const product = getProductById(db, productId);
       return convertProductToOfferItem(product, getPriceForYear(product.prices, year));
    });

    return {
      items: offerItems,
      totalPrice: offerItems.reduce((sum, item) => sum += item.price, 0),
    };
  }
}

}
