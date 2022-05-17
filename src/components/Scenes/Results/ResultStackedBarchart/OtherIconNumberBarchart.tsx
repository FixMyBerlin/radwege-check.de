import classNames from 'classnames';
import React from 'react';
import { BarChart } from './BarChart';
import { OtherIconNumber } from './OtherIconNumber';

type Props = {
  sceneId: string;
  vote0Unsafe: number;
  vote1RatherUnsafe: number;
  vote2Save: number;
  vote3VerySave: number;
  voteScore: number;
  handleMouseOver?: () => void;
  handleMouseOut?: () => void;
  classNameBarchartHeight: string;
  icon: React.ReactElement;
  /** @docs Default false; Show the icon + fallback-number even if no otherScene present */
  iconWhenEmpty?: boolean;
};

export const OtherIconNumberBarchart: React.FC<Props> = ({
  sceneId,
  vote0Unsafe,
  vote1RatherUnsafe,
  vote2Save,
  vote3VerySave,
  voteScore,
  handleMouseOver,
  handleMouseOut,
  classNameBarchartHeight,
  icon,
  iconWhenEmpty = false,
}) => {
  const IconNumber = (
    <OtherIconNumber
      otherSceneId={sceneId as string}
      otherVoteScore={voteScore as number}
      icon={icon}
      className="h-8"
    />
  );

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className={classNames(
        handleMouseOver && 'cursor-pointer',
        'flex h-full flex-col'
      )}
    >
      {voteScore ? (
        <>
          {IconNumber}
          <BarChart
            vote0Unsafe={vote0Unsafe}
            vote1RatherUnsafe={vote1RatherUnsafe}
            vote2Save={vote2Save}
            vote3VerySave={vote3VerySave}
            className={classNames(classNameBarchartHeight || 'h-20')}
          />
        </>
      ) : (
        <>
          <div className="h-8">{iconWhenEmpty ? IconNumber : null}</div>
          <div
            className={classNames(
              'bg-gray-50',
              classNameBarchartHeight || 'h-20'
            )}
            title="Diese Szene wurde nicht aus dem Blickwinkel von Fußgängern bewertet."
          />
        </>
      )}
    </div>
  );
};
