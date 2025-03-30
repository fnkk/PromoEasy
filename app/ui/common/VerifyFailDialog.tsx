'use client'
import React, { useState } from 'react';
import { Checkbox } from "antd"
import type { CheckboxProps } from 'antd';
import FailSvg from "@/public/asset/vision/Issue/fail.svg"
import IssueSvg from "@/public/asset/vision/Issue/issue.svg"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { addPathParams } from '@/utils';
interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
}
// 提示规则： neverPrompt默认为0 为1永远不提示； nonPrompt为1，也不提示，任务组中，点击任意任务，把nonPrompt置为1；
const VerifyFailDialog: React.FC<DialogProps> = ({ isOpen, onClose }) => {
    const [isCheck, setIsCheck] = useState(false)
    const router = useRouter()
    const onChange: CheckboxProps['onChange'] = (e) => {
        setIsCheck(e.target.checked)
    };
    const search = useSearchParams()
    const registerCode = search.get('R')
    const handlerClick = () => {
        onClose()
    }
    if (!isOpen) return null;
    return (
        <div className="fixed bg-[#000000CC] inset-0 bg-opacity-50 flex justify-center items-center p-8 z-10">
            <div className="bg-[#161627] w-[300px] sm:w-[602px] p-7 mx-4 rounded-2xl flex items-center justify-center flex-col gap-4">
                <div className='w-full sm:w-[522px] flex flex-col items-center justify-center gap-3'>
                    <Image alt='' src={FailSvg} />
                    <h2 className="text-2xl font-bold mb-4">Verification Failed</h2>
                    <p className="mb-4 text-[#FFFFFF80] text-base w-full text-center">
                        Please verify after completing the Cornerstone Quests.If you have completed the quests, please wait
                    </p>
                </div>
                <div className='w-full flex justify-center items-center mt-4'>
                    <button
                        onClick={handlerClick}
                        className="w-[357px] h-[55px] rounded-[38px] bg-[#0000C9] text-white px-6 py-2 focus:outline-none focus:ring-4"
                    >
                        Got it
                    </button>
                </div>
                <div className='flex justify-center items-center gap-3 text-sm text-[#ED4E00] underline cursor-pointer'
                    onClick={() => router.push(addPathParams('/issue', registerCode))}
                >
                    <Image alt='' src={IssueSvg} />
                    Submit My Issues
                </div>
            </div>
        </div>
    );
};

export default VerifyFailDialog;