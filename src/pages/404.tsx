import Image from 'next/image';
import Link from 'next/link';
import notFoundImg from '../../public/images/NotFound.jpg';
import { BsArrowLeft } from 'react-icons/bs';
const notFound = () => {
  return (
    <section className={`flex flex-col justify-center w-[100vw] h-[100vh]`}>
      <Image src={notFoundImg} alt="imagem astronauta" style={{ height: '100%', width: '100%' }} />
      <div className="w-[100%] h-[100%] absolute text-blue-500 flex justify-center items-center mt-[-30rem] flex-col">
        <h2 className="text-[2rem]">Ops... não achamos o que procura.</h2>

        <Link href={`/estoque`} className={`flex flex-row mt-[2rem]`}>
          <BsArrowLeft className="mt-[-2px] pr-[5px] text-[2rem]" />
          Voltar
        </Link>
      </div>
    </section>
  );
};

export default notFound;
