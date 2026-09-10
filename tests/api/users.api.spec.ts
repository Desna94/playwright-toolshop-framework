import { test, expect } from "@playwright/test";
import type {
  RegisterUserRequest,
  RegisteredUserResponse,
} from "../../src/api/models/user.model";
import { AuthApiClient } from "../../src/api/clients/auth.client";

test("register user", async ({ request }) => {
  const timestamp = Date.now();

  const userData: RegisterUserRequest = {
    first_name: "John",
    last_name: "Doe",
    address: {
      street: "Test Street",
      house_number: "10",
      city: "Test City",
      state: "Test State",
      country: "Test Country",
      postal_code: "12345",
    },
    phone: "1234567890",
    dob: "1990-01-01",
    password: `Test-${timestamp}-Aa1!`,
    email: `test.user.${timestamp}@example.com`,
  };

  const authApi = new AuthApiClient(request);

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
