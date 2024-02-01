
import React from "react";
import { GiMagicHat } from "react-icons/gi";
import Image from "next/image";

const EmptyState = () => {
    return ( 
      <div 
        className="
          px-4 
          py-10 
          sm:px-6 
          lg:px-8 
          lg:py-6 
          h-full 
          flex 
          justify-center 
          items-center 
          bg-gray-100
        "
      >
        <div className="text-center items-center flex flex-col">
          <h3 className="mt-2 text-2xl font-semibold text-gray-900">
               <Image 
              alt="Logo"
             height="60"
             width="60"
             className="mx-auto w-auto"
             src="/images/conversation.png"
                />

               Choose a chat or start a new conversation
            
          </h3>
        </div>
      </div>
    );
  }
   
  export default EmptyState;
