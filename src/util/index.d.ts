import { ObjectId } from "mongodb";

interface Post {
    _id: string | ObjectId,
    title: string,
    content: string,
    thumbnail?: string,
    tags?: string[],
    author?: string,
    createdTime?: string
}

interface Images {
    fileName: string;
    url: string;
}