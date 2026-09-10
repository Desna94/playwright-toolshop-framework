import type { APIRequestContext, APIResponse } from "@playwright/test";
import { env } from "../../utils/env";
import type { RegisterUserRequest } from "../models/user.model";

export class AuthApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async register(userData: RegisterUserRequest): Promise<APIResponse> {
    return this.request.post(`${env.apiBaseUrl}/users/register`, {
      data: userData,
    });
  }
}
