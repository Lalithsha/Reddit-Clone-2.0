"use client"

import { FC, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";
import {signIn} from "next-auth/react"
import { Icons } from "./Icons";
import { useToast } from "@/hooks/use-toast";



// For passing props using the function react.html is function and html div is properties
interface UserAuthFormProps extends React.HtmlHTMLAttributes<HTMLDivElement>{}

const UserAuthForm:FC<UserAuthFormProps> =({className,...props})=>{

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {toast} = useToast()
    
    const loginWithGoogle = async ()=>{
        setIsLoading(true)

        try {
            await signIn('google')
        } catch (error) {
            // Toast notification
            toast({
                title: 'There was a problem.',
                description: 'There was an error logging in with Google',
                variant:'destructive' // As There is error so we are using destructive here.
            })
            
        } finally{
            setIsLoading(false);
        }
        
    }
    
    return(
        <div className={cn('flex justify-center', className )} {...props} >
            <Button onClick={loginWithGoogle} isLoading={isLoading} size='sm' className="w-full" >
                {isLoading ? null: <Icons.google className="h-4 w-4 mr-2" />}
                Google
            </Button>
        </div>
    )
}

export default UserAuthForm;

