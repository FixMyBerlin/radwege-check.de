import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Link } from '~/components/Link'
import { Headline, LogoWrapper } from '../components'

export const SectionTeam: React.FC = () => {
  const intl = useIntl()

  return (
    <>
      <Headline id={intl.formatMessage({ id: 'toc.Team.hash' })} as="h2">
        <FormattedMessage id="07_team.p01.heading" />
      </Headline>
      <p>
        <FormattedMessage id="07_team.p02" />
      </p>
      <p>
        <FormattedMessage
          id="07_team.p03"
          values={{
            link: (
              <Link external to="https://fixmycity.de">
                fixmycity.de
              </Link>
            ),
          }}
        />
      </p>
      <p>
        <FormattedMessage id="07_team.p04.phone" />
        <br />
        <Link to="hello@fixmycity.de">hello@fixmycity.de</Link>
        <br />
        <br />
        <FormattedMessage id="07_team.p04.address" />
        <br />
        FixMyCity GmbH c|o CityLAB Berlin
        <br />
        Platz der Luftbrücke 4<br />
        12101 Berlin
        <br />
        <br />
        <FormattedMessage id="07_team.p04.funding" />
      </p>
      <LogoWrapper>
        <Link external blank to="https://www.bmvi.de/" className="h-auto w-60">
          <StaticImage
            src="./images/logo/BMDV_Fz_2021_Office_Farbe_de.png"
            alt="Förderlogo Bundesministerium für Digitales und Verkehr (BMDV)"
          />
        </Link>
        <Link
          external
          blank
          to="https://www.berlin.de/rbmskzl/"
          className="h-auto w-60"
        >
          <StaticImage
            src="./images/logo/senatskanzlei-berlin.png"
            alt="Logo der Senatskanzlei Berlin"
          />
        </Link>
      </LogoWrapper>
    </>
  )
}
