import axiosClient from '@/config/axios';
type ExcludeProductID = {
  id: number;
  token: { token: string };
};

const excludeProductIDService = async ({ id, token }: ExcludeProductID) => {
  try {
    if (!id && !token) {
      return {
        error: true,
        message: 'Id e/ou Token invalidos.',
        data: null,
      };
    }

    let result = await axiosClient({
      url: `/delete/product/${id}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });

    if (result.data.error) {
      return {
        error: true,
        message: result.data.message,
        data: null,
      };
    }

    return {
      error: false,
      message: result.data.message,
      data: null,
    };
  } catch (error) {
    return {
      error: true,
      message: error.response.data.error,
      data: null,
    };
  }
};

export default excludeProductIDService;
