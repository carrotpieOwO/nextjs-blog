'use client';

import { Images } from "@/util";
import { storage } from "@/util/firebase/config";
import axios from "axios";
import { deleteObject, ref } from "firebase/storage";
import { useRouter } from "next/navigation";

interface Props {
    deleteId: string
    images?: Images[]
}
export default function DeleteBtn ({deleteId, images}: Props) {
    const router = useRouter();

    const deleteImages = async() => {
        if(images) {
            images.forEach( async image => {
                const desertRef = ref(storage, `images/${image.fileName}`);
                await deleteObject(desertRef);
            })
        }
    }

    const onDelete = async () => {

        // 스토리지 이미지 파일 삭제
        await deleteImages();

        axios.delete(`/api/post/delete?id=${deleteId}`)
        .then((r) => {
            if (r.status === 200) {
                setTimeout(() => {
                    router.back()
                }, 500);
                
            } else {
                alert('서버에러')
            }
            
        }).catch((error) => alert(error))
    }

     return (
        <button onClick={onDelete}>삭제</button>
    )
}