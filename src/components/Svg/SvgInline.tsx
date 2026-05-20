/**
 * React islands cannot render Astro’s default `.svg` import (SvgComponent); see
 * https://docs.astro.build/en/guides/images/#svg-components
 *
 * Use `import markup from './file.svg?raw'` here so SVG stays inline (e.g. `currentColor`).
 */
import clsx from 'clsx'
import type * as React from 'react'

type SvgInlineProps = Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  'children' | 'dangerouslySetInnerHTML'
> & {
  /** Raw SVG markup from `import markup from './icon.svg?raw'` */
  src: string
  /** Maps to `aria-label` on the wrapper (and `role="img"`) when set */
  alt?: string
}

export function SvgInline({
  src,
  className,
  alt,
  'aria-label': ariaLabel,
  role: roleProp,
  'aria-hidden': ariaHiddenProp,
  ...rest
}: SvgInlineProps) {
  const label = alt ?? ariaLabel
  const role = roleProp ?? (label ? 'img' : undefined)
  const ariaHidden = ariaHiddenProp ?? (label ? undefined : true)
  return (
    <span
      {...rest}
      aria-label={label}
      role={role}
      aria-hidden={ariaHidden}
      className={clsx(
        'inline-flex shrink-0 items-center justify-center [&>svg]:block [&>svg]:max-h-full [&>svg]:max-w-full',
        className,
      )}
      // Local SVG assets only (build-time imports).
      dangerouslySetInnerHTML={{ __html: src }}
    />
  )
}
