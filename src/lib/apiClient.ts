import axios from 'axios';
import showToast from './toast';

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
const browserOrigin = typeof window !== 'undefined' ? window.location.origin : '';

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

// Prefer provided env; otherwise fall back to same-origin /api to avoid cert/CORS issues with other hosts.
const resolvedBaseUrl =
  normalizedBaseUrl ||
  (browserOrigin ? `${browserOrigin.replace(/\/+$/, '')}/api` : 'https://www.pureserenityshop.com/api');

export const apiClient = axios.create({
  baseURL: resolvedBaseUrl,
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
