import { TagObj } from "@/util";
import { connectDB } from "@/util/database";
import TagBtn from "./TagBtn"

interface Props {
    tags: TagObj[]
    selectedTag?: string
}
export default function TagList({ tags, selectedTag }:Props) {
    return (
        <div className="flex flex-wrap justify-center mb-10 gap-2 capitalize">    
            {
                tags.map(tag => 
                    <TagBtn key={ tag.name } url={ tag.url } text={ `${tag.name} (${tag.length})` } selected={ selectedTag === tag.name }/>
                )
            }
        </div>
    )
}