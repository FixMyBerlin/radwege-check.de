import React from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Link } from '~/components/Link'
import classNames from 'classnames'
import { useIntl } from 'react-intl'
import { translations } from '../translations'

export const LanguageSwitcher: React.FC = () => {
  const intl = useIntl()

  const labelForLocale = (locale: string) =>
    intl.formatMessage({
      id: `localeSwitcher.label${locale.toUpperCase()}`,
    })

  const pathForLocale = {
    de: '/auswertung',
    en: '/report',
    es: '/evaluacion',
  }

  const currentHash = typeof window !== 'undefined' && window.location.hash

  return (
    <Menu
      as="nav"
      className="top-5 right-5 inline-block text-left print:hidden sm:absolute xl:fixed"
      aria-label="Change Language"
    >
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 focus:ring-offset-gray-100">
          {labelForLocale(intl.locale)}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {translations.map((translation) => (
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={`${pathForLocale[translation]}${currentHash}`}
                    classNameOverwrite={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    {labelForLocale(translation)}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
