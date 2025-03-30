import React from 'react';
import Image from 'next/image';
import FinishSvg from '@/public/asset/finish.svg'
interface FanShapeProps {
  fraction: number; // 小数（0 到 1 之间）
}

const FanShape: React.FC<FanShapeProps> = ({ fraction }) => {
  const angle = 360 * fraction;
  const largeArcFlag = angle > 180 ? 1 : 0;

  const x = 50 + 50 * Math.cos((2 * Math.PI * fraction) - (Math.PI / 2));
  const y = 50 + 50 * Math.sin((2 * Math.PI * fraction) - (Math.PI / 2));

  const pathData = `
    M 50,50
    L 50,0
    A 50,50 0 ${largeArcFlag},1 ${x},${y}
    Z
  `;
if(fraction == 1) {
  return <Image alt='' src={FinishSvg}/>
}
  return (
    <div className='border-2 border-[#FFFFFF4D] rounded-[50%] w-6 h-6 flex justify-center items-center sm:mt-[2px]'>
      <div className="relative w-4 h-4 ">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
        >
          <path
            d={pathData}
            fill="#ED4E01"
          />
        </svg>
      </div>
    </div>

  );
};

export default FanShape;