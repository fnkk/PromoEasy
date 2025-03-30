import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import SuccessSvg from '@/public/asset/common/success.svg';
import ErrorSvg from '@/public/asset/common/error.svg';

interface ToastProps {
    message: string;
    type?: string;
    duration?: number;  // duration in milliseconds
    isVisible: boolean;
    onClose: () => void;  // Function to set visibility
}

const Toast: React.FC<ToastProps> = ({ message, duration = 3000, isVisible, onClose, type = 'success' }) => {
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const Icon = () => {
        switch (type) {
            case 'success':
                return SuccessSvg;
            case 'error':
                return ErrorSvg;
            default:
                return SuccessSvg;
        }
    };

    useEffect(() => {
        if (isVisible) {
            timerRef.current = setTimeout(() => {
                onClose();
            }, duration);
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [isVisible, duration, onClose]);

    if (!isVisible) return null;

    return (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-gray-200 text-black py-2 px-4 rounded-md shadow-lg transition-opacity duration-300 ease-out">
            <div className='flex items-center justify-center gap-2'>
                <Image draggable={false} alt='' src={Icon()} />
                {message}
            </div>
        </div>
    );
};

export default Toast;