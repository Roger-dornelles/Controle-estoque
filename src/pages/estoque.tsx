import { unstable_getServerSession } from 'next-auth';
import { optionsAuth } from './api/auth/[...nextauth]';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import axios from 'axios';

const estoque = () => {
  const [productsAll, setProductsAll] = useState();

  useEffect(() => {
    const displayAllProducts = async () => {
      try {
        const products = await axios({
          url: './api/displayProducts',
          method: 'POST',
        });
        console.log('front ', products.data);
        setProductsAll(products.data.data);
      } catch (error) {
        console.log('ERROR FRONT => ', error);
      }
    };
    displayAllProducts();
  }, []);

  return (
    <section className="flex justify-center items-center w-[100%]">
      <h2>estoque</h2>
    </section>
  );
};
export default estoque;

export const getServerSideProps: GetServerSideProps = async ({ req, res }: any) => {
  const session = await unstable_getServerSession(req, res, optionsAuth);
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};
