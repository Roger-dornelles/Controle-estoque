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

type ProductType = {
  map(arg0: (item: ProductsTypes) => JSX.Element): import('react').ReactNode;
  products: {
    map: any;
    id: number;
    userId: number;
    userName: string;
    name: string;
    description: string;
    input: number;
    output: number;
    total: number;
  };
};

export type ProductArrayType = {
  map?: any;
  product: ProductType;
  session?: string;
};
