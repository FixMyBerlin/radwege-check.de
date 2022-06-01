import React from 'react';
import { Link } from './Link';
import TwitterIcon from './assets/twitter-icon.svg'; // https://fontawesome.com/icons/twitter?s=brands
import { domain } from '../utils';

type Props = {
  url: string;
  text: string;
  /** @desc A Twitter username to associate with the Tweet, such as your site’s Twitter account. The provided username will be appended to the end of the Tweet with the text “via @username”. */
  via?: string;
  /** @desc Allow easy discovery of Tweets by topic by including a comma-separated list of hashtag values without the preceding # character.	 */
  hashtags?: string;
};

// https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent
export const TwitterButton: React.FC<Props> = ({
  url,
  text,
  via = 'fixmyberlin',
  hashtags,
}) => {
  const fullUrl = url.startsWith('http') ? url : `${domain()}${url}`;

  const shareUrl = new URL('https://twitter.com/intent/tweet');
  shareUrl.searchParams.set('url', fullUrl);
  shareUrl.searchParams.set('text', text);
  shareUrl.searchParams.set('via', via);
  shareUrl.searchParams.set('hashtags', hashtags);

  return (
    <Link
      to={shareUrl.toString()}
      blank
      external
      button
      className="flex flex-row items-center gap-0.5"
    >
      <TwitterIcon className="mt-0.5 h-4 w-4" /> Teilen
    </Link>
  );
};
