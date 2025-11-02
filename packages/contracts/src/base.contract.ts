/**
 * Base contract interface
 */
export interface IBaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Base response contract
 */
export interface IBaseResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/**
 * Pagination contract
 */
export interface IPaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}

export interface IPaginationResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
