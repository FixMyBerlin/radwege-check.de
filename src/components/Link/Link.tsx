import classNames from 'classnames'
import { Link as GatsbyLink } from 'gatsby'
import React from 'react'
import { trackEvent } from '../utils'

type Props = {
  /** @desc Internal Link, external Link, e-mail-address (will add the `mailto:` automatically) */
  to: string
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

const linkStyles = classNames(
  linkSharedStyles,
  'decoration-2 decoration-brand-yellow hover:text-yellow-800 hover:decoration-yellow-500'
)

const linkStylesInverted = classNames(
  linkSharedStyles,
  'decoration-1 text-stone-50 decoration-stone-400 hover:text-white hover:decoration-white'
)

export const buttonStyles =
  'inline-flex items-center px-4 py-2 border border-transparent font-semibold rounded-md shadow-sm text-gray-800 bg-brand-yellow hover:bg-yellow-400 group-hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-yellow'

export const Link: React.FC<Props> = React.forwardRef(
  (
    {
      to,
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
    _ref
  ) => {
    // eslint-disable-next-line no-nested-ternary
    const styles = button
      ? buttonStyles
      : linkInverted
      ? linkStylesInverted
      : linkStyles

    const classes = classNames(className, classNameOverwrite || styles)

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
      if (props.onClick) {
        // eslint-disable-next-line no-console
        console.warn({
          ERROR:
            'Our <Link external> component uses onClick to track Matomo links; if we need to use it regularly, we need to refactor this.',
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
      <GatsbyLink to={to} className={classes} {...props}>
        {children}
      </GatsbyLink>
    )
  }
)
