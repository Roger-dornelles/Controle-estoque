import { optionsAuth } from './auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth';
import { NextApiResponse, NextApiRequest } from 'next';
import updateUserDataService from '@/service/updateUserDataService';
import { SessionType } from '@/types/sessionType';

type UpdateUserDateType = {
  name: string;
  email: string;
  password: string;
};
const updateUserData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let session: SessionType | null = await unstable_getServerSession(req, res, optionsAuth);

    if (!session) {
      return res.status(401).json({
        error: true,
        message: 'Usuário não autorizado.',
        data: null,
      });
    }

    let { name, email, password }: UpdateUserDateType = req.body;

    if (!name || !email) {
      return res.status(200).json({ error: true, message: 'Dados inválidos', data: null });
    }
    let response = await updateUserDataService({ session, name, email, password });
  
    if (response?.error) {
      return res.status(200).json({
        error: response.error,
        message: response.message || response.message.error,
        data: null,
      });
    }

    return res.status(201).json({
      error: response.error,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    console.log('API ERROR ', error);
    return res.status(500).json({
      error: true,
      message: error,
      data: null,
    });
  }
};

export default updateUserData;
