'use client';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { MutableRefObject, useEffect, useState } from 'react';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import { storage } from '@/util/firebase/config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { PreviewStyle } from '@toast-ui/editor';
import { Images } from '@/util';

const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr'],
    ['ul', 'ol', 'task'],
    ['table', 'link'],
    ['image'],
    ['code', 'codeblock'],
    ['scrollSync'],
];

interface Props {
  editorRef: React.RefObject<Editor>
  //setImages: Dispatch<SetStateAction<Images[] | undefined>>
  images: MutableRefObject<Images[] | undefined>
  initialValue?: string
}

export default function MyEditor({ editorRef, images, initialValue }: Props) {
  const [ preview, setPreview ] = useState<PreviewStyle>(window.innerWidth > 1000 ? 'vertical' : 'tab')
  
  useEffect(() => {
    if(initialValue) {
      const editorInstance = editorRef.current?.getInstance();
      editorInstance?.setHTML(initialValue);
      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue])

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

  //const images: Images[] = [];
  const onUploadImage = async (blob:Blob, callback: (url: string, altText?: string) => void) => {
    const fileName = `${Date.now().toString()}_${blob.name}`;
    const storageRef = ref(storage, `images/${fileName}`);
    
    try {
      const snapshot = await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(snapshot.ref);
      images.current = Array.isArray(images.current) ? [...images.current, {fileName: fileName, url: url.replaceAll(/&/g, '&amp;')}] : [{fileName: fileName, url: url.replaceAll(/&/g, '&amp;')}]
  
      callback(url, 'image')

    } catch (error) {
      console.log('error', error)
      alert('이미지 업로드 실패')
    }
  }

  return (
    <>
        {
          editorRef && 
            (
              <>
                <Editor
                  ref={editorRef}
                  initialValue=''
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
            )
        }
    </>
  )
}