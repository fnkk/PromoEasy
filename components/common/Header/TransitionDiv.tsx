"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import stoneSvg from '@/public/common/stone.svg';
import flagSvg from "@/public/common/flag.svg";
import visionLogo from "@/public/common/aivici.png";
import rightArrow from "@/public/common/rightArrow-w.svg";
import Link from 'next/link';

const ExpandableDiv: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [keepExpanded, setKeepExpanded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const collapseTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsHovered(true);
    const initialTimer = setTimeout(() => {
      setIsHovered(false);
    }, 5000);

    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    let contentTimer: NodeJS.Timeout;
    if (isHovered) {
      setKeepExpanded(true);
      contentTimer = setTimeout(() => {
        setShowContent(true);
      }, 500); // 延迟显示内容的时间，匹配 CSS 动画时间
    } else {
      if (collapseTimerRef.current) {
        clearTimeout(collapseTimerRef.current);
      }
      setShowContent(false);
      setKeepExpanded(false);
    }

    return () => {
      clearTimeout(contentTimer);
    };
  }, [isHovered]);

  useEffect(() => {
    const handleScroll = () => {
      setIsHovered(false);
      setKeepExpanded(false);
      setShowContent(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseEnter = () => {
    if (collapseTimerRef.current) {
      clearTimeout(collapseTimerRef.current);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    collapseTimerRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 3000); // 5秒后自动缩小
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
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`cursor-pointer relative rounded font-medium bg-[#0000c9] text-white transition-all duration-500 ease-in-out transform-origin-top
        ${isHovered || keepExpanded ? 'w-[23.9rem] h-[19.17rem]' : 'w-[10.175rem] h-full'}
      `}
    >
      <div className={`absolute top-0 right-7 z-20 ${showContent ? 'opacity-100 animate-fadeInUp' : 'hidden opacity-0 transition-opacity duration-500 ease-in-out'}`}>
        <Image alt='' src={flagSvg} />
      </div>
      <div className={`absolute inset-0 flex flex-col bg-[#0000c9] rounded text-white ${isHovered || keepExpanded ? 'px-4 py-6 gap-5' : 'py-[0.425rem] px-[0.8rem] gap-2'} transition-all duration-500 ease-in-out`}>
        <div className={`flex flex-row gap-2 ${isHovered || keepExpanded ? 'text-3xl' : 'font-medium text-xl'} transition-all duration-500 ease-in-out`}>
          <Image src={stoneSvg} className={`${isHovered || keepExpanded ? 'w-20' : 'w-5'}`} alt='Stone' />
          <div className='flex flex-col'>
            <p className={`${isHovered || keepExpanded ? 'flex transition-opacity duration-500 ease-in-out' : 'hidden'}`}>Artela</p>
            <p>Renaissance</p>
          </div>
        </div>
        <div className={`bg-[#00009b] px-4 py-3 rounded text-lg leading-5 ${showContent ? 'opacity-100 animate-fadeInUp' : 'hidden opacity-0 transition-opacity duration-500 ease-in-out'}`}>
          Artela's incentivized testnet campaign for exploring EVM++ and earning rewards.
        </div>
        <div className={`flex justify-between pt-4 border-[#FFFFFF44] border-t-[0.0625rem] items-center gap-2 ${showContent ? 'opacity-100 animate-fadeInUp' : 'hidden opacity-0 transition-opacity duration-500 ease-in-out'}`}>
          <Image alt='' src={visionLogo} className='w-12' />
          <div className='text-lg flex justify-center items-center h-full text-nowrap'>Enlightenment Phase</div>
          <div onClick={(e) => handleLinkClick(e, 'https://renaissance.artela.network/vision')} className="flex text-base text-nowrap border-[0.065rem] rounded-[0.19rem] border-white w-[6.77rem] h-[2.29rem] justify-center items-center cursor-pointer">
            {`Let's Go!`}
            <Image src={rightArrow} alt="" className="w-[1.04rem]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandableDiv;