import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:4000";

export const useAxios = (
  axiosParams: AxiosRequestConfig, 
  resolve: (data: { response: any; loading: boolean }) => void, 
  reject: (error: string, loading: boolean) => void
) => {
  const [response, setResponse] = useState<any>(undefined); 
  const [error, setError] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(true); 

  const fetchData = async (params: AxiosRequestConfig) => {
    try {
      const result: AxiosResponse = await axios.request(params);
      setResponse(result.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(axiosParams);
  }, [axiosParams]);

  if (!loading && response) {
    resolve({ response, loading });
  }
  if (!loading && error) {
    reject(error, loading);
  }

  // return { response, error, loading };
};
