'use client'
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useDisconnect } from 'wagmi';
import AccountButton from "./AccountButton";
import { useSearchParams } from 'next/navigation';
import React from 'react';

interface CommonConnectButtonProps {
    CustomButton: React.ComponentType<{ onClick: () => void; children: React.ReactNode }>;
    CustomConnectedButton: React.ComponentType<{ onClick: () => void; children: React.ReactNode }>;
}

const CommonConnectButton: React.FC<CommonConnectButtonProps> = ({ CustomButton, CustomConnectedButton }) => {
    const { disconnect } = useDisconnect();
    const search = useSearchParams()
    const s = search.get('s')
    const handleDisconnect = () => {
        disconnect();
    };
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                        authenticationStatus === 'authenticated');

                return (
                    <div
                        {...(!ready && {
                            'aria-hidden': true,
                            'style': {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <CustomButton onClick={openConnectModal}>
                                        <div className="font-medium sm:text-[16px] text-[14px]">
                                            Connect Wallet
                                        </div>
                                    </CustomButton>
                                );
                            }

                            if (chain.unsupported) {
                                return (
                                    <CustomButton onClick={openChainModal}>
                                        <div className="font-medium">
                                            Wrong network
                                        </div>
                                    </CustomButton>
                                );
                            }

                            return (
                                <CustomConnectedButton onClick={handleDisconnect}>
                                    <div className="font-medium sm:text-[16px] text-[14px]">
                                        Disconnect
                                    </div>
                                </CustomConnectedButton>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    )
}
export default CommonConnectButton