import { usePdf } from '@mikecousins/react-pdf'

import * as React from 'react'
import { ThemeProvider } from 'styled-components'
import Box from './components/Box'
import DropZone from './components/DropZone'
import PDFViewer, { useCanvasHeight } from './components/PDFViewer'
import Toolbar from './components/Toolbar'
import { editorTheme } from './theme/editor-theme'
import { fileToDataUri } from './utils/file-helper'
import ScrollSpy from './utils/scroll-spy'

const NoReturnHooks = ({
  filePath,
  onReceivePdfDocument,
}: {
  filePath: string
  onReceivePdfDocument: (e: any) => void
}) => {
  const ref = React.useRef(null)

  if (filePath) {
    const { pdfDocument, pdfPage } = usePdf({
      file: filePath as string,
      canvasRef: ref,
    })
    onReceivePdfDocument(pdfDocument)
  }

  return (
    <Box display="none">
      <canvas ref={ref} />
    </Box>
  )
}

function App() {
  const [filePath, setFilePath] = React.useState<unknown>(null)
  const [pdfDoc, setPdfDoc] = React.useState<any>(null)
  const [scale, setScale] = React.useState(1)

  const [currentPage, setCurrentPage] = React.useState<any>(1)
  const scrollRef = React.useRef(null)

  const scrollUpdateCallback = React.useCallback((entry: any, isInVewPort: boolean) => {
    const { target, boundingClientRect } = entry

    if (boundingClientRect.y + 100 <= 0 && isInVewPort) {
      setCurrentPage(+target.id.split('-')[1])
    }
  }, [])

  React.useEffect(() => {
    const body = document.body
    body.style.overflow = 'hidden'

    return () => {
      body.style.overflow = 'auto'
    }
  }, [])

  return (
    <ThemeProvider theme={editorTheme}>
      <Box fontFamily={editorTheme.fontFamily} background={editorTheme.colors.bgColor}>
        <Toolbar
          totalPages={pdfDoc?.numPages}
          currentPage={currentPage}
          onInputValueChange={(e: number) => {
            const page = document.querySelector(`#page-${e}`) as any

            scrollRef?.current?.scrollTo(0, page?.offsetTop + 1 + Math.floor(page.offsetHeight / 3))
          }}
          onExpandClick={() => {
            switch (scale) {
              case 1:
                setScale(1.5)
                break
              case 1.5:
                setScale(2)
                break
              case 2:
                setScale(1)
                break
              default:
                setScale(1)
            }
          }}
          onNextPageClick={() => {
            const page = document.querySelector(`#page-${currentPage + 1}`) as any

            scrollRef?.current?.scrollTo(0, page?.offsetTop + 1 + Math.floor(page.offsetHeight / 3))
          }}
          onPrevPageClick={() => {
            const page = document.querySelector(`#page-${currentPage - 1}`) as any

            scrollRef?.current?.scrollTo(0, page?.offsetTop + 1 + Math.floor(page.offsetHeight / 3))
          }}
        />

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
            <Box
              ref={scrollRef}
              className="wrapper"
              overflow="scroll"
              height="calc(100vh - 20px);"
              position="relative"
              top="44px"
            >
              <Box position="relative" top="14px">
                <NoReturnHooks filePath={filePath as string} onReceivePdfDocument={(e) => setPdfDoc(e)} />
                <ScrollSpy
                  handleScroll={(entry, isInVewPort) => scrollUpdateCallback(entry, isInVewPort)}
                  pdfDoc={pdfDoc}
                />
                {pdfDoc &&
                  [...Array(pdfDoc?.numPages || 0)].map((_, index: number) => (
                    <Box key={index} data-scrollspy id={`page-${index + 1}`}>
                      <PDFViewer page={index + 1} pdfDoc={pdfDoc} scale={scale} />
                    </Box>
                  ))}
              </Box>
            </Box>
          </>
        )}
      </Box>
    </ThemeProvider>
  )
}
export default App
