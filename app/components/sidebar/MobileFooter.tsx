'use client';

import { useState } from "react";
import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import MobileItem from "./MobileItem";
import Avatar from "./Avatar";
import { User } from "@prisma/client";
import MobileSettingsModal from "./MobileSettingsModal";
import { Transition } from "@headlessui/react"; // импортируем компонент Transition из библиотеки @headlessui/react

interface MobileFooterProps {

  currentUser: User
}

const MobileFooter: React.FC <MobileFooterProps> = ({
  currentUser
}) => {

  const routes = useRoutes();
  const { isOpen } = useConversation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  console.log({ currentUser })

  if (isOpen) {
    return null;
  }
  
  return ( 
    
    <div 
      className="
        fixed 
        justify-between 
        w-full 
        bottom-0 
        z-40 
        flex 
        items-center 
        bg-white 
        border-t-[1px] 
        lg:hidden
        
      "
    >

           
              <div
                 onClick={() => setIsSidebarOpen(true)} 
               className="
                  cursor-pointer
                  hover-opacity-75

                  gap-x-1
                  leading-3
                  font-semibold 
                  w-center 
                  justify-center 
                   p-2
                   text-gray-500
                  hover:text-black 
                 hover:bg-gray-100 
               "
              
              >
                <Avatar user={currentUser}  />

              </div>

            


      {routes.map((route) => (
        <MobileItem 
          key={route.href} 
          href={route.href} 
          active={route.active} 
          icon={route.icon}
          onClick={route.onClick}
        />

        
      ))}

<Transition show={isSidebarOpen}> 
  <MobileSettingsModal currentUser={currentUser} onClose={() => setIsSidebarOpen(false)} image={""} />
</Transition> 

    </div>    

    
   );
}
 
export default MobileFooter;
