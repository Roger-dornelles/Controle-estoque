import { UserType } from '@/types/userType';
import axios from 'axios';
import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { optionsAuth } from './api/auth/[...nextauth]';
import { BsPencil, BsCheck, BsX } from 'react-icons/bs';
import { useContext, useState } from 'react';
import Link from 'next/link';
import { Tooltip } from '@mui/material';
import { Context } from '@/context/SnackbarContext';
import SnackBar from '@/components/snackbar';
import { SessionType } from '@/types/sessionType';

type DisableUserEditType = {
  disableName?: boolean;
  disableEmail?: boolean;
  disablePassword?: boolean;
};

const profile = ({ user }: UserType) => {
  const { setSnackBar }: any = useContext(Context);

  const [name, setName] = useState<string>(user && user.name);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [email, setEmail] = useState<string>(user && user.email);

  const [editUser, setEditUser] = useState<DisableUserEditType>({
    disableName: true,
    disableEmail: true,
    disablePassword: true,
  });
  const [warning, setWarning] = useState<{ error: boolean; message: string }>({
    error: false,
    message: '',
  });

  const handleSaveUser = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      let isNotValidPassword = password !== confirmPassword;
      isNotValidPassword
        ? setWarning({ error: true, message: 'Senhas são diferentes' })
        : setWarning({ error: false, message: '' });

      if (!name || !email) {
        setSnackBar({
          message: 'Preencha os campos Nome e/ou Email',
          timer: 3000,
          open: true,
          type: 'error',
        });
      } else {
        let response = await axios({
          url: './api/updateUserData',
          method: 'POST',
          data: {
            name: name && name,
            email: email && email,
            password: password && password,
          },
        });
        if (response.data.error) {
          setSnackBar({
            timer: 3000,
            open: true,
            type: 'error',
            message: response.data.message.error,
          });
        }

        if (!response.data.error) {
          setSnackBar({
            timer: 3000,
            open: true,
            type: 'success',
            message: response.data.message,
          });
          setTimeout(() => {
            document.location.reload();
          }, 3050);
        }
      }
    } catch (error) {
      setSnackBar({
        type: 'error',
        message: 'Ocorreu um erro, tente mais tarde.',
        timer: 3000,
        open: true,
      });
    }
  };

  return (
    <section className={`flex flex-col items-center justify-center h-[100vh] `}>
      <SnackBar />
      <div className={`flex flex-col justify-center items-center w-[50%] min-h-[450px] shadow-2xl bg-[#dbdada44]`}>
        <div className="w-[100%] flex justify-center mt-[-70px] text-[20px]">
          <span>Editar Perfil</span>
        </div>

        <div className={`w-[50%] flex flex-col mt-[25px]`}>
          <form className={`relative `}>
            <label className={`flex flex-row items-center mb-[15px] h-[40px]`}>
              Nome:
              <input
                data-cy="name"
                type="text"
                className={`${
                  !editUser.disableName
                    ? 'w-[70%] pr-[15px] outline-none ml-[8px] pl-[5px] bg-[#ffffff] rounded-sm h-[30px]'
                    : 'w-[70%] ml-[8px] pl-[5px] h-[30px] text-[#919090]'
                }`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={editUser.disableName}
              />
              {!editUser.disableName && (
                <BsX
                  data-cy="clear-name"
                  className={`absolute right-[4.5rem] text-[19px] text-red-600 cursor-pointer ${name.length < 1 && 'hidden'}`}
                  onClick={() => {
                    name.length >= 1 && setName('');
                  }}
                />
              )}
              <Tooltip title={`editar nome`} arrow placement="top">
                <span>
                  <BsPencil
                    data-test="open-name"
                    className={`ml-[7px] cursor-pointer`}
                    onClick={() => {
                      setEditUser({
                        disableName: !editUser.disableName,
                        disablePassword: true,
                        disableEmail: true,
                      });
                    }}
                  />
                </span>
              </Tooltip>
            </label>

            <label className={`flex flex-row items-center mb-[15px] h-[40px]`}>
              Email:
              <input
                type="text"
                className={`${
                  !editUser.disableEmail
                    ? 'w-[70%] pr-[15px] outline-none ml-[8px] pl-[5px] bg-[#ffffff] rounded-sm h-[30px]'
                    : 'w-[70%] ml-[8px] pl-[5px] h-[30px] text-[#919090]'
                }`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                disabled={editUser.disableEmail}
              />
              {!editUser.disableEmail && (
                <BsX
                  className={`absolute right-[78px] text-[19px] text-red-600 cursor-pointer ${email.length < 1 && 'hidden'}`}
                  onClick={() => {
                    email.length >= 1 && setEmail('');
                  }}
                />
              )}
              <Tooltip title={`editar email`} arrow placement="top">
                <span>
                  <BsPencil
                    className={`ml-[7px] cursor-pointer`}
                    onClick={() => {
                      setEditUser({
                        disableEmail: !editUser.disableEmail,
                        disableName: true,
                        disablePassword: true,
                      });
                    }}
                  />
                </span>
              </Tooltip>
            </label>

            <label className={`flex flex-row items-center mb-[15px] h-[40px]`}>
              Nova Senha:
              <input
                type="text"
                className={`${
                  !editUser.disablePassword
                    ? 'w-[60%] outline-none ml-[8px] pl-[5px] bg-[#ffffff] rounded-sm h-[30px]'
                    : 'w-[60%] ml-[8px] pl-[5px] h-[30px]'
                } ${warning.error ? 'border-[1px] border-red-400 duration-[1.2s]' : null}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={editUser.disablePassword}
              />
              <Tooltip title={`criar nova senha`} arrow placement="top">
                <span>
                  <BsPencil
                    className={`ml-[7px] cursor-pointer`}
                    onClick={() => {
                      setEditUser({
                        disablePassword: !editUser.disablePassword,
                        disableName: true,
                        disableEmail: true,
                      });
                    }}
                  />
                </span>
              </Tooltip>
            </label>
            <label className={`flex flex-row items-center mb-[15px] h-[40px]`}>
              Confirmar senha:
              <input
                type="text"
                className={`${
                  password.length >= 8
                    ? 'w-[60%] ml-[8px] pl-[5px] outline-none flex duration-[1.3s] opacity-1 ease h-[30px] '
                    : 'w-[60%] outline-none opacity-0 duration-0 h-[30px]'
                } ${warning.error ? 'border-[1px] border-red-400' : null}`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={password.length < 8}
              />
            </label>
            {warning.error && (
              <p
                className={`absolute w-[90%] py-[3px] text-center mt-[-10px] text-[12px] text-red-600 bg-red-200 focus:border-0 `}
              >
                {warning.message}
              </p>
            )}
            <div className={`w-[100%] flex justify-around mt-[40px]`}>
              <Link href={'/estoque'} className={`w-[40%] text-center bg-[#c3c1c3] duration-[1.2s] hover:bg-[#a6a6a7] p-[5px] `}>
                Cancelar
              </Link>
              <button
                type="submit"
                className={`w-[40%] flex items-center justify-center p-[5px] text-[#fff] rounded-sm bg-green-400  duration-[1.2s] hover:bg-green-500  `}
                onClick={handleSaveUser}
              >
                <BsCheck className="text-[25px] ml-[-15px]" />
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default profile;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
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

    let user: { data: any } = await axios({
      url: `${process.env.NEXT_PUBLIC_URL}/user/info/${session.user.id}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.user.token}`,
      },
      data: {},
    });

    return {
      props: {
        session,
        user: user.data,
      },
    };
  } catch (error) {
    console.log('ERRROR ============= ', error);
    // if (error.response.data.error) {
    return {
      props: {},
    };
    // }
  }
};
