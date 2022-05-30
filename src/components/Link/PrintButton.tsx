import React from 'react';
import { buttonStyles } from './Link';

export const PrintButton: React.FC = () => {
  return (
    <button
      type="button"
      className={buttonStyles}
      onClick={() => window.print()}
    >
      Drucken
    </button>
  );
};
