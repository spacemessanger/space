"use client";

import LoadingModal from "@/app/components/LoadingModal";
import Avatar from "@/app/components/sidebar/Avatar";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface UserBoxProps {
  data: User
}

import { BsPatchCheckFill } from "react-icons/bs";

const verifiedUsers = ["Mirabella@mail.ru", "space@space"];


const UserBox: React.FC<UserBoxProps> = ({
  data 
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = useCallback (() => {
    setIsLoading(true);

   axios.post('/api/conversations', {
    userId:data.id
   })
   .then((data) => {
    router.push(`/conversations/${data.data.id}`); 
   })
   .finally(() => setIsLoading(false));
  }, [data, router]);

  return(
    <>

    {isLoading && (
    <LoadingModal/>
    )}


  <div


   onClick={handleClick}
   className="
    w-full
    relative
    flex
    items-center 
    space-x-3 
   bg-white 
     p-3 
   hover:bg-neutral-100
     rounded-lg
    ransition
    cursor-pointer
   "  
  >
      <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
           <span className="absolute inset-0" aria-hidden="true" />
             <div className="flex justify-between items-center mb-1">
               <p className="text-sm font-medium text-gray-900"  style={{display: "flex", alignItems: "center"}}>
               {data.name}
               {verifiedUsers.includes(data.email!) && (

             <BsPatchCheckFill size="15" />)}

            </p>
          </div>
          </div>
        </div>
      </div>
     </>
  );
}
 
export default UserBox;

