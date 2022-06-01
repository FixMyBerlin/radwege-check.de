import React from 'react'
import { Link } from '../Link'
import { LogoBmdv } from './LogoBmdv'

export const Logos: React.FC = () => {
  return (
    <section className="flex place-content-center bg-white pt-5 pb-1">
      <Link
        to="https://www.mobilitaetsforum.bund.de/DE/Themen/Wissenspool/Projekte/Projektbeispiele/Projekte/RVA-Safetycheck.html"
        external
        blank
      >
        <LogoBmdv />
      </Link>
    </section>
  )
}
