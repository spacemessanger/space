'use client';

import { CldUploadButton, CldUploadWidgetResults } from 'next-cloudinary';
import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { 
    FieldValues, 
    SubmitHandler, 
    useForm 
} from "react-hook-form";
import { HiPaperClip } from "react-icons/hi";
import MessageInput from "./MessageInput";
import { HiPaperAirplane } from "react-icons/hi2";
import checkPageStatus from "@/app/utils/functions"


const Form = () => {

    const { conversationId } = useConversation();
    
    const {
        register,
        handleSubmit,
        setValue,
        formState: {
          errors,  
        }
    } = useForm<FieldValues>({

        defaultValues: {
            message: ''
        }
    });


    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue('message', '', { shouldValidate: true });
        axios.post('/api/messages', {
          ...data,
          conversationId
        }).then(() => {
          // Вызовите функцию checkPageStatus здесь
          checkPageStatus(data.message, localStorage.getItem("userName"));
        })
      };
    
  function handleUpload(result: any)  {
    axios.post('/api/messages', {
      image: result.info.secure_url,
      conversationId: conversationId
    }).then(() => {
      // Вызовите функцию checkPageStatus здесь
      checkPageStatus(result.info.secure_url, localStorage.getItem("userName"));
    })
  }

    return (

        <div 
        className="
        py-4 
        px-4 
        bg-white 
        border-t 
        flex 
        items-center 
        gap-2 
        lg:gap-4 
        w-full
      "    
        >

         <CldUploadButton

         options={{ maxFiles: 1 }} 
         onUpload={handleUpload}
         uploadPreset="tvaapid5"
       
      >

        <HiPaperClip size={30} className="text-gray-500" />

        </CldUploadButton>





        <form 
         onSubmit={handleSubmit(onSubmit)} 
         className="flex items-center gap-2 lg:gap-4 w-full"
        > 


         <MessageInput 
          id="message" 
          register={register} 
          errors={errors} 
          required 
          placeholder="Message"         
        />

         <button 
          type="submit" 
          className="
            rounded-full 
            p-2 
            bg-blue-500 
            cursor-pointer 
            hover:bg-blue-600 
            transition
          "
        >
          <HiPaperAirplane
            size={18}
            className="text-white"
          />
        </button>

      

        </form>

      


        </div>
    );
}

export default Form; 

