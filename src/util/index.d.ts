import { ObjectId } from "mongodb";

interface Post {
    _id: string | ObjectId,
    title: string,
    content: string,
    thumbnail?: string,
    images?: Images[],
    tags?: string[],
    author?: string,
    createdTime?: string,
}

interface Images {
    fileName: string;
    url: string;
}