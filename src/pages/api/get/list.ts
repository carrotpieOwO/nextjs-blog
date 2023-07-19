
// import { Post } from "@/util"
// import { connectDB } from "@/util/database"
// import { WithId } from "mongodb"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const body = {
        dataSource: "Cluster0",
        database: "ha0peno",
        collection: "post"
    }

    try {
        const result = await fetch('https://us-west-2.aws.data.mongodb-api.com/app/data-zulli/endpoint/data/v1/action/find', {
            headers: {
              'Content-Type': 'application/json',
              'API-Key': 'GSBWgmmm8R7e9Ux4ktsyodafy2I1lIpYPPNNUoqAAKihVKoSAQMwnVA3ej9gI3jp',
              'Access-Control-Request-Headers': '*',
              'Accept': 'application/json'
            },
            body: JSON.stringify(body),
            method: 'POST'
        })

        console.log('result', result)
        // const data = await res.json()
        // const db = (await connectDB).db('ha0peno')
        // const result:WithId<Post>[] = await db.collection<Post>('post').find().sort({ createdTime: -1 }).toArray()
        
        if(result) {
            return res.status(200).json(result)
        } else {
            return res.status(204).json('없음')
        }
        
    } catch (error) {
        console.log('error', error)
        return res.status(500).json('error')        
    }
}



// export async function GET() {
//     const res = await fetch('https://data.mongodb-api.com/...', {
//       headers: {
//         'Content-Type': 'application/json',
//         'API-Key': process.env.DATA_API_KEY,
//       },
//     })
//     const data = await res.json()
   
//     return NextResponse.json({ data })
// }