import SnackBar from '@/components/snackbar';
import { Context } from '@/context/SnackbarContext';
import { ResponseType } from '@/types/productsType';
import { SnackbarProps } from '@/types/snackBarTypes';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { useState, useContext } from 'react';
import { optionsAuth } from './api/auth/[...nextauth]';

const addProduct = () => {
  const { setSnackBar }: SnackbarProps | any = useContext(Context);

  const [productName, setProductName] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [quantityProduct, setQuantityProduct] = useState<string>('');
  const [isError, setIsError] = useState(false);

  const handleConfirmAddProduct = async (e: { preventDefault: any }) => {
    e.preventDefault();
    try {
      if (productName !== '' && productDescription !== '' && quantityProduct) {
        let isValid!: boolean;
        if (quantityProduct) {
          const regex = new RegExp('^[0-9]+$');
          isValid = regex.test(quantityProduct);
          !isValid ? setIsError(true) : setIsError(false);
        }

        if (isValid) {
          const response: ResponseType = await axios({
            url: './api/registerProduct',
            method: 'POST',
            data: {
              productName,
              productDescription,
              quantityProduct,
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

          if (!response.data.error) {
            setSnackBar({
              message: response.data.message,
              timer: 3000,
              open: true,
              type: 'success',
            });

            setProductName('');
            setProductDescription('');
            setQuantityProduct('');

            setTimeout(() => {
              setSnackBar({
                message: '',
                timer: 0,
                open: false,
                type: '',
              });
            }, 3050);
          }
        }
      } else {
        setSnackBar({
          message: 'Preencha todos campos.',
          timer: 3000,
          open: true,
          type: 'error',
        });
      }
    } catch (error) {
      setSnackBar({
        message: 'Ocorreu um erro, tente mais tarde.',
        timer: 3000,
        open: true,
        type: 'error',
      });
    }
  };

  return (
    <section className={`w-[100%] flex flex-col items-center`}>
      <SnackBar />

      <h2 className={`w-[80%] flex  justify-center mt-[100px] mb-[20px] border-b-[1px] border-b-[#ccc] pb-[20px]`}>
        Cadastrar produto
      </h2>

      <form
        onSubmit={handleConfirmAddProduct}
        className={`w-[100%] max-w-[450px] flex flex-col justify-center shadow-2xl p-[2.5rem]`}
      >
        <label className="pb-[1rem]">Produto:</label>
        <input
          type="text"
          data-cy="name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className={`h-[2rem] mb-[2rem] rounded-[3px] outline-none pl-[8px]

          `}
        />

        <label className="pb-[1rem]">Descrição:</label>
        <input
          type="text"
          data-cy="description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          className={`h-[2rem] rounded-[3px] outline-none pl-[8px] mb-[2rem]

          `}
        />

        <label className="pb-[1rem]">Quantidade de entrada:</label>
        <input
          type="text"
          data-cy="quantity"
          value={quantityProduct}
          onChange={(e) => setQuantityProduct(e.target.value)}
          className={`h-[2rem] mb-[2rem] rounded-[3px] outline-none pl-[8px]
            ${isError ? 'border-[1px] border-red-400' : null}
          `}
        />
        {isError && (
          <p className={`absolute mt-[235px] text-[12px] text-red-400`}>
            Quantidade deve conter somente numeros, sem vigula ou ponto
          </p>
        )}
        <div className={`flex flex-col`}>
          <button type="submit" className={`h-[2.2rem] border-[1px] bg-green-300 text-[#fff] rounded-md cursor-pointer`}>
            Cadastrar produto
          </button>
        </div>
      </form>
    </section>
  );
};

export default addProduct;

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
