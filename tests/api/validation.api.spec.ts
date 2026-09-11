import { test, expect } from "@playwright/test";
import type { ApiErrorResponse } from "../../src/api/models/error.model";
import { AuthApiClient } from "../../src/api/clients/auth.client";

test("unauthorized request validation", async ({ request }) => {
  const authApi = new AuthApiClient(request);
  const response = await authApi.getCurrentUser();

  expect(response.status()).toBe(401);
  expect(response.headers()["content-type"]).toContain("application/json");

  const body = (await response.json()) as ApiErrorResponse;

  expect(body.message).toBe("Unauthorized");
});
