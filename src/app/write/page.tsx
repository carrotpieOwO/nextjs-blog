'use client';
import { Images } from '@/util';
import { storage } from '@/util/firebase/config';
import { Editor } from '@toast-ui/react-editor';
import axios from 'axios';
import dayjs from 'dayjs';
import { deleteObject, ref } from 'firebase/storage';
import { useRouter } from 'next/navigation';
import { useRef, useState } from "react";
import MyEditor from '../components/editor/MyEditor';
import Title from '../components/editor/Title';
import Tag from '../components/editor/Tag';

// 업로드 했다가 최종적으로 사용하지 않은 이미지파일을 찾아 배열로 반환한다.
const findMissingUrls = (str: string, images?: Images[]): string[] => {
    const missingUrls: string[] = [];

    if(images) {
        for (const image of images) {
            if (!str.includes(image.url)) {
              missingUrls.push(image.fileName);
            }
        }
    }

    return missingUrls;
};

export default function Write() {
    const [ title, setTitle ] = useState('');
    const [ tags, setTags ] = useState<string[]>([]);
    const images = useRef<Images[] | undefined>(undefined);

    const editorRef = useRef<Editor>(null);
    const router = useRouter();

    const showContent = async () => {
        const editorIns = editorRef.current?.getInstance();
        const content = editorIns?.getHTML();
        
        // 에디터를 통해 등록한 후 최종 등록 정네 삭제한 이미지 정보를 찾는다.
        const missingFiles = findMissingUrls(content!, images.current);

        if(missingFiles) {
            // 최종적으로 사용하지 않은 이미지들은 storage에서 삭제
            missingFiles.forEach(async fileName => {
                images.current = images.current?.filter(img => img.fileName !== fileName)
                const desertRef = ref(storage, `images/${fileName}`);
                await deleteObject(desertRef);
            })
        }

        const thumbnail = images.current ? images.current[0].url : null;
        const post = {
            title: title,
            content: content,
            thumbnail: thumbnail,
            tags: tags,
            images: images.current,
            createdTime: dayjs().format('YYYY-MM-DDTHH:mm:ss')
        }

        try {
            await axios.post('/api/post/write', post)
            .then((res) => {
                console.log('res', res)
                router.push('/')
            })
        } catch (error) {
            alert('write error')
            console.log('error', error)
        }
    }

    return (
        <div className='px-20 py-10'>  
            <Title title={title} setTitle={setTitle} />
            <Tag setTags={setTags} tags={tags} />
            <MyEditor editorRef={editorRef} images={images}/>
            <div className='flex my-7'>
                <button type="button" className="mr-auto" onClick={() => { router.back() }}>뒤로가기</button>
                <button type="button" className="ml-auto" onClick={showContent}>글작성</button>
            </div>
        </div>
    )
}