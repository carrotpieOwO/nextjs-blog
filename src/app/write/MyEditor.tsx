'use client';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'

const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr'],
    ['ul', 'ol', 'task'],
    ['table', 'link'],
    ['image'],
    ['code'],
    ['scrollSync'],
];
export default function MyEditor() {
  const editorRef = useRef<Editor>(null);
  const [ title, setTitle ] = useState('');
  const [ thumbnail, setThumbnail ] = useState<File | null>(null);

  const router = useRouter();

  const onUploadImage = async (blob:Blob, callback?: (url: string, altText?: string) => void) => {
      const formData = new FormData();
      formData.append('image', blob);
    
      try {
        const result = await axios.post('/api/post/image', formData, {
          headers: {
            "Contest-Type": "multipart/form-data",
          }
        })

        console.log('result', result)
        if(callback) {
          callback('/images/' + result.data.message, 'image')
        } else {
          return '/images/' + result.data.message
        }
        
      } catch (error) {
        
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
          <img src="/images/1685453797961_icon.png" alt="image"/>
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