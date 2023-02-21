import axiosClient from '@/config/axios';
type UpdateUserType = {
  session: { user: { token: string; id: number } };
  name?: string;
  email?: string;
  password?: string;
};

const updateUserDateService = async ({ session, name, email, password }: UpdateUserType) => {
  try {
    if (!session) {
      return {
        error: true,
        message: 'Usuário não autorizado',
        data: null,
      };
    }

    let response = await axiosClient({
      url: `/user/update/${session.user.id}`,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${session.user.token}`,
      },
      data: {
        name: name && name,
        email: email && email,
        password: password && password,
      },
    });

    if (!response) {
      return {
        error: true,
        message: 'Usuário não encontrado',
        data: null,
      };
    }

    return {
      error: false,
      message: response.data.message,
      data: response.data.token,
    };
  } catch (error) {
    return {
      error: true,
      message: error && error.response.data,
      data: null,
    };
  }
};

export default updateUserDateService;
