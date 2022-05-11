import React from 'react';
import { formatNumber } from '~/components/utils';

type Props = {
  otherSceneId: string;
  otherVoteScore: number;
  handleMouseOver: (otherSceneId: string) => void;
  handleMouseOut: () => void;
  icon: React.ReactElement;
};

export const OtherIconNumber: React.FC<Props> = ({
  otherSceneId,
  otherVoteScore,
  handleMouseOver,
  handleMouseOut,
  icon,
}) => {
  if (!otherSceneId) return null;

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <div
      className="font-xxs font-base flex h-full w-full cursor-pointer flex-col content-start items-center"
      // TODO Fix types
      onMouseOver={() => handleMouseOver(otherSceneId as string)}
      onMouseOut={handleMouseOut}
    >
      {icon}
      <span
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
