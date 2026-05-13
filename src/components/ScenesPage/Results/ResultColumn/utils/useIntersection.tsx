import React, { useState, useEffect } from 'react'

// Tracks if Content is in viewport.
// Code thanks to https://www.webtips.dev/webtips/react-hooks/element-in-viewport
// @param ref - React ref to the element to track.
// @param rootMargin - Margin to add to the rootMargin of the IntersectionObserver. Eg '-200px' at least 200px of the element has to be visible.
export const useIntersection = (
  element: React.MutableRefObject<undefined | HTMLElement>,
  rootMargin: `${number}px`,
) => {
  const [isVisible, setState] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(entry.isIntersecting)
      },
      { rootMargin },
    )

    if (element.current) {
      observer.observe(element.current)
    }

    return () => {
      if (element.current) {
        observer.unobserve(element.current)
      }
    }
  }, [])

  return isVisible
}
