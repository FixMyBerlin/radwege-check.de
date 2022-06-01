import classNames from 'classnames';
import React from 'react';
import { formatNumber } from '~/components/utils';

type Props = {
  otherSceneId: string;
  otherVoteScore: number;
  icon: React.ReactElement;
  className?: string;
};

export const OtherIconNumber: React.FC<Props> = ({
  otherSceneId,
  otherVoteScore,
  icon,
  className,
}) => {
  if (!otherSceneId) return null;

  return (
    <div
      className={classNames(
        className,
        'flex flex-col items-center justify-center'
      )}
    >
      {icon}
      {otherVoteScore ? (
        <span
          className="font-xxs font-base"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: formatNumber(otherVoteScore, {
              precision: 0,
              unit: '&thinsp;%',
            }),
          }}
        />
      ) : (
        '–'
      )}
    </div>
  );
};
