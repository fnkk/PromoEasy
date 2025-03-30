"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import stoneSvg from '@/public/common/stone.svg';
import Link from 'next/link';

const TransitionDivMobile: React.FC = () => {
  const handleLinkClick = (e: any, uri: string) => {
    e.preventDefault();
    if (uri.startsWith('https://artela.network')) {
      window.parent.location.href = uri;
    } else {
      window.open(uri, '_blank');
    }
  };
  return (
    <div onClick={(e)=>handleLinkClick(e,'https://renaissance.artela.network/vision')} className={`cursor-pointer flex justify-center items-center rounded font-medium bg-[#0000c9] text-white w-[8.1875rem] h-8
  `}
    >
      <Image src={stoneSvg} className={` w-5`} alt='Stone' />
      <div className='flex flex-col'>
        <p>Renaissance</p>
      </div>
    </div>
  );
};

export default TransitionDivMobile;