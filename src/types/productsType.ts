export type ProductsTypes = {
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
    data: string[] | string;
  };
};
