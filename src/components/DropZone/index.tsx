import React from 'react'
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  height: '80vh',
  borderWidth: 4,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
} as React.CSSProperties

export default ({ onDrop }: { onDrop: (File: any) => void }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
    },
    multiple: false,
    onDrop: (e) => onDrop(e.at(0)),
  })

  return (
    <section className="container">
      <div {...getRootProps({ style: baseStyle })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop your pdf here </p>
      </div>
    </section>
  )
}
