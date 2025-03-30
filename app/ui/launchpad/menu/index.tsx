"use client"
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import icon1 from '@/public/launchpad/icon1.svg';
import icon2 from '@/public/launchpad/icon2.svg';
import icon3 from '@/public/launchpad/icon3.svg';

interface MenuItem {
  id: string;
  title: string;
  path: string;
  icon: string;
}

const menuItems: MenuItem[] = [
  {
    id: 'home',
    title: 'AI Agent Home',
    path: '/home',
    icon: icon1
  },
  {
    id: 'agents',
    title: 'My AI Agents',
    path: '/agents',
    icon: icon2
  }
];

const Menu: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  const [activeItem, setActiveItem] = useState('home');

  useEffect(() => {
    const pathSegments = pathname.split('/');
    const currentPath = pathSegments[pathSegments.length - 1] || 'home';
    setActiveItem(currentPath);
  }, [pathname]);

  const handleMenuClick = (itemId: string) => {
    router.push(`/launchpad/${itemId}`);
  };

  return (
    <div className="w-full bg-white mt-12 sm:mt-0 flex flex-col border-b border-gray-200 sm:w-64 sm:border-r sm:border-b-0">
      <nav className="flex-1 pt-4 overflow-x-auto sm:overflow-y-auto">
        <div className="flex sm:flex-col min-w-full px-2 sm:px-0">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`
                flex items-center px-2 py-2.5 cursor-pointer
                transition-colors duration-200 mx-2 rounded-lg
                gap-2 w-full sm:w-auto
                min-w-0
                ${activeItem === item.id 
                  ? 'bg-[#0000c9] text-white [&_img]:brightness-0 [&_img]:invert' 
                  : 'text-gray-700 hover:bg-gray-100 [&_img]:brightness-0'}
              `}
              onClick={() => handleMenuClick(item.id)}
            >
              <Image src={item.icon} alt={item.title} width={20} height={20} className="flex-shrink-0" />
              <span className="text-[12px] sm:text-base font-medium whitespace-nowrap truncate flex-1">{item.title}</span>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Menu;
