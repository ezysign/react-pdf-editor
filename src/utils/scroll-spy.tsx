import { useLayoutEffect } from 'react'

type ScrollSpy = {
  handleScroll: (entry: any, isInViewPort: boolean) => void
  pdfDoc: any
}
export default ({ handleScroll, pdfDoc }: ScrollSpy): null => {
  const isInViewPort = (entry: any, offset = 0) => {
    const rect = entry.boundingClientRect

    return rect.top - 1 <= 0 + offset && rect.bottom >= 0 + offset
  }

  useLayoutEffect(() => {
    const scrollables = document.querySelectorAll('[data-scrollspy]')

    //@ts-ignore
    for (let scrollable of scrollables) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            handleScroll && handleScroll(entry, isInViewPort(entry))
          })
        },
        {
          root: null,
          rootMargin: '0px 0px 100% 0px',
          threshold: [...Array(101)].map((_, i) => Math.floor(i) / 100),
        }
      )
      observer.observe(scrollable)
    }
  }, [handleScroll, pdfDoc])

  return null
}
