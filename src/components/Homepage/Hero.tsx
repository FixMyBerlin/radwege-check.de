import React from 'react'
import LogoIconColor from '~/components/assets/radwegecheck-logo-bildmarke-mehrfarbig.svg'
import { Link } from '../Link'

export const Hero: React.FC = () => {
  return (
    <section className="flex w-full flex-col items-center bg-brand-light-yellow px-4 pb-12 text-gray-700 lg:px-0">
      <LogoIconColor className="mb-4 mt-8 h-20" alt="Radwege-Check" />

      <h1 className="mb-4 text-5xl font-bold">Mach den Radwege-Check</h1>

      <h2 className="mb-6 text-2xl">
        Vergleiche Radverkehrsführungsformen nach ihrer subjektiven Sicherheit.
      </h2>

      <p className="max-w-prose">
        Der Radwege-Check lässt dich 1.779 Straßenszenen vergleichen, basierend
        auf 400.000 Bewertungen zu ihrer subjektiven Sicherheit{' '}
        <Link
          to="https://fixmyberlin.de/research/subjektive-sicherheit"
          external
          blank
        >
          im Straßencheck
        </Link>
        .
      </p>
    </section>
  )
}
