import { optionsAuth } from './auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import searchOneProductService from '@/service/searchOneProductService';

const searchOneProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await unstable_getServerSession(req, res, optionsAuth);

    if (!session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
    const { id, token } = req.body;

    if (id && token) {
      const response = await searchOneProductService({ token, id });

      return res.status(201).json(response);
    }
  } catch (error) {
    return null;
  }
};
export default searchOneProduct;
