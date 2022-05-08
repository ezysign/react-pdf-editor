import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { editorTheme } from '../../theme/editor-theme'
import Box from '../Box'
import IconButton from '../IconButton'
import { FasIcons } from '../Icons'
import PageIndex from '../PageIndex'

export default ({
  totalPages,
  currentPage,
  onPrevPageClick,
  onInputValueChange,
  onNextPageClick,
  onExpandClick,
}: {
  totalPages: number
  currentPage: number
  onPrevPageClick?: (currentPage: number, totalPages: number) => void
  onNextPageClick?: (currentPage: number, totalPages: number) => void
  onInputValueChange?: (currentPage: number) => void
  onExpandClick?: () => void
}) => (
  <Box
    height="44px"
    width="100vw"
    zIndex="1"
    position="fixed"
    display="flex"
    alignItems="center"
    background={editorTheme.colors.main}
    boxShadow={editorTheme.boxShadow}
  >
    <Box padding="0 0.5em">
      <PageIndex
        totalPages={totalPages}
        currentPage={currentPage}
        onInputValueChange={onInputValueChange}
        onNextPageClick={onNextPageClick}
        onPrevPageClick={onPrevPageClick}
      />
    </Box>
    <Box>
      <IconButton>
        <FontAwesomeIcon icon={FasIcons.faExpandArrowsAlt} color="black" onClick={onExpandClick} />
      </IconButton>
    </Box>
  </Box>
)
