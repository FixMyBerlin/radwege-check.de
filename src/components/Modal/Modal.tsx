import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { buttonStyles } from '../Link';

type Props = {
  title: string;
  titleIcon?: React.ReactNode;
  closeButton?: string;
  className?: string;
  children: React.ReactNode;
};

export const Modal: React.FC<Props> = ({
  title,
  titleIcon,
  closeButton,
  className,
  children,
}) => {
  const [open, setOpen] = useState(true);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className={classNames(className, 'relative z-50')}
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
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
                      className={classNames(
                        'inline-flex w-full justify-center',
                        buttonStyles
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {closeButton}
                    </button>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
