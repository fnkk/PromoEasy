"use client";
import MenuCloseSvg from "@/public/common/menu-colse.svg";
import MenuSvg from "@/public/common/menu.svg";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import RightArrow from "@/public/common/rightArrow.svg";
import TransitionDivMobile from "./TransitionDivMobile";

const Menu = () => {
    const router = useRouter();
    const [isFold, setIsFold] = useState<boolean>(true);

    const toggleMenu = () => {
        setIsFold(!isFold);
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
        <div className="sm:hidden relative">
            <div className="flex gap-2">
                <TransitionDivMobile />
                <Image
                    alt="Toggle Menu"
                    src={isFold ? MenuSvg : MenuCloseSvg}
                    onClick={toggleMenu}
                    className="cursor-pointer"
                />
            </div>
            <div className={`fixed top-[54px] z-50 right-0 w-full h-full bg-white transition-transform duration-500 ease-in-out ${isFold ? 'translate-x-full' : 'translate-x-0'}`}>
                <div className="w-full flex justify-center flex-col items-center py-5 gap-6">
                    <div className="w-[351px] flex flex-col gap-1">
                        <div className="text-sm text-gray-500">
                            Build
                        </div>
                        <div className="flex flex-col gap-4">
                            <div onClick={(e) => handleLinkClick(e, 'https://artela.network/build/intro-to-artela')} className="text-base flex justify-between cursor-pointer">Intro to Artela <Image alt="" src={RightArrow} /></div>
                            <div onClick={(e) => handleLinkClick(e, 'https://artela.network/build/developer-portal')} className="text-base flex justify-between cursor-pointer">Developer Portal <Image alt="" src={RightArrow} /></div>
                            <div onClick={(e) => handleLinkClick(e, 'https://docs.artela.network/develop')} className="text-base flex justify-between cursor-pointer">Documentation <Image alt="" src={RightArrow} /></div>
                        </div>
                    </div>
                    <div className="w-[351px] flex flex-col gap-1">
                        <div className="text-sm text-gray-500">
                            Explore
                        </div>
                        <div onClick={(e) => handleLinkClick(e, 'https://artela.network/explore/aspect-hub')} className="text-base flex justify-between cursor-pointer">Aspect Hub<Image alt="" src={RightArrow} /></div>
                    </div>
                    <div className="w-[351px] flex flex-col gap-6">
                        <div onClick={(e) => handleLinkClick(e, 'https://artela.network/blog')} className="text-base flex justify-between cursor-pointer">Blog<Image alt="" src={RightArrow} /></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;