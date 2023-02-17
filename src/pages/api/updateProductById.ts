import updateProductByIdService from '@/service/updateProductByIdService';
import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { optionsAuth } from './auth/[...nextauth]';
const updateProductById = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await unstable_getServerSession(req, res, optionsAuth);
    if (!session) {
      return res.status(404).json({ error: true, message: 'Usuário não autenticado', data: null });
    }
    let { id, name, description, output, input } = req.body;

    let result = await updateProductByIdService({ id, token: session.user.token, name, description, output, input });

    if (result?.error) {
      res.status(200).json({ error: true, message: result.message, data: result.data });
    }

    return res.status(201).json({ error: false, message: '', data: result?.data });
  } catch (error) {
    return res.status(500).json({ error: true, message: 'Ocorreu um erro, tente mais tarde', data: null });
  }
};

export default updateProductById;
