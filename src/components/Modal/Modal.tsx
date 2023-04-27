import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { buttonStyles, Link } from '../Link'

type Props = {
  title: string
  titleIcon?: React.ReactNode
  closeButton?: string
  className?: string
  showLegalLine?: boolean
  children: React.ReactNode
}

export const Modal: React.FC<Props> = ({
  title,
  titleIcon,
  closeButton,
  className,
  showLegalLine = true,
  children,
}) => {
  const [open, setOpen] = useState(true)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className={clsx(className, 'relaftive z-50')}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-20 w-screen bg-gray-500/75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4 pt-16 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
                <div>
                  {titleIcon && (
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-200">
                      {titleIcon}
                    </div>
                  )}
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h1"
                      className="text-3xl font-semibold leading-6 text-gray-900"
                    >
                      {title}
                    </Dialog.Title>
                    <div className="my-5">{children}</div>
                  </div>
                </div>
                {closeButton && (
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className={clsx(
                        'inline-flex w-full justify-center',
                        buttonStyles
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {closeButton}
                    </button>
                  </div>
                )}
                {showLegalLine && (
                  <p className="text-xss mt-4 space-x-5 text-center">
                    <Link to="/datenschutz" className="text-xxs text-gray-500">
                      Datenschutz
                    </Link>
                    <Link to="/kontakt" className="text-xxs text-gray-500">
                      Impressum
                    </Link>
                  </p>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
