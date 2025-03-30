'use client'
import Image from 'next/image';
import DownIcon from "@/public/asset/vision/Header/DownIcon.svg"
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
    const search = useSearchParams();
    const registerCode = search.get('R');
    const { disconnect } = useDisconnect();
    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter();
    const menuRef = useRef<HTMLDivElement>(null);
    const { address,isConnected } = useAccount()

    const toggleMenu = () => {
        setIsFocused(!isFocused);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsFocused(false);
        }
    };

    useEffect(() => {
        if (isFocused) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isFocused]);

    const handleDisconnect = () => {
        disconnect();
    };

    return (
        <div
            ref={menuRef}
            className={`px-1 sm:pl-1 pr-2 py-2 flex flex-row gap-1 sm:gap-3 items-center h-8 sm:h-[42px] relative cursor-pointer text-white`}
            style={{ border: '1px solid #35354B', borderRadius: '37px' }}
            onClick={toggleMenu}
        >
            <div className='text-xs sm:text-base flex flex-row gap-2 justify-between sm:justify-center items-center'>
                <Image src={generateAvatarFromAddress(address)} alt='' className=' sm:w-8 w-6 sm:h-8 h-6 rounded-full' />
                {account ? account : ""}
            </div>
            <Image className='sm:flex hidden' alt='' src={DownIcon} />
            {isFocused &&
                <div className='absolute hidden top-12 sm:flex flex-col p-2 justify-between w-48 bg-custon-bg-100 rounded-xl right-0 z-10'>
                    {/* <div className='px-2 py-1 cursor-pointer text-white hover:bg-custon-bg-200'
                        onClick={(e) => {
                            e.stopPropagation(); // 阻止事件冒泡
                            window.open(`https://arthome.artela.network/arthome/MyAccount${registerCode ? `?R=${registerCode}` : ''}`, "_blank")
                            setIsFocused(false);
                        }}
                    >My Account</div> */}
                    {isConnected && <div className='px-2 py-1 hover:bg-custon-bg-200 text-white cursor-pointer' onClick={(e) => {
                        e.stopPropagation(); // 阻止事件冒泡
                        handleDisconnect();
                        setIsFocused(false);
                    }}>Logout</div>}
                </div>
            }
        </div>
    );
};

export default AccountButton;