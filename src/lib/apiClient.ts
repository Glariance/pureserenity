import axios from 'axios';

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
  baseURL: normalizedBaseUrl || '/api',
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

    return Promise.reject(error);
  },
);
