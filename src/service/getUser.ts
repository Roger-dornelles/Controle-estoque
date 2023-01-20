import axiosClient from '@/config/axios';

const getUser = async (email: any, password: any) => {
  try {
    const user = await axiosClient({
      url: '/login',
      method: 'POST',
      data: {
        email,
        password,
      },
    });

    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
export default getUser;
