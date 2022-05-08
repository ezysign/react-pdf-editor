// my-theme.ts
import { DefaultTheme } from 'styled-components'

const editorTheme: DefaultTheme = {
  borderRadius: '5px',
  boxShadow: '0 1px 2px rgba(61,66,78,.5)',
  pdfBoxShadow: '0 1px 8px rgb(61 66 78 / 50%)',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif',
  colors: {
    main: '#fcfdfe',
    secondary: 'magenta',
    bgColor: '#f6f8fa',
    buttonColor: '#3d424e33',
    buttonTextColor: '#FFF',
    selectedBoxColor: '#3c97fe',
    grey1: '#cbcbcb',
    grey2: '#898989',
  },
}

export { editorTheme }
