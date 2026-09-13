import { test, expect } from "../../src/fixtures/test.fixture";
import type {
  LoginRequest,
  TokenResponse,
} from "../../src/api/models/auth.model";
import { env } from "../../src/utils/env";

test("authenticate user", async ({ authApi }) => {
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
  expect(body.token_type.toLowerCase()).toBe("bearer");
  expect(body.expires_in).toEqual(expect.any(Number));
  expect(body.expires_in).toBeGreaterThan(0);
});
