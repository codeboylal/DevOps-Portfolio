import { useState, useCallback } from "react";
import axios from "axios";

const API_BASE_URL =import.meta.env.VITE_API;
// console.log(API_BASE_URL)


const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (method, endpoint, data = null, config = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios({
        method,
        url: `${API_BASE_URL}${endpoint}`,
        data,
        ...config,
      });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { request, loading, error };
};

export default useApi;
