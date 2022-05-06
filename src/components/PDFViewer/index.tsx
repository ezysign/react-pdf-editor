import React, { useEffect, useRef } from 'react'
import { editorTheme } from '../../theme/editor-theme'

import Box from '../Box'
import InsertNewPage from '../InsertNewPage'

export default ({ pdfPath, page, pdfDoc }: { pdfPath: string; page: number; pdfDoc: any }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvasRender = async () => {
      const item = await pdfDoc.getPage(page)
      const viewport = item.getViewport({ scale: 2 })
      const canvas = canvasRef.current

      canvas.width = viewport.width
      canvas.height = viewport.height
      canvas.getContext('2d')

      item.render({ canvasContext: canvas.getContext('2d'), viewport: viewport })
    }
    canvasRender()
  }, [page])

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
