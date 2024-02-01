import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from 'react-icons/hi';
import { RiContactsBook2Line } from "react-icons/ri";
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2';
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";
import { MdOutlineLogout } from "react-icons/md";
import { RiChat1Line } from "react-icons/ri";



const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(() => [
    { 
      label: 'Chat', 
      href: '/conversations', 
      icon: RiChat1Line,
      active: pathname === '/conversations' || !!conversationId
    },
    { 
      label: 'Users', 
      href: '/users', 
      icon: RiContactsBook2Line, 
      active: pathname === '/users'
    },
    {
      label: 'Logout', 
      onClick: () => signOut(),
      href: '#',
      icon: MdOutlineLogout, 
    }
  ], [pathname, conversationId]);

  return routes;
};

export default useRoutes;

