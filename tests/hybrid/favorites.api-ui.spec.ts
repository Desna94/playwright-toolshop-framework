import { expect, test } from "../../src/fixtures/test.fixture";
import { createUser } from "../../src/data/user.data";
import type { TokenResponse } from "../../src/api/models/auth.model";
import type { ProductsResponse } from "../../src/api/models/product.model";
import type { FavoritesResponse } from "../../src/api/models/favorite.model";

test("favorite added in UI is reflected in API", async ({
  authApi,
  productsApi,
  favoritesApi,
  productPage,
  page,
}) => {
  const userData = createUser();

  const registerResponse = await authApi.register(userData);

  expect(registerResponse.status()).toBe(201);

  const credentials = {
    email: userData.email,
    password: userData.password,
  };

  const loginResponse = await authApi.login(credentials);

  expect(loginResponse.status()).toBe(200);

  const tokenBody = (await loginResponse.json()) as TokenResponse;

  expect(tokenBody.access_token).toEqual(expect.any(String));
  expect(tokenBody.access_token.length).toBeGreaterThan(0);

  const token = tokenBody.access_token;

  await page.addInitScript((authToken) => {
    localStorage.setItem("auth-token", authToken);
  }, token);

  const productsResponse = await productsApi.getProducts();

  expect(productsResponse.status()).toBe(200);

  const productsBody = (await productsResponse.json()) as ProductsResponse;

  expect(productsBody.data.length).toBeGreaterThan(0);

  const productId = productsBody.data[0].id;

  await productPage.goto(productId);
  await productPage.addToFavorite();

  const favoritesResponse = await favoritesApi.getFavorites(token);

  expect(favoritesResponse.status()).toBe(200);

  const favoritesBody = (await favoritesResponse.json()) as FavoritesResponse;

  const favorite = favoritesBody.find((item) => item.product_id === productId);

  if (!favorite) {
    throw new Error(`Product ${productId} was not found in favorites`);
  }

  const deleteResponse = await favoritesApi.deleteFavorite(favorite.id, token);

  expect(deleteResponse.status()).toBe(204);
});
