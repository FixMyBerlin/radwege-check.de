import React from 'react';
import { formatNumber } from '~/components/utils';

type Props = {
  otherSceneId: string;
  otherVoteScore: number;
  icon: React.ReactElement;
};

export const OtherIconNumber: React.FC<Props> = ({
  otherSceneId,
  otherVoteScore,
  icon,
}) => {
  if (!otherSceneId) return null;

  return (
    <div className="flex h-8 flex-col items-center justify-center">
      {icon}
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
    </div>
  );
};
