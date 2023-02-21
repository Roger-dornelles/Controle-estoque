import Head from '@/components/Header';
import Link from 'next/link';
import { ReactElement, useContext, useState } from 'react';
import { BsClipboardData, BsClipboardPlus, BsClipboardCheck, BsClipboardX, BsBoxArrowInLeft, BsPerson } from 'react-icons/bs';
import { IconType } from 'react-icons/lib';
import LogoSidebar from 'public/images/logo-sidebar.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

type SidebarProps = {
  children: ReactElement;
};

type ItemsProps = {
  label: string;
  path: string;
  icon: IconType;
};

const menuItens = [
  { label: 'Estoque', path: '/estoque', icon: BsClipboardData },
  { label: 'Adicionar produto', path: '/addProduct', icon: BsClipboardPlus },
  { label: 'Atualizar produto', path: '/updateProduct', icon: BsClipboardCheck },
  { label: 'Excluir produto', path: '/deleteProduct', icon: BsClipboardX },
];

export const Sidebar = ({ children }: SidebarProps) => {
  const router = useRouter();
  const [profile, setprofile] = useState({ label: 'Perfil', path: '/profile', icon: BsPerson });

  return (
    <main className={`flex text-[16px]`}>
      <Head />

      <aside className={`w-[220px] h-[100vh] flex flex-col justify-between bg-[#c6dae2]`}>
        <div>
          <div className="flex flex-row justify-center items-center ml-[70px] w-[50px] h-[50px] mt-[2.5rem]">
            <Image src={LogoSidebar} alt="logo" className="rounded-[50%]" />
            <span className="text-black text-[22px] pl-[8px]">Controls</span>
          </div>
          <nav className={`mt-[2.5rem] `}>
            <ul className={``}>
              {menuItens &&
                menuItens.map((item: ItemsProps, index: number): JSX.Element => {
                  return (
                    <li
                      key={index}
                      className={` w-[100%] flex flex-row items-center p-[9px] pl-[1.5rem] hover:bg-[#EDEDED]
                      ${item.path.includes(router.pathname) ? 'bg-[#EDEDED]' : null}`}
                    >
                      <Link href={item.path} legacyBehavior>
                        <a className="flex flex-row">
                          <span className="text-black text-[16px] pr-[7px]  mt-[4px]">{<item.icon />}</span>
                          {item.label}
                        </a>
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </nav>
        </div>

        <footer className={`flex flex-col`}>
          <div
            className={`w-[100%] h-[2.7rem] flex flex-row items-center ${
              profile.path.includes(router.pathname) && 'bg-[#EDEDED]'
            } hover:bg-[#EDEDED]`}
          >
            {profile && (
              <Link href={profile.path} className={`flex flex-row w-[60px] ml-[1.5rem] justify-center items-center `}>
                <span className="text-black text-[20px] pr-[6px]">{<profile.icon />}</span>
                {profile.label}
              </Link>
            )}
          </div>
          <div className="w-[100%] h-[2.7rem] flex  items-center mb-[1.5rem] hover:bg-[#EDEDED]">
            <button
              className={`flex flex-row w-[60px] ml-[1.5rem] justify-center items-center `}
              onClick={() => {
                signOut();
                setTimeout(() => {
                  router.push('/');
                }, 3000);
              }}
            >
              <span className="text-[22px] pr-[6px]">
                <BsBoxArrowInLeft />
              </span>
              Sair
            </button>
          </div>
        </footer>
      </aside>
      <section className={`bg-[#EEEEEE] w-[100%]`}>{children}</section>
    </main>
  );
};
