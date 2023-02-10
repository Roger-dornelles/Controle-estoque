import { optionsAuth } from './auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import registerProductService from '@/service/registerProductService';

export default async function registerProduct(req: NextApiRequest, res: NextApiResponse) {
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

    const { productName, productDescription, quantityProduct } = req.body;

    const response = await registerProductService({
      name: productName,
      quantity: quantityProduct,
      description: productDescription,
      token: session.user,
    });

    response.error && res.status(200).json(response);
    res.status(201).json(response.data);
  } catch (error) {
    return null;
  }
}
