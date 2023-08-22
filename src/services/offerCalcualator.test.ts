import { ProductBundleItem, ProductData, ProductItem } from "../store/model";
import { getMatchingBundles } from "./offerCalculator";

function createTestProduct(productPart: Partial<ProductItem>): ProductItem {
  return {
    id: "#p1",
    name: "Product 1",
    prices: [{ year: 2030, price: 1 }],
    ...productPart,
  };
}

function createTestProductBundle(productBundlePart: Partial<ProductBundleItem>): ProductBundleItem {
  return {
    id: "#pb1",
    name: "Product Bundle 1",
    products: ["#p1"],
    freeProducts: [],
    prices: [{ year: 2030, price: 1 }],
    ...productBundlePart,
  };
}

const testDb: ProductData = {
  availableYears: [2030],
  products: [
    createTestProduct({ id: "1", name: "Prod-1" }),
    createTestProduct({ id: "2", name: "Prod-2" }),
    createTestProduct({ id: "3", name: "Prod-3" }),
  ],
  productBundles: [],
};

test("When there is no product bundle getMatchingBundles should return empty result", () => {
  //arrange
  const db = { ...testDb, productBundles: [] };

  //act
  const result = getMatchingBundles(db, []);

  //assert
  expect(result).toHaveLength(0);
});

test("When there is no product bundle with given product getMatchingBundles should return empty result", () => {
  //arrange
  const db = { ...testDb, productBundles: [] };

  //act
  const result = getMatchingBundles(db, ["other-product"]);

  //assert
  expect(result).toHaveLength(0);
});

test("When there is product bundle with given product getMatchingBundles should return it", () => {
  //arrange
  const requestedProducts = ["#prod1"];
  const db: ProductData = {
    ...testDb,
    productBundles: [
      createTestProductBundle({ id: "#bundle1", name: "Test_product_bundle", products: requestedProducts }),
      createTestProductBundle({ id: "#bundle2", name: "Test_product_bundle", products: ["#prod2"] }),
    ],
  };

  //act
  const result = getMatchingBundles(db, requestedProducts);

  //assert
  expect(result).toHaveLength(1);
  expect(result[0].id).toBe("#bundle1");
});

test("When product bundle contain more than requested product getMatchingBundles should return empty result", () => {
  //arrange
  const requestedProducts = ["#prod1"];
  const db: ProductData = {
    ...testDb,
    productBundles: [
      createTestProductBundle({
        id: "#bundle1",
        name: "Test_product_bundle",
        products: [...requestedProducts, "#prod2"],
      }),
    ],
  };

  //act
  const result = getMatchingBundles(db, requestedProducts);

  //assert
  expect(result).toHaveLength(0);
});

test("When product bundle contains more than requested product getMatchingBundles should return empty result", () => {
  //arrange
  const requestedProducts = ["#prod1"];
  const db: ProductData = {
    ...testDb,
    productBundles: [
      createTestProductBundle({
        id: "#bundle1",
        name: "Test_product_bundle",
        products: [...requestedProducts, "#prod2"],
      }),
    ],
  };

  //act
  const result = getMatchingBundles(db, requestedProducts);

  //assert
  expect(result).toHaveLength(0);
});

test("When product bundle contains all requested products getMatchingBundles should return it", () => {
  //arrange
  const requestedProducts = ["#prod1", "#prod2"];
  const db: ProductData = {
    ...testDb,
    productBundles: [
      createTestProductBundle({ id: "#bundle1", name: "Test_product_bundle", products: requestedProducts }),
    ],
  };

  //act
  const result = getMatchingBundles(db, requestedProducts);

  //assert
  expect(result).toHaveLength(1);
  expect(result[0].id).toBe("#bundle1");
});
