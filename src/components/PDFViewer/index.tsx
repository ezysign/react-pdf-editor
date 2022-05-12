import React, { useEffect, useCallback } from 'react'
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

export const useCanvasHeight = (pdfDoc: any, callback: any) => {
  const canvasRef = React.useRef(null)

  useEffect(() => {
    const canvasRender = async (p: number) => {
      const item = await pdfDoc.getPage(p)
      const viewport = item.getViewport({ scale: 3 })

      return viewport?.height
    }
    if (pdfDoc !== null || pdfDoc !== undefined) {
      const a = [...Array(pdfDoc?.numPages || 0)].map((_, i) => canvasRender(i + 1))

      Promise.all(a).then((result) => {
        callback(result.reduce((a, b) => a + b, 0))
      })
    }
  }, [pdfDoc])

  return canvasRef
}

const useCanvas = (pdfDoc: any, page: number, scale: number, callback: any) => {
  const canvasRef = React.useRef(null)

  useEffect(() => {
    const canvasRender = async () => {
      const item = await pdfDoc.getPage(page)
      const viewport = item.getViewport({ scale: scale })
      const canvas = canvasRef.current

      const context = canvas.getContext('2d')
      context.clearRect(0, 0, viewport.width, viewport.height)

      canvas.width = viewport.width
      canvas.height = viewport.height
      canvas.getContext('2d')

      item.render({ canvasContext: canvas.getContext('2d'), viewport: viewport })

      callback([canvas, canvas.getContext('2d')])
    }
    canvasRender()
  }, [page, canvasRef, pdfDoc, scale])

  return canvasRef
}

export default ({ page, pdfDoc, scale }: { page: number; pdfDoc: any; scale: number }) => {
  const wrapperRef = React.useRef(null)
  const onCanvasReceived = useCallback(
    ([canvas]: any[]) => {
      wrapperRef.current.style.width = `${canvas?.width}px`
      wrapperRef.current.style.height = `${canvas?.height}px`
    },
    [scale, page, pdfDoc]
  )
  const canvasRef = useCanvas(pdfDoc, page, scale, onCanvasReceived)

  return (
    <>
      <Box
        justifyContent="center"
        display="flex"
        background={editorTheme.colors.bgColor}
        padding="10px 0 10px 0"
        margin="0em 0 0.25em 0"
      >
        <canvas ref={canvasRef} />

        <DraggableWrapper ref={wrapperRef} boxShadow={`${editorTheme.pdfBoxShadow}`} position="absolute">
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
