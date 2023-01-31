import axiosClient from '@/config/axios';

export default async function displayProductsService(token: string) {
  try {
    const response = await axiosClient({
      url: '/products/all',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${''}`,
      },
    });

    if (!response) {
      return {
        error: true,
        data: '',
        message: 'Não há produto cadastrado.',
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
      message: 'Ocorreu um erro, tente mais tarde.',
    };
  }
}
