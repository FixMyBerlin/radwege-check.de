import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import React, { Fragment } from 'react'
import { useStore } from 'zustand'
import { Link } from '~/components/Link'
import { useStoreExperimentData } from '../../store'

export const ExperimentSwitcher: React.FC = () => {
  const { experimentTextKey } = useStore(useStoreExperimentData)

  const experimentValues = {
    primary: {
      name: 'Hauptstraßen',
      path: '/hauptstrassen',
    },
    secondary: {
      name: 'Nebenstraßen',
      path: '/nebenstrassen',
    },
  }

  return (
    <Menu as="div" className="relative z-20 inline-block text-left">
      <div>
        <Menu.Button className="inline-flex min-h-[2.125rem] w-full items-center justify-center rounded-md border border-gray-300 pl-[0.6rem] text-sm font-normal text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 focus:ring-offset-gray-100">
          {experimentValues[experimentTextKey]?.name}
          <ChevronDownIcon
            className="ml-[1px] mr-1 hidden w-[18px] lg:block"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {Object.entries(experimentValues).map(([key, { name, path }]) => {
              const active = experimentTextKey === key

              return (
                <Menu.Item key={key}>
                  <Link
                    to={path}
                    classNameOverwrite={classNames(
                      {
                        'bg-brand-light-yellow text-gray-500 cursor-default':
                          active,
                      },
                      { 'hover:bg-stone-100': !active },
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                  >
                    {name}
                  </Link>
                </Menu.Item>
              )
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
