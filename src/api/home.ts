import { apiClient } from '../lib/apiClient';
import { HomePageResponse } from '../lib/storefront';

export async function getHomePage(slug = 'home'): Promise<HomePageResponse> {
  const response = await apiClient.get<HomePageResponse>('/home', {
    params: { slug },
  });

  return response.data;
}
