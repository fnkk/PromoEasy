'use client'
import VisionButton from "./VisionButton";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useDisconnect } from 'wagmi';
import AccountButton from "./AccountButton";
import { useSearchParams } from 'next/navigation';
import { track } from "@vercel/analytics";
const VisionConnectButton = () => {
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
                                    <VisionButton onClick={() => {
                                        openConnectModal()
                                        if (s == "okxwallet") {
                                            window.clarity("event","ConnectWalletFromOkx")
                                        }
                                    }}>
                                        <div className="font-medium text-xs sm:text-sm">
                                            Connect Wallet
                                        </div>
                                    </VisionButton>
                                );
                            }

                            if (chain.unsupported) {
                                return (
                                    <VisionButton onClick={openChainModal}>
                                        <div className="font-medium text-xs sm:text-sm">
                                            Wrong network
                                        </div>
                                    </VisionButton>
                                );
                            }

                            return (
                                <AccountButton account={account.displayName} balance={account.displayBalance} />
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    )
}
export default VisionConnectButton