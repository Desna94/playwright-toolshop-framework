import type { ProductsResponse } from "../../src/api/models/product.model";
import { expect, test } from "../../src/fixtures/test.fixture";

test("product details match API data", async ({ productsApi, productPage }) => {
  const productsResponse = await productsApi.getProducts();

  expect(productsResponse.status()).toBe(200);

  const productsBody = (await productsResponse.json()) as ProductsResponse;

  expect(productsBody.data.length).toBeGreaterThan(0);

  const expectedProduct = productsBody.data[0];

  await productPage.goto(expectedProduct.id);

  await expect.soft(productPage.productName).toHaveText(expectedProduct.name);
  await expect
    .soft(productPage.productDesc)
    .toHaveText(expectedProduct.description);

  const actualPrice = Number(await productPage.productPrice.innerText());

  expect.soft(actualPrice).toBe(expectedProduct.price);
});
