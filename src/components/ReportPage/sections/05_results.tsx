import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { BarChart, BarChartWrapper, FeelSafe } from '~/components/charts'
import { Link } from '~/components/Link'
import { Headline, Image, TwoImagesWrapper } from '../components'

export const SectionResults: React.FC = () => {
  const intl = useIntl()

  return (
    <>
      <Headline id={intl.formatMessage({ id: 'toc.Results.hash' })} as="h2">
        <FormattedMessage id="05_results.heading" />
      </Headline>

      <p>
        <FormattedMessage id="05_results.p1" />
      </p>
      <p>
        <FormattedMessage id="05_results.p2" />
      </p>
      <p>
        <FormattedMessage
          id="05_results.p3"
          values={{
            link: (
              <Link
                external
                to="https://github.com/FixMyBerlin/fixmy.survey-results"
              >
                Jupyter Notebooks
              </Link>
            ),
          }}
        />
      </p>

      <Headline as="h3">
        <FormattedMessage id="05_results.p4.heading" />
      </Headline>
      <p>
        <FormattedMessage id="05_results.p4" />
        <ul>
          <li>Friedrichshain-Kreuzberg 14 %</li>
          <li>Mitte 12 %</li>
          <li>Pankow 12 %</li>
          <li>Tempelhof-Schöneberg 10 %</li>
          <li>Charlottenburg-Wilmersdorf 9 %</li>
          <li>Steglitz-Zehlendorf 7 %</li>
          <li>Neukölln 7%</li>
          <li>Treptow-Köpenick 4 %</li>
          <li>Lichtenberg 4 %</li>
          <li>Reinickendorf 4 %</li>
          <li>Spandau 3 %</li>
          <li>Marzahn-Hellersdorf 1 %</li>
          <li>
            <FormattedMessage id="05_results.p4.listOther" /> 11 %
          </li>
        </ul>
      </p>
      <p>
        <FormattedMessage id="05_results.p5" />
        <ul>
          <li>
            <FormattedMessage id="05_results.p5.list1" />
          </li>
          <li>
            <FormattedMessage id="05_results.p5.list2" />
          </li>
          <li>
            <FormattedMessage id="05_results.p5.list3" />
          </li>
        </ul>
        <FormattedMessage id="05_results.p6" />
      </p>
      <p>
        <FormattedMessage id="05_results.p7" />
        <ul>
          <li>
            <FormattedMessage id="05_results.p7.list1" />
          </li>
          <li>
            <FormattedMessage id="05_results.p7.list2" />
          </li>
          <li>
            <FormattedMessage id="05_results.p7.list3" />
          </li>
          <li>
            <FormattedMessage id="05_results.p7.list4" />
          </li>
          <li>
            <FormattedMessage id="05_results.p7.list5" />
          </li>
          <li>
            <FormattedMessage id="05_results.p7.list6" />
          </li>
          <li>
            <FormattedMessage id="05_results.p7.list7" />
          </li>
        </ul>
        <FormattedMessage id="05_results.p8" />
        <ul>
          <li>
            <FormattedMessage id="05_results.p8.list1" />
          </li>
          <li>
            <FormattedMessage id="05_results.p8.list2" />
          </li>
          <li>
            <FormattedMessage id="05_results.p8.list3" />
          </li>
          <li>
            <FormattedMessage id="05_results.p8.list4" />
          </li>
          <li>
            <FormattedMessage id="05_results.p8.list5" />
          </li>
          <li>
            <FormattedMessage id="05_results.p8.list6" />
          </li>
          <li>
            <FormattedMessage id="05_results.p8.list7" />
          </li>
        </ul>
      </p>
      <p>
        <FormattedMessage
          id="05_results.p9"
          values={{
            link: (
              <Link
                external
                to="https://tu-dresden.de/bu/verkehr/ivs/srv/ressourcen/dateien/SrV2018_Staedtevergleich.pdf?lang=de"
              >
                <FormattedMessage id="05_results.p9.link" />
              </Link>
            ),
          }}
        />
      </p>
      <p>
        <FormattedMessage id="05_results.p10" />
      </p>
      <p>
        <FormattedMessage id="05_results.p11" />
      </p>

      <BarChartWrapper
        title={intl.formatMessage({
          id: '05_results.chart1.title',
        })}
        source={intl.formatMessage({
          id: '05_results.chart1.label',
        })}
      >
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart1.1',
          })}
          data={[8.18525, 21.410971, 34.95565, 35.448129]}
          feelsafe={70.4}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart1.2',
          })}
          data={[7.824049, 20.332307, 34.931507, 36.912137]}
          feelsafe={71.84}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart1.3',
          })}
          data={[9.831594, 21.240512, 33.906546, 35.021347]}
          feelsafe={68.93}
        />
      </BarChartWrapper>
      <BarChartWrapper
        title={intl.formatMessage({
          id: '05_results.chart2.title',
        })}
        source={intl.formatMessage({
          id: '05_results.chart2.label',
        })}
      >
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart2.1',
          })}
          data={[8.922697, 19.490132, 29.481908, 42.105263]}
          feelsafe={71}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart2.2',
          })}
          data={[9.36742, 20.752886, 31.124479, 38.755215]}
          feelsafe={70}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart2.3',
          })}
          data={[9.452893, 20.825782, 32.878943, 36.842382]}
          feelsafe={70}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart2.4',
          })}
          data={[9.149358, 21.724335, 34.507092, 34.619215]}
          feelsafe={69}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart2.5',
          })}
          data={[8.353393, 21.826761, 35.510278, 34.309567]}
          feelsafe={70}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart2.6',
          })}
          data={[6.902527, 20.468174, 36.023561, 36.605738]}
          feelsafe={73}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart2.7',
          })}
          data={[6.061991, 19.217255, 35.969147, 38.751607]}
          feelsafe={75}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart2.8',
          })}
          data={[6.204244, 19.344832, 32.696364, 41.75456]}
          feelsafe={75}
        />
      </BarChartWrapper>
      <BarChartWrapper
        title={intl.formatMessage({
          id: '05_results.chart3.title',
        })}
        source={intl.formatMessage({
          id: '05_results.chart3.label',
        })}
      >
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart3.1',
          })}
          data={[8.219178, 21.413216, 34.713547, 35.654059]}
          feelsafe={71}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart3.2',
          })}
          data={[7.542612, 21.50418, 35.653024, 35.300185]}
          feelsafe={71}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart3.3',
          })}
          data={[7.195407, 21.030776, 35.828827, 35.94499]}
          feelsafe={72}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart3.4',
          })}
          data={[7.983095, 19.878098, 34.502092, 37.636715]}
          feelsafe={72}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart3.5',
          })}
          data={[8.619391, 20.588077, 34.345744, 36.446788]}
          feelsafe={70}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart3.6',
          })}
          data={[9.122029, 20.652014, 34.344607, 35.88135]}
          feelsafe={70}
        />
      </BarChartWrapper>
      <p>
        <FormattedMessage id="05_results.p12" />
      </p>

      <Headline as="h3">
        <FormattedMessage id="05_results.p13.heading" />
      </Headline>
      <p>
        <FormattedMessage id="05_results.p13" />
      </p>
      <Headline as="h3">
        <FormattedMessage id="05_results.p14.heading" />
      </Headline>
      <p>
        <FormattedMessage id="05_results.p14" />
      </p>

      <TwoImagesWrapper>
        <Image
          source="MS_C_2"
          chart={<FeelSafe value={28} />}
          subtitle={<FormattedMessage id="05_results.p14.image1" />}
        />

        <Image
          source="MS_C_587"
          chart={<FeelSafe value={11} />}
          subtitle={<FormattedMessage id="05_results.p14.image2" />}
        />
      </TwoImagesWrapper>

      <BarChartWrapper
        title={intl.formatMessage({
          id: '05_results.chart4.title',
        })}
        source={intl.formatMessage({
          id: '05_results.chart4.label',
        })}
      >
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart4.1',
          })}
          data={[3, 18, 49, 30]}
          feelsafe={75.52}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart4.2',
          })}
          data={[52, 33, 12, 3]}
          feelsafe={14}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart4.3',
          })}
          data={[51, 35, 12, 2]}
          feelsafe={15}
        />
      </BarChartWrapper>

      <Headline as="h3">
        <FormattedMessage id="05_results.p15.heading" />
      </Headline>
      <p>
        <FormattedMessage id="05_results.p15" />
      </p>

      <TwoImagesWrapper>
        <Image
          source="MS_C_17"
          chart={<FeelSafe value={69} />}
          subtitle={<FormattedMessage id="05_results.p15.image1" />}
        />
        <Image
          source="MS_C_619"
          chart={<FeelSafe value={33} />}
          subtitle={<FormattedMessage id="05_results.p15.image2" />}
        />
      </TwoImagesWrapper>

      <BarChartWrapper
        title={intl.formatMessage({
          id: '05_results.chart5.title',
        })}
        source={intl.formatMessage({
          id: '05_results.chart5.label',
        })}
      >
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart5.1',
          })}
          data={[8, 29, 43, 19]}
          feelsafe={59.62}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart5.2',
          })}
          data={[2, 11, 40, 47]}
          feelsafe={85.47}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart5.3',
          })}
          data={[4, 18, 46, 32]}
          feelsafe={76.9}
        />
      </BarChartWrapper>

      <Headline as="h3">
        <FormattedMessage id="05_results.p16" />
      </Headline>

      <p>
        <FormattedMessage id="05_results.p17" />
        <ul>
          <li>
            <FormattedMessage id="05_results.p17.list1" />
          </li>
          <li>
            <FormattedMessage id="05_results.p17.list2" />
          </li>
          <li>
            <FormattedMessage id="05_results.p17.list3" />
          </li>
        </ul>
      </p>

      <p>
        <FormattedMessage id="05_results.p18" />
      </p>

      <BarChartWrapper
        title={intl.formatMessage({
          id: '05_results.chart6.title',
        })}
        source={intl.formatMessage({
          id: '05_results.chart6.label',
        })}
      >
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart6.1',
          })}
          data={[21.51]}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart6.2',
          })}
          data={[22.17]}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart6.3',
          })}
          data={[10.57]}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart6.4',
          })}
          data={[8.12]}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart6.5',
          })}
          data={[3.11]}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart6.6',
          })}
          data={[2.6]}
        />
      </BarChartWrapper>

      <Headline as="h3">
        <FormattedMessage id="05_results.p19.heading" />
      </Headline>

      <p>
        <FormattedMessage id="05_results.p19" />
      </p>

      <p>
        <FormattedMessage id="05_results.p20" />
      </p>

      <TwoImagesWrapper>
        <Image
          source="MS_C_305"
          chart={<FeelSafe value={74} />}
          subtitle={<FormattedMessage id="05_results.p20.image1" />}
        />

        <Image
          source="MS_C_17"
          chart={<FeelSafe value={69} />}
          subtitle={<FormattedMessage id="05_results.p20.image2" />}
        />
      </TwoImagesWrapper>

      <p>
        <FormattedMessage id="05_results.p21" />
      </p>

      <TwoImagesWrapper>
        <Image
          source="MS_C_980"
          chart={<FeelSafe value={71} />}
          subtitle={<FormattedMessage id="05_results.p21.image1" />}
        />

        <Image
          source="MS_C_620"
          chart={<FeelSafe value={32} />}
          subtitle={<FormattedMessage id="05_results.p21.image2" />}
        />
      </TwoImagesWrapper>

      <BarChartWrapper
        title={intl.formatMessage({
          id: '05_results.chart7.title',
        })}
        source={intl.formatMessage({
          id: '05_results.chart7.label',
        })}
      >
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart7.1',
          })}
          data={[5.98653, 23.522075, 47.318533, 23.172861]}
          feelsafe={70.49}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart7.2',
          })}
          data={[3.001464, 12.591508, 44.558321, 39.848707]}
          feelsafe={84.41}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart7.3',
          })}
          data={[19.22069, 39.432608, 31.377464, 9.969238]}
          feelsafe={41.35}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart7.4',
          })}
          data={[4.514474, 20.134713, 48.199824, 27.15099]}
          feelsafe={75.35}
        />
      </BarChartWrapper>

      <Headline as="h3">
        <FormattedMessage id="05_results.p22.heading" />
      </Headline>

      <p>
        <FormattedMessage id="05_results.p22" />
      </p>

      <TwoImagesWrapper>
        <Image
          source="MS_C_21"
          chart={<FeelSafe value={80} />}
          subtitle={<FormattedMessage id="05_results.p22.image1" />}
        />
        <Image
          source="MS_C_17"
          chart={<FeelSafe value={69} />}
          subtitle={<FormattedMessage id="05_results.p22.image2" />}
        />
      </TwoImagesWrapper>

      <TwoImagesWrapper>
        <Image
          source="MS_C_1220"
          chart={<FeelSafe value={78} />}
          subtitle={<FormattedMessage id="05_results.p22.image3" />}
        />

        <Image
          source="MS_C_980"
          chart={<FeelSafe value={71} />}
          subtitle={<FormattedMessage id="05_results.p22.image4" />}
        />
      </TwoImagesWrapper>

      <BarChartWrapper
        title={intl.formatMessage({
          id: '05_results.chart8.title',
        })}
        source={intl.formatMessage({
          id: '05_results.chart8.label',
        })}
      >
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart8.1',
          })}
          data={[2, 10, 37, 51]}
          feelsafe={87.55}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart8.2',
          })}
          data={[2, 5, 31, 62]}
          feelsafe={93.5}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart8.3',
          })}
          data={[4, 19, 41, 36]}
          feelsafe={76.2}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart8.4',
          })}
          data={[2, 14, 43, 41]}
          feelsafe={83.07}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart8.5',
          })}
          data={[5, 23, 49, 22]}
          feelsafe={70.17}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart8.6',
          })}
          data={[3, 16, 47, 34]}
          feelsafe={80.42}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart8.7',
          })}
          data={[23, 42, 28, 7]}
          feelsafe={34.19}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart8.8',
          })}
          data={[13, 36, 37, 13]}
          feelsafe={49.82}
        />
      </BarChartWrapper>

      <p>
        <FormattedMessage id="05_results.p23" />
      </p>

      <BarChartWrapper
        title={intl.formatMessage({
          id: '05_results.chart9.title',
        })}
        source={intl.formatMessage({
          id: '05_results.chart9.label',
        })}
      >
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart9.1',
          })}
          data={[8.542686, 22.612828, 38.589373, 30.255113]}
          feelsafe={68.84}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart9.2',
          })}
          data={[4.890647, 17.087043, 39.353226, 38.669085]}
          feelsafe={78.02}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart9.3',
          })}
          data={[8.903186, 23.970115, 39.140811, 27.985888]}
          feelsafe={67.13}
        />
      </BarChartWrapper>

      <Headline as="h3">
        <FormattedMessage id="05_results.p24.heading" />
      </Headline>

      <p>
        <FormattedMessage id="05_results.p24" />
      </p>

      <TwoImagesWrapper>
        <Image
          source="MS_C_75"
          subtitle={<FormattedMessage id="05_results.p24.image1" />}
          chart={<FeelSafe value={90.65} />}
        />

        <Image
          source="MS_C_377"
          subtitle={<FormattedMessage id="05_results.p24.image2" />}
          chart={<FeelSafe value={97.52} />}
        />
      </TwoImagesWrapper>

      <BarChartWrapper
        title={intl.formatMessage({
          id: '05_results.chart10.title',
        })}
        source={intl.formatMessage({
          id: '05_results.chart10.label',
        })}
      >
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart10.1',
          })}
          data={[4.376283, 19.109343, 45.995893, 30.51848]}
          feelsafe={75.64}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart10.2',
          })}
          data={[3.933106, 16.64602, 46.097863, 33.32301]}
          feelsafe={78.91}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart10.3',
          })}
          data={[1.895462, 7.352096, 25.272832, 65.479609]}
          feelsafe={90.75}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart10.4',
          })}
          data={[1.396078, 7.32549, 33.662745, 57.615686]}
          feelsafe={91.28}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart10.5',
          })}
          data={[1.466594, 7.224335, 25.31233, 65.996741]}
          feelsafe={91.31}
        />
      </BarChartWrapper>

      <Headline as="h3">
        <FormattedMessage id="05_results.p25.heading" />
      </Headline>

      <p>
        <FormattedMessage id="05_results.p25" />
      </p>

      <TwoImagesWrapper>
        <Image source="MS_C_597" chart={<FeelSafe value={91.3} />} />
        <Image source="MS_C_980" chart={<FeelSafe value={70.71} />} />
      </TwoImagesWrapper>

      <p>
        <FormattedMessage id="05_results.p26" />
      </p>

      <TwoImagesWrapper>
        <Image source="MS_C_611" chart={<FeelSafe value={94.32} />} />

        <Image source="MS_C_596" chart={<FeelSafe value={95.45} />} />
      </TwoImagesWrapper>

      <BarChartWrapper
        title={intl.formatMessage({
          id: '05_results.chart11.title',
        })}
        source={intl.formatMessage({
          id: '05_results.chart11.label',
        })}
      >
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart11.1',
          })}
          data={[3.812933, 19.951131, 48.818048, 27.417888]}
          feelsafe={74.54}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart11.2',
          })}
          data={[1.431025, 3.978248, 21.665713, 72.925014]}
          feelsafe={91.69}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart11.3',
          })}
          data={[1.060071, 7.022968, 34.584806, 57.332155]}
          feelsafe={94.22}
        />
      </BarChartWrapper>

      <Headline as="h3">
        <FormattedMessage id="05_results.p27.heading" />
      </Headline>

      <p>
        <FormattedMessage id="05_results.p27" />
      </p>

      <Headline as="h3">
        <FormattedMessage id="05_results.p28.heading" />
      </Headline>

      <p>
        <FormattedMessage id="05_results.p28" />
      </p>

      {/* Fehlende Daten */}
      <BarChartWrapper
        title={intl.formatMessage({
          id: '05_results.chart12.title',
        })}
        source={intl.formatMessage({
          id: '05_results.chart12.label',
        })}
      >
        <BarChart
          titleClass="w-40"
          title={intl.formatMessage({
            id: '05_results.chart12.1',
          })}
          data={[52, 33, 12, 3]}
          feelsafe={14.24}
        />
        <BarChart
          titleClass="w-40"
          title={intl.formatMessage({
            id: '05_results.chart12.2',
          })}
          data={[3, 18, 49, 30]}
          feelsafe={75.52}
        />
        <BarChart
          titleClass="w-40"
          title={intl.formatMessage({
            id: '05_results.chart12.3',
          })}
          data={[31.877551, 42.095238, 16.938776, 9.088435]}
          feelsafe={25.41}
          feelsafeIcon="car"
        />
        <BarChart
          titleClass="w-40"
          title={intl.formatMessage({
            id: '05_results.chart12.4',
          })}
          data={[1.773559, 12.917629, 47.055517, 38.253294]}
          feelsafe={82.99}
          feelsafeIcon="car"
        />
      </BarChartWrapper>

      <p>
        <FormattedMessage id="05_results.p29" />
      </p>

      <TwoImagesWrapper>
        <Image
          source="MS_A_1285"
          chart={<FeelSafe value={94.68} icon="car" />}
        />

        <Image
          source="MS_A_586"
          chart={<FeelSafe value={28.21} icon="car" />}
        />
      </TwoImagesWrapper>

      <Headline as="h3">
        <FormattedMessage id="05_results.p30.heading" />
      </Headline>

      <p>
        <FormattedMessage id="05_results.p30" />
      </p>

      <BarChartWrapper
        title={intl.formatMessage({
          id: '05_results.chart12b.title',
        })}
        source={intl.formatMessage({
          id: '05_results.chart12b.label',
        })}
      >
        <BarChart
          titleClass="w-40"
          title={intl.formatMessage({
            id: '05_results.chart12b.1',
          })}
          data={[4.05788, 17.882982, 46.429695, 31.629443]}
          feelsafe={76.9}
        />
        <BarChart
          titleClass="w-40"
          title={intl.formatMessage({
            id: '05_results.chart12b.2',
          })}
          data={[1.366559, 6.879689, 30.90836, 60.845391]}
          feelsafe={91.2}
        />
        <BarChart
          titleClass="w-40"
          title={intl.formatMessage({
            id: '05_results.chart12b.3',
          })}
          data={[2.398382, 13.937584, 44.731266, 38.932768]}
          feelsafe={82.76}
          feelsafeIcon="car"
        />
        <BarChart
          titleClass="w-40"
          title={intl.formatMessage({
            id: '05_results.chart12b.4',
          })}
          data={[2.326551, 10.173449, 34.247832, 53.252168]}
          feelsafe={86.76}
          feelsafeIcon="car"
        />
        <BarChart
          titleClass="w-40"
          title={intl.formatMessage({
            id: '05_results.chart12b.5',
          })}
          data={[3.789474, 11.508772, 30.105263, 54.596491]}
          feelsafe={84.7}
          feelsafeIcon="car"
        />
        <BarChart
          titleClass="w-40"
          title={intl.formatMessage({
            id: '05_results.chart12b.6',
          })}
          data={[2.107482, 10.410959, 35.911486, 51.570074]}
          feelsafe={87.48}
          feelsafeIcon="car"
        />
        <BarChart
          titleClass="w-40 xxx"
          title={intl.formatMessage({
            id: '05_results.chart12b.7',
          })}
          data={[2.715547, 9.164969, 29.192125, 58.927359]}
          feelsafe={88.12}
          feelsafeIcon="car"
        />
      </BarChartWrapper>
      <p>
        <FormattedMessage id="05_results.p31" />
      </p>

      <TwoImagesWrapper>
        <Image
          source="MS_A_67"
          chart={<FeelSafe value={87.77} icon="car" />}
          subtitle={<FormattedMessage id="05_results.p31.image1" />}
        />
        <Image
          source="MS_A_343"
          chart={<FeelSafe value={88.66} icon="car" />}
          subtitle={<FormattedMessage id="05_results.p31.image2" />}
        />
      </TwoImagesWrapper>

      <Headline as="h3">
        <FormattedMessage id="05_results.p32.heading" />
      </Headline>

      <Headline as="h3">
        <FormattedMessage id="05_results.p33.heading" />
      </Headline>

      <p>
        <FormattedMessage id="05_results.p33" />
      </p>

      <BarChartWrapper
        title={intl.formatMessage({
          id: '05_results.chart13.title',
        })}
      >
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart13.1',
          })}
          data={[5.98653, 23.522075, 47.318533, 23.172861]}
          feelsafe={70.49}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart13.2',
          })}
          data={[3.001464, 12.591508, 44.558321, 39.848707]}
          feelsafe={84.41}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart13.3',
          })}
          data={[19.22069, 39.432608, 31.377464, 9.969238]}
          feelsafe={41.35}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart13.4',
          })}
          data={[4.514474, 20.134713, 48.199824, 27.15099]}
          feelsafe={75.35}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart13.5',
          })}
          data={[0.677428, 3.889918, 29.751257, 65.681397]}
          feelsafe={94.61}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart13.6',
          })}
          data={[3.729178, 23.567974, 43.98173, 28.721118]}
          feelsafe={69.1}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart13.7',
          })}
          data={[1.055662, 5.143954, 26.81382, 66.986564]}
          feelsafe={92.4}
        />
      </BarChartWrapper>

      <p>
        <FormattedMessage id="05_results.p34" />
      </p>

      <TwoImagesWrapper>
        <Image
          source="MS_C_325"
          chart={<FeelSafe value={87.93} />}
          subtitle={<FormattedMessage id="05_results.p34.image1" />}
        />

        <Image
          source="CP_C_1100"
          chart={<FeelSafe value={97.62} />}
          subtitle={<FormattedMessage id="05_results.p34.image2" />}
        />
      </TwoImagesWrapper>

      <p>
        <FormattedMessage id="05_results.p35" />
      </p>

      <TwoImagesWrapper>
        <Image
          source="MS_C_860"
          chart={<FeelSafe value={47.55} />}
          subtitle={<FormattedMessage id="05_results.p35.image1" />}
        />

        <Image
          source="CP_C_463"
          chart={<FeelSafe value={78.95} />}
          subtitle={<FormattedMessage id="05_results.p35.image2" />}
        />
      </TwoImagesWrapper>

      <Headline as="h3">
        <FormattedMessage id="05_results.p36" />
      </Headline>

      <p>
        <FormattedMessage id="05_results.p37" />
      </p>

      <BarChartWrapper
        title={intl.formatMessage({
          id: '05_results.chart14.title',
        })}
        source={intl.formatMessage({
          id: '05_results.chart14.label',
        })}
      >
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart14.1',
          })}
          data={[24.09]}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart14.2',
          })}
          data={[1.33]}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart14.3',
          })}
          data={[4.1]}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart14.4',
          })}
          data={[11.41]}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart14.5',
          })}
          data={[6.23]}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart14.6',
          })}
          data={[1.1]}
        />
      </BarChartWrapper>

      <Headline as="h3">
        <FormattedMessage id="05_results.p38.heading" />
      </Headline>

      <p>
        <FormattedMessage id="05_results.p38" />
      </p>

      <TwoImagesWrapper>
        <Image source="CP_C_553" chart={<FeelSafe value={76.52} />} />

        <Image source="CP_C_1093" chart={<FeelSafe value={97.47} />} />
      </TwoImagesWrapper>

      <BarChartWrapper
        title={intl.formatMessage({
          id: '05_results.chart15.title',
        })}
        source={intl.formatMessage({
          id: '05_results.chart15.label',
        })}
      >
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart15.1',
          })}
          data={[0.677428, 3.889918, 29.751257, 65.681397]}
          feelsafe={94.61}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart15.2',
          })}
          data={[3.729178, 23.567974, 43.98173, 28.721118]}
          feelsafe={69.1}
        />
      </BarChartWrapper>

      <p>
        <FormattedMessage id="05_results.p39" />
      </p>

      <TwoImagesWrapper>
        <Image
          source="CP_C_516"
          chart={<FeelSafe value={56.13} />}
          subtitle={<FormattedMessage id="05_results.p39.image1" />}
        />

        <Image
          source="CP_C_509"
          chart={<FeelSafe value={77.42} />}
          subtitle={<FormattedMessage id="05_results.p39.image2" />}
        />
      </TwoImagesWrapper>

      <Headline as="h3">
        <FormattedMessage id="05_results.p40" />
      </Headline>

      <p>
        <FormattedMessage id="05_results.p41" />
      </p>

      <BarChartWrapper
        title={intl.formatMessage({
          id: '05_results.chart16.title',
        })}
        source={intl.formatMessage({
          id: '05_results.chart16.label',
        })}
      >
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart16.1',
          })}
          data={[2.043688, 11.751203, 39.159571, 47.045539]}
          feelsafe={84.24}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart16.2',
          })}
          data={[2.039444, 11.687584, 37.483191, 48.78978]}
          feelsafe={84.16}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart16.3',
          })}
          data={[3.390943, 18.938234, 40.016772, 37.654051]}
          feelsafe={74.96}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart16.4',
          })}
          data={[1.710024, 9.920563, 35.795282, 52.574131]}
          feelsafe={86.4}
        />
      </BarChartWrapper>

      <p>
        <FormattedMessage id="05_results.p42" />
      </p>

      <TwoImagesWrapper>
        <Image source="CP_C_725" chart={<FeelSafe value={69.16} />} />

        <Image source="CP_C_823" chart={<FeelSafe value={98.18} />} />
      </TwoImagesWrapper>

      <TwoImagesWrapper>
        <Image source="CP_C_49" chart={<FeelSafe value={49.56} />} />

        <Image source="CP_C_58" chart={<FeelSafe value={67.88} />} />
      </TwoImagesWrapper>

      <Headline as="h3">
        <FormattedMessage id="05_results.p43.heading" />
      </Headline>

      <p>
        <FormattedMessage id="05_results.p43" />
      </p>

      <BarChartWrapper
        title={intl.formatMessage({
          id: '05_results.chart17.title',
        })}
        source={intl.formatMessage({
          id: '05_results.chart17.label',
        })}
      >
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart17.1',
          })}
          data={[5.76]}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart17.2',
          })}
          data={[32.13]}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart17.3',
          })}
          data={[25.39]}
        />
      </BarChartWrapper>

      <Headline as="h3">
        <FormattedMessage id="05_results.p44.heading" />
      </Headline>

      <p>
        <FormattedMessage id="05_results.p44" />
      </p>

      <BarChartWrapper
        title={intl.formatMessage({
          id: '05_results.chart18.title',
        })}
        source={intl.formatMessage({
          id: '05_results.chart18.label',
        })}
      >
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart18.1',
          })}
          data={[6.599897, 36.123951, 38.004337, 19.271814]}
          feelsafe={53.24}
          feelsafeIcon="walk"
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart18.2',
          })}
          data={[1.740895, 12.454977, 42.070208, 43.73392]}
          feelsafe={83.36}
          feelsafeIcon="walk"
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart18.3',
          })}
          data={[3.390943, 18.938234, 40.016772, 37.654051]}
          feelsafe={74.95}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart18.4',
          })}
          data={[1.710024, 9.920563, 35.795282, 52.574131]}
          feelsafe={86.4}
        />
      </BarChartWrapper>

      <p>
        <FormattedMessage id="05_results.p45" />
      </p>

      <TwoImagesWrapper>
        <Image
          source="CP_P_194"
          chart={<FeelSafe value={81.44} icon="walk" />}
          subtitle={<FormattedMessage id="05_results.p45.image1" />}
        />

        <Image
          source="CP_C_194"
          chart={<FeelSafe value={75.56} />}
          subtitle={<FormattedMessage id="05_results.p45.image2" />}
        />
      </TwoImagesWrapper>

      <p>
        <FormattedMessage id="05_results.p46" />
      </p>

      <BarChartWrapper
        title={intl.formatMessage({
          id: '05_results.chart19.title',
        })}
        source={intl.formatMessage({
          id: '05_results.chart19.label',
        })}
      >
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart19.1',
          })}
          data={[2.90756, 16.603599, 39.771411, 40.71743]}
          feelsafe={78.18}
          feelsafeIcon="walk"
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart19.2',
          })}
          data={[1.970729, 10.93387, 35.689949, 51.405451]}
          feelsafe={85.49}
          feelsafeIcon="walk"
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart19.3',
          })}
          data={[8.617505, 35.028605, 35.731339, 20.622551]}
          feelsafe={56.35}
          feelsafeIcon="walk"
        />
      </BarChartWrapper>

      <p>
        <FormattedMessage id="05_results.p47" />
      </p>

      <TwoImagesWrapper>
        <Image
          source="CP_P_149"
          chart={<FeelSafe value={90.52} icon="walk" />}
        />

        <Image
          source="CP_P_778"
          chart={<FeelSafe value={93.47} icon="walk" />}
        />
      </TwoImagesWrapper>

      <Headline as="h3">
        <FormattedMessage id="05_results.p48" />
      </Headline>

      <p>
        <FormattedMessage id="05_results.p49" />
      </p>
      <Headline as="h3">
        <FormattedMessage id="05_results.p50.heading" />
      </Headline>

      <p>
        <FormattedMessage id="05_results.p50" />
      </p>

      <BarChartWrapper
        title={intl.formatMessage({
          id: '05_results.chart20.title',
        })}
        source={intl.formatMessage({
          id: '05_results.chart20.label',
        })}
      >
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart20.1',
          })}
          data={[30.5]}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart20.2',
          })}
          data={[19.4]}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart20.3',
          })}
          data={[18.07]}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart20.4',
          })}
          data={[26.14]}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart20.5',
          })}
          data={[60.52]}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart20.6',
          })}
          data={[1.13]}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart20.7',
          })}
          data={[76.66]}
        />
      </BarChartWrapper>

      <p>
        <FormattedMessage id="05_results.p51" />
      </p>

      <TwoImagesWrapper>
        <Image source="SE_C_11" chart={<FeelSafe value={33.4} />} />

        <Image source="SE_C_71" chart={<FeelSafe value={21.43} />} />
      </TwoImagesWrapper>

      <Headline as="h3">
        <FormattedMessage id="05_results.p52" />
      </Headline>

      <p>
        <FormattedMessage id="05_results.p53" />
      </p>

      <TwoImagesWrapper>
        <Image
          source="SE_C_2"
          chart={<FeelSafe value={51.02} />}
          subtitle={<FormattedMessage id="05_results.p53.image1" />}
        />

        <Image
          source="SE_C_12"
          chart={<FeelSafe value={56.72} />}
          subtitle={<FormattedMessage id="05_results.p53.image2" />}
        />
      </TwoImagesWrapper>

      <BarChartWrapper
        title={intl.formatMessage({
          id: '05_results.chart21.title',
        })}
        source={intl.formatMessage({
          id: '05_results.chart21.label',
        })}
      >
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart21.1',
          })}
          data={[35.902256, 36.172462, 20.911654, 7.013628]}
          feelsafe={27.93}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart21.2',
          })}
          data={[17.051071, 34.478701, 33.478466, 14.991763]}
          feelsafe={48.47}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart21.3',
          })}
          data={[30.787364, 36.338991, 22.477605, 10.39604]}
          feelsafe={32.87}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart21.4',
          })}
          data={[17.137386, 34.837243, 34.633796, 13.391575]}
          feelsafe={48.03}
        />
      </BarChartWrapper>

      <p>
        <FormattedMessage id="05_results.p54" />
      </p>

      <TwoImagesWrapper>
        <Image source="SE_C_42" chart={<FeelSafe value={45.03} />} />

        <Image source="SE_C_44" chart={<FeelSafe value={21.74} />} />
      </TwoImagesWrapper>

      <Headline as="h3" id="dutch-solution">
        <FormattedMessage id="05_results.p55" />
      </Headline>

      <p>
        <FormattedMessage id="05_results.p56" />
      </p>

      <TwoImagesWrapper>
        <Image source="SE_C_10" chart={<FeelSafe value={98.33} />} />

        <Image source="SE_C_50" chart={<FeelSafe value={92.42} />} />
      </TwoImagesWrapper>

      <p>
        <FormattedMessage id="05_results.p57" />
      </p>

      <TwoImagesWrapper>
        <Image source="SE_C_47" chart={<FeelSafe value={74.54} />} />

        <Image source="SE_C_49" chart={<FeelSafe value={54.83} />} />
      </TwoImagesWrapper>

      <BarChartWrapper
        title={intl.formatMessage({
          id: '05_results.chart22.title',
        })}
        source={intl.formatMessage({
          id: '05_results.chart22.label',
        })}
      >
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart22.1',
          })}
          data={[15.428571, 33.142857, 33.0, 18.428571]}
          feelsafe={51.42}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart22.2',
          })}
          data={[2.039405, 6.394746, 22.571725, 68.994124]}
          feelsafe={91.56}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart22.3',
          })}
          data={[2.811245, 14.993307, 40.763052, 41.432396]}
          feelsafe={82.19}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart22.4',
          })}
          data={[9.591983, 20.042949, 33.786686, 36.578382]}
          feelsafe={70.35}
        />
        <BarChart
          title={intl.formatMessage({
            id: '05_results.chart22.5',
          })}
          data={[4.538799, 18.081991, 43.045388, 34.333821]}
          feelsafe={77.37}
        />
      </BarChartWrapper>
    </>
  )
}
