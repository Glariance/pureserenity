import { apiClient } from './apiClient';

interface ApiCollectionResponse<T> {
  data: T[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
}

export interface Product {
  id: number;
  category_id: number;
  category_name?: string | null;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  has_variations: boolean;
  featured: boolean;
  top: boolean;
  is_new: boolean;
  status: boolean;
  image_url: string | null;
  affiliate_link?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  phone?: string;
  subject?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export type CmsFieldType = 'text' | 'textarea' | 'image' | 'number' | 'boolean' | 'select';

export interface CmsFieldValue {
  type: CmsFieldType;
  value: string | null;
  url?: string | null;
}

export type CmsSectionType = 'single' | 'repeater';

export interface CmsSection {
  id: number;
  name: string;
  type: CmsSectionType;
  sort_order: number;
  fields?: Record<string, CmsFieldValue>;
  items?: Array<Record<string, CmsFieldValue>>;
}

export interface CmsPagePayload {
  id: number;
  title: string;
  slug: string;
  meta: {
    title: string | null;
    keywords: string | null;
    description: string | null;
  };
  sections: CmsSection[];
}

export interface HomePageResponse {
  page: CmsPagePayload;
}

export async function fetchCategories(): Promise<Category[]> {
  const response = await apiClient.get<ApiCollectionResponse<Category>>('/categories');
  return response.data.data;
}

export async function fetchProducts(params?: Record<string, string | number | boolean | undefined>): Promise<Product[]> {
  const response = await apiClient.get<ApiCollectionResponse<Product>>('/products', {
    params,
  });
  return response.data.data;
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  return fetchProducts({ featured: true });
}

export async function submitContact(payload: ContactPayload): Promise<ContactResponse> {
  const response = await apiClient.post<ContactResponse>('/contact', payload);
  return response.data;
}
