import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { optionsAuth } from './api/auth/[...nextauth]';

const addProduct = () => {
  return (
    <>
      <h2>Adicionar produto</h2>
    </>
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
