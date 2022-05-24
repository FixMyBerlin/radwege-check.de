import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import React, { Fragment } from 'react';
import { Presets, presetsScenesPrimary } from '../../constants/presets.const';

export type PresetDropdownProps = {
  presets: Presets;
  currentPresetKey: string;
  handlePresetClick: (presetKey: string) => void;
};

export const PresetDropdown: React.FC<PresetDropdownProps> = ({
  presets,
  currentPresetKey,
  handlePresetClick,
}) => {
  const isCustom = currentPresetKey === 'custom';
  const presetTitle = presetsScenesPrimary[currentPresetKey]?.title;
  const isPreset = !!presetTitle;

  return (
    <Menu as="div" className="relative mb-5 inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          <div className="w-44 truncate">
            {isCustom && 'Konfiguration: Eigene Auswahl'}
            {isPreset && `Konfiguration: ${presetTitle}`}
            {!isPreset && !isCustom && 'Konfiguration auswählen'}
          </div>
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
        <Menu.Items className="absolute left-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {Object.entries(presets).map(([key, preset]) => {
              const selected = currentPresetKey === key;

              return (
                <Menu.Item key={key}>
                  <button
                    type="button"
                    onClick={() => handlePresetClick(key)}
                    disabled={selected}
                    className={classNames(
                      {
                        'bg-yellow-50 text-gray-500': selected,
                      },
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                  >
                    {preset.title}
                  </button>
                </Menu.Item>
              );
            })}
            {currentPresetKey === 'custom' && (
              <Menu.Item key="custom">
                <button
                  type="button"
                  disabled
                  className={classNames(
                    {
                      'bg-yellow-50 text-gray-500': true,
                    },
                    'block w-full px-4 py-2 text-left text-sm'
                  )}
                >
                  Eigene Auswahl
                </button>
              </Menu.Item>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
