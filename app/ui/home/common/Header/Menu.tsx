// components/Menu.tsx
import MenuCloseSvg from "@/public/FAQ/menu-colse-black.svg";
import MenuSvg from "@/public/FAQ/menu-black.svg";
import Image from "next/image";
import { useDisconnect } from 'wagmi';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useSearchParams } from 'next/navigation';
import { addPathParams } from '@/utils';
import RightArrow from "@/public/home/rightArrow.svg"
import { Tooltip } from "@nextui-org/react";

const Menu = () => {

    const search = useSearchParams()
    const registerCode = search.get('R')
    const router = useRouter()
    const [isFold, setIsFold] = useState<boolean>(true);
    const { disconnect } = useDisconnect();
    const handleDisconnect = () => {
        toggleMenu()
        disconnect();
    };
    const toggleMenu = () => {
        setIsFold(!isFold);
    };

    return (
        <div className="sm:hidden relative z-[99]">
            <Image
                alt="Toggle Menu"
                src={isFold ? MenuSvg : MenuCloseSvg}
                onClick={toggleMenu}
                className="cursor-pointer"
            />
            <div className={`fixed top-[54px] z-[9999] right-0 w-full h-full bg-[#FFF] transition-transform duration-500 ease-in-out ${isFold ? 'translate-x-full' : 'translate-x-0'}`}>
                <div className="w-full flex justify-center py-5">
                    <div className="w-[351px] flex flex-col gap-6">
                        <p className="text-base flex justify-between cursor-pointer"
                            onClick={
                                () => {
                                    window.open(`https://arthome.artela.network/arthome/earn${registerCode ? `?R=${registerCode}` : ''}`);
                                    toggleMenu()
                                }
                            }
                        >
                            Community Earn <Image alt="" src={RightArrow} />
                        </p>
                   
                        <p className="text-base flex justify-between cursor-pointer"
                            onClick={
                                () => {
                                    window.open(`https://arthome.artela.network/arthome/ecosystem${registerCode ? `?R=${registerCode}` : ''}`);
                                    toggleMenu()
                                }
                            }
                        >
                            Dapp Center <Image alt="" src={RightArrow} />
                        </p>
                        <p className="text-base flex justify-between cursor-pointer"
                            onClick={
                                () => {
                                    window.open(`https://arthome.artela.network/arthome/MyAccount${registerCode ? `?R=${registerCode}` : ''}`);
                                    toggleMenu()
                                }
                            }
                        >
                            My Account <Image alt="" src={RightArrow} />
                        </p>
                        <p className="text-base flex justify-between cursor-pointer"
                            onClick={
                                () => {
                                    window.open("https://artela.network/blog/your-guide-to-artela-renaissance-campaign")
                                    toggleMenu()
                                }
                            }
                        >Guide <Image alt="" src={RightArrow} /></p>
                        <p className="text-base flex justify-between cursor-pointer"
                            onClick={
                                () => {
                                    window.open(`https://arthome.artela.network/arthome/FAQ${registerCode ? `?R=${registerCode}` : ''}`);
                                    toggleMenu()
                                }
                            }
                        >FAQ <Image alt="" src={RightArrow} /></p>
                        {/* <Tooltip content={<div className="px-1 py-2 text-base">Coming soon</div>} color="primary">
                            <p className="text-base flex justify-between cursor-pointer">
                                Bridge <Image alt="" src={RightArrow} />
                            </p>
                        </Tooltip>
                        <Tooltip content={<div className="px-1 py-2"><div className="text-lg font-bold">October 8</div><div className="text-base">Get ready to stake and earn!</div></div>} color='primary'>
                            <p className="text-base flex justify-between cursor-pointer">
                                Stake <Image alt="" src={RightArrow} />
                            </p>
                        </Tooltip> */}
                        <p className="text-base flex justify-between cursor-pointer"
                            onClick={handleDisconnect}
                        >Logout <Image alt="" src={RightArrow} /></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;