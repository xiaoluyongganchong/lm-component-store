import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Upload from './upload'

jest.mock('axios', () => ({
  __esModule: true,
  default: { post: jest.fn() },
  post: jest.fn()
}))

const mockedPost = (require('axios').default.post as jest.Mock)

const createFile = (name: string, type = 'image/png') => {
  return new File(['hello'], name, { type })
}

describe('Upload component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should upload file successfully and trigger callbacks', async () => {
    const onSuccess = jest.fn()
    const onChange = jest.fn()
    mockedPost.mockResolvedValueOnce({ data: { url: 'mock-url' } })

    const { container } = render(
      <Upload action="/upload" onSuccess={onSuccess} onChange={onChange}>
        上传文件
      </Upload>
    )

    const input = container.querySelector('.lm-file-input') as HTMLInputElement
    const file = createFile('success.png')
    fireEvent.change(input, { target: { files: [file] } })

    await waitFor(() => {
      expect(mockedPost).toHaveBeenCalledTimes(1)
      expect(onSuccess).toHaveBeenCalledWith({ url: 'mock-url' }, file)
      expect(onChange).toHaveBeenCalledWith(file)
    })

    expect(screen.getByText('success.png')).toBeInTheDocument()
    expect(container.querySelector('.file-name-success')).toBeInTheDocument()
  })

  it('should block upload when beforeUpload returns false', async () => {
    const beforeUpload = jest.fn(() => false)
    const { container } = render(
      <Upload action="/upload" beforeUpload={beforeUpload}>
        上传文件
      </Upload>
    )

    const input = container.querySelector('.lm-file-input') as HTMLInputElement
    const file = createFile('blocked.png')
    fireEvent.change(input, { target: { files: [file] } })

    await waitFor(() => {
      expect(beforeUpload).toHaveBeenCalledWith(file)
    })
    expect(mockedPost).not.toHaveBeenCalled()
    expect(screen.queryByText('blocked.png')).not.toBeInTheDocument()
  })

  it('should show error status and trigger onError when upload fails', async () => {
    const onError = jest.fn()
    const onChange = jest.fn()
    const mockError = new Error('upload failed')
    mockedPost.mockRejectedValueOnce(mockError)

    const { container } = render(
      <Upload action="/upload" onError={onError} onChange={onChange}>
        上传文件
      </Upload>
    )

    const input = container.querySelector('.lm-file-input') as HTMLInputElement
    const file = createFile('error.png')
    fireEvent.change(input, { target: { files: [file] } })

    await waitFor(() => {
      expect(mockedPost).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledWith(mockError, file)
      expect(onChange).toHaveBeenCalledWith(file)
    })

    expect(screen.getByText('error.png')).toBeInTheDocument()
    expect(container.querySelector('.file-name-error')).toBeInTheDocument()
  })

  it('should upload processed file when beforeUpload returns Promise<File>', async () => {
    const onSuccess = jest.fn()
    mockedPost.mockResolvedValueOnce({ data: { ok: true } })
    const processedFile = createFile('processed.png')
    const beforeUpload = jest.fn(() => Promise.resolve(processedFile))

    const { container } = render(
      <Upload action="/upload" beforeUpload={beforeUpload} onSuccess={onSuccess}>
        上传文件
      </Upload>
    )

    const input = container.querySelector('.lm-file-input') as HTMLInputElement
    const file = createFile('origin.png')
    fireEvent.change(input, { target: { files: [file] } })

    await waitFor(() => {
      expect(beforeUpload).toHaveBeenCalledWith(file)
      expect(mockedPost).toHaveBeenCalledTimes(1)
      expect(onSuccess).toHaveBeenCalledWith({ ok: true }, processedFile)
    })

    expect(screen.getByText('processed.png')).toBeInTheDocument()
    expect(screen.queryByText('origin.png')).not.toBeInTheDocument()
  })

  it('should trigger onProgress callback while uploading', async () => {
    const onProgress = jest.fn()
    mockedPost.mockImplementationOnce((_url, _data, config) => {
      config?.onUploadProgress?.({ loaded: 50, total: 100 } as any)
      return Promise.resolve({ data: { ok: true } })
    })

    const { container } = render(
      <Upload action="/upload" onProgress={onProgress}>
        上传文件
      </Upload>
    )

    const input = container.querySelector('.lm-file-input') as HTMLInputElement
    const file = createFile('progress.png')
    fireEvent.change(input, { target: { files: [file] } })

    await waitFor(() => {
      expect(onProgress).toHaveBeenCalledWith(50, file)
    })
  })

  it('should remove uploaded item and trigger onRemove', async () => {
    const onRemove = jest.fn()
    mockedPost.mockResolvedValueOnce({ data: { ok: true } })
    const { container } = render(
      <Upload action="/upload" onRemove={onRemove}>
        上传文件
      </Upload>
    )

    const input = container.querySelector('.lm-file-input') as HTMLInputElement
    const file = createFile('remove.png')
    fireEvent.change(input, { target: { files: [file] } })

    await waitFor(() => {
      expect(screen.getByText('remove.png')).toBeInTheDocument()
    })

    const removeButton = screen.getByRole('button', { name: '移除' })
    fireEvent.click(removeButton)

    await waitFor(() => {
      expect(screen.queryByText('remove.png')).not.toBeInTheDocument()
      expect(onRemove).toHaveBeenCalledTimes(1)
      expect(onRemove.mock.calls[0][0]).toMatchObject({
        name: 'remove.png'
      })
    })
  })
})
