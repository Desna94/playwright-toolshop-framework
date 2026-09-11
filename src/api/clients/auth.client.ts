import type { APIRequestContext, APIResponse } from "@playwright/test";
import { env } from "../../utils/env";
import type { LoginRequest } from "../models/auth.model";
import type { RegisterUserRequest } from "../models/user.model";

export class AuthApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async register(userData: RegisterUserRequest): Promise<APIResponse> {
    return this.request.post(`${env.apiBaseUrl}/users/register`, {
      data: userData,
    });
  }

  async login(credentials: LoginRequest): Promise<APIResponse> {
    return this.request.post(`${env.apiBaseUrl}/users/login`, {
      data: credentials,
    });
  }

  async getCurrentUser(): Promise<APIResponse> {
    return this.request.get(`${env.apiBaseUrl}/users/me`);
  }
}
