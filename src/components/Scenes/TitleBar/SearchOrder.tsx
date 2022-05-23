import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import React, { Fragment } from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';

export type SearchOrderProps = {
  searchOrder: string;
  setSearchOrder: (order: string) => void;
};

export const SearchOrder = ({ searchOrder, setSearchOrder }) => {
  const searchOrderValues = [
    { id: 'desc', name: 'Beste Ergebnisse zuerst' },
    { id: 'asc', name: 'Schlechteste Ergebnisse zuerst' },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          Sortierung
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
            {searchOrderValues.map((value) => {
              // When no searchOrder is given, we treat that as the default 'desc'
              const selected = searchOrder
                ? value.id === searchOrder
                : value.id === 'desc';

              return (
                <Menu.Item key={value.id}>
                  <button
                    type="button"
                    onClick={() => setSearchOrder(value.id)}
                    disabled={selected}
                    className={classNames(
                      {
                        'bg-yellow-50 text-gray-500': selected,
                      },
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                  >
                    {value.name}
                  </button>
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
