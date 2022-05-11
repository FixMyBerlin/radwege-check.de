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
  groupEndIndicator: boolean;
};

export const ResultCell: React.FC<Props> = ({
  keyName,
  bucketActive,
  scene,
  groupEndIndicator,
}) => {
  const titleTranslation = aggregationConfig[keyName]?.resultTitle ||
    aggregationConfig[keyName]?.title || <TranslationMissing value={keyName} />;

  const bucketTranslation =
    aggregationConfig[keyName]?.resultBuckets?.[scene[keyName]] ||
    aggregationConfig[keyName]?.buckets[scene[keyName]] ||
    'TODO';

  return (
    <section
      title={`${keyName}: ${scene[keyName]}`}
      className={classNames(
        'border-b py-3.5 hover:bg-stone-50',
        groupEndIndicator ? 'border-dashed border-gray-300' : 'border-dotted'
      )}
    >
      <h3
        title={bucketActive ? 'Filter-Gruppe aktiv' : ''}
        className="mb-0.5 flex items-center justify-between text-xxs font-semibold"
      >
        {titleTranslation}
        {bucketActive && (
          <>
            {' '}
            <span className="font-xl mr-1 inline-flex h-2 w-2 content-center items-center rounded-full bg-yellow-200 text-yellow-200">
              ・
            </span>
          </>
        )}
      </h3>

      <p className="leading-tight text-neutral-800">
        <span
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: bucketTranslation }}
        />

        {keyName.includes('Width') && scene[`${keyName}Number`] && (
          <span className="ml-1 font-light text-neutral-500">
            {' '}
            {formatMeter(scene[`${keyName}Number`], {})}
          </span>
        )}
      </p>
    </section>
  );
};
