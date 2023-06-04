'use client';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import { storage } from '@/util/firebase/config';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr'],
    ['ul', 'ol', 'task'],
    ['table', 'link'],
    ['image'],
    ['code'],
    ['scrollSync'],
];

interface Images {
  fileName: string;
  url: string;
}

// 업로드 했다가 최종적으로 사용하지 않은 이미지파일을 찾아 배열로 반환한다.
const findMissingUrls = (str: string, images: Images[]): string[] => {
  const missingUrls: string[] = [];
  for (const image of images) {
    if (!str.includes(image.url)) {
      missingUrls.push(image.fileName);
    }
  }
  return missingUrls;
};

export default function MyEditor() {
  const editorRef = useRef<Editor>(null);
  const [ title, setTitle ] = useState('');
  const [ thumbnail, setThumbnail ] = useState<File | null>(null);

  const router = useRouter();

  // 에디터를 통해 등록된 이미지 파일 배열
  const images:Images[] = [];

  const onUploadImage = async (blob:Blob, callback?: (url: string, altText?: string) => void) => {
    const fileName = `${Date.now().toString()}_${blob.name}`;
    const storageRef = ref(storage, `images/${fileName}`);
    
    try {
      const snapshot = await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(snapshot.ref);

      // callback이 있는 경우(content내의 이미지일 경우) 최종적으로 등록했는지 여부를 찾기 위한 배열에 담는다.
      if(callback) images.push({fileName: fileName, url: url.replaceAll(/&/g, '&amp;')});

      if(callback) {
        // 에디터의 경우 callback함수로 프리뷰이미지 제공
        callback(url, 'image')
      } else {
        // 썸네일일 경우 db에 저장하기 위한 url만 리턴한다.
        return url
      }
      
    } catch (error) {
      alert('이미지 업로드 실패')
    }
  }

  const showContent = async () => {
    // 에디터를 통해 등록한 후 최종 등록 정네 삭제한 이미지 정보를 찾는다.
    const missingFiles = findMissingUrls(content!, images);

    if(missingFiles) {
      // 최종적으로 사용하지 않은 이미지들은 storage에서 삭제
      missingFiles.forEach(async file => {
        const desertRef = ref(storage, `images/${file}`);
        await deleteObject(desertRef);
      })
    }

    const editorIns = editorRef.current?.getInstance();
    const content = editorIns?.getHTML();
    const imageUrl = thumbnail ? await onUploadImage(thumbnail) : null
    
    const post = {
      title: title,
      content: content,
      thumbnail: imageUrl
    }

    try {
      await axios.post('/api/post/write', post)
      .then((res) => {
        console.log('res', res)
        router.push('/list')
      })
    } catch (error) {
      alert('write error')
      console.log('error', error)
    }
  }
    return (
        <>
        {editorRef && (
          <>
          <input type="text" onChange={(e) => setTitle(e.target.value)}/>
          <input type="file" id="thumbnail" accept='image/png' onChange={(e) => setThumbnail(e?.target?.files && e?.target?.files[0])}/>
          <Editor
            ref={editorRef}
            initialValue='' // 글 수정 시 content 넣어주기
            initialEditType="markdown" 
            previewStyle={window.innerWidth > 1000 ? 'vertical' : 'tab'} // tab, vertical
            hideModeSwitch={true}
            height="100vh"
            theme={''} // '' & 'dark'
            usageStatistics={false}
            toolbarItems={toolbarItems}
            useCommandShortcut={true}
            plugins={[colorSyntax]}
            hooks={{ addImageBlobHook: onUploadImage }}
          />
          <button type="button" onClick={showContent}>글작성</button>
          </>
        )}
      </>
    )
}