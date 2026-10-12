import axios from 'axios';

export class BaseApi {
  constructor() {
    const apiUrl = import.meta.env.VITE_LEARNING_PLATFORM_API_URL || 'http://localhost:3000/api/v1';
    const requestHeaders = {
      'Content-Type': 'application/json',
    };

    this.client = axios.create({
      baseURL: apiUrl,
      headers: requestHeaders,
    });
  }
}
