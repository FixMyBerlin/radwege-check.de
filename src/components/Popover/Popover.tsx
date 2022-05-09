import { Popover as HeadlessPopover } from '@headlessui/react';
import React from 'react';

type Props = { children: React.ReactNode };

export const Popover: React.FC<Props> = ({ children }) => {
  return (
    <HeadlessPopover className="relative">
      <HeadlessPopover.Button>Solutions</HeadlessPopover.Button>

      <HeadlessPopover.Panel className="absolute z-10">
        {children}
      </HeadlessPopover.Panel>
    </HeadlessPopover>
  );
};
