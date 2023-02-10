import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { optionsAuth } from './api/auth/[...nextauth]';

const updateProduct = (session: string) => {
  return (
    <>
      <h2>atualizar Produto</h2>
    </>
  );
};

export default updateProduct;
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
