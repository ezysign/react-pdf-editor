import * as React from 'react'
import { editorTheme } from '../../theme/editor-theme'
import Box from '../Box'

export default () => (
  <Box
    height="44px"
    width="100vw"
    position="fixed"
    background={editorTheme.colors.main}
    boxShadow={editorTheme.boxShadow}
  >
    This is toolbar
  </Box>
)
