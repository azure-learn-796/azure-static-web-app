import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ApiResponse } from '../types/models';

/** APIのオリジン */
export const API_ORIGIN = process.env.REACT_APP_API_ORIGIN;

/** AzureFunctionsのアプリキー */
export const API_KEY = process.env.REACT_APP_API_KEY;

/**
 * Ajaxリクエスト送信
 * @param config リクエスト設定
 * @returns APIのレスポンス
 */
const ajaxRequest = async <D, T>(config: AxiosRequestConfig<D>): Promise<ApiResponse<T>> => {
  try {
    const axiosResponse = await axios.request<T>(config);
    const response: ApiResponse<T> = {
      success: true,
      status: axiosResponse.status,
      headers: axiosResponse.headers,
      data: axiosResponse.data,
    };
    return response;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      const response: ApiResponse<T> = {
        success: false,
        status: e.status,
        headers: e.response?.headers,
        error: {
          code: e.code,
          message: e.message,
        },
      };
      return response;
    } else {
      const response: ApiResponse<T> = {
        success: false,
        headers: {},
        error: {
          message: '予期せぬエラーが発生しました。',
        },
      };
      return response;
    }
  }
};

export const ajaxGet = async <T>(url: string, params: any): Promise<ApiResponse<T>> => {
  const method = 'GET';
  return await ajaxRequest({ method, url, params });
};

export const ajaxPost = async <D, T = void>(url: string, data?: D, params?: any): Promise<ApiResponse<T>> => {
  const method = 'POST';
  return await ajaxRequest({ method, url, params, data });
};

export const ajaxPatch = async <D, T = void>(url: string, data?: D, params?: any): Promise<ApiResponse<T>> => {
  const method = 'PATCH';
  return await ajaxRequest({ method, url, params, data });
};

export const ajaxDelete = async <T>(url: string, params: any): Promise<ApiResponse<T>> => {
  const method = 'DELETE';
  return await ajaxRequest({ method, url, params });
};
