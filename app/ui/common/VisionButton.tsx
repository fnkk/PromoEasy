"use client"
import { Button } from "antd";
import Image from "next/image";
import ConnectLogo from "@/public/asset/vision/ConnectLogo.svg"
import ConnectHoverLogo from "@/public/asset/vision/ConnectHoverLogo.svg"
import { useState } from "react";
interface PropType {
    children: React.ReactNode
    buttonProp?: any
    onClick?: () => void
}

const VisionButton = ({ children, buttonProp, onClick }: PropType) => {
    const [isHovering, setIsHovering] = useState(false);
    return (
        <button className={'flex gap-1 sm:gap-3 justify-center items-center bg-white text-black h-8 sm:h-[42px] sm:w-[167px] px-1'}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={onClick} {...buttonProp} style={{ borderRadius: '37px' }}>
            <Image draggable={false} src={isHovering ? ConnectHoverLogo : ConnectLogo} alt=""></Image>
            {children}
        </button>
    );
};

export default VisionButton;
