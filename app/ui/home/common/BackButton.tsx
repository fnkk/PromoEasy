'use client'
import { useRouter } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import BackSvg from "@/public/asset/vision/Cornerstone/back-home.svg"

interface PropsType {
    tittle?: string
}

const BackButton: React.FC<PropsType> = ({ tittle }) => {
    const router = useRouter();

    const handleBack = () => {
        window.open("https://artela.network/", "_blank")
    };

    return (
        <div className='absolute top-0 z-20 sm:left-5 left-1 h-[24px] sm:h-[36px] mt-4 mb-2 flex justify-start flex-row w-full max-w-[351px] sm:max-w-[1300px] items-s px-4 sm:px-0'>
            <button 
                className='text-base sm:text-xl font-bold sm:font-normal text-black sm:text-[#00000080] flex justify-center items-center gap-2 sm:gap-3'
                onClick={handleBack}
            >
                <Image className='w-6 sm:w-8' alt='Back' src={BackSvg} />
                <span className='sm:hidden'>{tittle || "Back"}</span>
                <span className='hidden sm:inline'>Back</span>
            </button>
        </div>
    );
}

export default BackButton;