import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'
import Box from '../Box'
import { FasIcons } from '../Icons'

const PrefixButton = styled.button`
  background: ${(props) => props.theme.colors.buttonColor};
  border-radius: 5px 0px 0px 5px;
  outline: transparent;
  border: 1px solid ${(props) => props.theme.colors.grey1};
  &:hover {
    background: ${(props) => props.theme.colors.grey2};
  }
`

const PageInput = styled.input`
  background: ${(props) => props.theme.colors.buttonColor};
  border: 0px;
  width: 40px;
  text-align: center;
  outline: transparent;
`

const PostFixButton = styled.button`
  background: ${(props) => props.theme.colors.buttonColor};
  border-radius: 0px 5px 5px 0px;
  outline: transparent;
  border: 1px solid ${(props) => props.theme.colors.grey1};
  &:hover {
    background: ${(props) => props.theme.colors.grey2};
  }
`

export default ({
  totalPages,
  currentPage,
  onPrevPageClick,
  onInputValueChange,
  onNextPageClick,
}: {
  totalPages: number
  currentPage: number
  onPrevPageClick?: (currentPage: number, totalPages: number) => void
  onInputValueChange?: (currentPage: number) => void
  onNextPageClick?: (currentPage: number, totalPages: number) => void
}) => {
  const [value, setValue] = React.useState(`${currentPage}`)
  React.useEffect(() => {
    setValue(`${currentPage}`)
  }, [currentPage])

  return (
    <Box display="flex" alignItems={'center'}>
      <span>&nbsp; Page &nbsp; </span>

      <Box display="flex" height="30px">
        <PrefixButton disabled={+value === 1} onClick={() => onPrevPageClick?.(+value, totalPages)}>
          <FontAwesomeIcon icon={FasIcons.faCaretLeft} />
        </PrefixButton>
        <PageInput
          type="number"
          min="1"
          max={`${totalPages}`}
          value={value}
          pattern="[0-9]"
          onChange={(e) => setValue(e.target.value || '')}
          onBlur={() => onInputValueChange(+value)}
        />
        <PostFixButton disabled={+value === totalPages} onClick={() => onNextPageClick?.(+value, totalPages)}>
          <FontAwesomeIcon icon={FasIcons.faCaretRight} />
        </PostFixButton>
      </Box>
      <span>&nbsp;Of </span>
      <span>&nbsp;&nbsp;{totalPages || 0} </span>
    </Box>
  )
}
