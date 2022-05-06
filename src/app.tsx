import { usePdf } from '@mikecousins/react-pdf'

import * as React from 'react'
import { ThemeProvider } from 'styled-components'
import Box from './components/Box'
import DropZone from './components/DropZone'
import PDFViewer from './components/PDFViewer'
import Toolbar from './components/Toolbar'
import { editorTheme } from './theme/editor-theme'
import { fileToDataUri } from './utils/file-helper'

const NoReturnHooks = ({
  filePath,
  onReceivePdfDocument,
}: {
  filePath: string
  onReceivePdfDocument: (e: any) => void
}) => {
  const ref = React.useRef(null)
  //   const callback = React.useCallback(() => {
  if (filePath) {
    const { pdfDocument, pdfPage } = usePdf({
      file: filePath as string,
      canvasRef: ref,
    })
    onReceivePdfDocument(pdfDocument)
  }
  //   }, [filePath, onReceivePdfDocument])

  return (
    <Box display="none">
      <canvas ref={ref} />
    </Box>
  )
}

function App() {
  const [filePath, setFilePath] = React.useState<unknown>(null)
  const [pdfDoc, setPdfDoc] = React.useState<any>(null)

  return (
    <ThemeProvider theme={editorTheme}>
      <Box fontFamily={editorTheme.fontFamily} background={editorTheme.colors.bgColor}>
        <Toolbar />

        {filePath === null && (
          <DropZone
            onDrop={async (file: any) => {
              const path = await fileToDataUri(file)
              setFilePath(path)
            }}
          />
        )}
        {filePath !== null && (
          <>
            <NoReturnHooks filePath={filePath as string} onReceivePdfDocument={(e) => setPdfDoc(e)} />
            {pdfDoc &&
              [...Array(pdfDoc?.numPages || 0)].map((_, index: number) => (
                <React.Fragment key={index}>
                  <PDFViewer pdfPath={filePath as string} page={index + 1} pdfDoc={pdfDoc} />
                </React.Fragment>
              ))}
          </>
        )}
      </Box>
    </ThemeProvider>
  )
}
export default App
