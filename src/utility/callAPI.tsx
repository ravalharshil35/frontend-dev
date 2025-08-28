import axios, { AxiosRequestHeaders, Method } from "axios";

export const callApi = async (
  url: string,
  method: Method,
  data: any = null,
  headers?: AxiosRequestHeaders
): Promise<any> => {
  try {
    const options = {
      method,
      url,
      headers: {
        "Content-Type": "application/json",
        ...headers, 
      },
      data: data || null, 
    };

    const response = await axios(options);
    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "An error occurred"
    );
  }
};
