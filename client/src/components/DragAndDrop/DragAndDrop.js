import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const DragAndDrop = ({ upload }) => {
  const onDrop = useCallback(acceptedFiles => {
    upload(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p className='link'>Drop the files here ...</p> :
          <p className='link'>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default DragAndDrop