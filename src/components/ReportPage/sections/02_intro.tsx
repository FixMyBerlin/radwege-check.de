import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { FeelSafe } from '~/components/charts'
import { Link } from '~/components/Link'
import { SceneImage } from '~/components/ScenesPage/SceneImage'
import { ButtonWrapper, Headline, Image, TwoImagesWrapper } from '../components'

export const SectionIntroduction: React.FC = () => {
  const intl = useIntl()

  return (
    <section>
      <Headline
        id={intl.formatMessage({ id: 'toc.introduction.hash' })}
        as="h2"
      >
        <FormattedMessage id="02_intro.heading" />
      </Headline>
      <p>
        <FormattedMessage id="02_intro.p1" />
      </p>
      <p>
        <FormattedMessage
          id="02_intro.p2"
          values={{
            link: (
              <Link to="#umfragekonzept">
                <FormattedMessage id="02_intro.p2.link" />
              </Link>
            ),
          }}
        />
      </p>
      <TwoImagesWrapper>
        <Image
          subtitle={<FormattedMessage id="02_intro.images1.label1" />}
          chart={<FeelSafe value={99.11} />}
        >
          <SceneImage
            sceneId="MS_C_573"
            alt="Fahrradperspektive auf breiten Radweg mit grüner Oberfläche und Trennung zur Fahrbahn durch Blumenkübel"
            lazy
            className="mt-0 mb-1"
          />
        </Image>
        <Image
          subtitle={<FormattedMessage id="02_intro.images1.label2" />}
          chart={<FeelSafe value={96.84} icon="car" />}
        >
          <SceneImage
            sceneId="MS_A_570"
            alt="Autoperspektive auf vorigen Radweg"
            lazy
            className="mt-0 mb-1"
          />
        </Image>
      </TwoImagesWrapper>

      <p>
        <FormattedMessage id="02_intro.p3" />
      </p>

      <ButtonWrapper>
        <Link button to="#statistische-auswertung">
          <FormattedMessage id="02_intro.cta" />
        </Link>
      </ButtonWrapper>

      <p>
        <FormattedMessage
          id="02_intro.p4"
          values={{
            link: (
              <Link
                external
                to="https://interaktiv.tagesspiegel.de/lab/berliner-strassencheck-die-auswertung/"
              >
                <FormattedMessage id="02_intro.p4.link" />
              </Link>
            ),
          }}
        />
      </p>

      <p>
        <FormattedMessage id="02_intro.p5" />
      </p>
      <ButtonWrapper>
        <Link button to="https://radwege-check.de/">
          <FormattedMessage id="02_intro.p5.link" />
        </Link>
      </ButtonWrapper>
    </section>
  )
}
