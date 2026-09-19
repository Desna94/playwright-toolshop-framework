import type { APIRequestContext, APIResponse } from "@playwright/test";
import { env } from "../../utils/env";

export class FavoritesApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async getFavorites(token: string): Promise<APIResponse> {
    return this.request.get(`${env.apiBaseUrl}/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async deleteFavorite(
    favoriteId: string,
    token: string,
  ): Promise<APIResponse> {
    return this.request.delete(`${env.apiBaseUrl}/favorites/${favoriteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
