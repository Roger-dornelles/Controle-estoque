import excludeProductIDService from '@/service/excludeProductIDService';
import { NextApiResponse, NextApiRequest } from 'next';
import getServerSession, { unstable_getServerSession } from 'next-auth/next';
import { optionsAuth } from './auth/[...nextauth]';

const excludeProductID = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await unstable_getServerSession(req, res, optionsAuth);

    if (!session) {
      return res.status(401).json({
        error: true,
        message: 'Usuário não autorizado',
        data: null,
      });
    }

    let { id } = req.body;

    if (!id) {
      return res.status(200).json({
        error: true,
        message: 'Produto não encontrado.',
        data: null,
      });
    }

    let response = await excludeProductIDService({ id, token: session.user });

    if (response?.error) {
      return res.status(200).json({
        error: true,
        message: response.message,
        data: null,
      });
    }

    return res.status(201).json({ error: false, message: response?.message, data: response?.data });
  } catch (error) {
    return res.status(500).json({ error: true, message: 'Ocorreu um erro, tente mais tarde.', data: null });
  }
};

export default excludeProductID;
