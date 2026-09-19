export interface Favorite {
  id: string;
  user_id: string;
  product_id: string;
}

export type FavoritesResponse = Favorite[];
