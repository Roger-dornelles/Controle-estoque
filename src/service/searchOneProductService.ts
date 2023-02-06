import axiosClient from '@/config/axios';

type SearchOneProductType = {
  id: string;
  token: string;
};
const searchOneProduct = async ({ token, id }: SearchOneProductType) => {
  try {
    if (token && id) {
      const response = await axiosClient({
        url: `/product/view/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.message) {
        return {
          error: true,
          message: response.data.message,
          data: null,
        };
      }

      return {
        error: false,
        message: '',
        data: response.data,
      };
    }
  } catch (error) {
    return {
      error: true,
      data: null,
      message: 'ocorreu um erro, tente mais tarde.',
    };
  }
};

export default searchOneProduct;
