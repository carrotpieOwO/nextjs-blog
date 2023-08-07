
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