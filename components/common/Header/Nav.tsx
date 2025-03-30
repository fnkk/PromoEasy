import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TransitionDiv from './TransitionDiv';
import downSvg from '@/public/common/downArrow.svg';

const Navbar: React.FC = () => {
    const [showBuildDropdown, setShowBuildDropdown] = useState<boolean>(false);
    const [showWhitepaperDropdown, setShowWhitepaperDropdown] = useState<boolean>(false);
    const [showExploreDropdown, setShowExploreDropdown] = useState<boolean>(false);
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

    const handleLinkClick = (e: React.MouseEvent, uri: string) => {
        e.preventDefault();
        window.parent.location.href = uri;
    };

    return (
        <div className="w-auto flex justify-end items-start gap-14 text-xl h-10 mr-40">
            {/* <TransitionDiv /> */}
            <div
                className="relative cursor-pointer h-full flex gap-2 items-center"
                onMouseEnter={() => handleMouseEnter(setShowBuildDropdown, buildTimeoutRef)}
                onMouseLeave={() => handleMouseLeave(setShowBuildDropdown, buildTimeoutRef)}
            >
                Build
                <Image alt="" src={downSvg} />
                {showBuildDropdown && (
                    <div
                        className="absolute top-full p-2 mt-2 w-48 rounded-lg bg-white border border-gray-300 shadow-lg transition-opacity duration-300 opacity-100"
                    >
                        <div
                            onClick={(e) => handleLinkClick(e, 'https://artela.network/build/intro-to-artela')}
                            className="block text-base px-2 py-2 text-black rounded-lg hover:bg-gray-200 cursor-pointer"
                        >
                            Intro to Artela
                        </div>
                        <div
                            onClick={(e) => handleLinkClick(e, 'https://artela.network/home-artela-frontier')}
                            className="block text-base px-2 py-2 text-black rounded-lg hover:bg-gray-200 cursor-pointer"
                        >
                            Artela Frontier
                        </div>
                        <div
                            onClick={(e) => handleLinkClick(e, 'https://artela.network/build/developer-portal')}
                            className="block text-base px-2 py-2 text-black rounded-lg hover:bg-gray-200 cursor-pointer"
                        >
                            Developer Portal
                        </div>
                        <div
                            onClick={(e) => handleLinkClick(e, 'https://docs.artela.network/develop')}
                            className="block text-base px-2 py-2 text-black rounded-lg hover:bg-gray-200 cursor-pointer"
                        >
                            Documentation
                        </div>
                    </div>
                )}
            </div>
            <div
                className="relative cursor-pointer h-full flex gap-2 items-center"
                onMouseEnter={() => handleMouseEnter(setShowExploreDropdown, exploreTimeoutRef)}
                onMouseLeave={() => handleMouseLeave(setShowExploreDropdown, exploreTimeoutRef)}
            >
                Explore
                <Image alt="" src={downSvg} />
                {showExploreDropdown && (
                    <div
                        className="absolute top-full p-2 mt-2 w-48 rounded-lg bg-white border border-gray-300 shadow-lg transition-opacity duration-300 opacity-100"
                    >
                        <div
                            onClick={(e) => handleLinkClick(e, 'https://artela.network/explore/aspect-hub')}
                            className="block text-base px-2 py-2 text-black rounded-lg hover:bg-gray-200 cursor-pointer"
                        >
                            Aspect Hub
                        </div>
                        <div
                            onClick={(e) => handleLinkClick(e, 'https://artela.notion.site/Artela-Community-Center-31ee85ab3cbb45f1b59fb58093313e26')}
                            className="block text-base px-2 py-2 text-black rounded-lg hover:bg-gray-200 cursor-pointer"
                        >
                            Community Center
                        </div>
                    </div>
                )}
            </div>
            <div
                className="relative cursor-pointer h-full flex gap-2 items-center"
                onMouseEnter={() => handleMouseEnter(setShowWhitepaperDropdown, whitepaperTimeoutRef)}
                onMouseLeave={() => handleMouseLeave(setShowWhitepaperDropdown, whitepaperTimeoutRef)}
            >
                Whitepaper
                <Image alt="" src={downSvg} />
                {showWhitepaperDropdown && (
                    <div
                        className="absolute top-full p-2 mt-2 w-48 rounded-lg bg-white border border-gray-300 shadow-lg transition-opacity duration-300 opacity-100"
                    >
                        <div
                            onClick={(e) => handleLinkClick(e, 'https://github.com/artela-network/aspect-whitepaper/blob/main/latex/build/whitepaper.pdf')}
                            className="block text-base px-2 py-2 text-black rounded-lg hover:bg-gray-200 cursor-pointer"
                        >
                            Aspect Whitepaper
                        </div>
                        <div
                            onClick={(e) => handleLinkClick(e, 'https://github.com/artela-network/artela-scalability-whitepaper/blob/main/latex/build/Artela-scalability-whitepaper.pdf')}
                            className="block text-base px-2 py-2 text-black rounded-lg hover:bg-gray-200 cursor-pointer"
                        >
                            Scalability Whitepaper
                        </div>
                    </div>
                )}
            </div>
            <div
                onClick={(e) => handleLinkClick(e, 'https://artela.network/blog')}
                className="h-full cursor-pointer flex items-center"
            >
                Blog
            </div>
        </div>
    );
};

export default Navbar;