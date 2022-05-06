import * as React from 'react'
import { editorTheme } from '../../theme/editor-theme'
import Box from '../Box'
import Button from '../Button'

export default () => (
  <Box
    height="0px"
    borderTop="1px dashed rgba(61,66,78,.5)"
    display="flex"
    alignItems="center"
    justifyContent="center"
    margin="1em 0"
    background={editorTheme.colors.bgColor}
  >
    <Button>Insert Page here</Button>
  </Box>
)
