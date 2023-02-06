import SnackBar from '@/components/snackbar';
import { Context } from '@/context/SnackbarContext';
import { ProductsTypes } from '@/types/productsType';
import { SnackbarProps } from '@/types/snackBarTypes';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';

import { optionsAuth } from '../api/auth/[...nextauth]';

type UserType = {
  user: string;
};

const productId = ({ user }: UserType) => {
  const { setSnackBar }: SnackbarProps | any = useContext(Context);

  const router = useRouter();
  const { id } = router.query;

  const [productId, setProductId] = useState<ProductsTypes>();

  const searchProductId = async () => {
    try {
      const response = await axios({
        url: '/api/serarchOneProduct',
        method: 'POST',
        data: {
          id: id,
          token: user,
        },
      });
      if (response.data.error) {
        setSnackBar({
          message: response.data.message,
          timer: 3000,
          open: true,
          type: 'error',
        });
      }

      response.data.data && setProductId(response.data.data.product);
    } catch (error) {
      setSnackBar({
        message: 'Ocorreu um erro, tente mais tarde.',
        timer: 3000,
        open: true,
        type: 'error',
      });
    }
  };

  useEffect(() => {
    searchProductId();
  }, [id]);

  return (
    <section className={`flex flex-col items-center mt-[120px]`}>
      <SnackBar />
      <Link href={`../estoque`} className={`absolute top-[50px] left-[80px] text-red-500 flex`}>
        <BsArrowLeft className="mt-[5px] pr-[5px] text-[1rem]" />
        Voltar
      </Link>
      <h3 className={`w-[85vw] flex justify-center pb-[15px] mb-[1rem] border-b-[1px] border-[#ccc]`}>Mais detalhes</h3>
      {productId && (
        <>
          <div className={`w-[100%] max-w-[500px] flex flex-col p-[25px] mt-[50px] text-left shadow-2xl`}>
            <div className={`flex flex-col pb-[10px]`}>
              <p className="text-[#949494]">Produto:</p>
              <span className="">{productId.name}</span>
            </div>
            <div className={`flex flex-col pb-[10px]`}>
              <p className="text-[#949494]">Descrição:</p>
              <span className="">{productId.description}</span>
            </div>
            <div className={`flex flex-col pb-[10px]`}>
              <p className="text-[#949494]">Total de entradas:</p>
              <span className="">{productId.input}</span>
            </div>
            <div className={`flex flex-col pb-[10px]`}>
              <p className="text-[#949494]">Total de produto retirado:</p>
              <span className="">{productId.output}</span>
            </div>
            <div className={`flex flex-col pb-[10px]`}>
              <p className="text-[#949494]">Total em estoque:</p>
              <span className="">{productId.total}</span>
            </div>
            <div className={`flex flex-col pb-[5px]`}>
              <p className="text-[#949494]">Responsável da ultima Atualização:</p>
              <span className="">{productId.userName}</span>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default productId;

export const getServerSideProps: GetServerSideProps = async ({ req, res }: any) => {
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

    return {
      props: {
        user: session.user.user,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};
