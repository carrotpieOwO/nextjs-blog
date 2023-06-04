import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

type DetailProps = {
    params: { id: string }
}
export default async function Detail({params} : DetailProps) {
    
    const db = (await connectDB).db('ha0peno')
    let result = await db.collection('post').findOne({ _id: new ObjectId(params.id) })

    console.log('result', result)

    return (
        <div>
            <h4>{result!.title}</h4>
            <div dangerouslySetInnerHTML={{__html: result!.content}} />
            
        </div>
    )
}