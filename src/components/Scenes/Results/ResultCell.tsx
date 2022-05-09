import classNames from 'classnames';
import React from 'react';
import { TranslationMissing } from '~/components/TextHelper';
import { formatMeter } from '~/components/utils';
import { aggregationConfig } from '../constants';
import { ResultItemProps } from '../types';

type Props = {
  keyName: string;
  bucketActive: boolean;
  scene: ResultItemProps;
};

export const ResultCell: React.FC<Props> = ({
  keyName,
  bucketActive,
  scene,
}) => {
  return (
    <div
      title={keyName}
      className="group relative border-b border-dotted hover:bg-neutral-100"
    >
      <div
        title={bucketActive ? 'Filter-Gruppe aktiv' : ''}
        className={classNames(
          'text-xs group-hover:text-pink-700',
          { 'text-neutral-300': !bucketActive },
          { 'font-bold text-neutral-400': bucketActive }
        )}
      >
        {aggregationConfig[keyName]?.title || (
          <TranslationMissing value={keyName} />
        )}
        :
      </div>

      <div className="group-hover:text-pink-900">
        {
          <span
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html:
                aggregationConfig[keyName]?.buckets[scene[keyName]] || 'TODO',
            }}
          />
        }

        {keyName.includes('Width') && (
          <span className="text-sm text-neutral-500">
            {' '}
            {formatMeter(scene[`${keyName}Number`], {})}
          </span>
        )}
      </div>
    </div>
  );
};
