import React, { forwardRef } from 'react';
import type { Video } from '../types';
// FIX: Use named import for Link from react-router-dom
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from './icons/Icons';

interface ShortsPlayerProps {
  video: Video;
  playerParams: string;
  onLoad?: (e: React.SyntheticEvent<HTMLIFrameElement, Event>) => void;
  id?: string;
  context?: {
    type: 'channel' | 'home' | 'search';
    channelId?: string;
  };
}

const ShortsPlayer = forwardRef<HTMLIFrameElement, ShortsPlayerProps>(({ video, playerParams, onLoad, id, context }, ref) => {
  // Ensure enablejsapi=1 is present to allow postMessage commands for playback control.
  const srcParams =
    '?enablejsapi=1&amp;mute=0&amp;controls=1&amp;start=0&amp;origin=https%3A%2F%2Fcreate.kahoot.it&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;fs=1&amp;cc_load_policy=0&amp;embed_config=%7B%22enc%22%3A%22AXH1ezmdURLjp9ajnRbphgJJsdJgO8ClgBlLz7abD3r9GytHMkQdU5N0iobCL4fWYyaZtnDvxuMmp1P3kBfvgSumHqs9ixGuWuQH5PvXl90Vorl_RJiCBYdRLG9Dyh-iQmKVocJtnHNdwa_g_Rbw3MZ4ARggf89rZw%3D%3D%22%2C%22hideTitle%22%3Atrue%7D&amp;enablejsapi=1&amp;widgetid=1&amp;forigin=https%3A%2F%2Fcreate.kahoot.it%2Flearner%2Fcb8cb5ae-d835-4c4a-bc2d-9cc78519d646%2Fcourse%2F6fba06e3-1f76-47a8-9a4a-53c53eb86286%2F0&amp;aoriginsup=1&amp;vf=6';
  const navigate = useNavigate();
  const fromChannel = context?.type === 'channel';

  return (
    <div className="h-full w-full relative flex-shrink-0 bg-yt-black group">
      {fromChannel && (
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-20 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
          aria-label="チャンネルに戻る"
        >
          <ChevronLeftIcon />
        </button>
      )}

      <iframe
        ref={ref}
        id={id}
        src={`https://www.youtubeeducation.com/embed/${video.id}${srcParams}`}
        title="動画ストリーム"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={onLoad}
        referrerpolicy="strict-origin-when-cross-origin"
        className="w-full h-full pointer-events-auto"
      ></iframe>

      {/* Overlay Info - Appears on hover or standard behavior */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none">
        {!fromChannel && (
          <div className="flex items-center pointer-events-auto">
            <Link to={`/channel/${video.channelId}`} className="flex items-center flex-1">
              <img src={video.channelAvatarUrl} alt={video.channelName} className="w-10 h-10 rounded-full border border-white/20" />
              <span className="ml-3 font-semibold truncate drop-shadow-md">{video.channelName}</span>
            </Link>
            <button className="bg-white text-black font-semibold px-4 py-2 rounded-full text-sm flex-shrink-0 hover:bg-gray-200 transition-colors">
              登録
            </button>
          </div>
        )}
        <p className="mt-3 text-sm line-clamp-2 drop-shadow-md">{video.title}</p>
      </div>
    </div>
  );
});
export default ShortsPlayer;
