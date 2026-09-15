import { randomUUID } from "crypto";
import type { RegisterUserRequest } from "../api/models/user.model";

export function createUser(
  overrides: Partial<RegisterUserRequest> = {},
): RegisterUserRequest {
  const uniqueId = randomUUID();

  return {
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
    password: `Test-${uniqueId}-Aa1!`,
    email: `test.user.${uniqueId}@example.com`,
    ...overrides,
  };
}
