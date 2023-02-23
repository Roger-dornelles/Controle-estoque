import { useState, useEffect, useContext } from 'react';
import { BsFillUnlockFill, BsFillLockFill, BsArrowLeft } from 'react-icons/bs';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import { Context } from '@/context/SnackbarContext';
import SnackBar from '@/components/snackbar';
import Image from 'next/image';
import Wave from '/public/images/wave.png';
import Link from 'next/link';

const signin = () => {
  const [isBlocked, setIsBlocked] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();
  const { setSnackBar }: any = useContext(Context);

  const unlockButtonSignin = () => {
    if (email && password.length >= 8) {
      setIsBlocked(false);
    } else {
      setIsBlocked(true);
    }
  };

  useEffect(() => {
    unlockButtonSignin();
  }, [email, password]);

  const handleConfirmSignin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (email && password) {
        const request = await signIn('credentials', { redirect: false, email, password });

        if (request && request.ok) {
          setSnackBar({
            message: 'Usuario logado com sucesso. ',
            type: 'success',
            timer: 3000,
            open: true,
          });
          setTimeout(() => {
            router.replace('/estoque');
          }, 3000);
        } else {
          setSnackBar({
            message: 'Email e/ou Senha incorreto.',
            type: 'error',
            timer: 3000,
            open: true,
          });
        }
      }
    } catch (error) {
      setSnackBar({
        message: 'Ocorreu um erro, tente mais tarde.',
        type: 'error',
        timer: 3000,
        open: true,
      });
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <SnackBar />
      <section className={`w-[100%] h-[100vh] flex  items-center flex-col bg-[#F6F6F6] text-[#686868]`}>
        <Link href={'/'} className={`absolute left-[50px] top-[20px] flex flex-row text-[#f86363]`}>
          <span className="mt-[5px] pr-[5px]">
            <BsArrowLeft />
          </span>
          Voltar
        </Link>
        <Image src={Wave} alt="Imagem" width={0} height={0} className={`w-[100vw] h-[100vh] `} />
        <div className={`absolute max-w-[500px] flex flex-col mt-[130px] mb-[50px] `}>
          <h2 className={`text-[20px] pb-[12px] `}>
            Sistema de gerenciamento de <b className="pl-1">Estoque</b>
          </h2>
          <p>Tenha o controle do seu Estoque a qualquer momento</p>
        </div>
        <form
          onSubmit={handleConfirmSignin}
          className={`w-[450px] h-[400px] absolute flex flex-col items-center justify-center text-[#575757]  border-[1px] bg-gray-100 shadow-[#9c9c9c] shadow-2xl
          hover:shadow-[#797979] rounded-[5px] mt-[220px]
          `}
        >
          <div className={`flex flex-col items-center w-[100%] mt-[-30px] mb-[22px] `}>
            <label className={`w-[90%] h-[35px] ml-[15px] text-[18px] `}>Email</label>
            <input
              type="email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className={`w-[90%] h-[35px] rounded-[5px] border-0 outline-none pl-[8px] `}
            />
          </div>
          <div className={`flex flex-col items-center w-[100%] mb-[50px]`}>
            <label className={`w-[90%] h-[35px] ml-[15px] text-[18px]`}>Senha</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-[90%] h-[35px] rounded-[5px] border-0 outline-0 pl-[8px] `}
            />
          </div>

          <div className={``}>
            <button
              disabled={isBlocked}
              className={`w-[150px] h-[45px] flex justify-center items-center rounded-[5px] border-none
                ${isBlocked ? 'cursor-not-allowed' : 'cursor-pointer'}
                ${isBlocked && 'bg-green-500'}
                bg-green-400 text-white border-[1px]  hover:shadow-2xl hover:shadow-[#8f8f8f] hover:bg-[#3ae478]`}
            >
              {loading ? (
                <BsFillUnlockFill className={`pr-[5px] text-[19px]`} />
              ) : (
                <BsFillLockFill className={`pr-[5px] text-[19px]`} />
              )}{' '}
              {loading ? 'Aguarde...' : 'Login'}
            </button>
          </div>
        </form>
        <footer>
          <p className="mt-[-40px] text-white">Produzido por Controls</p>
        </footer>
      </section>
    </>
  );
};

export default signin;
