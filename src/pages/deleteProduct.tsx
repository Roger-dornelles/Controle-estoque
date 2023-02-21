import { ProductArrayType, ProductsTypes, ResponseType } from '@/types/productsType';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { useContext, useState } from 'react';
import { optionsAuth } from './api/auth/[...nextauth]';
import { BsTrash, BsX, BsCheck } from 'react-icons/bs';
import { Context } from '@/context/SnackbarContext';
import SnackBar from '@/components/snackbar';
import { SessionType } from '@/types/sessionType';

const deleteProduct = ({ product, session }: ProductArrayType) => {
  const { setSnackBar }: any = useContext(Context);

  const [products, SetProducts] = useState(product.products);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [productID, setProductID] = useState<number>();

  const handleConfirmDeleteProductID = async (productID: number) => {
    try {
      if (productID) {
        let response: ResponseType = await axios({
          url: './api/excludeProductID',
          method: 'POST',
          data: {
            id: productID,
          },
        });

        if (response.data.error) {
          setSnackBar({
            type: 'error',
            message: response.data.message,
            timer: 3000,
            open: true,
          });
        }

        if (!response.data.error) {
          setSnackBar({
            type: 'success',
            message: response.data.message,
            timer: 3000,
            open: true,
          });

          setTimeout(() => {
            document.location.reload();
          }, 3050);
        }
      }
    } catch (error) {
      setSnackBar({
        type: 'error',
        message: 'Ocorreu um erro,tente mais tarde',
        timer: 3000,
        open: true,
      });
    }
  };

  return (
    <section className={`w-[70%] flex flex-col justify-center items-center`}>
      <SnackBar />
      <h2>Excluir Produto</h2>

      <div className={`w-[80%] flex justify-between mt-[50px]`}>
        <p>Produto:</p>
        <p>Descrição:</p>
        <p>Total em estoque:</p>
      </div>
      {products &&
        products.map((item: ProductsTypes) => {
          return (
            <ul key={item.id} className={`w-[80%] flex relative`}>
              <li
                className={`w-[100%] border-b-[1px] border-[#ccc] ${
                  confirmDelete && item.id === productID
                    ? 'duration-[1.3s] bg-[#ffe8e8]'
                    : 'duration-[1.5s] bg-[#EEEEEE] w-[100%]'
                }`}
              >
                <div className={` flex flex-row justify-between`}>
                  <p className="w-[43%] py-[7px]">{item.name}</p>
                  <p className="w-[45%] pl-[5px] py-[7px]">{item.description}</p>
                  <p className="w-[13%] text-right py-[7px]">{item.total}</p>

                  <button
                    className={`h-auto absolute right-[-30px] mt-[10px] text-red-300 hover:text-red-500`}
                    onClick={() => {
                      setConfirmDelete(!confirmDelete);
                      setProductID(item.id);
                    }}
                  >
                    <BsTrash />
                  </button>

                  <div
                    className={`${
                      confirmDelete && item.id === productID
                        ? 'absolute right-[-15px] z-[99] duration-[1.3s] translate-x-[-20px] opacity-[1] ease-in-out flex flex-col w-[150px]'
                        : 'absolute right-[-15px] opacity-0 duration-[1.1s] ease none'
                    }`}
                  >
                    <span className={`flex text-[12px]  absolute right-[-170px] bottom-[-10px]`}>Deseja realmente excluir?</span>
                    <button
                      className={`h-auto absolute right-[-90px] mt-[10px] text-[21px] text-red-300 hover:text-red-500 hover:bg-[#f8d1d1] rounded-sm `}
                      onClick={() => {
                        setConfirmDelete(!confirmDelete);
                      }}
                    >
                      <BsX />
                    </button>
                    <button
                      className={`h-auto absolute right-[-120px] mt-[10px] text-[21px] text-green-300 hover:text-green-500 hover:bg-[#c5fdd1] rounded-sm`}
                      onClick={() => handleConfirmDeleteProductID(item.id)}
                    >
                      <BsCheck />
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          );
        })}
    </section>
  );
};

export default deleteProduct;
export const getServerSideProps: GetServerSideProps = async ({ req, res }: any) => {
  try {
    const session: SessionType | null = await unstable_getServerSession(req, res, optionsAuth);

    if (!session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    let product = await axios({
      url: `${process.env.NEXT_PUBLIC_URL}/products/all`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.user.token}`,
      },
    });

    return {
      props: {
        session,
        product: product.data,
      },
    };
  } catch (error) {
    return {
      props: {
        redirect: {
          destination: '/',
          permanent: false,
        },
      },
    };
  }
};
