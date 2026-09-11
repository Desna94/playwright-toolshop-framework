import { test, expect } from "@playwright/test";
import { AuthApiClient } from "../../src/api/clients/auth.client";
import type {
  LoginRequest,
  TokenResponse,
} from "../../src/api/models/auth.model";
import { env } from "../../src/utils/env";

test("authenticate user", async ({ request }) => {
  const authApi = new AuthApiClient(request);

  const credentials: LoginRequest = {
    email: env.userEmail,
    password: env.userPassword,
  };

  const response = await authApi.login(credentials);

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/json");

  const body = (await response.json()) as TokenResponse;

  expect(body.access_token).toEqual(expect.any(String));
  expect(body.access_token.length).toBeGreaterThan(0);
  expect(body.token_type).toBe("bearer");
  expect(body.expires_in).toEqual(expect.any(Number));
  expect(body.expires_in).toBeGreaterThan(0);
});
