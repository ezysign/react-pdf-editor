// import original module declarations
import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string
    boxShadow: string
    pdfBoxShadow: string
    fontFamily: string
    colors: {
      main: string
      secondary: string
      bgColor: string
      buttonColor: string
      buttonTextColor: string
      selectedBoxColor: string
      grey1: string
      grey2: string
    }
  }
}
