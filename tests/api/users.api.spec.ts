import { test, expect } from "../../src/fixtures/test.fixture";
import type { RegisteredUserResponse } from "../../src/api/models/user.model";
import { createUser } from "../../src/data/user.data";

test("register user", async ({ authApi }) => {
  const userData = createUser();

  const response = await authApi.register(userData);

  expect(response.status()).toBe(201);
  expect(response.headers()["content-type"]).toContain("application/json");

  const body = (await response.json()) as RegisteredUserResponse;

  expect(body.id).toEqual(expect.any(String));
  expect(body.created_at).toEqual(expect.any(String));
  expect(body.first_name).toBe(userData.first_name);
  expect(body.last_name).toBe(userData.last_name);
  expect(body.email).toBe(userData.email);
  expect(body.address).toEqual(userData.address);
});
