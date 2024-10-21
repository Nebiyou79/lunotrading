import axios, { AxiosResponse } from 'axios';
import { CryptoData } from '../types/crypto';

const BASE_URL = 'https://116.203.108.180:5000/api/prices';
const CACHE_EXPIRATION = 60 * 1000; // 1 minute

const getToken = () => {
  return localStorage.getItem('token'); // Adjust if you store token differently
};
const getCachedData = (key: string) => {
  const cache = localStorage.getItem(key);
  if (cache) {
    const parsedCache = JSON.parse(cache);
    const now = new Date().getTime();
    if (now - parsedCache.timestamp < CACHE_EXPIRATION) {
      return parsedCache.data; // Return cached data if it's still valid
    }
  }
  return null;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setCachedData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify({
    timestamp: new Date().getTime(),
    data: data
  }));
};
export const getCryptoPrices = async (): Promise<CryptoData> => {
  const token = getToken();
  const cacheKey = 'cryptoPricesCache';
  const cachedData = getCachedData(cacheKey);
  if (cachedData) {
    return cachedData;
  }
  try {
    const response: AxiosResponse<CryptoData> = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token here
      },
    });
    setCachedData(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching real-time prices:', error);
    throw error; // Rethrow the error to handle it where this function is called
  }
};
export const getHistoricalPrices = async (coinId: string, days: number) => {
  const token = getToken();
  const cacheKey = `historicalPrices_${coinId}_${days}`;
  const cachedData = getCachedData(cacheKey);
  if (cachedData) {
    return cachedData;
  }
  try {
    const response = await axios.get(`${BASE_URL}/historical`, {
      params: { coinId, days },
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token here
      },
    });
    setCachedData(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching historical prices:', error);
    throw error;
  }
};
