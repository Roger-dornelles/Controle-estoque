import { optionsAuth } from './auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import displayProductsService from '@/service/displayProductsService';

export default async function displayProducts(req: NextApiRequest, res: NextApiResponse) {
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
    const response = await displayProductsService(session.user.token);

    res.status(200).json(response);
  } catch (error) {
    return null;
  }
}
