import axiosClient from '@/config/axios';

export default async function displayProductsService(token: string) {
  try {
    const response = await axiosClient({
      url: '/products/all',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response) {
      return {
        error: true,
        data: '',
        message: response?.response.data.error ? response?.response.data.error : 'Não há produto cadastrado.',
      };
    }

    return {
      error: false,
      data: response.data.products,
      message: '',
    };
  } catch (error) {
    return {
      error: true,
      data: '',
      message: error?.response?.data.error,
    };
  }
}
