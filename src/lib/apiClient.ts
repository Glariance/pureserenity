import axios from 'axios';
import showToast from './toast';

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
// Strip a trailing `/public` if present (often added when copying the Laravel app URL),
// then remove duplicate trailing slashes.
const cleanedBaseUrl =
  rawBaseUrl && rawBaseUrl !== ''
    ? rawBaseUrl.replace(/\/public(?=\/|$)/i, '')
    : '';
const normalizedBaseUrl =
  cleanedBaseUrl && cleanedBaseUrl !== ''
    ? cleanedBaseUrl.replace(/\/+$/, '')
    : '';

export const apiClient = axios.create({
  // Default to production API if env is not set
  baseURL: normalizedBaseUrl || 'http://admin.pureserenityshop.com/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      error.message =
        error.response.data?.message ??
        error.message ??
        'An unexpected error occurred while communicating with the server.';
    }

    if (typeof window !== 'undefined') {
      const message =
        error.response?.data?.errors
          ? Object.values<string[]>(error.response.data.errors).flat().join(' ')
          : error.message || 'An unexpected error occurred.';
      showToast('error', message);
    }

    return Promise.reject(error);
  },
);
