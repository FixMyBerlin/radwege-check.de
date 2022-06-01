import React from 'react'

type Props = {
  className?: string
}

/**
 * An iFrame that shows the subscription form for the newsletter
 * In Mailjet: https://app.mailjet.com/widget
 *
 * Code inspired by https://github.com/FixMyBerlin/fixmy.frontend/blob/master/src/components2/NewsletterWidget/NewsletterWidget.tsx
 */
export const NewsletterWidget: React.VFC<Props> = ({ className }) => {
  const src = 'https://app.mailjet.com/widget/iframe/2YIa/EGM?v=4'

  return (
    <iframe
      title="Newsletter-Anmeldung"
      scrolling="no"
      marginHeight={0}
      marginWidth={0}
      className={className}
      src={src}
    />
  )
}
