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
    <HeadlessUiPopover>
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
          className="isolate mt-2 w-80 rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
