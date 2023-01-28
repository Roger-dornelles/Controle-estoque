import Image from 'next/image';
import Wave from '/public/images/wave.png';
import { useRouter } from 'next/router';
import Head from '@/components/Header';
const Home = () => {
  const router = useRouter();

  return (
    <>
      <Head />
      <section className={`w-[100%] h-[100vh] flex justify-center items-center flex-col  text-[#686868]`}>
        <span className="text-[#2e70ad] text-[22px] pl-[8px] absolute top-[20px] left-[25px]">Controls</span>
        <Image src={Wave} alt="Imagem" width={0} height={0} className={`w-[100vw] h-[100vh] `} />
        <div className={`max-w-[500px] flex flex-col justify-center items-center absolute mt-[-150px] mb-[50px] `}>
          <h2 className={`text-[20px] pb-[12px] `}>
            Sistema de gerenciamento de <b className="pl-1">Estoque</b>
          </h2>
          <p>Tenha o controle do seu Estoque a qualquer momento,</p>
          <p>Fique sabendo como esta seu Estoque de onde você estiver.</p>
          <div>
            <button
              onClick={() => router.push('/signin')}
              className={`w-[120px] h-[35px] bg-[#409bf0] rounded text-white mt-[50px] border-none cursor-pointer`}
            >
              Fazer Login
            </button>
          </div>
        </div>
        <footer className={`absolute bottom-[10px] left-[0] w-[100vw] text-center`}>
          <span className="text-[#fdfdfd] text-[14px] pl-[8px]">produzido por Controls</span>
        </footer>
      </section>
    </>
  );
};

export default Home;
