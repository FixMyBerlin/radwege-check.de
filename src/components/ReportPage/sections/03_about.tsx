import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Link } from '~/components/Link'
import { Headline, Quote } from '../components'

export const SectionAbout: React.FC = () => {
  const intl = useIntl()

  return (
    <section>
      <Headline id={intl.formatMessage({ id: 'toc.About.hash' })} as="h2">
        <FormattedMessage id="03_concept.heading" />
      </Headline>
      <p>
        <FormattedMessage id="03_concept.p1" />
      </p>
      <Quote sourceText={<FormattedMessage id="03_concept.p1.quoteSource" />}>
        <FormattedMessage id="03_concept.p1.quote" />
      </Quote>
      <p>
        <FormattedMessage id="03_concept.p2" />
      </p>
      <p>
        <FormattedMessage id="03_concept.p3" />
      </p>
      <p>
        <FormattedMessage id="03_concept.p4" />
      </p>
      <p>
        <FormattedMessage id="03_concept.p5" />
      </p>
      <Headline as="h3">
        <FormattedMessage id="03_concept.p6.heading" />
      </Headline>
      <p>
        <FormattedMessage id="03_concept.p6" />
      </p>
      <p>
        <FormattedMessage id="03_concept.p7" />
      </p>
      <ul>
        <li>
          <FormattedMessage id="03_concept.p7.list1" />
        </li>
        <li>
          <FormattedMessage id="03_concept.p7.list2" />
        </li>
        <li>
          <FormattedMessage id="03_concept.p7.list3" />
        </li>
      </ul>
      <Headline as="h3">
        <FormattedMessage id="03_concept.p8.heading" />
      </Headline>
      <p>
        <FormattedMessage
          id="03_concept.p8"
          values={{
            link: (
              <Link
                to="https://interaktiv.tagesspiegel.de/lab/strassencheck-das-stoert-im-berliner-verkehr-am-meisten/"
                external
              >
                <FormattedMessage id="03_concept.p8.link" />
              </Link>
            ),
          }}
        />
      </p>
      <Headline as="h3">
        <FormattedMessage id="03_concept.p9.heading" />
      </Headline>
      <p>
        <FormattedMessage id="03_concept.p9" />
      </p>
      <p>
        <FormattedMessage id="03_concept.p10" />
      </p>
      <ul>
        <li>
          <FormattedMessage id="03_concept.p10.list1" />
        </li>
        <li>
          <FormattedMessage id="03_concept.p10.list2" />
        </li>
        <li>
          <FormattedMessage id="03_concept.p10.list3" />
        </li>
        <li>
          <FormattedMessage id="03_concept.p10.list4" />
        </li>
        <li>
          <FormattedMessage id="03_concept.p10.list5" />
        </li>
      </ul>
      <p>
        <FormattedMessage id="03_concept.p11" />
      </p>
      <Headline as="h3">
        <FormattedMessage id="03_concept.p12.heading" />
      </Headline>
      <p>
        <FormattedMessage id="03_concept.p12" />
      </p>
      <Headline as="h3">
        <FormattedMessage id="03_concept.p13.heading" />
      </Headline>
      <p>
        <FormattedMessage id="03_concept.p13" />
      </p>
      <ol>
        <li>
          <FormattedMessage id="03_concept.p14.list1" />
        </li>
        <li>
          <FormattedMessage id="03_concept.p14.list2" />
        </li>
        <li>
          <FormattedMessage id="03_concept.p14.list3" />
        </li>
      </ol>
      <p>
        <FormattedMessage id="03_concept.p15" />
      </p>
      {intl.locale === 'de' && (
        <StaticImage
          src="./images/diagram_labelled_de.jpg"
          alt={intl.formatMessage({
            id: '03_concept.p15.imageLabel',
          })}
        />
      )}
      {intl.locale === 'en' && (
        <StaticImage
          src="./images/diagram_labelled_en.jpg"
          alt={intl.formatMessage({
            id: '03_concept.p15.imageLabel',
          })}
        />
      )}
      {intl.locale === 'es' && (
        <StaticImage
          src="./images/diagram_labelled_es.jpg"
          alt={intl.formatMessage({
            id: '03_concept.p15.imageLabel',
          })}
        />
      )}

      <p>
        <FormattedMessage id="03_concept.p16" />
      </p>
      <ul>
        <li>
          <FormattedMessage id="03_concept.p16.list1" />
        </li>
        <li>
          <FormattedMessage id="03_concept.p16.list2" />
        </li>
        <li>
          <FormattedMessage id="03_concept.p16.list3" />
        </li>
      </ul>
      <p>
        <FormattedMessage id="03_concept.p17" />
      </p>
      <ul>
        <li>
          <FormattedMessage id="03_concept.p17.list1" />
        </li>
        <li>
          <FormattedMessage id="03_concept.p17.list2" />
        </li>
        <li>
          <FormattedMessage id="03_concept.p17.list3" />
        </li>
      </ul>
      <p>
        <FormattedMessage id="03_concept.p18" />
      </p>
      <p>
        <FormattedMessage
          id="03_concept.p19"
          values={{
            link: (
              <Link
                to="/open-data/Umfragekonzept-KatasterKI-Feb2020.pdf"
                className="matomo_download" // https://developer.matomo.org/guides/tracking-javascript-guide#recording-a-click-as-a-download
              >
                <FormattedMessage id="03_concept.p19.link" />
              </Link>
            ),
          }}
        />
      </p>
      <p>
        <FormattedMessage
          id="03_concept.p20"
          values={{
            link: (
              <Link
                to="/open-data/Szenarienuebersicht-fuer-Abgabe-KatasterKi-Feb2020.ods"
                className="matomo_download" // https://developer.matomo.org/guides/tracking-javascript-guide#recording-a-click-as-a-download
              >
                <FormattedMessage id="03_concept.p20.link" />
              </Link>
            ),
          }}
        />
      </p>
    </section>
  )
}
