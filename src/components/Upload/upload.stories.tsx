import Upload, { UplaodFile, UploadProps } from './upload'

const meta = {
  title: 'Components/Upload',
  component: Upload,
  tags: ['autodocs']
}
export default meta

const defaultFileList: UplaodFile[] = [
  { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '121', size: 1234, name: 'haha.md', status: 'error', percent: 30 }
]

type Story = { args?: UploadProps }

export const Basic: Story = {
  args: {
    action: 'https://jsonplaceholder.typicode.com/posts',
    beforeUpload: (file) => {
      console.log('[beforeUpload]', file.name, file.size)
      const ok = file.size < 1024 * 1024
      console.log('[beforeUpload result]', ok)
      return ok
    },
    defaultFileList:defaultFileList,
    onChange: (file) => {
      console.log('[onChange]', file.name)
    },
    onProgress: (percentage, file) => console.log('[progress]', percentage, file.name),
    onSuccess: (data, file) => console.log('[success]', file.name, data),
    onError: (err, file) => console.log('[error]', file.name, err),
    name: 'fileNme',
    data: { key: 'value' },
    headers: { 'x-pwofia-by': 'lm' },
    accept: '.jpg',
    multiple: true,
    children: '上传文件',
    drag:true
  }
}

export const Multiple: Story = {
  args: {
    action: 'https://jsonplaceholder.typicode.com/posts',
    name: 'file',
    multiple: true,
    accept: '.jpg,.jpeg,.png',
    children: '上传多个文件',
    drag: false,
    onChange: (file) => {
      console.log('[multiple onChange]', file.name)
    },
    onProgress: (percentage, file) => {
      console.log('[multiple progress]', percentage, file.name)
    },
    onSuccess: (data, file) => {
      console.log('[multiple success]', file.name, data)
    },
    onError: (err, file) => {
      console.log('[multiple error]', file.name, err)
    }
  }
}