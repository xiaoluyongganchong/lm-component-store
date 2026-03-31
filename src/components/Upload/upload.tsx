import React,{ChangeEvent, useRef, useState} from "react";
import Button, { ButtonType } from "../Button/button";
import UploadList from "./uploadList";
import axios from "axios";
import Dragger from "./dragger";

export interface UploadProps {
  action: string
  defaultFileList?: UplaodFile[]
  onProgress?: (percentage: number, file: File) => void
  onSuccess?: (datra: any, file: File) => void
  onError?: (err: any, file: File) => void
  beforeUpload?: (file: File) => boolean | Promise<File>
  onChange?: (file: File) => void
  onRemove?: (file: UplaodFile) => void
  headers?: { [key: string]: any }
  name?: string
  data?: { [key: string]: any }
  withCredentials?: boolean
  accept?: string
  multiple?: boolean
  children?: React.ReactNode
  drag?: boolean
}

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UplaodFile {
  uid: string
  size: number
  name: string
  status?:UploadFileStatus
  percent?: number
  raw?: File
  response?: any
  error?: any

}

export const Upload = ({
  action,
  beforeUpload,
  defaultFileList,
  onProgress,
  onSuccess,
  onError,
  onChange,
  onRemove,
  headers,
  name = 'file',
  data,
  withCredentials,
  accept,
  multiple = true,
  children,
  drag
}: UploadProps) => {

  const fileInput = useRef<HTMLInputElement>(null)
  const uidSeq = useRef(0)
  const [fileList, setFileList] = useState<UplaodFile[]>(defaultFileList || [])
  
  const UploadFileList = (uploadFile: UplaodFile, uploadObj: Partial<UplaodFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === uploadFile.uid) {
          return {...file,...uploadObj}
        } else {
          return file
        }
      })
    })
  }

  const handleClick = () => {
    console.log('upload button clicked')
    if (fileInput.current) {
      fileInput.current.click()
    }
  }

  const handleFileChange = (e:ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return
    }
    UploadFiles(files)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }

  const UploadFiles = (files: FileList) => {
    const postFiles = Array.from(files)
    postFiles.forEach(file => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then(processeedFile => {
            post(processeedFile)
          })
        } else if (result !== false) {
          post(file)
        }
      }
      
    })
  }

  const post = (file: File) => {
    uidSeq.current += 1
    let _file: UplaodFile = {
      uid: `${Date.now()}-${uidSeq.current}-${file.name}`,
      status: 'uploading',
      name: file.name,
      size: file.size,
      percent: 0,
      raw:file
    }
    setFileList(prevList => {
      return [_file,...prevList]
    })
    const formData = new FormData()
    formData.append(name || 'file', file)
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key,data[key]) //?
      })
    }
      axios.post(action, formData, {
        headers,
        withCredentials,
        onUploadProgress: (e) => {
          const total = e.total && e.total > 0 ? e.total : e.loaded || 1
          let percentage = Math.round((e.loaded * 100) / total)
          if (!Number.isFinite(percentage)) {
            percentage = 0
          }
          percentage = Math.min(100, Math.max(0, percentage))
          UploadFileList(_file, { percent: percentage, status: 'uploading' })
          if (onProgress) {
            onProgress(percentage, file)
          }
        }
      }).then(resp => {
        console.log(resp)
        UploadFileList(_file,{status:'success',response:resp.data, percent: 100})
        if (onSuccess) {
          onSuccess(resp.data,file)
        }
        if (onChange) {
          onChange(file)
        }
      }).catch(err => {
        console.log(err)
         UploadFileList(_file,{status:'error',error:err})
        if (onError) {
          onError(err,file)
        }
         if (onChange) {
          onChange(file)
        }
      })
  }

  const handleRemove = (file:UplaodFile) => {
    setFileList((prevList) => {
      return prevList.filter(item => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
    }
  }
  return (
    <div className="lm-upload-component">
      <Button
        btnType={ButtonType.Primary}
        onClick={handleClick}
        className={drag ? 'lm-upload-dragger-host' : undefined}
      >
        {drag ? (
          <Dragger onFile={(files) => UploadFiles(files)}>
            {children ?? 'Upload File'}
          </Dragger>
        ) : (
          children ?? 'Upload File'
        )}
      </Button>
      <input
        className="lm-file-input"
        type="file"
        style={{ display: 'none' }}
        ref={fileInput}
        onChange={handleFileChange}
        accept={accept}
        multiple={multiple}
      />
      <UploadList
        fileList={fileList}
        onRemove={handleRemove}
      ></UploadList>
    </div>
  )
}

export default Upload