'use client'
import { useRouter } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import BackSvg from "@/public/asset/vision/Cornerstone/back-white.svg"

interface PropsType {
    tittle?: string
}

const BackButton: React.FC<PropsType> = ({ tittle }) => {
    const router = useRouter();

    const handleBack = () => {
        router.push('/aiagent');
    };

    return (
        <div className='h-[24px] -mt-60 sm:mt-20 sm:ml-24 2xl:ml-32 sm:h-[36px] z-20 mb-2 flex justify-start flex-row w-full max-w-[351px] sm:max-w-[1300px] 2xl:max-w-[1600px] items-s px-4 sm:px-0'>
            <button 
                className='text-base sm:text-xl font-bold sm:font-normal text-[#F5FBFF] flex justify-center items-center gap-2 sm:gap-3'
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