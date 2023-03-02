import { ProductsTypes } from '@/types/productsType';
import axios from 'axios';
import { GetServerSideProps, NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { useContext, useState } from 'react';
import { optionsAuth } from './api/auth/[...nextauth]';
import { BsCartDash, BsCartPlus, BsArrowDownShort, BsPencil, BsXLg } from 'react-icons/bs';
import { Context } from '@/context/SnackbarContext';
import SnackBar from '@/components/snackbar';
import { SnackbarProps } from '@/types/snackBarTypes';
import { ProductArrayType } from '@/types/productsType';

const updateProduct = ({ product }: ProductArrayType) => {
  const { setSnackBar }: SnackbarProps | any = useContext(Context);

  const [products, setProducts] = useState<ProductsTypes>(product.products);
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [productSelected, setProductSelected] = useState<ProductsTypes>();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState({
    type: '',
    disabled: true,
  });
  const [isDisabledInputs, setIsDisabledInputs] = useState({
    type: '',
    disabled: true,
  });

  const [isErrorInput, setIsErrorInput] = useState<{ error: boolean; message: string }>({
    error: false,
    message: '',
  });
  const [isErrorOutput, setIsErrorOutput] = useState<{ error: boolean; message: string }>({
    error: false,
    message: '',
  });

  const [warning, setWarning] = useState<{ error: boolean; message: string }>({
    error: false,
    message: '',
  });

  const validateRegex = (item: string) => {
    let regex = new RegExp('^[0-9]+$');
    return regex.test(item);
  };

  const handleEditOutput = (item: any) => {
    !openModal ? setOutput('') : null;

    setOpenModal(true);
    setProductSelected(item);
    setName(item.name);
    setDescription(item.description);
    setIsDisabledInputs({ disabled: false, type: 'output' });
  };

  const handleEditInput = (item: any) => {
    !openModal ? setInput('') : null;

    setOpenModal(true);
    setProductSelected(item);
    setName(item.name);
    setDescription(item.description);
    setIsDisabledInputs({ disabled: false, type: 'input' });
  };

  const handleUpdateProductForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const handleConfirmAction = async (productID: number | undefined) => {
    try {
      if (!name || !description) {
        setWarning({ error: true, message: 'Produto e/ou descrição são obrigatorios.' });
        setTimeout(() => {
          setWarning({ error: false, message: '' });
        }, 3750);
      }

      if ((output.length && validateRegex(output)) || (input.length && validateRegex(input)) || (name && description)) {
        let response = await axios({
          url: './api/updateProductById',
          method: 'POST',
          data: {
            id: productID,
            name: name && name,
            description: description && description,
            input: validateRegex(input) && input,
            output: validateRegex(output) && output,
          },
        });

        if (response.data.error) {
          setSnackBar({
            message: response.data.message,
            type: 'error',
            timer: 3000,
            open: true,
          });
        }

        if (!response.data.error) {
          setSnackBar({
            message: response.data.data.message,
            type: 'success',
            timer: 3000,
            open: true,
          });
          setTimeout(() => {
            setOpenModal(false);
            document.location.reload();
          }, 3000);
        }
      }
    } catch (error) {
      setSnackBar({
        type: 'error',
        message: 'Ocorreu um erro, tente mais tarde.',
        time: 3000,
        open: true,
      });
    }
  };

  return (
    <section className={`flex flex-col justify-center ml-[90px] mt-[50px] w-[90%]`}>
      <SnackBar />

      <div
        data-cy="title"
        className={`flex justify-between items-end w-[75%] ml-[100px] mb-[15px] pb-[12px] text-[15px] border-b-[1px] border-[#ccc]`}
      >
        <p>Produto:</p>
        <p>Descrição:</p>
        <div className="flex items-end">
          <p>Total em estoque:</p>
          <p className="pl-[25px]">
            O que deseja fazer?
            <br />
            Remover/Adicionar produto
          </p>
        </div>
      </div>
      {product &&
        (products as unknown as ProductsTypes).map((item: ProductsTypes) => {
          return (
            <div
              key={item.id}
              data-test="product-list"
              className={`flex justify-between py-2 w-[60%] ml-[100px] border-b-[1px] border-[#ccc] relative`}
            >
              <span className="w-[44%] text-left ">{item.name}</span>

              <span className="w-[45%] text-left">{item.description}</span>

              <span className="w-[11%] text-right">{item.total}</span>
              <button
                data-test={item.name}
                name="saida"
                onClick={() => {
                  handleEditOutput(item);
                }}
                className="text-[12px] px-1 absolute right-[-105px] border-[1px] border-[#ccc] rounded-sm hover:bg-[#ffc4c4]"
              >
                Remover
              </button>
              <button
                data-cy={item.name}
                name="entrada"
                onClick={() => handleEditInput(item)}
                className="flex flex-col text-[12px] px-1 absolute right-[-180px] border-[1px] border-[#ccc] rounded-sm hover:bg-[#cafcce] "
              >
                Adicionar
              </button>
            </div>
          );
        })}

      <div
        className={`${
          openModal
            ? 'flex z-[99] duration-[1.3s] translate-x-[-30px] opacity-[1] ease-in-out border-l-[1px] border-[#bdbcbc]'
            : 'z-[99] duration-[1.5s] translate-x-[0px] ease-in-out border-l-[1px] border-[#bdbcbc] opacity-0 none'
        }  flex-col absolute right-[0px] top-0 h-[100vh] w-[350px] bg-[#EEEEEE]
        `}
      >
        <button
          className="text-red-500 text-[20px] absolute left-[20px] top-[15px]"
          onClick={() => {
            setOpenModal(false);
            setIsErrorInput({ error: false, message: '' });
            setIsErrorOutput({ error: false, message: '' });
          }}
        >
          <BsXLg />
        </button>

        <div className={`w-[85%] flex flex-col justify-center mt-[70px] ml-[50px] relative`}>
          {warning.error && (
            <p
              className={`absolute top-[-25px] rounded-md flex justify-center py-[3px] text-black text-[12px] w-[100%] bg-[#f2fa7f] `}
            >
              {warning.message}
            </p>
          )}
          <form onSubmit={handleUpdateProductForm} className={`w-[70%] flex flex-col`} data-cy="form">
            <div className={`text-[#a8a8a8] pb-[10px]`}>
              <p className="pb-[5px]">Produto:</p>
              <div className={`flex flex-row`}>
                <input
                  className={`text-black h-[30px] outline-none w-[100%]
                    ${!isDisabled.disabled && isDisabled.type === 'name' ? 'focus:border-[1px] focus:border-[#dfdede]' : null}
                  `}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isDisabled.type === 'name' ? isDisabled.disabled : true}
                />
                <BsPencil
                  onClick={(e) => setIsDisabled({ disabled: !isDisabled.disabled, type: 'name' })}
                  className={`text-black ml-[8px] mt-[3px] cursor-pointer absolute right-[65px]`}
                />
              </div>
            </div>
            <div className={`text-[#a8a8a8] pb-[10px]`} data-test="description">
              <p className="pb-[5px]">Descrição:</p>
              <div className={`flex flex-row`}>
                <input
                  className={`text-black h-[30px] outline-none w-[100%]
                    ${
                      !isDisabled.disabled && isDisabled.type === 'description'
                        ? 'focus:border-[1px] focus:border-[#dfdede]'
                        : null
                    }
                  `}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isDisabled.type === 'description' ? isDisabled.disabled : true}
                />
                <BsPencil
                  data-cy="open-description"
                  onClick={(e) => setIsDisabled({ disabled: !isDisabled.disabled, type: 'description' })}
                  className={`text-black ml-[8px] mt-[3px] cursor-pointer absolute right-[65px]`}
                />
              </div>
            </div>

            <div className={`text-[#a8a8a8] pb-[10px]`}>
              <p className="pb-[5px]">Total em estoque:</p>
              <b className="text-black">{productSelected?.total}</b>
            </div>
            {isDisabledInputs.type === 'input' && (
              <label className="pb-[17px] flex flex-col relative">
                Adicionar ao estoque:
                <div className={`flex flex-row`}>
                  <input
                    disabled={isDisabledInputs.type === 'input' ? isDisabledInputs.disabled : true}
                    value={input}
                    onChange={(e) => {
                      !validateRegex(e.target.value) &&
                        setIsErrorInput({ error: true, message: 'Entrada tem que ser um numero' });
                      setInput(e.target.value);

                      validateRegex(e.target.value) && setIsErrorInput({ error: false, message: '' });
                      setInput(e.target.value);

                      return;
                    }}
                    className={`mt-[10px] outline-none w-[75px] h-[30px] text-[20px] text-center rounded-[3px] focus:border-[1px] focus:border-[#dfdede]
                    ${isErrorInput.error ? 'border-[1px] border-red-400' : null}
                  `}
                  />

                  {input && (
                    <BsXLg
                      className={`mt-[17px] text-red-500 absolute left-[82px] cursor-pointer`}
                      onClick={() => {
                        setInput('');
                        setIsErrorInput({ error: false, message: '' });
                      }}
                    />
                  )}
                </div>
                {isErrorInput.error && (
                  <span className="text-red-400 text-[12px] absolute mt-[65px] ">{isErrorInput.message}</span>
                )}
              </label>
            )}

            {isDisabledInputs.type === 'output' && (
              <label className="pb-[17px] flex flex-col relative">
                Remover do estoque:
                <div className={`flex flex-row`}>
                  <input
                    value={output}
                    disabled={isDisabledInputs.type === 'output' ? isDisabledInputs.disabled : true}
                    onChange={(e) => {
                      !validateRegex(e.target.value) &&
                        setIsErrorOutput({ error: true, message: 'Entrada tem que ser um numero' });
                      setOutput(e.target.value);

                      validateRegex(e.target.value) && setIsErrorOutput({ error: false, message: '' });
                      setOutput(e.target.value);
                      return;
                    }}
                    className={`mt-[10px] outline-none w-[75px] h-[30px] text-[20px] text-center rounded-[3px] focus:border-[1px] focus:border-[#dfdede]
                ${isErrorOutput.error ? 'border-[1px] border-red-400' : null}
                `}
                  />

                  {output && (
                    <BsXLg
                      className={`mt-[17px] text-red-500 absolute left-[82px] cursor-pointer`}
                      onClick={() => {
                        setOutput('');
                        setIsErrorOutput({ error: false, message: '' });
                      }}
                    />
                  )}
                </div>
                {isErrorOutput.error && (
                  <span className="text-red-400 text-[12px] absolute mt-[65px] ">{isErrorOutput.message}</span>
                )}
              </label>
            )}

            <button
              type="submit"
              disabled={isErrorInput.error || isErrorOutput.error}
              onClick={() => handleConfirmAction(productSelected?.id)}
              className={`w-auto bg-[#3cf36a] text-[#636363] duration-[1.3s] hover:bg-[#46cc5c] hover:text-[#2c2c2c] hover:duration-[1s] text-[16px]  rounded-sm py-1
                  ${isErrorInput.error || isErrorOutput.error ? 'cursor-not-allowed' : null}
              `}
            >
              Salvar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default updateProduct;

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
