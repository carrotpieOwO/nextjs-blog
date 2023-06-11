import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react"

export const useAuthRoute = () => {
    const router = useRouter();
    useEffect(() => {
        try {
            axios.get('/api/get/session')
                .then(res => {
                    if(res.data !== 'carrotpieOwO') {
                        router.replace('/')
                    } else {
                        return res.data
                    }
                })
                .catch(error => {
                    if (error.response.status === 401) {
                        router.replace('/')
                    } else {
                        console.error('Error fetching session:', error);              
                    }
                })

        } catch (error) {
            console.error('Error fetching session:', error);
        }
    })
}