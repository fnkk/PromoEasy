'use client'
import Image from "next/image"
import StoneSvg from '@/public/asset/vision/Header/stone.svg'
import CrystalSvg from '@/public/asset/vision/Header/crystal.svg'
import { usePointContext } from "@/context/PointContext"
import { useMutation } from "@tanstack/react-query"
import { getPointByAccount } from "@/app/api/cornerstone"
import ExclamationSvg from '@/public/asset/vision/Header/exclamation.svg'
import { useAccount, useAccountEffect } from "wagmi"
import { useEffect } from "react"
import { Tooltip } from "antd"
const Point = () => {
    const { state, setUser } = usePointContext();
    const { address, isConnected } = useAccount();
    const pointQuery = useMutation({
        mutationFn: (variables: { account: string }) => {
            return getPointByAccount(variables.account);
        },
        onSuccess: (data) => {
            setUser(data.data)
            localStorage.setItem('isWhite', data.data.isWhite.toString());
        }
    })
    useAccountEffect({
        onConnect(data) {
            // console.log('Connected!', data)
            // pointQuery.mutate({ account: data.address })
        },
        onDisconnect() {
            setUser({
                id: null,
                gmtCreated: null,
                walletAddress: null,
                stone: 0,
                crystal: 0,
                inviteCode: '',
                inviteCount: 0,
                inviteLimit: "20",
                bonusPercent: 0,
                extension: { neverPrompt: '0', nonPrompt: '0', s: undefined, }
            })
        }
    })
    useEffect(() => {
        if (address) {
            pointQuery.mutate({ account: address })
        }
    }, [address])
    const formatNumberWithCommas = (number: number | string | undefined | null): string => {
        if (number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        else {
            return '0'
        }
    }
    return (
        <div className={`sm:min-w-[200px] sm:w-auto w-[170px] h-[32px] sm:h-[42px] py-2 hidden flex-row text-white items-center`} style={{ border: '1px solid #35354B', borderRadius: '25px' }}>

            <Tooltip title={<div>
                <div className=" font-bold text-sm">$Stone</div>
                <div className="text-sm">Complete cornorstone quest to claim.</div>
            </div>} color="#3C3C6E">

                <div className="flex-1 sm:px-5 px-2 flex h-5 flex-row justify-start gap-1" style={{ borderRight: '1px solid #35354B' }}>
                    <Image draggable={false} alt="" src={StoneSvg} />
                    <div className="text-xs sm:text-base flex items-center">
                        {formatNumberWithCommas(state.user?.stone)}
                    </div>
                    <Image className="mx-[3px]" draggable={false} alt="" src={ExclamationSvg} />
                </div>
            </Tooltip>
            <Tooltip title={<div>
                <div className=" font-bold text-sm">$Crystal</div>
                <div className="text-sm">Chat with Ai Vinci or refer your friends to claim</div>
            </div>} color="#3C3C6E">
                <div className="flex-1 sm:px-5 px-2 flex h-5 flex-row justify-start gap-1">
                    <Image draggable={false} alt="" src={CrystalSvg} />
                    <div className="text-xs sm:text-base flex items-center">
                        {formatNumberWithCommas(state.user?.crystal)}
                    </div>
                    <Image className="mx-[3px]" draggable={false} alt="" src={ExclamationSvg} />
                </div>
            </Tooltip>
        </div>
    )
}
export default Point