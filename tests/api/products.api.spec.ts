import { test, expect } from "../../src/fixtures/test.fixture";
import type {
  ProductDetails,
  ProductsResponse,
} from "../../src/api/models/product.model";

test("get products", async ({ productsApi }) => {
  const response = await productsApi.getProducts();

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/json");

  const body = (await response.json()) as ProductsResponse;

  expect(body.current_page).toBe(1);
  expect(Array.isArray(body.data)).toBe(true);
  expect(body.data.length).toBeGreaterThan(0);
  expect(body.total).toBeGreaterThan(0);

  const firstProduct = body.data[0];

  expect(firstProduct.id).toEqual(expect.any(String));
  expect(firstProduct.name).toEqual(expect.any(String));
  expect(firstProduct.price).toEqual(expect.any(Number));
});

test("get product by ID", async ({ productsApi }) => {
  const productsResponse = await productsApi.getProducts();

  expect(productsResponse.status()).toBe(200);

  const productsBody = (await productsResponse.json()) as ProductsResponse;

  expect(productsBody.data.length).toBeGreaterThan(0);

  const productId = productsBody.data[0].id;

  const productResponse = await productsApi.getProduct(productId);

  expect(productResponse.status()).toBe(200);
  expect(productResponse.headers()["content-type"]).toContain(
    "application/json",
  );

  const productBody = (await productResponse.json()) as ProductDetails;

  expect(productBody.id).toBe(productId);
  expect(productBody.name).toEqual(expect.any(String));
  expect(productBody.price).toEqual(expect.any(Number));
  expect(Array.isArray(productBody.specs)).toBe(true);
});
