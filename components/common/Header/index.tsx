'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ArtelaSvg from '@/public/common/art.svg';
import ArtelaSvgMobile from '@/public/common/art-m.svg';
import xSvg from '@/public/common/x.svg';
import discordSvg from '@/public/common/discord.svg';
import { useRouter } from 'next/navigation';
import Navbar from './Nav';
import Menu from './Menu';

const Header: React.FC = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    router.push('/');
  };

  const handleLinkClick = (e: any, uri: string) => {
    e.preventDefault();
    if (uri.startsWith('https://artela.network')) {
      window.parent.location.href = uri;
    } else {
      window.open(uri, '_blank');
    }
  };

  return (
    <div className={`w-full ${scrollY > 0 ? 'sm:bg-white' : 'sm:bg-transparent'} bg-white flex flex-row justify-between sm:justify-between items-center h-[54px] sm:h-[88px] fixed top-0 left-0 px-[1rem] sm:px-[3rem] z-50 transition-colors duration-300`}>
      <div className="sm:w-1/6 flex justify-start">
        <Image draggable={false} alt="Artela" src={ArtelaSvg} onClick={handleClick} className="hidden sm:flex cursor-pointer" />
        <Image draggable={false} alt="Artela" src={ArtelaSvgMobile} onClick={handleClick} className="sm:hidden cursor-pointer" />
      </div>
      <div className="sm:w-2/3 sm:flex hidden sm:justify-end">
        <Navbar />
      </div>
      <div className="w-1/6 justify-end items-center gap-10 sm:flex hidden">
        <div onClick={(e) => handleLinkClick(e, 'https://x.com/artela_network')} className="cursor-pointer">
          <Image alt="Twitter" src={xSvg} />
        </div>
        <div onClick={(e) => handleLinkClick(e, 'https://discord.com/invite/artelanetwork')} className="cursor-pointer">
          <Image alt="Discord" src={discordSvg} />
        </div>
      </div>
      <Menu />
    </div>
  );
};

export default Header;