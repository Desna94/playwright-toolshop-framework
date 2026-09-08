import type { APIRequestContext, APIResponse } from "@playwright/test";
import { env } from "../../utils/env";

export class ProductsApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async getProducts(): Promise<APIResponse> {
    return this.request.get(`${env.apiBaseUrl}/products`);
  }

  async getProduct(id: string): Promise<APIResponse> {
    return this.request.get(`${env.apiBaseUrl}/products/${id}`);
  }
}
