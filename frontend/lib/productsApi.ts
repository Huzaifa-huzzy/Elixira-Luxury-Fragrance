import axios from "axios";

const productApi = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function productFetcher(url: string) {
  const response = await productApi.get(url);
  return response.data;
}

export function fetchProductByIdClient(id: string) {
  return productApi.get(`/products/${id}`);
}

export default productApi;
