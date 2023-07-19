import { Post, Tag } from ".";

export async function getAllPosts(): Promise<Array<Post> | null> {
    const body = {
        dataSource: "Cluster0",
        database: "ha0peno",
        collection: "post"
    }

    try {
        const result = await fetch('https://us-west-2.aws.data.mongodb-api.com/app/data-zulli/endpoint/data/v1/action/find', {
            headers: {
              'Content-Type': 'application/json',
              'API-Key': process.env.NEXT_PUBLIC_MONGODB_API_KEY!,
              'Access-Control-Request-Headers': '*',
              'Accept': 'application/json'
            },
            body: JSON.stringify(body),
            method: 'POST'
        })
        const data = await result.json();
        return data.documents
        
    } catch (error) {
        console.log('error', error)
        return null
    }
}

export async function getAllTags(): Promise<Array<Tag> | null> {
    const body = {
        dataSource: "Cluster0",
        database: "ha0peno",
        collection: "tags"
    }

    try {
        const result = await fetch('https://us-west-2.aws.data.mongodb-api.com/app/data-zulli/endpoint/data/v1/action/find', {
            headers: {
              'Content-Type': 'application/json',
              'API-Key': process.env.NEXT_PUBLIC_MONGODB_API_KEY!,
              'Access-Control-Request-Headers': '*',
              'Accept': 'application/json'
            },
            body: JSON.stringify(body),
            method: 'POST'
        })
        const data = await result.json();
        return data.documents
        
    } catch (error) {
        console.log('error', error)
        return null
    }
}