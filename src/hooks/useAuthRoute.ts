import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

async function getSession () {
    try {
        const res = await axios.get('/api/get/session')
            
        if(res.data === 'carrotpieOwO') {
            return res.data
        } else {
            return false
        }
    } catch (error) {
        console.error('Error fetching session:', error);
        return false
    }
}

export const useAuthRoute = () => {
    const router = useRouter();
    const [ isAdmin, setIsAdmin ] = useState(false);

    useEffect(() => {
        async function isAdminession() {
            const res = await getSession();

            if(res) {
                setIsAdmin(true)
            } else {
                setIsAdmin(false)
            }
        }
        isAdminession();
    }, [])
    
    const authRouting = async () => {
        const res = await getSession()
        !res && router.replace('/')
    }

    return { authRouting, isAdmin }
}