import React,{ChangeEvent, useRef, useState} from "react";
import Button, { ButtonType } from "../Button/button";
import UploadList from "./uploadList";
import axios from "axios";

export interface UploadProps {
  action: string
  defaultFileList?: UplaodFile[]
  onProgress?: (percentage: number, file: File) => void
  onSuccess?: (datra: any, file: File) => void
  onError?: (err: any, file: File) => void
  beforeUpload?: (file: File) => boolean | Promise<File>
  onChange?: (file: File) => void
  onRemove?: (file: UplaodFile) => void
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
  onRemove
}: UploadProps) => {

  const fileInput = useRef<HTMLInputElement>(null)
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
    let _file: UplaodFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw:file
    }
    setFileList([_file,...fileList])
    const formData = new FormData()
      
      formData.append(file.name, file)
      axios.post(action, formData, {
        headers: {
          'Content-Type':'multiple/form-data'
        },
        onUploadProgress: (e) => {
          const total = e.total ?? e.loaded ?? 1
          let percentage = Math.round((e.loaded * 100) / total) || 0
          if (percentage < 100) {
            UploadFileList(_file,{percent:percentage,status:'uploading'})
            if (onProgress) {
              onProgress(percentage,file)
            }
          }
        }
      }).then(resp => {
        console.log(resp)
        UploadFileList(_file,{status:'success',response:resp.data})
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
      >
        Upload File
      </Button>
      <input
        className="lm-file-input"
        type="file"
        style={{ display: 'none' }}
        ref={fileInput}
        onChange={handleFileChange}
      />
      <UploadList
        fileList={fileList}
        onRemove={handleRemove}
      ></UploadList>
    </div>
  )
}

export default Upload