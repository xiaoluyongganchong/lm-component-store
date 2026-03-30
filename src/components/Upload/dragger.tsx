import classNames from "classnames";
import React, { useState } from "react";

export interface draggerProps {
  onFile: (files: FileList) => void
  children: React.ReactNode
}
const Dragger = ({
  onFile,
  children
}: draggerProps) => {
  const [dragOver, setDragOver] = useState(false)
  const klass = classNames('lm-uplload-dragger', {
    'is-draggerover': dragOver
  })
  const handleDrag = (e: React.DragEvent<HTMLDivElement>, over: boolean) => {
    e.preventDefault()
    setDragOver(over)
  }
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files.length > 0) {
      onFile(e.dataTransfer.files)
    }
  }
  return (
    <div
      className={klass}
      onDragOver={e => { handleDrag(e, true) }}
      onDragLeave={e => { handleDrag(e, false) }}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}

export default Dragger
