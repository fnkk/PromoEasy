import { keccak256, isAddress, toUtf8Bytes } from 'ethers';
import Avatar1 from "@/public/enlightenment/vinci/avatar1.svg"
import Avatar2 from "@/public/enlightenment/vinci/avatar2.svg"
import Avatar3 from "@/public/enlightenment/vinci/avatar3.svg"
import Avatar4 from "@/public/enlightenment/vinci/avatar4.svg"
import Avatar5 from "@/public/enlightenment/vinci/avatar5.svg"
const avatars = [Avatar1, Avatar2, Avatar3, Avatar4, Avatar5];
export const formatNumberWithCommas = (number: number | string | undefined | null): string => {
    if (number) {

        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    else {
        return '0'
    }
}
export function formatEthereumAddress(address: string, fronNum: number = 6, backNum: number = 6): string {
    // 确保地址是有效的以太坊地址
    if (!address || address.length !== 42 || !address.startsWith('0x')) {
        return ''
    }
    // 截取地址的前4个字符和后4个字符，中间加上省略号
    return `${address.slice(0, fronNum)}...${address.slice(-1 * backNum)}`;
}
export function formatEthereumHash(address: string, fronNum: number = 6, backNum: number = 6): string {
    // 截取地址的前4个字符和后4个字符，中间加上省略号
    return `${address.slice(0, fronNum)}...${address.slice(-1 * backNum)}`;
}

export function convertAddressToLowercase(address: string): string {
    return address.toLowerCase();
}

export function addPathParams(destination: string, pathParams: string | null | undefined) {
    if (!pathParams) {
        return destination
    } else {
        return `${destination}?R=${pathParams}`
    }
}

export function isOkxWallet(value: string | undefined): boolean {
    if (value === undefined) {
        return false;
    }
    return value.toLowerCase() === 'okxwallet';
}

export const isMobile = () => {
    if (typeof window !== 'undefined') {
        return /Mobi|Android/i.test(navigator.userAgent);
    }
    return false;
};

export function generateAvatarFromAddress(address: string | undefined): string {
    if (!isAddress(address)) {
        return avatars[0]
    }

    // Compute the keccak256 hash of the address
    const hash = keccak256(toUtf8Bytes(address.toLowerCase()));

    // Convert the hash to a BigInt and map it to an index between 0 and 4
    const bigIntHash = BigInt(hash);
    const index = Number(bigIntHash % BigInt(avatars.length));

    return avatars[index];
}