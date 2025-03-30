"use client"
import React, { createContext, useState, useContext, ReactNode } from 'react';

// 定义上下文的类型
interface OkxContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleIsOpen: () => void;
  isOpen2: boolean;
  setIsOpen2: React.Dispatch<React.SetStateAction<boolean>>;
  toggleIsOpen2: () => void;
  isOpen3: boolean;
  setIsOpen3: React.Dispatch<React.SetStateAction<boolean>>;
  toggleIsOpen3: () => void;
  isOpen4: boolean;
  setIsOpen4: React.Dispatch<React.SetStateAction<boolean>>;
  toggleIsOpen4: () => void;
  isOpen5: boolean;
  setIsOpen5: React.Dispatch<React.SetStateAction<boolean>>;
  toggleIsOpen5: () => void;
  isOpentrusta1: boolean;
  setIsOpentrusta1: React.Dispatch<React.SetStateAction<boolean>>;
  toggleIsOpentrusta1: () => void;
  isOpentrusta2: boolean;
  setIsOpentrusta2: React.Dispatch<React.SetStateAction<boolean>>;
  toggleIsOpentrusta2: () => void;
  isOpentrusta3: boolean;
  setIsOpentrusta3: React.Dispatch<React.SetStateAction<boolean>>;
  toggleIsOpentrusta3: () => void;
  isOpenTaskon1: boolean;
  setIsOpenTaskon1: React.Dispatch<React.SetStateAction<boolean>>;
  toggleIsOpenTaskon1: () => void;
  isOpenTaskon2: boolean;
  setIsOpenTaskon2: React.Dispatch<React.SetStateAction<boolean>>;
  toggleIsOpenTaskon2: () => void;
  isOpenMuaDao1: boolean;
  setIsOpenMuaDao1: React.Dispatch<React.SetStateAction<boolean>>;
  toggleIsOpenMuaDao1: () => void;
  isOpenMuaDao2: boolean;
  setIsOpenMuaDao2: React.Dispatch<React.SetStateAction<boolean>>;
  toggleIsOpenMuaDao2: () => void;
  isOpenMuaDao3: boolean;
  setIsOpenMuaDao3: React.Dispatch<React.SetStateAction<boolean>>;
  toggleIsOpenMuaDao3: () => void;
  trustaDialogType: 'loading' | 'success' | 'repeat' | 'tip' | 'error';
  setTrustaDialogType: React.Dispatch<React.SetStateAction<'loading' | 'success' | 'repeat' | 'tip' | 'error'>>;
  taskonDialogType: 'loading' | 'success' | 'repeat' | 'tip' | 'error';
  setTaskonDialogType: React.Dispatch<React.SetStateAction<'loading' | 'success' | 'repeat' | 'tip' | 'error'>>;
  CampDialogType1: 'aivinci' | 'miche';
  setCampDialogType1: React.Dispatch<React.SetStateAction<'aivinci' | 'miche'>>;
  CampDialogType2: 'loading' | 'success' | 'repeat' | 'tip' | 'error';
  setCampDialogType2: React.Dispatch<React.SetStateAction<'loading' | 'success' | 'repeat' | 'tip' | 'error'>>;
  openCaptcha: boolean;
  setOpenCaptcha: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenArtFarm1: boolean;
  setIsOpenArtFarm1: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenArtFarm2: boolean;
  setIsOpenArtFarm2: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenCamp1: boolean;
  setIsOpenCamp1: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenCamp2: boolean;
  setIsOpenCamp2: React.Dispatch<React.SetStateAction<boolean>>;
}

// 创建上下文
const OkxContext = createContext<OkxContextType | undefined>(undefined);

// 创建提供者组件的类型
interface OkxProviderProps {
  children: ReactNode;
}

// 创建提供者组件
export const OkxProvider: React.FC<OkxProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 切换 isOpen 的方法
  const toggleIsOpen = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
  const [isOpen2, setIsOpen2] = useState<boolean>(false);

  // 切换 isOpen 的方法
  const toggleIsOpen2 = () => {
    setIsOpen2((prevIsOpen) => !prevIsOpen);
  };
  const [isOpen3, setIsOpen3] = useState<boolean>(false);

  // 切换 isOpen 的方法
  const toggleIsOpen3 = () => {
    setIsOpen3((prevIsOpen) => !prevIsOpen);
  };
  const [isOpen4, setIsOpen4] = useState<boolean>(false);

  // 切换 isOpen 的方法
  const toggleIsOpen4 = () => {
    setIsOpen4((prevIsOpen) => !prevIsOpen);
  };

  const [isOpen5, setIsOpen5] = useState<boolean>(false);

  // 切换 isOpen 的方法
  const toggleIsOpen5 = () => {
    setIsOpen5((prevIsOpen) => !prevIsOpen);
  };
  const [isOpentrusta1, setIsOpentrusta1] = useState<boolean>(false);

  // 切换 isOpen 的方法
  const toggleIsOpentrusta1 = () => {
    setIsOpentrusta1((prevIsOpen) => !prevIsOpen);
  };
  const [isOpentrusta2, setIsOpentrusta2] = useState<boolean>(false);

  // 切换 isOpen 的方法
  const toggleIsOpentrusta2 = () => {
    setIsOpentrusta2((prevIsOpen) => !prevIsOpen);
  };
  const [isOpentrusta3, setIsOpentrusta3] = useState<boolean>(false);

  // 切换 isOpen 的方法
  const toggleIsOpentrusta3 = () => {
    setIsOpentrusta3((prevIsOpen) => !prevIsOpen);
  };

  const [isOpenMuaDao1, setIsOpenMuaDao1] = useState<boolean>(false);

  // 切换 isOpen 的方法
  const toggleIsOpenMuaDao1 = () => {
    setIsOpenMuaDao1((prevIsOpen) => !prevIsOpen);
  };
  const [isOpenMuaDao2, setIsOpenMuaDao2] = useState<boolean>(false);

  // 切换 isOpen 的方法
  const toggleIsOpenMuaDao2 = () => {
    setIsOpenMuaDao2((prevIsOpen) => !prevIsOpen);
  };
  const [isOpenMuaDao3, setIsOpenMuaDao3] = useState<boolean>(false);

  // 切换 isOpen 的方法
  const toggleIsOpenMuaDao3 = () => {
    setIsOpenMuaDao3((prevIsOpen) => !prevIsOpen);
  };


  const [isOpenArtFarm1, setIsOpenArtFarm1] = useState<boolean>(false);
  const [isOpenArtFarm2, setIsOpenArtFarm2] = useState<boolean>(false);

  const [isOpenCamp1, setIsOpenCamp1] = useState<boolean>(false);
  const [isOpenCamp2, setIsOpenCamp2] = useState<boolean>(false);

  const [CampDialogType1, setCampDialogType1] = useState<'aivinci' | 'miche'>('aivinci');
  const [CampDialogType2, setCampDialogType2] = useState<'loading' | 'success' | 'repeat' | 'tip' | 'error'>('loading');

  const [trustaDialogType, setTrustaDialogType] = useState<'loading' | 'success' | 'repeat' | 'tip' | 'error'>('loading');
  const [taskonDialogType, setTaskonDialogType] = useState<'loading' | 'success' | 'repeat' | 'tip' | 'error'>('loading');

  const [openCaptcha, setOpenCaptcha] = useState<boolean>(false);

  const [isOpenTaskon1, setIsOpenTaskon1] = useState<boolean>(false);

  // 切换 isOpen 的方法
  const toggleIsOpenTaskon1 = () => {
    setIsOpenTaskon1((prevIsOpen) => !prevIsOpen);
  };
  const [isOpenTaskon2, setIsOpenTaskon2] = useState<boolean>(false);

  // 切换 isOpen 的方法
  const toggleIsOpenTaskon2 = () => {
    setIsOpenTaskon2((prevIsOpen) => !prevIsOpen);
  };

  return (
    <OkxContext.Provider value={{
      isOpen, setIsOpen, toggleIsOpen, isOpen2, setIsOpen2, toggleIsOpen2, isOpen3, setIsOpen3, toggleIsOpen3, isOpen4, setIsOpen4, toggleIsOpen4, isOpen5, setIsOpen5, toggleIsOpen5,
      isOpentrusta1, setIsOpentrusta1, toggleIsOpentrusta1, isOpentrusta2, setIsOpentrusta2, toggleIsOpentrusta2, isOpentrusta3, setIsOpentrusta3, toggleIsOpentrusta3,
      isOpenMuaDao1, setIsOpenMuaDao1, toggleIsOpenMuaDao1, isOpenMuaDao2, setIsOpenMuaDao2, toggleIsOpenMuaDao2, isOpenMuaDao3, setIsOpenMuaDao3, toggleIsOpenMuaDao3,
      trustaDialogType, setTrustaDialogType, taskonDialogType, setTaskonDialogType, openCaptcha, setOpenCaptcha,
      isOpenTaskon1,
      setIsOpenTaskon1,
      toggleIsOpenTaskon1,
      isOpenTaskon2,
      setIsOpenTaskon2,
      toggleIsOpenTaskon2,
      isOpenArtFarm1,
      setIsOpenArtFarm1,
      isOpenArtFarm2,
      setIsOpenArtFarm2,
      isOpenCamp1,
      setIsOpenCamp1,
      isOpenCamp2,
      setIsOpenCamp2,
      CampDialogType1,
      setCampDialogType1,
      CampDialogType2,
      setCampDialogType2,

    }}>
      {children}
    </OkxContext.Provider>
  );
};

// 创建一个钩子来使用 OkxContext
export const useOkxContext = () => {
  const context = useContext(OkxContext);
  if (!context) {
    throw new Error('useOkxContext must be used within an OkxProvider');
  }
  return context;
};