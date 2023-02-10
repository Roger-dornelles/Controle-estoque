import axiosClient from '@/config/axios';
import { jwtDecoded } from './../helpers/Jwt';

const getUser = async (email: string, password: string) => {
  try {
    const user = await axiosClient({
      url: '/login',
      method: 'POST',
      data: {
        email,
        password,
      },
    });

    let decoded = await jwtDecoded(user.data.token);
    let users = {
      user: user.data,
      id: decoded?.id,
    };
    if (user) {
      return users;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
export default getUser;
