import React, { useEffect, useRef, useState } from 'react'
import { editorTheme } from '../../theme/editor-theme'
import DragResizeContainer from 'react-drag-resize'

import Box from '../Box'
import InsertNewPage from '../InsertNewPage'
import { DraggableWrapper, SelectedBox } from './style'

const layout = [
  { key: 'test', x: 0, y: 100, width: 100, height: 50, zIndex: 1 },
  { key: 'test2', x: 0, y: 200, width: 100, height: 50, zIndex: 1 },
]
const canResizable = (isResize: boolean) => {
  return {
    top: isResize,
    right: isResize,
    bottom: isResize,
    left: isResize,
    topRight: isResize,
    bottomRight: isResize,
    bottomLeft: isResize,
    topLeft: isResize,
  }
}

const useCanvas = (pdfDoc: any, page: number, callback: any) => {
  const canvasRef = React.useRef(null)

  useEffect(() => {
    const canvasRender = async () => {
      const item = await pdfDoc.getPage(page)
      const viewport = item.getViewport({ scale: 3 })
      const canvas = canvasRef.current

      canvas.width = viewport.width
      canvas.height = viewport.height
      canvas.getContext('2d')

      item.render({ canvasContext: canvas.getContext('2d'), viewport: viewport })

      callback([canvas, canvas.getContext('2d')])
    }
    canvasRender()
  }, [page, canvasRef, pdfDoc])

  return canvasRef
}

export default ({ pdfPath, page, pdfDoc }: { pdfPath: string; page: number; pdfDoc: any }) => {
  const [canvasObject, setCanvas] = useState(null)

  const canvasRef = useCanvas(pdfDoc, page, ([canvas]: any[]) => {
    setCanvas(canvas)
  })

  return (
    <>
      <Box
        justifyContent="center"
        display="flex"
        background={editorTheme.colors.bgColor}
        padding="44px 0 44px 0"
        margin="0em 0 1em 0"
      >
        <canvas ref={canvasRef} />
        {canvasRef.current !== null && (
          <DraggableWrapper width={`${canvasObject?.width}px`} height={`${canvasObject?.height}px`} position="absolute">
            <DragResizeContainer
              resizeProps={{
                minWidth: 10,
                minHeight: 10,
                enable: canResizable(true),
              }}
              layout={layout}
              dragProps={{ disabled: false }}
              onLayoutChange={(e: any) => console.log(e)}
              scale={1}
            >
              {layout.map((single) => {
                return (
                  <SelectedBox
                    key={single.key}
                    height="100%"
                    width="100%"
                    position="absolute"
                    top="15px"
                    bottom="15px"
                    right="15px"
                    left="15px"
                  >
                    {single.key}
                  </SelectedBox>
                )
              })}
            </DragResizeContainer>
          </DraggableWrapper>
        )}
        {/* {canvasRef && <img src={canvasRef?.current?.toDataURL()} />} */}
        {/* {Boolean(pdfDocument && pdfDocument.numPages) && (
        <nav>
          <ul className="pager">
            <li className="previous">
              <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Previous
              </button>
            </li>
            <li className="next">
              <button disabled={page === pdfDocument.numPages} onClick={() => setPage(page + 1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      )} */}
      </Box>
      <InsertNewPage />
    </>
  )
}
