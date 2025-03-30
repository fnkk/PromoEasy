import React from 'react';
import Image from 'next/image';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

interface CardProps {
    title?: string;
    description?: string;
    icon: string;
    isSelected?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
    index?: number;
    tooltip?: string;
}

const Card: React.FC<CardProps> = ({
    title,
    description,
    icon,
    isSelected = false,
    onClick,
    children,
    index,
    tooltip
}) => {
    return (
        <div
            className={`
        w-full rounded-xl p-4
        flex flex-col gap-3 cursor-pointer
        transition-all duration-200 ease-in-out
        bg-white
        border border-[#DFE5EA]
        sm:w-[900px] sm:rounded-2xl sm:p-6
        sm:gap-4
      `}
            onClick={onClick}
        >
           {index &&   <h3 className="text-lg font-semibold flex gap-2 items-center sm:text-xl">
             <div className='bg-[#0000c9] text-white rounded-full w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] flex justify-center items-center'>
                    {index}
                </div>
                {title}
                {tooltip && (
                    <div onClick={() => {
                        window.open("https://github.com/elizaOS/characters/blob/main/shaw.json", '_blank');
                    }}>

                        <Tooltip title={tooltip} >
                            <QuestionCircleOutlined className="text-gray-400 cursor-pointer" />
                        </Tooltip>
                    </div>
                )}
            </h3>}

            <p className={`text-xs sm:text-sm ${isSelected ? 'text-gray-200' : 'text-gray-600'}`}>
                {description}
            </p>
            {children}
        </div>
    );
};

export default Card;
