import { unstable_getServerSession } from 'next-auth';
import { optionsAuth } from './api/auth/[...nextauth]';
import { GetServerSideProps } from 'next';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ProductsTypes } from '@/types/productsType';
import { Context } from '@/context/SnackbarContext';
import { SnackbarProps } from '@/types/snackBarTypes';
import SnackBar from '@/components/snackbar';

import Link from 'next/link';
import { SessionType } from '@/types/sessionType';

const estoque = () => {
  const [productsAll, setProductsAll] = useState<ProductsTypes>();

  const { setSnackBar }: SnackbarProps | any = useContext(Context);

  useEffect(() => {
    const displayAllProducts = async () => {
      try {
        const products = await axios({
          url: './api/displayProducts',
          method: 'POST',
        });

        products.data.data && setProductsAll(products.data.data);

        products.data.error &&
          setSnackBar({
            message: products.data.message,
            timer: 3000,
            open: true,
            type: 'error',
          });
      } catch (error) {
        setSnackBar({
          message: 'Ocorreu um erro, tente mais tarde.',
          timer: 3000,
          open: true,
          type: 'error',
        });
      }
    };
    displayAllProducts();
  }, []);

  return (
    <section className="flex justify-center ml-[20px] mt-[50px] w-[calc(100%-220px)]">
      <SnackBar />
      <div className="w-[80%] flex flex-col justify-center ml-[40px]">
        <div className={`w-[80%] flex justify-between  border-b-[1px] border-[#ccc] pb-[1.5rem]`}>
          <p>Item</p>
          <p>Descrição</p>
          <p>Quantidade</p>
        </div>
        <ul className="w-[90%] flex flex-col">
          {productsAll &&
            (productsAll as unknown as ProductsTypes[]).map((item: ProductsTypes, index: number) => {
              return (
                <li key={item.id} className="flex w-[98%]">
                  <div className={`w-[100%] flex flex-row justify-between  border-b-[1px] border-[#ccc]`}>
                    <p className={`p-[0.7rem] pl-0 w-[33%] `}> {item.name}</p>
                    <p className={`p-[0.7rem] w-[33%] ml-[-65px] pl-0`}> {item.description}</p>
                    <p className={`p-[0.7rem] `}> {item.total}</p>
                  </div>
                  <Link
                    href={`./product/${item.id}`}
                    className="w-[100px] h-[25px] mt-[10px] ml-[12px] text-[12px] flex justify-center items-center text-gray-500 border-[1px] rounded-sm border-gray-400 hover:text-gray-700 hover:border-gray-500"
                  >
                    Mais detalhes
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
};
export default estoque;

export const getServerSideProps: GetServerSideProps = async ({ req, res }: any) => {
  const session: SessionType | null = await unstable_getServerSession(req, res, optionsAuth);
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
