'use client'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from "antd"
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { addPathParams } from '@/utils';
export default function Home() {
  const router = useRouter();
  const search = useSearchParams()
  const registerCode = search.get('R')
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 p-24">
      <h2 className='text-2xl'>Artela Renaissance</h2>
      <div>choose your mode</div>
      <ConnectButton />
      <div className='flex flex-row justify-center items-center gap-16 w-full'>
        <div className='flex justify-start flex-col gap-12'>e-beggar mode
          <Button type='primary' onClick={() => router.push(addPathParams('/e-beggar', registerCode))}>Join</Button>
        </div>
        <div className='flex justify-start flex-col gap-12'>vision mode
          <Button type='primary' onClick={() => router.push(addPathParams('/vision', registerCode))}>Join2</Button>
        </div>
      </div>
    </main>
  );
}
