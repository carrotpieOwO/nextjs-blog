import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"


export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    try {
        let session = await getServerSession(req, res, authOptions) // 현재 접속한 세션 정보

        if(!session) {
            console.log('권한없음')
            return res.status(401).json('권한없음')
        }  else {
            return res.status(200).json(session?.user?.name)
        }

        
    } catch (error) {
        return res.status(500).json('error')        
    }
}