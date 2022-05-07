import styled from 'styled-components'
import Box from '../Box'

export const SelectedBox = styled(Box)`
  background-image: ${(
    props
  ) => `linear-gradient(${props.theme.colors.selectedBoxColor}, ${props.theme.colors.selectedBoxColor}), linear-gradient(${props.theme.colors.selectedBoxColor}, ${props.theme.colors.selectedBoxColor}), linear-gradient(${props.theme.colors.selectedBoxColor}, ${props.theme.colors.selectedBoxColor}),
    linear-gradient(${props.theme.colors.selectedBoxColor}, ${props.theme.colors.selectedBoxColor}), linear-gradient(${props.theme.colors.selectedBoxColor}, ${props.theme.colors.selectedBoxColor}), linear-gradient(${props.theme.colors.selectedBoxColor}, ${props.theme.colors.selectedBoxColor}),
    linear-gradient(${props.theme.colors.selectedBoxColor}, ${props.theme.colors.selectedBoxColor}), linear-gradient(${props.theme.colors.selectedBoxColor}, ${props.theme.colors.selectedBoxColor}),
    linear-gradient(${props.theme.colors.selectedBoxColor}80, ${props.theme.colors.selectedBoxColor}80),
    linear-gradient(${props.theme.colors.selectedBoxColor}80, ${props.theme.colors.selectedBoxColor}80),
    linear-gradient(${props.theme.colors.selectedBoxColor}80, ${props.theme.colors.selectedBoxColor}80),
    linear-gradient(${props.theme.colors.selectedBoxColor}80,${props.theme.colors.selectedBoxColor}80);`}
  background-position: top left, top center, top right, right center, bottom right, bottom center, bottom left,
    left center, center top 4px, center right 4px, center bottom 4px, center left 4px;
  background-size: 8px 8px, 8px 8px, 8px 8px, 8px 8px, 8px 8px, 8px 8px, 8px 8px, 8px 8px, 100% 1px, 1px 100%, 100% 1px,
    1px 100%;
  background-repeat: no-repeat;
  padding: 4px;
`

export const DraggableWrapper = styled(Box)`
  .react-draggable >  div {
      div:nth-child(2){
        top: 10px !important;
        left:18px !important;
      }
      div:nth-child(3){
        top: 15px !important;
        right: -23px !important;
      }
      div:nth-child(4){
        bottom: -23px !important;
        left: 17px !important;
      }
      div:nth-child(5){
        top: 23px !important;
        left: 15px !important;
      }
      div:nth-child(6){
        top: 10px !important;
    right: -28px !important;
      }
      div:nth-child(7){
        right: -29px !important;
        bottom: -29px !important;
      }
      div:nth-child(8){
        left: 10px !important;
        bottom: -29px !important;
      }
      div:nth-child(9){
        left: 11px !important;
        top: 8px !important;
      }
     
    }
   
  }
`
