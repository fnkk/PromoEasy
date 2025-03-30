'use client'
import Link from "next/link"
import Image from 'next/image';
import DownIcon from "@/public/home/downArrow.svg"
import DownIcon2 from "@/public/home/downArrow-blue.svg"
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { addPathParams } from '@/utils';

const Guide = () => {
    const [showBuildDropdown, setShowBuildDropdown] = useState<boolean>(false);
    const buildTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const whitepaperTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const exploreTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = (setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>, timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setShowDropdown(true);
    };

    const handleMouseLeave = (setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>, timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>) => {
        timeoutRef.current = setTimeout(() => {
            setShowDropdown(false);
        }, 100);
    };

    useEffect(() => {
        return () => {
            if (buildTimeoutRef.current) clearTimeout(buildTimeoutRef.current);
            if (whitepaperTimeoutRef.current) clearTimeout(whitepaperTimeoutRef.current);
            if (exploreTimeoutRef.current) clearTimeout(exploreTimeoutRef.current);
        };
    }, []);

    const search = useSearchParams();
    const registerCode = search.get('R');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <div 
            ref={menuRef} 
            className="relative sm:flex hidden cursor-pointer h-[42px] justify-center items-center py-3 px-6 group"
            onMouseEnter={() => handleMouseEnter(setShowBuildDropdown, buildTimeoutRef)}
            onMouseLeave={() => handleMouseLeave(setShowBuildDropdown, buildTimeoutRef)}
        >
            <div className='text-xs sm:text-base group-hover:text-[#0000c9] text-nowrap'>
                Guide & FAQ
            </div>
            <Image alt='' src={showBuildDropdown ? DownIcon2 : DownIcon} />
            {showBuildDropdown &&
                <div 
                className="absolute top-full p-2 mt-2 w-48 rounded-lg bg-white border border-gray-300 shadow-lg transition-opacity duration-300 opacity-100 z-50"
                 >
                    <div  className="block text-base px-2 py-2 text-black rounded-lg hover:bg-gray-200 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation(); // 阻止事件冒泡
                            window.open("https://artela.network/blog/your-guide-to-artela-renaissance-campaign");
                            setIsMenuOpen(false);
                        }}>
                        Guide
                    </div>
                    <div  className="block text-base px-2 py-2 text-black rounded-lg hover:bg-gray-200 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation(); // 阻止事件冒泡
                            window.open('https://arthome.artela.network/arthome/FAQ');
                            setIsMenuOpen(false);
                        }}
                    >FAQ</div>
                </div>
            }
        </div>
    );
};

export default Guide;