import { Popover as HeadlessUiPopover, Transition } from '@headlessui/react';
import React, { useState } from 'react';
import { usePopper } from 'react-popper';

type Props = {
  buttonText: React.ReactNode | string;
  children: React.ReactNode;
};

export const Popover: React.FC<Props> = ({ buttonText, children }) => {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>();
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>();
  const { styles, attributes } = usePopper(referenceElement, popperElement);

  return (
    <HeadlessUiPopover className="z-10">
      <HeadlessUiPopover.Button ref={setReferenceElement}>
        {buttonText}
      </HeadlessUiPopover.Button>

      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <HeadlessUiPopover.Panel
          className="mt-2 w-96 rounded-md bg-neutral-700 p-4 text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          {children}
        </HeadlessUiPopover.Panel>
      </Transition>
    </HeadlessUiPopover>
  );
};
