import { test, expect } from "../../src/fixtures/test.fixture";
import type { ApiErrorResponse } from "../../src/api/models/error.model";

test("unauthorized request validation", async ({ authApi }) => {
  const response = await authApi.getCurrentUser();

  expect(response.status()).toBe(401);
  expect(response.headers()["content-type"]).toContain("application/json");

  const body = (await response.json()) as ApiErrorResponse;

  expect(body.message).toBe("Unauthorized");
});

test("invalid resource validation", async ({ productsApi }) => {
  const nonExistingProductId = "non-existing-product-id";

  const response = await productsApi.getProduct(nonExistingProductId);

  expect(response.status()).toBe(404);
  expect(response.headers()["content-type"]).toContain("application/json");

  const body = (await response.json()) as ApiErrorResponse;

  expect(body.message).toBe("Requested item not found");
});
