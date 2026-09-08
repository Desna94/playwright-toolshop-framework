import { test, expect } from "@playwright/test";
import type { ProductsResponse } from "../../src/api/models/product.model";
import { ProductsApiClient } from "../../src/api/clients/products.client";

test("get products", async ({ request }) => {
  const productsApi = new ProductsApiClient(request);

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
