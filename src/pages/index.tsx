import { useState, useEffect } from 'react';
import { BsFillUnlockFill, BsFillLockFill } from 'react-icons/bs';

const Login = () => {
  const [isBlocked, setIsBlocked] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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

  const handleConfirmSignin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <>
      <section className={`w-[100%] h-[100vh] flex justify-center items-center flex-col bg-[#F6F6F6] text-[#686868]`}>
        <div className={`max-w-[500px] flex flex-col justify-center items-center mb-[50px] mt-[-80px]`}>
          <h2 className={`text-[20px] pb-[12px] `}>
            Sistema de gerenciamento de <b className="pl-1">Estoque</b>
          </h2>
          <p>Tenha o controle do seu Estoque a qualquer momento</p>
        </div>
        <form
          onSubmit={handleConfirmSignin}
          className={`w-[450px] h-[400px] flex flex-col items-center justify-center text-[#575757]  border-[1px] bg-gray-100 shadow-[#9c9c9c] shadow-2xl hover:shadow-[#797979] rounded-[5px]`}
        >
          <div className={`flex flex-col items-center w-[100%] mt-[-30px] mb-[22px] `}>
            <label className={`w-[90%] h-[35px] ml-[15px] text-[18px] `}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-[90%] h-[35px] rounded-[5px] border-0 outline-0 pl-[8px] focus:border-[1px] focus:border-[#ebebeb]`}
            />
          </div>
          <div className={`flex flex-col items-center w-[100%] mb-[50px]`}>
            <label className={`w-[90%] h-[35px] ml-[15px] text-[18px]`}>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-[90%] h-[35px] rounded-[5px] border-0 outline-0 pl-[8px] focus:border-[1px] focus:border-[#ebebeb]`}
            />
          </div>

          <div className={``}>
            <button
              disabled={isBlocked}
              className={`w-[150px] h-[45px] flex justify-center items-center rounded-[5px]
              ${
                isBlocked ? 'cursor-not-allowed' : 'cursor-pointer'
              } bg-green-400 text-white border-[1px]  hover:shadow-2xl hover:shadow-[#8f8f8f] hover:bg-[#3ae478]`}
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
      </section>
    </>
  );
};

export default Login;
