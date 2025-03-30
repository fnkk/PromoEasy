'use client'
import Link from "next/link"
import Image from 'next/image';
import DownIcon from "@/public/home/downArrow.svg"
import DownIcon2 from "@/public/home/downArrow-blue.svg"
import { useState, useEffect, useRef } from 'react';
import { useRouter } from "next/navigation"
import Item from "antd/es/list/Item";

interface EarnItem {
    name: string;
    title: string;
    description: string;
    bg: string;
    target: string;
}

const data: EarnItem[] = [
    {
        name: "Community Earn",
        title: "Community Earn++",
        description: "Build a community with Aivinci and Star, and share community rewards.",
        bg: "bg-home-aivinci",
        target: "https://arthome.artela.network/arthome/earn"
    },
    {
        name: "Capila Planet",
        title: "Capila Planet",
        description: "Parallelizaion Era Live. Fair Mine for Artela Community Drops and Ecosystem dApp Drops",
        bg: "bg-home-capila",
        target: "https://arthome.artela.network/capila"
    },
    {
        name: "Explore Artela Ecosystem",
        title: "Explore Artela Ecosystem",
        description: "Discover a wide range of dapps and integrations now live on the Artela Ecosystem.",
        bg: "bg-head-earn-3",
        target: "https://arthome.artela.network/arthome/ecosystem"
    },
    {
        name: "Renaissance Quest++",
        title: "View Renaissance Quest",
        description: "Invite friends to got more chances.",
        bg: "bg-head-earn-4",
        target: "https://arthome.artela.network/arthome/stage"
    },
];

const Earn = () => {
    const router = useRouter()
    const [showBuildDropdown, setShowBuildDropdown] = useState<boolean>(false);
    const [hoveredItem, setHoveredItem] = useState<EarnItem>(data[0]);
    const buildTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (buildTimeoutRef.current) clearTimeout(buildTimeoutRef.current);
        setShowBuildDropdown(true);
    };

    const handleMouseLeave = () => {
        buildTimeoutRef.current = setTimeout(() => {
            setShowBuildDropdown(false);
        }, 100);
    };

    const handleItemHover = (item: EarnItem) => {
        setHoveredItem(item);
    };

    useEffect(() => {
        return () => {
            if (buildTimeoutRef.current) clearTimeout(buildTimeoutRef.current);
        };
    }, []);

    return (
        <div
            className="sm:flex hidden h-[42px] justify-center items-center py-3 px-6 group z-[60]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="cursor-pointer flex gap-1">
                <div className='text-xs sm:text-base group-hover:text-[#0000c9]'>
                    Earn
                </div>
                <Image alt='' src={showBuildDropdown ? DownIcon2 : DownIcon} />
            </div>
            {showBuildDropdown && (
                <div
                    className="absolute left-0 top-full py-6 w-full bg-white border border-gray-300 shadow-lg transition-opacity duration-300 opacity-100
                    flex justify-center gap-16 z-[60]"
                >
                    <div className="flex flex-col gap-4 justify-center">
                        {data.map((item, index) => (
                            <div
                                key={index}
                                className={`flex gap-3 items-center cursor-pointer group rounded transition-colors duration-300}`}
                                onMouseEnter={() => handleItemHover(item)}
                                onClick={() => {
                                    window.open(item.target)
                                    setShowBuildDropdown(false)
                                }}
                            >
                                <div className={`w-10 h-10 flex justify-center items-center font-medium rounded ${hoveredItem.name === item.name ? 'bg-[#0000c9] text-white' : 'bg-[#E6F4FF]'}`}>
                                    {String(index + 1).padStart(2, '0')}
                                </div>
                                <div className={`text-base font-bold ${hoveredItem!==item?'text-[#000000]':'text-[#0000c9]'} `}>
                                    {item.name}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div
                        className={`${hoveredItem.bg} w-[510px] h-[208px] bg-cover bg-center rounded-lg flex flex-col justify-end px-6 py-7 cursor-pointer`}
                        onClick={() => {
                            window.open(hoveredItem.target)
                            setShowBuildDropdown(false)
                        }}
                    >
                        <div className="text-[#F5FBFF] font-medium text-[32px] max-w-[357px]">
                            {hoveredItem.title}
                        </div>
                        <div className="text-[#FFFFFFB2] w-[334px]">
                            {hoveredItem.description}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Earn;