import clsx from 'clsx'
import { Link as GatsbyLink } from 'gatsby'
import React from 'react'
import { isDev, trackEvent } from '../utils'

type Props = {
  /** @desc Internal Link, external Link, e-mail-address (will add the `mailto:` automatically) */
  to: string
  state?: any // good enough IMO
  classNameOverwrite?: string
  className?: string
  blank?: boolean
  external?: boolean
  linkInverted?: boolean
  button?: boolean
  mailSubject?: string
  mailBody?: string
  title?: string
  children: React.ReactNode
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

const linkSharedStyles = 'underline underline-offset-2'

export const linkStyles = clsx(
  linkSharedStyles,
  'decoration-2 decoration-brand-yellow hover:text-yellow-800 hover:decoration-yellow-500',
)

const linkStylesInverted = clsx(
  linkSharedStyles,
  'decoration-1 text-stone-50 decoration-stone-400 hover:text-white hover:decoration-white',
)

export const buttonStyles =
  'inline-flex items-center px-4 py-2 border border-transparent font-semibold rounded-md shadow-sm text-gray-800 bg-brand-yellow hover:bg-yellow-400 group-hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-yellow'

export const Link: React.FC<Props> = React.forwardRef(
  (
    {
      to,
      state,
      classNameOverwrite,
      className,
      blank = false,
      external = false,
      linkInverted = false,
      button = false,
      mailSubject,
      mailBody,
      children,
      ...props
    },
    _ref,
  ) => {
    // eslint-disable-next-line no-nested-ternary
    const styles = button
      ? buttonStyles
      : linkInverted
      ? linkStylesInverted
      : linkStyles

    const classes = clsx(className, classNameOverwrite || styles)

    let mailto: string
    if (to.includes('@')) {
      const url = new URL(`mailto:${to}`)
      if (mailSubject) url.searchParams.set('subject', mailSubject)
      if (mailBody) url.searchParams.set('body', mailBody)
      mailto = url.toString()
    }

    type NewWindowProps = {
      target?: string
      rel?: string
    }

    const newWindowProps: NewWindowProps = {
      target: blank ? '_blank' : undefined,
      rel: external ? 'noopener noreferrer' : undefined,
    }

    if (external || blank || mailto || to.startsWith('tel:')) {
      if (isDev && props.onClick) {
        // eslint-disable-next-line no-console
        console.info({
          NOTE: 'We received an onClick callback via Props which did overwrite default Outbound Link tracker for <Link external>. Please check if that is intended. The props.onClick should handle the event Tracking.',
          to,
        })
      }

      return (
        <a
          href={mailto || to}
          className={classes}
          onClick={() => trackEvent({ category: 'Outbound', action: to })}
          {...newWindowProps}
          {...props}
        >
          {children}
        </a>
      )
    }

    return (
      <GatsbyLink to={to} state={state} className={classes} {...props}>
        {children}
      </GatsbyLink>
    )
  },
)
