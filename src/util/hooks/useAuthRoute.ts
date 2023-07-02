import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react"

export const useAuthRoute = () => {
    const router = useRouter();
    const [ isAdmin, setIsAdmin ] = useState(false);

    try {
        axios.get('/api/get/session')
            .then(res => {
                if(res.data !== 'carrotpieOwO') {
                    setIsAdmin(false);
                } else {
                    setIsAdmin(true);
                }
            })
            .catch(error => {
                setIsAdmin(false);
            })

    } catch (error) {
        setIsAdmin(false);
        console.error('Error fetching session:', error);
    }

    
    const authRouting = () => {
        !isAdmin && router.replace('/')
    }


    return { authRouting, isAdmin }
}