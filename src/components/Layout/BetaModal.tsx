import React from 'react'
import { Link } from '../Link'
import { Modal } from '../Modal'
import { NewsletterWidget } from '../NewsletterWidget'
import PersonDigging from './assets/person-digging-icon.svg'

export const BetaModal = () => {
  return (
    <Modal
      title="Beta"
      titleIcon={<PersonDigging className="h-10 w-10" />}
      closeButton="Alles klar"
      className="print:hidden"
      showLegalLine
    >
      <p>
        Willkommen! <br />
        Der Radwege-Check befindet sich in der Testphase. <br />
        Wir entwickeln ihn zur Zeit von Woche zu Woche weiter.
      </p>

      <h2 className="mt-8 font-semi text-xl font-semibold">
        Lass dich informieren, wenn alles fertig ist:
      </h2>
      <NewsletterWidget className="h-[100px] w-full" />

      <h2 className="mt-8 font-semi text-xl font-semibold">Schreib uns:</h2>
      <p>Was gefällt dir, was kann besser gehen?</p>
      <p>
        <Link to="mailto:hello@fixmycity.de">hello@fixmycity.de</Link>
      </p>
    </Modal>
  )
}
