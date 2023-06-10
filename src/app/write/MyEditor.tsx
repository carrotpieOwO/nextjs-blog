'use client';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import { storage } from '@/util/firebase/config';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { PreviewStyle } from '@toast-ui/editor';

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

  const [ preview, setPreview ] = useState<PreviewStyle>(window.innerWidth > 1000 ? 'vertical' : 'tab')
  const [ title, setTitle ] = useState('');
  const [ thumbnail, setThumbnail ] = useState<File | null>(null);

  console.log('window', window.innerWidth)
  const router = useRouter();

  const handleResize = () => {
    setPreview(window.innerWidth > 1000 ? 'vertical' : 'tab')
  }

  useEffect(() => {
      window.addEventListener('resize', handleResize)

      return () => {
          window.removeEventListener('resize', handleResize)
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    
    const editorIns = editorRef.current?.getInstance();
    const content = editorIns?.getHTML();
    const imageUrl = thumbnail ? await onUploadImage(thumbnail) : null
    
    const post = {
      title: title,
      content: content,
      thumbnail: imageUrl
    }

    // 에디터를 통해 등록한 후 최종 등록 정네 삭제한 이미지 정보를 찾는다.
    const missingFiles = findMissingUrls(content!, images);

    if(missingFiles) {
      // 최종적으로 사용하지 않은 이미지들은 storage에서 삭제
      missingFiles.forEach(async file => {
        const desertRef = ref(storage, `images/${file}`);
        await deleteObject(desertRef);
      })
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
        <div className="px-20 py-10">
          {editorRef && (
            <>
            <div className="mb-6">
              <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
              <input type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setTitle(e.target.value)} />
            </div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">썸네일 등록</label>
            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help"
              id="thumbnail" type="file" onChange={(e) => setThumbnail(e?.target?.files && e?.target?.files[0])} />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>

            <Editor
              ref={editorRef}
              initialValue='' // 글 수정 시 content 넣어주기
              initialEditType="markdown" 
              previewStyle={preview} // tab, vertical
              hideModeSwitch={true}
              height="calc(100vh - 380px)"
              theme={''} // '' & 'dark'
              usageStatistics={false}
              toolbarItems={toolbarItems}
              useCommandShortcut={true}
              plugins={[colorSyntax]}
              hooks={{ addImageBlobHook: onUploadImage }}
            />
          
            </>
          )}
        </div>
        <div className='flex px-20'>
          <button type="button" className="mr-auto" onClick={() => { router.back() }}>뒤로가기</button>
          <button type="button" className="ml-auto" onClick={showContent}>글작성</button>
        </div>
      </>
    )
}