import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import React, { Fragment } from 'react'
import { Facets, FacetsProps } from './Facets'

type Props = Omit<FacetsProps, 'showLogo'>

export const FacetsMobileDropdown: React.FC<Props> = ({
  category,
  results,
  handleResetFilter,
  handleSingleChoice,
  handleMultiChoice,
  presets,
  currentPresetKey,
  handlePresetClick,
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left lg:hidden">
      <Menu.Button className="inline-flex min-h-[2.125rem] w-full items-center justify-center rounded-md border border-gray-300 bg-white px-3 text-sm font-normal text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 lg:px-4">
        Filter
        <ChevronDownIcon
          className="-mr-1 ml-1 h-5 w-5 lg:ml-2"
          aria-hidden="true"
        />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute mt-2 h-[75vh] w-80 origin-top-right overflow-y-scroll overscroll-contain rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Facets
            category={category}
            results={results}
            handleResetFilter={handleResetFilter}
            handleSingleChoice={handleSingleChoice}
            handleMultiChoice={handleMultiChoice}
            presets={presets}
            currentPresetKey={currentPresetKey}
            handlePresetClick={handlePresetClick}
            showLogo={false}
          />
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
