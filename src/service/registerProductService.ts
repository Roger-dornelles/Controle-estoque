import axiosClient from '@/config/axios';

type RegisterType = {
  name: string;
  description: string;
  quantity: string;
  token: {
    token: string;
    id: number;
  };
};

const registerProductService = async ({ name, quantity, description, token }: RegisterType) => {
  try {
    if (!name || !description || !quantity) {
      return {
        error: true,
        message: 'Preencha todos os campos',
        data: '',
      };
    }

    let result = await axiosClient({
      url: `/product/create/${token.id}`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
      data: {
        name,
        description,
        input: quantity,
      },
    });

    if (result.data.error) {
      return {
        message: result.data.error,
        error: true,
        data: null,
      };
    }

    return {
      error: false,
      message: null,
      data: result.data,
    };
  } catch (error) {
    return {
      error: true,
      message: 'Ocorreu um erro, tente mais tarde.',
      data: null,
    };
  }
};

export default registerProductService;
