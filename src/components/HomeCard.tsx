import { cn } from '@/lib/utils';
import Image from 'next/image'
import React from 'react'
import { CiTextAlignLeft } from "react-icons/ci";
import { PiUserSound } from "react-icons/pi";
import { FaRegImages } from "react-icons/fa6";
import { ImCopy } from "react-icons/im";
interface HomeCardProps {
  className?: string;
  icon: string;
  title: string;
  description: string;
  handleClick: () => void;
}

const HomeCard = ({icon, title, description, handleClick, className}: HomeCardProps) => {
    const icons = [ 
        {
            name: "CiTextAlignLeft",
            component: <CiTextAlignLeft size={35} color="#fff"/>
        },
        {
            name: "PiUserSound",
            component: <PiUserSound size={35} color="#fff"/>
        },
        {
            name: "FaRegImages",
            component: <FaRegImages size={35} color="#fff"/>
        },
        {
            name: "ImCopy",
            component: <ImCopy size={35} color="#fff"/>
        }
    ]
  return (
    <div 
    className={cn("bg-orange-1 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer",className)}
    onClick={handleClick}
     >
      <div className="flex items-center justify-center glassmorphism size-12 rounded-[10px]">
            {/* <Image
                src={img}
                width={27}
                height={27}
                alt="meeting"
            /> */}
            {icons.map((iconItem) => {
                if(iconItem.name === icon){
                    return iconItem.component
                }
            })}
            
        </div>
            <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">
                {title}
            </h1>
            <p className="text-lg font-normal">{description}</p>
            </div>
      </div>
  )
}

export default HomeCard
