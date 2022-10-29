export type ApiResponse<T> = {
  success: boolean;
  status?: number;
  headers?: Partial<Record<string, string>>;
  data?: T;
  error?: {
    code?: string;
    message?: string;
  };
};
