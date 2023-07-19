"use client"
import React from "react";
import {MdArrowBack} from 'react-icons/md'
import { useRouter } from "next/navigation";

const NavigateBackButton = () => {
    const router = useRouter();
  return (
    <>
    <div className='w-fit px-5'>
        <button onClick={()=>router.back()} className="px-3 py-2 flex items-center justify-around bg-blue-500 text-white rounded-lg"> <MdArrowBack/>&nbsp;Back</button>
    </div>
      
    </>
  );
};

export default NavigateBackButton;
