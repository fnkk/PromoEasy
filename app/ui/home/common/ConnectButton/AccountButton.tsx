'use client'
import Image from 'next/image';
import DownIcon from "@/public/home/header/down.svg"
import { useState, useEffect, useRef } from 'react';
import { useDisconnect } from 'wagmi';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { addPathParams } from '@/utils';
import { generateAvatarFromAddress } from "@/utils"

interface propType {
    account?: string;
    balance?: string | undefined;
}

const AccountButton = ({ account, balance }: propType) => {
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
    const { disconnect } = useDisconnect();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const menuRef = useRef<HTMLDivElement>(null);
    const { address, isConnected } = useAccount()

    const handleDisconnect = () => {
        disconnect();
    };

    return (
        <div
            ref={menuRef}
            className={`sm:pl-1 pr-2 pl-3 py-2 flex flex-row gap-1 group sm:gap-3  items-center h-8 sm:h-[42px] relative cursor-pointer
            border-[#0000c9] border-1 rounded text-[#0000c9]`}
            onMouseEnter={() => handleMouseEnter(setShowBuildDropdown, buildTimeoutRef)}
            onMouseLeave={() => handleMouseLeave(setShowBuildDropdown, buildTimeoutRef)}
        >
            <div className='sm:ml-3 text-xs sm:text-base flex flex-row gap-2 justify-between sm:justify-center items-center'>
                <Image src={generateAvatarFromAddress(address)} alt='' className='w-6 h-6 rounded-full' />
                {account ? account : ""}
            </div>
            <Image className='sm:flex hidden' alt='' src={DownIcon} />
            {showBuildDropdown &&
                <div 
                    className='absolute border border-gray-300 shadow-lg transition-opacity duration-300 opacity-100 hidden top-12 sm:flex flex-col p-2 justify-between w-48 bg-white rounded-xl right-0 z-10'
                    onMouseEnter={() => setIsMenuOpen(true)}
                    onMouseLeave={() => setIsMenuOpen(false)}
                >
                    {/* <div className='px-2 py-1 cursor-pointer hover:bg-slate-300'
                        onClick={(e) => {
                            e.stopPropagation();
                            window.open(`https://arthome.artela.network/arthome/MyAccount${registerCode ? `?R=${registerCode}` : ''}`, "_blank")
                        }}
                    >My Account</div> */}
                    {isConnected && <div className='px-2 py-1 hover:bg-slate-300 cursor-pointer' onClick={(e) => {
                        e.stopPropagation();
                        handleDisconnect();
                    }}>Logout</div>}
                </div>
            }
        </div>
    );
};

export default AccountButton;