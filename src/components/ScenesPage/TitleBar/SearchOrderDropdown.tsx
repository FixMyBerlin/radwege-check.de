import { Menu, Transition } from '@headlessui/react'
import {
  ChevronDownIcon,
  BarsArrowUpIcon,
  BarsArrowDownIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import React, { Fragment } from 'react'

export type SearchOrderDropdownProps = {
  searchOrder: string
  setSearchOrder: (order: string) => void
}

export const SearchOrderDropdown: React.FC<SearchOrderDropdownProps> = ({
  searchOrder,
  setSearchOrder,
}) => {
  const searchOrderValues = {
    desc: {
      name: 'Beste Ergebnisse zuerst',
      icon: <BarsArrowUpIcon className="h-4 w-4" />,
    },
    asc: {
      name: 'Schlechteste Ergebnisse zuerst',
      icon: <BarsArrowDownIcon className="h-4 w-4" />,
    },
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex min-h-[2.125rem] w-full items-center justify-center rounded-md border border-gray-300 pr-[0.6rem] pl-[0.6rem] text-sm font-normal text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 focus:ring-offset-gray-100 lg:pr-0">
          <span className="hidden lg:inline">Sortierung</span>
          <span className="lg:hidden">
            {searchOrderValues[searchOrder || 'desc'].icon}
          </span>
          <ChevronDownIcon
            className="mr-1 ml-0.5 hidden w-[18px] lg:block"
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
            {Object.entries(searchOrderValues).map(([key, values]) => {
              // When no searchOrder is given, we treat that as the default 'desc'
              const selected = searchOrder
                ? key === searchOrder
                : key === 'desc'

              return (
                <Menu.Item key={key}>
                  <button
                    type="button"
                    onClick={() => setSearchOrder(key)}
                    disabled={selected}
                    className={clsx(
                      {
                        'cursor-default bg-brand-light-yellow text-gray-500':
                          selected,
                      },
                      { 'hover:bg-stone-100': !selected },
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                  >
                    {values.name}
                  </button>
                </Menu.Item>
              )
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
