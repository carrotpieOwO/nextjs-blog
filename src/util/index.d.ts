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

interface Tag {
    _id: string | ObjectId,
    name: string
}

interface Images {
    fileName: string;
    url: string;
}

interface TagObj {
    name: string
    length: number
    url: string
}