import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

interface HomeCardProp{
  className:string,
  img:string,
  title:string,
  description:string,
  handleClick:()=>void,
}

function HomeCard({img,className,title,description,handleClick}:HomeCardProp) {
  return (
    <div className={cn(className,"cursor-pointer px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px]")}
      onClick={handleClick}
      >
        <div className="flex-center glassmorphism size-12 rounded-[10px]">
            <Image
            src={img}
            alt={title}
            height={27}
            width={27}
            />
        </div>
        <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-lg font-normal">{description}</p>
        </div>
      </div>
  )
}

export default HomeCard