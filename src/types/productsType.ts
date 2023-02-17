export type ProductsTypes = {
  [x: string]: any;
  id: number;
  input: number;
  name: string;
  description: string;
  output: number;
  total: number;
  userId: number;
  userName: string;
};

export type ResponseType = {
  data: {
    error: boolean;
    message: string;
    data: string[] | string | null;
  };
};

export type UpdateProductByIdType = {
  id: number;
  token: string;
  name?: string;
  description?: string;
  output?: number;
  input?: number;
};
