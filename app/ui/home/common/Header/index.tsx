'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import VisionConnectButton from "../ConnectButton/VisionConnectButton";
import { useRouter, useSearchParams } from "next/navigation";
import LogoPng from "./logo.png"
import wordPng from "./word.png"
import { useAuth0 } from "@auth0/auth0-react";
export default function Header() {
    const router = useRouter()
    const {
        user,
        isAuthenticated,
        loginWithRedirect,
        logout,
    } = useAuth0();
    const handleClick = () => {
        router.push('/')
    };

    return (
        <div className="w-full flex flex-row bg-white justify-center sm:justify-between items-center h-[54px] sm:h-[88px] border-[#0000141A] border-b-1 sm:px-2 fixed sm:relative top-0 z-[99]">
            <div className="w-[351px] sm:w-full flex flex-row justify-between items-center h-[54px] sm:h-[88px] pr-10">
                <div className="sm:w-1/4 flex justify-start ml-2">
                    <div className=" hidden sm:flex flex-row h-full items-center cursor-pointer gap-2" onClick={handleClick}>
                        <div className="flex justify-center items-center h-full">
                            <Image draggable={false} alt="" src={LogoPng} width={50} height={50} />
                            <Image draggable={false} alt="" src={wordPng} width={200} height={70} />
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        id="qsLoginBtn"
                        color="primary"
                        className="btn-margin"
                        onClick={() => loginWithRedirect()}
                    >
                        Log in
                    </button>
                </div>
                <div className="sm:w-3/4 flex justify-end items-center sm:mr-2">
                    <VisionConnectButton />
                </div>
            </div>
        </div>
    );
}